import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/LoginPage';
import Registration from './pages/RegistrationPage'; 
import Dashboard from './pages/Dashboard';
import PredictionPage from './pages/PredictionPage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="dashboard-wrapper">
        <nav className="navbar">
          <Link to="/" className="hover:underline">Login </Link>
          <Link to="/register" className="hover:underline">Register </Link>
          <Link to="/dashboard" className="hover:underline">Dashboard </Link>
          <Link to="/prediction" className="hover:underline">Predict </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
