
import streamlit as st
import pandas as pd
import psycopg2
import plotly.express as px
from streamlit_autorefresh import st_autorefresh

# Auto-refresh every 5 seconds
st_autorefresh(interval=5000, key="realtime_dashboard_refresh")

st.set_page_config(page_title="Patient Inflow Dashboard", layout="wide")
st.title("📊 Real-Time Patient Inflow")

@st.cache_resource
def get_connection():
    return psycopg2.connect(
        host='localhost',
        database='mediloom3',
        user='postgres',
        password='Dinesh@2285'
    )

conn = get_connection()

# Query inflow from patient_records
query = '''
    SELECT date_of_admission::date AS admission_day, COUNT(*) AS num_patients
    FROM patient_records
    GROUP BY admission_day
    ORDER BY admission_day;
'''
df = pd.read_sql(query, conn)

# Plot the data
fig = px.bar(df, x='admission_day', y='num_patients', title='Patient Inflow Per Day', text_auto=True)
st.plotly_chart(fig, use_container_width=True)

with st.expander('🔍 View Raw Data'):
    st.dataframe(df, use_container_width=True)
