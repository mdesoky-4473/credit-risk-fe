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
      await axios.post("http://localhost:3000/api/auth/register", {
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
    <div className = "dashboard-wrapper">
      
        <h2 className="page-title">Register</h2>
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
            Register
          </button>
        </form>
        {message && <p className="mt-2">{message}</p>}
    </div>
   
  );
}
