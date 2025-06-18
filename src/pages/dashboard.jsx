import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


function Dashboard() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [lastResult, setLastResult] = useState(null); 
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsAuthorized(false);
  }

  const savedResult = localStorage.getItem("lastPrediction");
  if (savedResult) {
    setLastResult(JSON.parse(savedResult));
  }

  const rawHistory = localStorage.getItem("predictionHistory");
  if (rawHistory) {
    setHistory(JSON.parse(rawHistory));
  }
  }, []);

  const aggregateData = () => {
    const result = {};

    history.forEach(entry => {
      const purpose = entry.loan_purpose || "unknown";
      const decision = entry.decision;

      if (!result[purpose]) {
      result[purpose] = { loan_purpose: purpose, approve: 0, deny: 0 };
      }
      result[purpose][decision] += 1;
    });

    return Object.values(result);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastPrediction");
    navigate("/");
  };

  const handleNewPrediction = () => {
    navigate("/prediction");
  };

  if (!isAuthorized) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Unauthorized</h2>
        <p>Please log in or register to access this page.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">

        <h2 className="page-title">Welcome to Your Dashboard</h2>

        {lastResult ? (
          <div className="border p-4 mb-4 bg-gray-100">
            <h3><strong>Last Prediction:</strong></h3>
            <p>Purpose: <span className="font-semibold">{lastResult.loan_purpose}</span></p>
            <p>Status: <span className="font-semibold">{lastResult.decision.toUpperCase()}</span></p>
            <p>Risk Score: <span className="font-semibold">{Number(lastResult.risk_score).toPrecision(2)}</span></p>
          </div>
        ) : (
          <p className="mb-4">You haven't made a prediction yet.</p>
        )}

          {history.length > 1 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Recent Predictions</h3>
              <ul className="text-sm space-y-1">
                {history.slice(1, 6).map((entry, index) => (
                  <li key={index}>
                    {entry.loan_purpose} | {entry.decision.toUpperCase()} | Score: {Number(entry.risk_score).toPrecision(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {history.length > 1 && (
          <div className="mt-8">
            <h3 className="font-bold mb-2">Predictions by Loan Purpose</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aggregateData()}>
                <XAxis dataKey="loan_purpose" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approve" stackId="a" fill="#4ade80" />
                <Bar dataKey="deny" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleNewPrediction}
            className="button-primary"
          >
            Make New Prediction
          </button>
          <button
            onClick={handleLogout}
            className="button-primary button-danger"
          >
            Logout
          </button>
        </div>
  </div>
  );
}

export default Dashboard;
