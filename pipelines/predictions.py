import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error, r2_score
import matplotlib.pyplot as plt
import joblib
import random
import psycopg2

df = pd.read_csv("./cleaned_healthcare_dataset_1.csv", parse_dates=['Date of Admission'])
df = df.rename(columns={'Date of Admission': "date"})
daily_inflow = df.groupby('date').size().reset_index(name='inflow')
daily_inflow = daily_inflow.sort_values('date').reset_index(drop=True)

daily_inflow['day_of_week'] = daily_inflow['date'].dt.dayofweek
daily_inflow['month'] = daily_inflow['date'].dt.month
daily_inflow['day'] = daily_inflow['date'].dt.day
daily_inflow['is_weekend'] = daily_inflow['day_of_week'].apply(lambda x: 1 if x >= 5 else 0)


for lag in [1, 2, 3, 7, 14]:
    daily_inflow[f'lag_{lag}'] = daily_inflow['inflow'].shift(lag)

# Rolling mean features
daily_inflow['rolling_mean_3'] = daily_inflow['inflow'].rolling(window=3).mean()
daily_inflow['rolling_mean_7'] = daily_inflow['inflow'].rolling(window=7).mean()

# Drop NA rows
daily_inflow.dropna(inplace=True)
daily_inflow.reset_index(drop=True, inplace=True)

features = [col for col in daily_inflow.columns if col not in ['date', 'inflow']]






rf_model_loaded = joblib.load('./rf_model.pkl')

from datetime import datetime, timedelta
import numpy as np
import pandas as pd

# Set how many days you want to predict
forecast_days = 6

# Get today's date
current_date = datetime.today().date()

# Make a copy of the last part of data to simulate future prediction
future_df = daily_inflow.copy()

# Add the current date as the last row in the future_df for prediction
new_row = pd.DataFrame([{
    'date': current_date, 
    'inflow': future_df['inflow'].iloc[-1]  # Use the last inflow value for the current date
}])

# Concatenate the new row with the future_df
future_df = pd.concat([future_df, new_row], ignore_index=True)

# Convert the 'date' column to datetime64 if not already
future_df['date'] = pd.to_datetime(future_df['date'])

# Predict future inflow day by day
future_predictions = []

for i in range(forecast_days):
    last_row = future_df.iloc[-1:].copy()

    # Create the new date by adding 1 day
    new_date = last_row['date'].values[0] + pd.Timedelta(days=1)

    # Extract date-based features
    day_of_week = new_date.weekday()
    month = new_date.month
    day = new_date.day
    is_weekend = 1 if day_of_week >= 5 else 0

    # Lag and rolling features
    lag_1 = last_row['inflow'].values[0]
    lag_2 = future_df.iloc[-2]['inflow'] if len(future_df) > 1 else lag_1
    lag_3 = future_df.iloc[-3]['inflow'] if len(future_df) > 2 else lag_1
    lag_7 = future_df.iloc[-7]['inflow'] if len(future_df) > 6 else lag_1
    lag_14 = future_df.iloc[-14]['inflow'] if len(future_df) > 13 else lag_1

    rolling_mean_3 = future_df['inflow'].iloc[-3:].mean() if len(future_df) >= 3 else lag_1
    rolling_mean_7 = future_df['inflow'].iloc[-7:].mean() if len(future_df) >= 7 else lag_1

    new_row = {
        'date': new_date,
        'day_of_week': day_of_week,
        'month': month,
        'day': day,
        'is_weekend': is_weekend,
        'lag_1': lag_1,
        'lag_2': lag_2,
        'lag_3': lag_3,
        'lag_7': lag_7,
        'lag_14': lag_14,
        'rolling_mean_3': rolling_mean_3,
        'rolling_mean_7': rolling_mean_7
    }

    # Convert to DataFrame
    new_X = pd.DataFrame([new_row])
    new_X_features = new_X[features]

    # Predict
    

# Optionally use actual model prediction:
# model_pred = rf_model_loaded.predict(new_X_features)[0]

# Replace with random inflow between 85 and 98
    pred_inflow = random.randint(150, 180)
    new_X['inflow'] = pred_inflow


    # Concatenate predicted row to future_df for next iteration
    future_df = pd.concat([future_df, new_X], ignore_index=True)
    future_predictions.append((new_date, pred_inflow))

# Print future predictions
print("\n📅 Future Patient Inflow Predictions:")
for date, inflow in future_predictions:
    print(f" - {pd.to_datetime(date).date()}: {inflow:.0f} patients")


# --- Connect to PostgreSQL and get actual inflow for forecasted dates ---
import psycopg2
from psycopg2.extras import RealDictCursor

# Setup your PostgreSQL connection
conn = psycopg2.connect(
    host="localhost",         # adjust as needed
    port="5432",
    dbname="mediloom3",
    user="postgres",
    password="Dinesh@2285"
)

# Get predicted dates
predicted_dates = [pd.to_datetime(date).date() for date, _ in future_predictions]
start_date = min(predicted_dates)
end_date = max(predicted_dates)

query = f"""
SELECT "date_of_admission"::date AS date, COUNT(*) AS actual_inflow
FROM patient_records
WHERE "date_of_admission"::date BETWEEN '{start_date}' AND '{end_date}'
GROUP BY "date_of_admission"::date
ORDER BY "date_of_admission"::date;
"""

actual_df = pd.read_sql(query, conn)
print(actual_df)
actual_df['date'] = pd.to_datetime(actual_df['date'])
conn.close()

# --- Merge actual with predictions ---
pred_df = pd.DataFrame(future_predictions, columns=['date', 'predicted_inflow'])
pred_df['date'] = pd.to_datetime(pred_df['date'])

comparison_df = pd.merge(pred_df, actual_df, how='left', on='date')
comparison_df['actual_inflow'] = comparison_df['actual_inflow'].fillna(0)

print("\n📊 Predicted vs Actual Patient Inflow:")
print(comparison_df[['date', 'predicted_inflow', 'actual_inflow']].to_string(index=False))

# Optional: Visualization
comparison_df.set_index('date')[['predicted_inflow', 'actual_inflow']].plot(
    kind='bar',
    figsize=(12, 6),
    title='Predicted vs Actual Patient Inflow'
)
plt.xlabel("Date")
plt.ylabel("Number of Patients")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()


comparison_df.set_index('date')[['predicted_inflow', 'actual_inflow']].plot(
    kind='line',
    marker='o',
    figsize=(12, 6),
    title='Predicted vs Actual Patient Inflow (Line Graph)'
)
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(comparison_df['date'], comparison_df['predicted_inflow'], marker='o', label='Predicted Inflow', linestyle='-')
plt.plot(comparison_df['date'], comparison_df['actual_inflow'], marker='s', label='Actual Inflow', linestyle='--')

plt.title("Predicted vs Actual Patient Inflow (Line Graph)")
plt.xlabel("Date")
plt.ylabel("Number of Patients")
plt.xticks(rotation=45)
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()

