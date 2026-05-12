# 💰 Loan Approval Prediction System

A full-stack Machine Learning web application that predicts whether a loan application will be **Approved** or **Rejected** based on applicant financial details.  
The system integrates a trained **Random Forest Classifier** with a **FastAPI** backend and a responsive frontend built using **HTML, CSS, and JavaScript** for real-time predictions.

---

## 🚀 Features

- ✅ Machine Learning model trained using **Scikit-learn**
- ✅ REST API powered by **FastAPI**
- ✅ Real-time loan prediction system
- ✅ Interactive frontend UI
- ✅ CORS-enabled backend for seamless frontend communication
- ✅ Clean project structure with separated frontend, backend, and ML model
- ✅ Fast and lightweight deployment-ready architecture

---

## 🧠 Tech Stack

### Backend
- Python
- FastAPI
- Uvicorn

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Frontend
- HTML
- CSS
- JavaScript

---

## 📂 Project Structure

```bash
Loan-Approval-Prediction-System/
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── dataset/
│   └── loan_data.csv
│
├── training/
│   └── train_model.py
│
└── README.md
```

---

## ⚙️ Workflow

```text
User Inputs Applicant Data
        ↓
Frontend Sends API Request
        ↓
FastAPI Backend Receives Data
        ↓
Random Forest Model Predicts Result
        ↓
Prediction Returned to Frontend
        ↓
Displays Approved / Rejected
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/loan-approval-prediction-system.git
cd loan-approval-prediction-system
```

---

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 3️⃣ Run the FastAPI Server

```bash
python3 -m uvicorn backend.app:app --reload
```

Server will start at:

```bash
http://127.0.0.1:8000
```

---

### 4️⃣ Open Frontend

Open the `index.html` file in your browser.

---

## 📡 API Endpoint

### Predict Loan Status

```http
POST /predict
```

### Sample Request

```json
{
  "income": 5000,
  "loan_amount": 200000,
  "credit_history": 1,
  "employment_years": 5
}
```

### Sample Response

```json
{
  "prediction": "Approved"
}
```

---

## 🤖 Machine Learning Model

The prediction system uses a **Random Forest Classifier** trained on historical loan application data.

### Model Training Steps

- Data preprocessing
- Handling missing values
- Feature encoding
- Train-test split
- Random Forest training
- Model serialization using Joblib
