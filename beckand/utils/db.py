import json
import os

PUBLIC_DIR = "public"
USERS_FILE = os.path.join(PUBLIC_DIR, "users.json")

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"admin": {"password": "123", "email": "admin@example.com"}}

def save_users(users_data):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users_data, f, ensure_ascii=False, indent=4)

def get_breeding_stock_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BreedingStock-{login}.json")

def get_bulls_own_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BullsOwn-{login}.json")

def get_bulls_foreing_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BullsForeing-{login}.json")

def load_data_breeding_stock(login: str):
    user_db_file = get_breeding_stock_db_file(login)
    if os.path.exists(user_db_file):
        with open(user_db_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def load_data_bulls_own(login: str):
    user_db_file = get_bulls_own_db_file(login)
    if os.path.exists(user_db_file):
        with open(user_db_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def load_data_bulls_foreing(login: str):
    user_db_file = get_bulls_foreing_db_file(login)
    if os.path.exists(user_db_file):
        with open(user_db_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_data_breeding_stock(login: str, data):
    user_db_file = get_breeding_stock_db_file(login)
    with open(user_db_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def save_data_bulls_own(login: str, data):
    user_db_file = get_bulls_own_db_file(login)
    with open(user_db_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def save_data_bulls_foreing(login: str, data):
    user_db_file = get_bulls_foreing_db_file(login)
    with open(user_db_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
