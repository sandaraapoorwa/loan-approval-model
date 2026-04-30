async function predict() {

    const data = {
        income: Number(document.getElementById("income").value),
        credit_score: Number(document.getElementById("credit").value),
        loan_amount: Number(document.getElementById("loan").value),
        years_employed: Number(document.getElementById("years").value)
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("result").innerText =
            result.loan_approved === 1
                ? "✅ Loan Approved"
                : "❌ Loan Rejected";

        document.getElementById("result").style.color =
            result.loan_approved === 1 ? "green" : "red";

    } catch (error) {
        document.getElementById("result").innerText =
            "Error connecting to backend";
        document.getElementById("result").style.color = "orange";
    }
}