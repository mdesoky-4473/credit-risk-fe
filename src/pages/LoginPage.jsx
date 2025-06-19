import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggedIn(false);

    try {
      const res = await axios.post("https://credit-risk-be.onrender.com/api/auth/login", {
        username: email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("predictionHistory");
      localStorage.removeItem("lastPrediction");
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Login</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <div></div>
        <button type="submit" className="button-primary">
          Login
        </button>
      </form>

      {isLoggedIn && <p className="success-msg">Login successful!</p>}
      {error && <p className="error-msg">{error}</p>}

    </div>
  );
}
