from fastapi import APIRouter, HTTPException, UploadFile, File, Header
from fastapi.responses import FileResponse
import os
import shutil
import uuid
from utils.db import load_users

router = APIRouter()

UPLOAD_DIR = "uploads"
users = load_users()

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...), authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Допустимы только JPEG и PNG")

    file_extension = file.filename.split('.')[-1]
    filename = f"{login}-{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/uploads/{filename}"
    return {"imageUrl": image_url}

@router.get("/uploads/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Изображение не найдено")
    return FileResponse(file_path, headers={"Access-Control-Allow-Origin": "*"})

@router.delete("/delete-image/{filename}")
async def delete_image(filename: str, authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    if not filename.startswith(f"{login}-"):
        raise HTTPException(status_code=403, detail="Нет доступа к этому файлу")

    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": "Изображение удалено"}
    raise HTTPException(status_code=404, detail="Изображение не найдено")
