import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";           // ✅ Add Home component
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateHabit from "./components/CreateHabit";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Home is default route */}
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={userId ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={userId ? <CreateHabit userId={userId} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
