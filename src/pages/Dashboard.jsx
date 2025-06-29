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

    history.forEach((entry) => {
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
      <div className="unauthorized-container">
        <h2 className="unauthorized-title">Unauthorized</h2>
        <p>Please log in or register to access this page.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
     <h2 className="page-title">Welcome to Your Dashboard</h2>
     
      <div className="dashboard-grid">
        
        <div className="dashboard-left">
          
          {lastResult ? (
            <div className="card">
              <h3><strong>Last Prediction:</strong></h3>
              <p>Purpose: <span className="value">{lastResult.loan_purpose}</span></p>
              <p>Status: <span className="value">{lastResult.decision.toUpperCase()}</span></p>
              <p>Risk Score: <span className="value">{Number(lastResult.risk_score).toPrecision(2)}</span></p>
            </div>
          ) : (
            <p className="info-text">You haven't made a prediction yet.</p>
          )}

          {history.length > 1 && (
            <div className="card">
              <h3 className="section-title">Recent Predictions</h3>
              <ul className="history-list">
                {history.slice(1, 6).map((entry, index) => (
                  <li key={index}>
                    {entry.loan_purpose} | {entry.decision.toUpperCase()} | Score: {Number(entry.risk_score).toPrecision(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        <div className="dashboard-right">
        
          {history.length > 1 && (
              <div className="card">
                <h3 className="section-title">Predictions by Loan Purpose</h3>
                 <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={380}>
                      <BarChart data={aggregateData()}>
                        <XAxis 
                          dataKey="loan_purpose" 
                          angle={-60} 
                          textAnchor="end" 
                          interval={0} 
                          height={150}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                        <Bar dataKey="approve" stackId="a" fill="#4ade80" />
                        <Bar dataKey="deny" stackId="a" fill="#f87171" />
                      </BarChart>
                    </ResponsiveContainer>
                </div>    
              </div>
            )}

            <div className="button-row">
              <button onClick={handleNewPrediction} className="button-primary">
                Make New Prediction
              </button>
              <button onClick={handleLogout} className="button-primary button-danger">
                Logout
              </button>
            </div>
        </div>    
      </div>
    </div>
    
  );
}

export default Dashboard;