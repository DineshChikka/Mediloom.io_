import json
import random
import asyncio
from datetime import datetime, timedelta
from kafka import KafkaProducer, KafkaConsumer
import psycopg2
from faker import Faker

fake = Faker()

# PostgreSQL connection
conn = psycopg2.connect(
    host="localhost",
    database="mediloom3",
    user="postgres",
    password="Dinesh@2285"
)
cursor = conn.cursor()

# Kafka connection details
KAFKA_BROKER = "demohsptl-dinesh-4716.k.aivencloud.com:17094"
TOPIC_NAME = "patientflow"

# Load authentication certificates
CERT_FOLDER = "./certs"
CA_CERT = f"{CERT_FOLDER}/ca.pem"
ACCESS_CERT = f"{CERT_FOLDER}/service.cert"
ACCESS_KEY = f"{CERT_FOLDER}/service.key"

# Create Kafka Producer
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    security_protocol="SSL",
    ssl_cafile=CA_CERT,
    ssl_certfile=ACCESS_CERT,
    ssl_keyfile=ACCESS_KEY,
    value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8')  # Serialize datetime objects as strings
)

# Create Kafka Consumer
consumer = KafkaConsumer(
    TOPIC_NAME,
    bootstrap_servers=KAFKA_BROKER,
    security_protocol="SSL",
    ssl_cafile=CA_CERT,
    ssl_certfile=ACCESS_CERT,
    ssl_keyfile=ACCESS_KEY,
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)



hospitals = {}              # {h_id: h_name}
hospital_doctors = {}       # {h_id: [doctor_dicts]}

# Load hospital and doctor data from DB
def load_hospital_and_doctors():
    global hospitals, hospital_doctors

    # Load hospitals
    cursor.execute("SELECT hospital_id, hospital_name FROM hospitals_queuingmodel")
    for h_id, h_name in cursor.fetchall():
        hospitals[h_id] = h_name
        hospital_doctors[h_id] = []  # Init doctor list per hospital

    # Load doctors and group by hospital
    cursor.execute("SELECT Doctor_id, Doctor_name, H_id, Dept FROM doctor_resource")
    for d_id, d_name, h_id, dept in cursor.fetchall():
        if h_id in hospital_doctors:
            hospital_doctors[h_id].append({
                'd_id': d_id,
                'd_name': d_name,
                'dept': dept
            })


# Get the last patient_id from DB
def get_last_patient_id():
    cursor.execute("SELECT MAX(patient_id) FROM patient_records")
    last_patient_id = cursor.fetchone()[0]
    if last_patient_id is None:
        return 1
    return int(last_patient_id[3:]) + 1

# Generate patient
def generate_patient(pid_counter, hospital_name, doctor, admission_date):
    name = fake.name()
    pid = f"PID{pid_counter:04d}"
    return {
        'patient_id': pid,
        'name': name,
        'age': random.randint(1, 90),
        'gender': random.choice(['male', 'female', 'others']),
        'blood_type': random.choice(['b-', 'a+', 'a-', 'o+', 'ab+', 'ab-', 'b+', 'o-']),
        'medical_condition': random.choice(['cancer', 'obesity', 'diabetes', 'asthma', 'hypertension', 'arthritis']),
        'date_of_admission': admission_date,
        'discharge_date': admission_date + timedelta(days=random.randint(1, 10)),
        'doctor': doctor['d_name'],
        'hospital': hospital_name,
        'insurance_provider': random.choice(['blue cross', 'medicare', 'aetna', 'unitedhealthcare', 'cigna']),
        'billing_amount': round(random.uniform(1000, 50000), 2),
        'room_number': random.randint(100, 999),
        'admission_type': random.choice(['elective', 'emergency','urgent']),
        'medication': random.choice(['paracetamol', 'ibuprofen', 'aspirin', 'penicillin', 'lipitor']),
        'test_results': random.choice(['normal', 'inconclusive', 'abnormal']),
    }

# Async generator
async def generate_and_insert():
    pid_counter = get_last_patient_id()
    load_hospital_and_doctors()

    today = datetime.now()
    for day_offset in range(10):
        current_day = today + timedelta(days=day_offset)
        print(f"\n Generating patients for {current_day.strftime('%Y-%m-%d')}")

        for h_id, h_name in hospitals.items():
            doctors = hospital_doctors.get(h_id, [])
            if not doctors:
                continue

            num_patients = random.randint(28, 38)
            print(f" {h_name} - Generating {num_patients} patients")

            for _ in range(num_patients):
                doctor = random.choice(doctors)
                patient = generate_patient(pid_counter, h_name, doctor, current_day)
                producer.send(TOPIC_NAME, value=patient)
                print(f" \033[92m Sent to Kafka: {patient['patient_id']} - {patient['name']}\033[0m")
                pid_counter += 1
                await asyncio.sleep(1)

# Run generator
asyncio.run(generate_and_insert())



