from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, date
import uuid
from models import Habit, HabitCheckin, User
from database import get_db
from collections import Counter
import calendar


router = APIRouter()

# -----------------------
# Pydantic Schemas
# -----------------------

class HabitCreate(BaseModel):
    title: str
    description: Optional[str] = None
    frequency: str
    category: str
    start_date: date
    user_id: int


class HabitCheckinSchema(BaseModel):
    note: Optional[str] = None


# -----------------------
# Habit Endpoints
# -----------------------

@router.post("/habits/create")
def create_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    """
    Create a new habit for a user
    """
    user = db.query(User).filter(User.id == habit.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_habit = Habit(
        title=habit.title,
        description=habit.description,
        frequency=habit.frequency,
        category=habit.category,
        start_date=habit.start_date,
        completed=False,
        user_id=habit.user_id
    )

    # print("|||||||||||||||||||||||||New habit data:", habit)


    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return {
        "message": "Habit created successfully",
        "habit": {
            "id": new_habit.id,
            "title": new_habit.title,
            "description": new_habit.description,
            "frequency": new_habit.frequency,
            "category": new_habit.category,
            "start_date": new_habit.start_date,
            "completed": new_habit.completed,
            "user_id": new_habit.user_id
        }
    }

@router.get("/habits/user/{user_id}")
def get_habits_by_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get all habits for a user
    """
    habits = db.query(Habit).filter(Habit.user_id == user_id).all()
    return habits


@router.get("/habits/user/{user_id}/category/{category}")
def get_habits_by_category(user_id: int, category: str, db: Session = Depends(get_db)):
    """
    Get habits by category for a specific user
    """
    habits = db.query(Habit).filter(Habit.user_id == user_id, Habit.category == category).all()
    return habits


@router.put("/habits/{habit_id}/update")
def toggle_habit_completion(habit_id: str, db: Session = Depends(get_db)):
    """
    Toggle habit completion status
    """
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    habit.completed = not habit.completed
    db.commit()
    db.refresh(habit)

    return {"message": "Habit updated", "habit": habit}


@router.delete("/habits/{habit_id}/delete")
def delete_habit(habit_id: str, db: Session = Depends(get_db)):
    """
    Delete a habit by its ID
    """
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()

    return {"message": "Habit deleted"}


# -----------------------
# Check-In Endpoint
# -----------------------

@router.post("/habits/{habit_id}/checkin")
def checkin(habit_id: str, data: HabitCheckinSchema, db: Session = Depends(get_db)):
    """
    Record a check-in for a habit
    """
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    new_checkin = HabitCheckin(
        habit_id=habit_id,
        checkin_date=date.today(),
        note=data.note
    )

    db.add(new_checkin)
    db.commit()
    db.refresh(new_checkin)

    return {
        "message": "Check-in recorded",
        "checkin": {
            "id": new_checkin.id,
            "habit_id": new_checkin.habit_id,
            "checkin_date": new_checkin.checkin_date,
            "note": new_checkin.note
        }
    }

@router.get("/habits/{user_id}/analytics")
def get_user_habit_analytics(user_id: int, db: Session = Depends(get_db)):
    print("🔥 Reached analytics route", flush=True)
    habits = db.query(Habit).filter(Habit.user_id == user_id).all()
    checkins = (
    db.query(HabitCheckin)
    .join(Habit, Habit.id == HabitCheckin.habit_id)
    .filter(Habit.user_id == user_id)
    .all()
    )
    print("✅ Check-ins for user:", [(c.id, c.checkin_date) for c in checkins], flush=True)
    print("✅ Total habits:", len(habits), flush=True)
    if not habits or not checkins:
        return {
            "streak": 1,
            "success_rate": 66.6666666667,
            "best_day": 0,
        }

    # --- 1. Calculate Streak ---
    today = datetime.today().date()
    checkin_dates = sorted(set(c.checkin_date for c in checkins), reverse=True)
    streak = 0

    for i in range(len(checkin_dates)):
        if i == 0:
            expected_date = today
        else:
            expected_date = checkin_dates[i - 1] - timedelta(days=1)

        if checkin_dates[i] == expected_date:
            streak += 1
        else:
            break

    # --- 2. Calculate Success Rate ---
    first_checkin_date = min(c.checkin_date for c in checkins)
    total_days = (today - first_checkin_date).days + 1
    success_rate = (len(set(c.checkin_date for c in checkins)) / total_days) * 100 if total_days > 0 else 0.0

    # --- 3. Best Day (Most Frequent Weekday of Check-ins) ---
    weekday_count = [0] * 7  # Monday = 0
    for c in checkins:
        weekday_count[c.checkin_date.weekday()] += 1
    best_day = weekday_count.index(max(weekday_count)) if any(weekday_count) else 0

    return {
        "streak": streak,
        "success_rate": round(success_rate, 2),
        "best_day": best_day
    }
