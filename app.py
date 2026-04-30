from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

model = joblib.load("loan_model.pkl")


@app.get("/")
def home():
    return {"message": "Loan Prediction API running"}


@app.post("/predict")
def predict(data: dict):
    input_df = pd.DataFrame([data])

    prediction = model.predict(input_df)[0]

    return {"loan_approved": int(prediction)}
