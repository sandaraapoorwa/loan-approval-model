from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("loan_model.pkl")


@app.get("/")
def home():
    return {"message": "Loan Prediction API running"}


@app.post("/predict")
def predict(data: dict):
    input_df = pd.DataFrame([data])
    prediction = model.predict(input_df)[0]

    return {"loan_approved": int(prediction)}
