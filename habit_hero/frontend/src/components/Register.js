import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 👈 Add this to include the styles

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || "Registration successful!");
      navigate('/login');
    } else {
      alert(data.detail || "Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <input
        className="register-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
