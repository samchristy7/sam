import React, { useEffect, useState } from "react";
import axios from "axios"; // If using custom API.js, replace this line with: import API from "../services/api";

const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function HabitAnalytics({ userId }) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAnalytics = async () => {
      try {
        console.log("Fetching analytics for user ID:", userId);

        const response = await axios.get(`http://localhost:8000/api/habits/${userId}/analytics`);
        // If using API.js:
        // const response = await API.get(`/habits/${userId}/analytics`);

        console.log("Analytics data:", response.data);
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics: ", err);
      }
    };

    fetchAnalytics();
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Habit Analytics</h2>
      {analytics ? (
        <ul className="list-disc list-inside">
          <li>🔥 Streak: {analytics.streak} days</li>
          <li>✅ Success Rate: {analytics.success_rate}%</li>
          <li>📅 Best Day: {weekdayNames[analytics.best_day]}</li>
        </ul>
      ) : (
        <p>Loading analytics...</p>
      )}
      <p className="mt-2 text-sm text-gray-500">Debug: {JSON.stringify(analytics)}</p>
    </div>
  );
}

export default HabitAnalytics;
