import { useState } from 'react';

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    credit_score: '',
    loan_amount: '',
    loan_purpose: '',
    employment_status: '',
    debt_to_income_ratio: '',
  });

  const [result, setResult] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="card">
        <h2 className="unauthorized-title">Unauthorized</h2>
        <p>Please log in or register to access predictions.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://credit-risk-be.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const fullResult = { ...data, loan_purpose: formData.loan_purpose };

      localStorage.setItem("lastPrediction", JSON.stringify(fullResult));

      const history = JSON.parse(localStorage.getItem("predictionHistory")) || [];
      history.unshift(fullResult);
      localStorage.setItem("predictionHistory", JSON.stringify(history));

      setResult(fullResult);
    } catch (err) {
      console.error("Prediction failed:", err);
      setResult({ error: "Prediction failed" });
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Credit Risk Prediction</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>Income:</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Credit Score:</label>
        <input type="number" name="credit_score" value={formData.credit_score} onChange={handleChange} required />

        <label>Loan Amount:</label>
        <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} required />

        <label>Loan Purpose:</label>
        <select name="loan_purpose" value={formData.loan_purpose} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="debt_consolidation">Debt Consolidation</option>
          <option value="home_improvement">Home Improvement</option>
          <option value="major_purchase">Major Purchase</option>
          <option value="medical_expense">Medical Expense</option>
          <option value="small_business">Small Business</option>
          <option value="vacation">Vacation</option>
          <option value="other">Other</option>
        </select>

        <label>Employment Status:</label>
        <select name="employment_status" value={formData.employment_status} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-Employed</option>
          <option value="unemployed">Unemployed</option>
        </select>

        <label>Debt-to-Income Ratio (%):</label>
        <input
          type="number"
          name="debt_to_income_ratio"
          value={formData.debt_to_income_ratio}
          onChange={handleChange}
          placeholder="e.g., 36 for 36%"
          step="0.1"
          required
        />

        <div></div>
        <button type="submit" className="button-primary">Predict</button>
      </form>

      {result && (
        <div className="mt-4" style={{ marginTop: "2rem", textAlign: "center" }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <>
              <p><strong>Decision:</strong> {result.decision}</p>
              <p><strong>Risk Score:</strong> {result.risk_score}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
