💰 Loan Approval Prediction System (Full-Stack ML Project)

A full-stack Machine Learning web application that predicts whether a loan application will be approved based on applicant financial and employment details. The system integrates a trained ML model with a FastAPI backend and a responsive frontend interface.

🚀 Live Features
📊 Machine Learning model trained using Random Forest Classifier
⚡ REST API built with FastAPI
🌐 Interactive frontend (HTML, CSS, JavaScript)
🔗 Real-time prediction via API calls
🎯 Clean separation of frontend and backend
🧠 Categorical + numerical feature handling
🔒 CORS-enabled backend for secure frontend communication
🧠 Machine Learning Pipeline
Data preprocessing (encoding + feature selection)
Model training using scikit-learn
Model serialization using joblib
Features used:
Income
Credit Score
Loan Amount
Years Employed

🏗️ Project Structure
loan-approval-model/
│
├── backend/
│   ├── app.py              # FastAPI backend
│   ├── loan_model.pkl      # Trained ML model
│
├── frontend/
│   ├── index.html          # UI structure
│   ├── style.css           # Styling
│   ├── app.js              # Frontend logic
│
├── model/                  # (optional training artifacts)
├── requirements.txt       # Python dependencies
├── .gitignore             # Ignored files
└── README.md

⚙️ Tech Stack
Backend:
FastAPI
Uvicorn
Scikit-learn
Pandas
Joblib
Frontend:
HTML5
CSS3
JavaScript (Fetch API)

🔥 How It Works
User enters loan details in the frontend form
Frontend sends data to FastAPI backend (/predict)
Backend loads trained ML model (loan_model.pkl)
Model returns prediction (Approved / Rejected)
Result is displayed instantly on UI

▶️ Run Locally
1. Install dependencies
pip install -r requirements.txt
2. Start backend
python3 -m uvicorn backend.app:app --reload
3. Open frontend

