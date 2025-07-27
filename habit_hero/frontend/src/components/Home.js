import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // 👈 Make sure this CSS file exists

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Habit Hero</h1>
      <p className="home-description">
        Take control of your life, one habit at a time. Track your goals, build routines, and stay motivated with Habit Hero.
      </p>
      <div className="home-buttons">
        <button className="home-button register" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="home-button login" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
