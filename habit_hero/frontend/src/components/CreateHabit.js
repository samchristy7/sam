import React, { useState } from 'react';
import API from "../services/api";

function CreateHabit({ userId, onHabitCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [category, setCategory] = useState("health");
  const [startDate, setStartDate] = useState("");

  const handleCreateHabit = async () => {
    if (!title || !category || !frequency || !userId) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const response = await API.post("/habits/create", {
        title,
        description,
        frequency,
        category,
        start_date: startDate || new Date().toISOString().split('T')[0],
        user_id: userId
      });

      alert(response.data.message || "✅ Habit created successfully!");
      setTitle("");
      setDescription("");
      setFrequency("daily");
      setCategory("health");
      setStartDate("");
      if (onHabitCreated) onHabitCreated();
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        alert(err.response.data.detail || "❌ Failed to create habit.");
      } else {
        alert("🚫 Failed to connect to backend. Make sure it's running.");
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Habit</h2>

      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Habit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="health">Health</option>
          <option value="work">Work</option>
          <option value="learning">Learning</option>
          <option value="fitness">Fitness</option>
          <option value="mental health">Mental Health</option>
          <option value="productivity">Productivity</option>
        </select>

        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          onClick={handleCreateHabit}
        >
          Create Habit
        </button>
      </div>
    </div>
  );
}

export default CreateHabit;
