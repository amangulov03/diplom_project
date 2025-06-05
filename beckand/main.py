from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from routes.auth import router as auth_router
from routes.image import router as image_router
from routes.breeding_stock import router as breeding_stock_router
from routes.bulls import router as bulls_router

app = FastAPI(
    title="Племенной учет API",
    description="API для учета животных",
    version="1.0.0"
)

# Настройка CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создание директорий
UPLOAD_DIR = "uploads"
PUBLIC_DIR = "public"

try:
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    if not os.path.exists(PUBLIC_DIR):
        os.makedirs(PUBLIC_DIR)
except Exception as e:
    print(f"Ошибка при создании директорий: {e}")

# Монтирование статических директорий
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/public", StaticFiles(directory="public"), name="public")

# Подключение маршрутов
app.include_router(auth_router, prefix="/api")
app.include_router(image_router, prefix="/api")
app.include_router(breeding_stock_router, prefix="/api")
app.include_router(bulls_router, prefix="/api")
