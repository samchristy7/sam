import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CreateHabit from "./CreateHabit";
import HabitAnalytics from "./HabitAnalytics";
import "./Dashboard.css";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchHabits = useCallback(async () => {
    if (!userId) {
      console.warn("No userId found in localStorage");
      setHabits([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/habits/user/${userId}`
      );
      const data = await response.json();
      console.log("Fetched habits data:", data);
      setHabits(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load habits", error);
      setHabits([]);
    }
  }, [userId]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) setUsername(savedUsername);
    fetchHabits();
  }, [fetchHabits]);

  const toggleComplete = async (habitId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/habits/${habitId}/update`, {
        method: "PUT",
      });
      fetchHabits();
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/habits/${habitId}/delete`, {
        method: "DELETE",
      });
      fetchHabits();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>
          Welcome, <span className="username">{username || "User"}</span>!
        </h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="create-section">
        <CreateHabit userId={userId} onHabitCreated={fetchHabits} />
      </div>

      <h3 className="habit-heading">Your Habits:</h3>

      {habits.length === 0 ? (
        <p className="no-habits">No habits created yet.</p>
      ) : (
        <ul className="habit-list">
          {habits.map((habit) => (
            <li key={habit.id} className="habit-card">
              <h4 className="habit-title">{habit.title}</h4>
              <div className="habit-details">
                <p>📅 Frequency: {habit.frequency}</p>
                <p>🏷️ Category: {habit.category}</p>
                <p>🗓️ Start Date: {habit.start_date}</p>
                <p>
                  Status:{" "}
                  {habit.completed ? "✅ Completed" : "❌ Not completed"}
                </p>
              </div>
              <div className="habit-actions">
                <button
                  onClick={() => toggleComplete(habit.id)}
                  className="complete-button"
                >
                  {habit.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="analytics-section">
        <HabitAnalytics userId={userId} />
      </div>
    </div>
  );
}

export default Dashboard;
