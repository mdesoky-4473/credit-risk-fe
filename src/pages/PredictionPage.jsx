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
        <div className="p-4 max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Unauthorized</h2>
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
      const res = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
      localStorage.setItem("lastPrediction", JSON.stringify(data));
    } catch (err) {
      console.error('Prediction failed:', err);
      setResult({ error: 'Prediction failed' });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Credit Risk Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Income:</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        </div>
        <div>
          <label>Credit Score:</label>
          <input
            type="number"
            name="credit_score"
            value={formData.credit_score}
            onChange={handleChange}
            className="w-full border p-2"
            required
            />
        </div>
        <div>
          <label>Loan Amount:</label> 
          <input
            type="number"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            className="w-full border p-2"
            required    
          />
        </div>  
        <div>
          <label>Loan Purpose:</label>
          <select
            name="loan_purpose"
            value={formData.loan_purpose}
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">Select...</option>
            <option value="debt_consolidation">Debt Consolidation</option>
            <option value="home_improvement">Home Improvement</option>
            <option value="major_purchase">Major Purchase</option>
            <option value="medical_expense">Medical Expense</option>
            <option value="small_business">Small Business</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Employment Status:</label>
          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">Select...</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>
        <div>
          <label>Debt-to-Income Ratio (%):</label>
          <input
            type="number"
            name="debt_to_income_ratio"
            value={formData.debt_to_income_ratio}
            onChange={handleChange}
            className="w-full border p-2"
            placeholder="e.g., 36 for 36%"
            step="0.1"
            required  
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Predict
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
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
