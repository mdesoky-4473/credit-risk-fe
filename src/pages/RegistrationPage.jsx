import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("https://credit-risk-be.onrender.com/api/auth/register", {
        username: email,
        password,
      });

      setMessage("Registration successful! You can now log in.");
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="card">
      <h2 className="page-title">Register</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div></div>
        <button type="submit" className="button-primary">Register</button>
      </form>

      {message && <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>}
    </div>
  );
}
