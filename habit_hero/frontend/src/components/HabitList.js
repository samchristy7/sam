import React, { useEffect, useState } from 'react';

function HabitList({ userId }) {
  const [habits, setHabits] = useState([]);

const fetchHabits = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/habits/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch habits');
    const data = await response.json();
    setHabits(data);
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};


  const toggleComplete = async (habitId) => {
    await fetch(`http://127.0.0.1:8000/habits/${habitId}/update`, {
      method: 'PUT',
    });
    fetchHabits();
  };

  const deleteHabit = async (habitId) => {
    await fetch(`http://127.0.0.1:8000/habits/${habitId}/delete`, {
      method: 'DELETE',
    });
    fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, [userId]);

  return (
    <div>
      <h3>Your Habits</h3>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            <b>{habit.title}</b> - {habit.description}
            <br />
            Status: {habit.completed ? '✅ Completed' : '❌ Not completed'}
            <br />
            <button onClick={() => toggleComplete(habit.id)}>
              {habit.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
