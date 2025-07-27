import React, { useEffect, useState } from "react";
import API from "./services/api";

function HabitsListByCategory({ userId }) {
  const [category, setCategory] = useState("Fitness");
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (!userId || !category) return;

    API.get(`/habits/user/${userId}/category/${encodeURIComponent(category)}`)
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, [userId, category]);

  return (
    <div className="p-4">
      <label htmlFor="category" className="block mb-2 font-semibold">Filter by Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="Fitness">Fitness</option>
        <option value="Mental Health">Mental Health</option>
        <option value="Productivity">Productivity</option>
        <option value="Work">Work</option>
        <option value="Learning">Learning</option>
      </select>

      <ul className="space-y-2">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <li key={habit.id} className="p-2 bg-gray-100 rounded shadow">
              <span className="font-bold">{habit.title}</span> — {habit.frequency}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No habits found in this category.</li>
        )}
      </ul>
    </div>
  );
}

export default HabitsListByCategory;
