from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from models.bulls import BullsOwn, BullsForeing
from utils.db import load_data_bulls_own, save_data_bulls_own, load_data_bulls_foreing, save_data_bulls_foreing, load_users

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
users = load_users()

@router.post("/save-bulls-own")
async def save_bulls_own(bulls_own: BullsOwn, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_own(login)

    new_individual_number = bulls_own.индивидуальныйНомер
    for item in data:
        if item.get("индивидуальныйНомер") == new_individual_number:
            raise HTTPException(
                status_code=400,
                detail=f"Запись с индивидуальным номером {new_individual_number} уже существует"
            )

    data.append(bulls_own.dict())
    save_data_bulls_own(login, data)
    return {"message": "Данные о быке успешно сохранены"}

@router.put("/update-bulls-own")
async def update_bulls_own(bulls_own: BullsOwn, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401)

    data = load_data_bulls_own(login)

    updated_data = bulls_own.dict()
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

    save_data_bulls_own(login, data)
    return {"message": "Данные о быке успешно обновлены"}

@router.get("/get-bulls-own")
async def get_bulls_own(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_own(login)
    return data

@router.delete("/delete-bulls-own/{individual_number}")
async def delete_bulls_own(individual_number: str, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_own(login)
    initial_length = len(data)
    data = [item for item in data if item.get("индивидуальныйНомер") != individual_number]

    if len(data) == initial_length:
        raise HTTPException(status_code=404, detail="Запись не найдена")

    save_data_bulls_own(login, data)
    return {"message": "Запись о быке удалена успешно"}

@router.post("/save-bulls-foreing")
async def save_bulls_foreing(bulls_foreing: BullsForeing, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_foreing(login)

    new_individual_number = bulls_foreing.индивидуальныйНомер
    for item in data:
        if item.get("индивидуальныйНомер") == new_individual_number:
            raise HTTPException(
                status_code=400,
                detail=f"Запись с индивидуальным номером {new_individual_number} уже существует"
            )

    data.append(bulls_foreing.dict())
    save_data_bulls_foreing(login, data)
    return {"message": "Данные о быке успешно сохранены"}

@router.put("/update-bulls-foreing")
async def update_bulls_foreing(bulls_foreing: BullsForeing, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401)

    data = load_data_bulls_foreing(login)

    updated_data = bulls_foreing.dict()
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

    save_data_bulls_foreing(login, data)
    return {"message": "Данные о быке успешно обновлены"}

@router.get("/get-bulls-foreing")
async def get_bulls_foreing(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_foreing(login)
    return data

@router.delete("/delete-bulls-foreing/{individual_number}")
async def delete_bulls_foreing(individual_number: str, token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_foreing(login)
    initial_length = len(data)
    data = [item for item in data if item.get("индивидуальныйНомер") != individual_number]

    if len(data) == initial_length:
        raise HTTPException(status_code=404, detail="Запись не найдена")

    save_data_bulls_foreing(login, data)
    return {"message": "Запись о быке удалена успешно"}
