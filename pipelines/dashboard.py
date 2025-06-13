import streamlit as st
import pandas as pd
import psycopg2
import time
import plotly.graph_objects as go
from datetime import datetime

# Database connection
conn = psycopg2.connect(
    host="localhost",
    database="DSP",
    user="postgres",
    password="Dinesh@2285"
)
cursor = conn.cursor()

# Function to fetch patient records
def fetch_patient_records():
    cursor.execute("SELECT * FROM patient_records ORDER BY date_of_admission DESC")
    rows = cursor.fetchall()
    df = pd.DataFrame(rows, columns=['patient_id', 'name', 'age', 'gender', 'blood_type', 'medical_condition', 'date_of_admission', 'discharge_date', 'doctor', 'hospital', 'insurance_provider', 'billing_amount', 'room_number', 'admission_type', 'medication', 'test_results'])
    df['date_of_admission'] = pd.to_datetime(df['date_of_admission'])
    return df

# Streamlit app layout
st.title("Real-Time Patient Admissions Dashboard")

# Create placeholders for the plots
placeholder_fig1 = st.empty()
placeholder_fig2 = st.empty()

# Initialize the figure (first time setup)
fig1 = go.Figure()
fig2 = go.Figure()

# Set up graph for admissions trend
fig1.add_trace(
    go.Scatter(
        x=[],
        y=[],
        mode='lines+markers',
        name='Admissions Trend',
        line=dict(color='blue')
    )
)
fig1.update_layout(
    title="Real-Time Admissions Trend",
    xaxis_title="Date",
    yaxis_title="Number of Admissions",
    showlegend=True,
    autosize=True,  # Automatically adjust size based on container width
    height=800,    # Occupy more height for better visibility
    width=1500,    # Occupy full width or more
)

# Set up graph for medical condition distribution
fig2.add_trace(
    go.Pie(
        labels=[],
        values=[],
        name='Medical Condition Distribution'
    )
)
fig2.update_layout(
    title="Medical Condition Distribution",
    autosize=True,  # Automatically adjust size based on container width
    height=800,    # Occupy more height for better visibility
    width=1500,    # Occupy full width or more
)

# Dashboard update every 5 seconds
while True:
    # Fetch the latest data
    df = fetch_patient_records()

    # Group admissions by admission date (daily trend)
    admission_counts = df.groupby(df['date_of_admission'].dt.date).size().reset_index(name='admissions')
    admission_counts['date_of_admission'] = pd.to_datetime(admission_counts['date_of_admission'])

    # Update the admissions trend plot (line chart)
    fig1.data[0].x = admission_counts['date_of_admission']
    fig1.data[0].y = admission_counts['admissions']

    # Create the medical condition distribution plot (pie chart)
    medical_condition_counts = df['medical_condition'].value_counts().reset_index()
    medical_condition_counts.columns = ['medical_condition', 'count']  # Rename columns properly

    fig2.data[0].labels = medical_condition_counts['medical_condition']
    fig2.data[0].values = medical_condition_counts['count']

    # Add the admission_type data to the admissions trend graph
    for admission_type, color in zip(['elective', 'urgent', 'emergency'], ['blue', 'green', 'red']):
        filtered_data = df[df['admission_type'] == admission_type]
        admission_type_counts = filtered_data.groupby(filtered_data['date_of_admission'].dt.date).size().reset_index(name='admissions')
        admission_type_counts['date_of_admission'] = pd.to_datetime(admission_type_counts['date_of_admission'])
        
        # Update the corresponding trace for each admission type
        fig1.add_trace(
            go.Scatter(
                x=admission_type_counts['date_of_admission'],
                y=admission_type_counts['admissions'],
                mode='lines+markers',
                name=admission_type.capitalize(),
                line=dict(color=color)
            )
        )

    # Use a unique key to ensure updates happen in the same location
    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

    # Update the line chart for admissions trend in the same placeholder
    placeholder_fig1.plotly_chart(fig1, use_container_width=True, key=f"admissions_trend_{timestamp}")

    # Update the pie chart for medical condition distribution in the same placeholder
    placeholder_fig2.plotly_chart(fig2, use_container_width=True, key=f"medical_condition_distribution_{timestamp}")

    # Sleep for 5 seconds before updating the graphs again
    time.sleep(5)