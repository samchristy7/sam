from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from datetime import date
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

    habits = relationship("Habit", back_populates="user", cascade="all, delete-orphan")


class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    frequency = Column(String(50), nullable=False)  # e.g., 'daily', 'weekly'
    category = Column(String(50), nullable=False)   # e.g., 'health', 'work'
    start_date = Column(Date, nullable=False)
    completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="habits")
    checkins = relationship("HabitCheckin", back_populates="habit", cascade="all, delete-orphan")


class HabitCheckin(Base):
    __tablename__ = "habit_checkins"

    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id", ondelete="CASCADE"), nullable=False)
    checkin_date = Column(Date, default=date.today, nullable=False)
    note = Column(String(500), nullable=True)

    habit = relationship("Habit", back_populates="checkins")
