"""
Porulagam MySQL Database Connection Test Script
Verifies connection to MySQL server and porulagam_db.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import pymysql

# Load .env if present
env_path = Path(__file__).parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "sathish")
DB_NAME = os.getenv("DB_NAME", "porulagam_db")

def test_connection():
    # Force UTF-8 stdout if needed
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

    print("=" * 60)
    print("Porulagam Backend - MySQL Connection Verification")
    print("=" * 60)
    print(f"Target Host:     {DB_HOST}:{DB_PORT}")
    print(f"Database User:   {DB_USER}")
    print(f"Target Database: {DB_NAME}")
    print("-" * 60)

    # 1. Test Server Level Connection
    print("[1/3] Testing MySQL Server connectivity...")
    try:
        server_conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            charset="utf8mb4"
        )
        with server_conn.cursor() as cursor:
            cursor.execute("SELECT VERSION();")
            version = cursor.fetchone()[0]
            print(f"      SUCCESS: Connected to MySQL Server v{version}")
        server_conn.close()
    except Exception as e:
        print(f"      FAILED: Could not connect to MySQL server: {e}")
        return False

    # 2. Test Specific Database Connection
    print(f"[2/3] Testing connection to database '{DB_NAME}'...")
    try:
        db_conn = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        print(f"      SUCCESS: Database '{DB_NAME}' accessed successfully.")
    except Exception as e:
        print(f"      FAILED: Database '{DB_NAME}' could not be accessed: {e}")
        print("      Hint: Run `python setup_database.py` to create and seed it.")
        return False

    # 3. Check Tables and Records
    print(f"[3/3] Inspecting tables and record counts...")
    try:
        with db_conn.cursor() as cursor:
            cursor.execute("SHOW TABLES;")
            tables = [list(row.values())[0] for row in cursor.fetchall()]
            print(f"      Found {len(tables)} tables: {', '.join(tables)}")

            counts = {}
            for t in tables:
                cursor.execute(f"SELECT COUNT(*) AS c FROM `{t}`;")
                counts[t] = cursor.fetchone()['c']

            for table_name, count in counts.items():
                print(f"       - {table_name:<16}: {count} rows")

        db_conn.close()
        print("-" * 60)
        print("ALL CHECKS PASSED! MySQL Backend is properly connected & ready.")
        print("=" * 60)
        return True
    except Exception as e:
        print(f"      FAILED inspecting tables: {e}")
        return False

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)
