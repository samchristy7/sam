import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Add this line to import styles

function Login({ setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log("Response:", response.status);
      console.log("Data:", data);

      if (response.ok) {
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        alert(data.detail || "Login failed!");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Login request failed! Check the console.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        className="login-input"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
