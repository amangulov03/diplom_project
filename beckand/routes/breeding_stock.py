from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from models.breeding_stock import BreedingStock
from utils.db import load_data_breeding_stock, save_data_breeding_stock, load_users

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
users = load_users()

@router.post("/save-breeding-stock")
async def save_breeding_stock(breeding_stock: BreedingStock, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_breeding_stock(login)

    new_individual_number = breeding_stock.индивидуальныйНомер
    for item in data:
        if item.get("индивидуальныйНомер") == new_individual_number:
            raise HTTPException(
                status_code=400,
                detail=f"Запись с индивидуальным номером {new_individual_number} уже существует"
            )

    data.append(breeding_stock.dict())
    save_data_breeding_stock(login, data)
    return {"message": "Данные успешно сохранены"}

@router.put("/update-breeding-stock")
async def update_breeding_stock(breeding_stock: BreedingStock, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401)

    data = load_data_breeding_stock(login)

    updated_data = breeding_stock.dict()
    individual_number = updated_data.get("индивидуальныйНомер")

    found = False
    for i, item in enumerate(data):
        if item.get("индивидуальныйНомер") == individual_number:
            data[i] = updated_data
            found = True
            break

    if not found:
        raise HTTPException(
            status_code=404,
            detail=f"Запись с индивидуальным номером {individual_number} не найдена"
        )

    save_data_breeding_stock(login, data)
    return {"message": "Данные успешно обновлены"}

@router.get("/get-breeding-stock")
async def get_breeding_stock(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_breeding_stock(login)
    return data

@router.delete("/delete-breeding-stock/{individual_number}")
async def delete_breeding_stock(individual_number: str, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_breeding_stock(login)
    initial_length = len(data)
    data = [item for item in data if item.get("индивидуальныйНомер") != individual_number]

    if len(data) == initial_length:
        raise HTTPException(status_code=404, detail="Запись не найдена")

    save_data_breeding_stock(login, data)
    return {"message": "Запись удалена успешно"}
