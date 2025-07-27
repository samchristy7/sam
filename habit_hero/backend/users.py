from sqlalchemy.orm import Session
from database import SessionLocal
import models

db: Session = SessionLocal()

users = db.query(models.User).all()
for user in users:
    print(user.id, user.username)