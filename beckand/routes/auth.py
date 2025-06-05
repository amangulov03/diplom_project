from fastapi import APIRouter, HTTPException
from typing import Dict
from utils.db import load_users, save_users, get_breeding_stock_db_file, get_bulls_own_db_file, get_bulls_foreing_db_file
import json
import os

router = APIRouter()

users = load_users()

def print_users():
    if not users:
        print("Нет зарегистрированных пользователей.")
        return
    print("\nСписок зарегистрированных пользователей:")
    for login, info in users.items():
        print(f"Логин: {login}, Пароль: {info['password']}, Email: {info['email']}")

@router.post("/login")
async def login(data: Dict[str, str]):
    login = data.get("login")
    password = data.get("password")
    if login in users and users[login]["password"] == password:
        return {"token": f"fake-jwt-{login}"}
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")

@router.post("/register")
async def register(data: Dict[str, str]):
    login = data.get("login")
    password = data.get("password")
    email = data.get("email")
    if not login or not password or not email:
        raise HTTPException(status_code=400, detail="Все поля обязательны")
    if login in users:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    users[login] = {"password": password, "email": email}
    save_users(users)

    # Создаём файлы баз данных для нового пользователя
    breeding_stock_db_file = get_breeding_stock_db_file(login)
    bulls_own_db_file = get_bulls_own_db_file(login)
    bulls_foreing_db_file = get_bulls_foreing_db_file(login)
    if not os.path.exists(breeding_stock_db_file):
        with open(breeding_stock_db_file, "w", encoding="utf-8") as f:
            json.dump([], f)
    if not os.path.exists(bulls_own_db_file):
        with open(bulls_own_db_file, "w", encoding="utf-8") as f:
            json.dump([], f)
    if not os.path.exists(bulls_foreing_db_file):
        with open(bulls_foreing_db_file, "w", encoding="utf-8") as f:
            json.dump([], f)

    print(f"Зарегистрирован новый пользователь: {login}, Email: {email}")
    print_users()
    return {"message": "Пользователь зарегистрирован"}
