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
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username: email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("predictionHistory");
      localStorage.removeItem("lastPrediction");
      setIsLoggedIn(true); //
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="dashboard-wrapper">
      
      <h2 className="page-title">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button-primary">
          Login
        </button>
      </form>

      {isLoggedIn && <p className="text-green-600 mt-2">Login successful!</p>}

      {error && <p className="text-red-600 mt-2">{error}</p>}
  </div>
  
  );
}
