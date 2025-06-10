import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [lastResult, setLastResult] = useState(null); // Store last prediction
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
  }, []);

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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Welcome to Your Dashboard</h2>

      {lastResult ? (
        <div className="border p-4 mb-4 bg-gray-100">
          <p><strong>Last Prediction:</strong></p>
          <p>Status: <span className="font-semibold">{lastResult.decision}</span></p>
          <p>Risk Score: <span className="font-semibold">{lastResult.risk_score}</span></p>
        </div>
      ) : (
        <p className="mb-4">You haven't made a prediction yet.</p>
      )}

      <div className="flex justify-between">
        <button
          onClick={handleNewPrediction}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Make New Prediction
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
