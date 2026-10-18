"""Create persistent jobs with constraints and status index.

Revision ID: 0001
Revises:
"""
from alembic import op
import sqlalchemy as sa
revision = "0001"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        "jobs",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("prompt", sa.Text(), nullable=False),
        sa.Column("status", sa.String(20), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.CheckConstraint("length(trim(prompt)) > 0", name="ck_jobs_prompt"),
    )
    op.create_index("ix_jobs_status", "jobs", ["status"])

def downgrade():
    op.drop_index("ix_jobs_status", "jobs")
    op.drop_table("jobs")
