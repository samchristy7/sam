from pydantic import BaseModel
from datetime import date
from typing import Optional

class HabitCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    frequency: str
    category: str
    start_date: date
    user_id: int
    completed: Optional[bool] = False


class HabitOut(BaseModel):
    id: int
    title: str
    description: str
    frequency: str
    category: str
    start_date: date
    user_id: int
    completed: bool

    class Config:
        orm_mode = True
