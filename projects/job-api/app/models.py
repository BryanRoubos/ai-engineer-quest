"""Persistent job table. Alembic applies this model to the database."""
from datetime import datetime
from sqlalchemy import DateTime, CheckConstraint, Index, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base

class Job(Base):
    __tablename__ = "jobs"
    __table_args__ = (CheckConstraint("length(trim(prompt)) > 0", name="ck_jobs_prompt"), Index("ix_jobs_status", "status"))
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="queued")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
