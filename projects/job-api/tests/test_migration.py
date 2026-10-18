"""Verify Alembic can create the schema in a fresh database."""
import os
import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from sqlalchemy import create_engine, inspect

def test_fresh_database_migration():
    with TemporaryDirectory() as directory:
        database = Path(directory) / "migration.db"
        url = "sqlite:///" + database.as_posix()
        environment = os.environ.copy()
        environment["DATABASE_URL"] = url
        result = subprocess.run(
            [sys.executable, "-m", "alembic", "upgrade", "head"],
            cwd=Path(__file__).resolve().parents[1],
            env=environment,
            capture_output=True, text=True, timeout=40,
        )
        assert result.returncode == 0, result.stdout + "\n" + result.stderr
        inspector = inspect(create_engine(url))
        assert "jobs" in inspector.get_table_names()
        assert "alembic_version" in inspector.get_table_names()
