import psycopg2
import pandas as pd
import random
import time

# --- Connect to PostgreSQL ---
def connect_db():
    return psycopg2.connect(
        dbname="DSP",
        user="postgres",
        password="Dinesh@2285",
        host="localhost",
        port="5432"
    )

# --- Fetch emergency and urgent patients ---
def fetch_emergency_urgent_patients():
    conn = connect_db()
    query = """
        SELECT * FROM patient_records
        WHERE LOWER(admission_type) IN ('emergency', 'urgent');
    """
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# --- Fetch hospital IDs from names ---
def fetch_hospital_ids_from_names(hospital_names):
    conn = connect_db()
    query = """
        SELECT hospital_id, hospital_name
        FROM hospitals_queuingmodel
        WHERE hospital_name IN %s;
    """
    if not hospital_names:
        return pd.DataFrame(columns=['hospital_id', 'hospital_name'])

    df = pd.read_sql(query, conn, params=(tuple(hospital_names),))
    conn.close()
    return df

# --- Insert bed allocation data ---
def insert_bed_allocation(patient_id, hospital_id, date_of_admission, release_time):
    # Convert release time from seconds to days
    release_date = pd.to_datetime(date_of_admission) + pd.to_timedelta(release_time, 's')  # in days
    
    conn = connect_db()
    cursor = conn.cursor()
    insert_query = """
        INSERT INTO bed_allocations (patient_id, hospital_id, date_of_admission, allocation_time, release_date)
        VALUES (%s, %s, %s, CURRENT_TIMESTAMP, %s)
    """
    cursor.execute(insert_query, (patient_id, hospital_id, date_of_admission, release_date))
    conn.commit()
    cursor.close()
    conn.close()
    print(f"✅ Bed allocation data stored for patient ID {patient_id} in Hospital ID {hospital_id}.")


# --- Fetch bed resources from hospitals ---
def fetch_hospital_resources(hospital_ids):
    conn = connect_db()
    query = """
        SELECT hospital_id, resource_name, quantity
        FROM hospital_resources
        WHERE hospital_id IN %s AND LOWER(resource_name) = 'beds';
    """
    if not hospital_ids:
        return pd.DataFrame(columns=['hospital_id', 'resource_name', 'quantity'])

    df = pd.read_sql(query, conn, params=(tuple(hospital_ids),))
    conn.close()
    return df

# --- Update bed count in DB ---
def update_bed_quantity(hospital_id, new_quantity):
    conn = connect_db()
    cursor = conn.cursor()
    update_query = """
        UPDATE hospital_resources
        SET quantity = %s
        WHERE hospital_id = %s AND LOWER(resource_name) = 'beds';
    """
    cursor.execute(update_query, (new_quantity, hospital_id))
    conn.commit()
    cursor.close()
    conn.close()
    print(f"🔄 DB updated → Hospital {hospital_id} now has {new_quantity} beds.")

# --- Allocate bed to waiting patient ---
# --- Allocate bed to waiting patient ---
# --- Allocate bed to waiting patient ---
from datetime import datetime, timedelta

def allocate_bed_to_waiting_patient(hospital_id, waiting_queue):
    if not waiting_queue:
        return

    patient_name = waiting_queue.pop(0)

    # Update patient_allocations table
    conn = connect_db()
    cursor = conn.cursor()

    update_query = """
        UPDATE patient_allocations
        SET hospital_id = %s, bed_allocated = TRUE, updated_at = CURRENT_TIMESTAMP
        WHERE name = %s AND hospital_id IS NULL;
    """
    cursor.execute(update_query, (hospital_id, patient_name))
    conn.commit()

    # Fetch patient_id and date_of_admission
    fetch_query = """
        SELECT patient_id, date_of_admission
        FROM patient_records
        WHERE name = %s;
    """
    cursor.execute(fetch_query, (patient_name,))
    result = cursor.fetchone()

    if result:
        patient_id, date_of_admission = result
        allocation_time = datetime.now()
        delay_seconds = random.randint(3, 8)
        release_date = allocation_time + timedelta(seconds=delay_seconds)
        release_date_as_date = release_date.date()  # convert to DATE only

        # Insert into bed_allocation table
        insert_query = """
            INSERT INTO bed_allocations (patient_id, hospital_id, date_of_admission, allocation_time, release_date)
            VALUES (%s, %s, %s, %s, %s);
        """
        cursor.execute(insert_query, (
            patient_id,
            hospital_id,
            date_of_admission,
            allocation_time,
            release_date_as_date
        ))
        conn.commit()
        print(f"📥 Bed allocation stored for patient_id={patient_id}, delay={delay_seconds}s.")

    cursor.close()
    conn.close()




# --- Release bed from a patient ---
def release_bed(hospital_id, patient_name):
    # Mark the bed as released in the patient_allocations table
    conn = connect_db()
    cursor = conn.cursor()

    release_query = """
        UPDATE patient_allocations
        SET hospital_id = NULL, bed_allocated = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE name = %s AND hospital_id = %s;
    """
    cursor.execute(release_query, (patient_name, hospital_id))
    conn.commit()
    cursor.close()
    conn.close()

    print(f"🛏️ Bed released by {patient_name} (Hospital ID: {hospital_id})")


# --- Simulation ---
# --- Simulation ---
def run_simulation():
    print("🏥 Starting Emergency Bed Allocation Simulation...\n")
    df_patients = fetch_emergency_urgent_patients()

    if df_patients.empty:
        print("⚠️ No emergency or urgent patients found.")
        return

    hospital_names = df_patients['hospital'].unique().tolist()
    df_hospitals = fetch_hospital_ids_from_names(hospital_names)

    # Map hospital names to IDs
    hospital_map = dict(zip(df_hospitals['hospital_name'], df_hospitals['hospital_id']))
    df_patients['hospital_id'] = df_patients['hospital'].map(hospital_map)

    hospital_ids = df_patients['hospital_id'].dropna().unique().tolist()
    df_resources = fetch_hospital_resources(hospital_ids)

    # Initial bed availability
    bed_availability = dict(zip(df_resources['hospital_id'], df_resources['quantity']))
    waiting_queue = []

    print("🚑 Simulating patient inflow and bed allocation...\n")

    for i in range(0, len(df_patients), 20):  # 20 patients per batch
        batch = df_patients.iloc[i:i+20]

        for _, patient in batch.iterrows():
            h_id = patient['hospital_id']
            name = patient['name']

            if pd.isna(h_id):
                print(f"❌ Hospital not found for patient {name}")
                continue

            h_id = str(h_id)  # ensure consistent keys

            if bed_availability.get(h_id, 0) > 0:
                bed_availability[h_id] -= 1
                update_bed_quantity(h_id, bed_availability[h_id])
                print(f"✅ Bed allocated to {name} (Hospital ID: {h_id})")

                # Mark the patient as allocated
                conn = connect_db()
                cursor = conn.cursor()
                insert_query = """
    INSERT INTO patient_allocations (name, hospital_id, bed_allocated, admission_type, date_of_admission)
    VALUES (%s, %s, TRUE, %s, %s)
    ON CONFLICT (name, hospital_id) DO NOTHING;
"""
                cursor.execute(insert_query, (name, h_id, patient['admission_type'], patient['date_of_admission']))
                conn.commit()
                cursor.close()
                conn.close()

                # Simulate release of bed
                release_time = random.randint(3, 8)  # Random release time between 3 to 8 seconds
                time.sleep(release_time)  # Simulate release after a random time

                # Release the bed and update the database
                release_bed(h_id, name)
                bed_availability[h_id] += 1
                update_bed_quantity(h_id, bed_availability[h_id])
                print(f"🛏️ Bed released by {name} (Hospital ID: {h_id}) after {release_time}s\n")

            else:
                print(f"⏳ No beds for {name} (Hospital ID: {h_id}) → Added to queue.")
                waiting_queue.append(name)

            # If a bed is released, allocate it to a waiting patient immediately
            if bed_availability.get(h_id, 0) > 0 and waiting_queue:
                allocate_bed_to_waiting_patient(h_id, waiting_queue)

        print("⏸️  Sleeping 5s before next batch...\n")
        time.sleep(15)

    # Final report
    if waiting_queue:
        print("\n📋 Final Waiting Queue:")
        for i, name in enumerate(waiting_queue, start=1):
            print(f"{i}. {name} (Est. wait: {random.randint(3, 8)}s)")
    else:
        print("\n🎉 All patients were allocated beds!")

    print("\n🏁 Simulation Complete.")


# --- Entry ---
if __name__ == "__main__":
    run_simulation()
