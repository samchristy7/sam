📘 Project Documentation
Habit Hero – Habit Tracking Web Application

🔹 Project Overview
Habit Hero is a full-stack web application that helps users build and track habits consistently. The system allows users to register/login, create personalized habits, mark their progress, and manage them daily. It features user authentication, habit creation, updating, and deletion, with a clean and intuitive frontend built using React.js and a FastAPI backend. Habit data is stored in a SQLite database using SQLAlchemy ORM.

🔧 Tech Stack

Layer	Technology

Frontend	React.js
Backend	Python (FastAPI)
Database	SQLite + SQLAlchemy
Auth	LocalStorage (Token-less)
Styling	Tailwind CSS
Deployment	Localhost (Dev)

👥 User Roles

User:

Register / Login

Create new habits with frequency, category, description

View list of created habits

Update (toggle) completion status

Delete habits

Logout

✨ Features Implemented

🔐 Authentication: Register/Login using username and password stored in SQLite.

📝 Habit Creation: Users can create habits with category, frequency, and start date.

✅ Toggle Completion: Users can mark a habit as complete/incomplete.

❌ Habit Deletion: Users can delete existing habits.

📃 Dashboard: Display all created habits for the user.

🚪 Logout: Users can safely logout and return to login page.

📁 Project Structure

habit-hero/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── routes/
│   │   └── habits.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── CreateHabit.js
│   │   ├── HabitAnalytics.js (placeholder)
│   │   └── services/api.js
├── habithero.db
└── README.md

🔗 Key API Endpoints

Endpoint	Method	Description

/register	POST	Register a new user
/login	POST	Login and retrieve user_id
/api/habits/create	POST	Create a new habit
/api/habits/user/{user_id}	GET	Get all habits for a user
/api/habits/{habit_id}/update	PUT	Toggle completion status
/api/habits/{habit_id}/delete	DELETE	Delete a habit

🚀 Deployment Steps

Backend:

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Frontend:

cd frontend
npm install
npm start

🛡 Security & Best Practices

Simple login with local storage

Input validation (basic)

CORS enabled for development

Auto-refresh habit list on actions

📌 Future Enhancements

Habit Analytics & Visualization

Streak tracking

Dashboard summary view

Email reminders

Password encryption
