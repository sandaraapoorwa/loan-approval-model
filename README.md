💰 Loan Approval Prediction System

A full-stack Machine Learning web application that predicts loan approval based on applicant financial details. The project integrates a trained Random Forest model with a FastAPI backend and a simple HTML/CSS/JavaScript frontend for real-time predictions.

🚀 Features :

ML model trained using Scikit-learn
REST API built with FastAPI
Real-time prediction via frontend UI
CORS-enabled backend for frontend communication
Clean separation of frontend, backend, and model
🧠 Tech Stack
Python (Scikit-learn, Pandas, Joblib)
FastAPI + Uvicorn
HTML, CSS, JavaScript

⚙️ Workflow :

User inputs data → Frontend sends request → FastAPI backend processes with ML model → Returns prediction (Approved/Rejected)

📦 Run Locally :

pip install -r requirements.txt
python3 -m uvicorn backend.app:app --reload
