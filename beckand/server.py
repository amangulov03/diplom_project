from fastapi import FastAPI, HTTPException, UploadFile, File, Header, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Dict, Optional
import os
import shutil
import json
import uuid
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

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

# Настройка OAuth2 для авторизации
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Модель для генеалогии
class GenealogyMember(BaseModel):
    индивидуальный_номер: Optional[str] = ""
    кличка: Optional[str] = ""
    дата_рождения: Optional[str] = ""

class Genealogy(BaseModel):
    отец: Optional[GenealogyMember] = GenealogyMember()
    мать: Optional[GenealogyMember] = GenealogyMember()
    отец_отца: Optional[GenealogyMember] = GenealogyMember()
    мать_отца: Optional[GenealogyMember] = GenealogyMember()
    отец_матери: Optional[GenealogyMember] = GenealogyMember()
    мать_матери: Optional[GenealogyMember] = GenealogyMember()
    отец_отца_отца: Optional[GenealogyMember] = GenealogyMember()
    мать_отца_отца: Optional[GenealogyMember] = GenealogyMember()
    отец_матери_отца: Optional[GenealogyMember] = GenealogyMember()
    мать_матери_отца: Optional[GenealogyMember] = GenealogyMember()
    отец_отца_матери: Optional[GenealogyMember] = GenealogyMember()
    мать_отца_матери: Optional[GenealogyMember] = GenealogyMember()
    отец_матери_матери: Optional[GenealogyMember] = GenealogyMember()
    мать_матери_матери: Optional[GenealogyMember] = GenealogyMember()

    class Config:
        fields = {
            "отец_отца": "отец отца",
            "мать_отца": "мать отца",
            "отец_матери": "отец матери",
            "мать_матери": "мать матери",
            "отец_отца_отца": "отец отца отца",
            "мать_отца_отца": "мать отца отца",
            "отец_матери_отца": "отец матери отца",
            "мать_матери_отца": "мать матери отца",
            "отец_отца_матери": "отец отца матери",
            "мать_отца_матери": "мать отца матери",
            "отец_матери_матери": "отец матери матери",
            "мать_матери_матери": "мать матери матери",
        }

# Модель для линейной оценки Б
class LinearAssessmentB(BaseModel):
    датаОценки: Optional[str] = ""
    номерКоровы: Optional[str] = ""
    датаРождения: Optional[str] = ""
    датаОтела: Optional[str] = ""
    деньЛактации: Optional[str] = ""
    номерОтца: Optional[str] = ""
    рост: Optional[str] = ""
    глубинаТуловища: Optional[str] = ""
    ширинаГруди: Optional[str] = ""
    молочныйТип: Optional[str] = ""
    положениеТаза: Optional[str] = ""
    ширинаТаза: Optional[str] = ""
    постановкаЗаднихНогСбоку: Optional[str] = ""
    уголКопыт: Optional[str] = ""
    постановкаЗаднихНогСзади: Optional[str] = ""
    качествоКостяка: Optional[str] = ""
    прикреплениеПереднихДолей: Optional[str] = ""
    глубинаВымени: Optional[str] = ""
    высотаПрикрепленияЗаднихДолей: Optional[str] = ""
    центральнаяСвязка: Optional[str] = ""
    расположениеПереднихСосков: Optional[str] = ""
    расположениеЗаднихСосков: Optional[str] = ""
    длинаСосков: Optional[str] = ""
    длинаКрестца: Optional[str] = ""
    линияВерха: Optional[str] = ""
    обмускуленность: Optional[str] = ""
    упитанность: Optional[str] = ""
    скакательныйСустав: Optional[str] = ""
    легкостьДвижения: Optional[str] = ""
    ширинаЗаднихДолей: Optional[str] = ""
    балансВымени: Optional[str] = ""
    выраженностьВен: Optional[str] = ""
    длинаПереднихДолей: Optional[str] = ""
    толщинаСосков: Optional[str] = ""

# Модель для линейной оценки А
class LinearAssessmentA(BaseModel):
    молочныйТип: Optional[str] = ""
    объемТуловища: Optional[str] = ""
    конечности: Optional[str] = ""
    вымя: Optional[str] = ""
    итоговаяОценка: Optional[str] = ""
    экстерьерПоБонитировке: Optional[str] = ""
    мягкаяСпина: Optional[bool] = False
    горбатаяСпина: Optional[bool] = False
    слабаяПоясница: Optional[bool] = False
    крыловидныеЛопатки: Optional[bool] = False
    перехватЗаЛопатками: Optional[bool] = False
    неровнаяЛинияВерха: Optional[bool] = False
    высокаяПостановкаХвоста: Optional[bool] = False
    запавшийКореньХвоста: Optional[bool] = False
    крышевидныйКрестец: Optional[bool] = False
    шилозадость: Optional[bool] = False
    разметПереднихНог: Optional[bool] = False
    мягкиеБабки: Optional[bool] = False
    межкопытнаяЩель: Optional[bool] = False
    наклонноеДноВымени: Optional[bool] = False
    допСоски: Optional[bool] = False
    неправильнаяФормаСосков: Optional[bool] = False
    тонкиеСоски: Optional[bool] = False
    перекрестныеЗадниеСоски: Optional[bool] = False
    атрофияДолейВымени: Optional[bool] = False

# Модель для BreedingStock
class BreedingStock(BaseModel):
    индивидуальныйНомер: str  # Обязательное поле
    инвентарныйНомер: Optional[str] = ""
    идентификационныйНомер: Optional[str] = ""
    кличка: Optional[str] = ""
    датаРождения: Optional[str] = ""
    местоРождения: Optional[str] = ""
    порода: Optional[str] = ""
    линия: Optional[str] = ""
    породность: Optional[str] = ""
    семейство: Optional[str] = ""
    комуПринадлежит: Optional[str] = ""
    назначениеКоровы: Optional[str] = ""
    мастьИПриметы: Optional[str] = ""
    группаКрови: Optional[str] = ""
    происхождение: Optional[str] = ""
    фото: Optional[str] = ""
    генеалогия: Optional[Genealogy] = Genealogy()
    живаяМассаПриРождении: Optional[str] = ""
    живаяМассаВ6Месяцев: Optional[str] = ""
    живаяМассаВ10Месяцев: Optional[str] = ""
    живаяМассаВ12Месяцев: Optional[str] = ""
    живаяМассаВ18Месяцев: Optional[str] = ""
    живаяМассаПриПервомОсоменении: Optional[str] = ""
    возрастПервогоОсеменения: Optional[str] = ""
    датаОсеменения: Optional[str] = ""
    номерОсеменения: Optional[str] = ""
    индивидуальныйНомерБыка: Optional[str] = ""
    кличкаБыка: Optional[str] = ""
    методСлучки: Optional[str] = ""
    датаИсследованияНаСтельность: Optional[str] = ""
    результатИсследованияНаСтельность: Optional[str] = ""
    датаОтела: Optional[str] = ""
    результатОтела: Optional[str] = ""
    легкостьОтела: Optional[str] = ""
    индивидуальныеНомераПриплода: Optional[str] = ""
    датаЗапуска: Optional[str] = ""
    продолжительностьСервисПериода: Optional[str] = ""
    продолжительностьСухостойногоПериода: Optional[str] = ""
    датаКонтрольногоДоения: Optional[str] = ""
    удой: Optional[str] = ""
    жир: Optional[str] = ""
    белок: Optional[str] = ""
    времяДоения: Optional[str] = ""
    скоростьМолокоотдачи: Optional[str] = ""
    баллСкоростиМолокоотдачи: Optional[str] = ""
    удойЗаЛактацию: Optional[str] = ""
    удойЗа305Дней: Optional[str] = ""
    жирЗаЛактацию: Optional[str] = ""
    жирЗа305Дней: Optional[str] = ""
    белокЗаЛактацию: Optional[str] = ""
    белокЗа305Дней: Optional[str] = ""
    датаПовторногоЗапуска: Optional[str] = ""
    количествоДойныхДней: Optional[str] = ""
    перемещениеОткуда: Optional[str] = ""
    перемещениеКуда: Optional[str] = ""
    перемещениеДата: Optional[str] = ""
    перемещениеВозраст: Optional[str] = ""
    перемещениеЖиваяМасса: Optional[str] = ""
    перемещениеЦельПеремещения: Optional[str] = ""
    датаВыбытия: Optional[str] = ""
    причинаВыбытия: Optional[str] = ""
    линейнаяОценкаБ: Optional[LinearAssessmentB] = LinearAssessmentB()
    линейнаяОценкаА: Optional[LinearAssessmentA] = LinearAssessmentA()

# Модель для BullsOwn
class BullsOwn(BaseModel):
    индивидуальныйНомер: str  # Обязательное поле
    инвентарныйНомер: Optional[str] = ""
    идентификационныйНомер: Optional[str] = ""
    кличка: Optional[str] = ""
    датаРождения: Optional[str] = ""
    местоРождения: Optional[str] = ""
    порода: Optional[str] = ""
    линия: Optional[str] = ""
    породность: Optional[str] = ""
    семейство: Optional[str] = ""
    комуПринадлежит: Optional[str] = ""
    мастьИПриметы: Optional[str] = ""
    группаКрови: Optional[str] = ""
    происхождение: Optional[str] = ""
    фото: Optional[str] = ""
    генеалогия: Optional[Genealogy] = Genealogy()
    живаяМассаПриРождении: Optional[str] = ""
    живаяМассаВ6Месяцев: Optional[str] = ""
    живаяМассаВ10Месяцев: Optional[str] = ""
    живаяМассаВ12Месяцев: Optional[str] = ""
    живаяМассаВ18Месяцев: Optional[str] = ""
    перемещениеОткуда: Optional[str] = ""
    перемещениеКуда: Optional[str] = ""
    перемещениеДата: Optional[str] = ""
    перемещениеВозраст: Optional[str] = ""
    перемещениеЖиваяМасса: Optional[str] = ""
    перемещениеЦельПеремещения: Optional[str] = ""
    датаВыбытия: Optional[str] = ""
    причинаВыбытия: Optional[str] = ""

class BullsForeing(BaseModel):
    индивидуальныйНомер: str
    идентификационныйНомер: Optional[str] = ""
    инвентарныйНомер: Optional[str] = ""
    кодСемени: Optional[str] = ""
    оригинальнаяКличка: Optional[str] = ""
    карточнаяКличка: Optional[str] = ""
    кличка: Optional[str] = ""
    датаРождения: Optional[str] = ""
    компания_поставщикСемени: Optional[str] = ""
    порода: Optional[str] = ""
    линия: Optional[str] = ""
    фото: Optional[str] = ""
    генеалогия: Optional[Genealogy] = Genealogy()

UPLOAD_DIR = "uploads"
PUBLIC_DIR = "public"
USERS_FILE = os.path.join(PUBLIC_DIR, "users.json")

# Загрузка пользователей из файла
def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"admin": {"password": "123", "email": "admin@example.com"}}

# Сохранение пользователей в файл
def save_users(users_data):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users_data, f, ensure_ascii=False, indent=4)

# Инициализация пользователей
users = load_users()

# Создаём директории, если их нет
try:
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    if not os.path.exists(PUBLIC_DIR):
        os.makedirs(PUBLIC_DIR)
except Exception as e:
    print(f"Ошибка при создании директорий: {e}")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/public", StaticFiles(directory="public"), name="public")

# Функция для получения пути к файлу базы данных пользователя
def get_breeding_stock_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BreedingStock-{login}.json")

def get_bulls_own_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BullsOwn-{login}.json")

def get_bulls_foreing_db_file(login: str) -> str:
    return os.path.join(PUBLIC_DIR, f"DB-BullsForeing-{login}.json")

# Загрузка данных из файла пользователя
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

# Сохранение данных в файл пользователя
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

def print_users():
    if not users:
        print("Нет зарегистрированных пользователей.")
        return
    print("\nСписок зарегистрированных пользователей:")
    for login, info in users.items():
        print(f"Логин: {login}, Пароль: {info['password']}, Email: {info['email']}")

print_users()

@app.post("/api/login")
async def login(data: Dict[str, str]):
    login = data.get("login")
    password = data.get("password")
    if login in users and users[login]["password"] == password:
        return {"token": f"fake-jwt-{login}"}
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")

@app.post("/api/register")
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

@app.post("/api/upload-image")
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

@app.get("/uploads/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Изображение не найдено")
    return FileResponse(file_path, headers={"Access-Control-Allow-Origin": "*"})

@app.delete("/api/delete-image/{filename}")
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

# BreedingStock Endpoints
@app.post("/api/save-breeding-stock")
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

@app.post("/api/update-breeding-stock")
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

@app.get("/api/get-breeding-stock")
async def get_breeding_stock(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_breeding_stock(login)
    return data

@app.delete("/api/delete-breeding-stock/{individual_number}")
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

# BullsOwn Endpoints
@app.post("/api/save-bulls-own")
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

@app.post("/api/update-bulls-own")
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

@app.get("/api/get-bulls-own")
async def get_bulls_own(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_own(login)
    return data

@app.delete("/api/delete-bulls-own/{individual_number}")
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

# BullsForeing Endpoints
@app.post("/api/save-bulls-foreing")
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

@app.post("/api/update-bulls-foreing")
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

@app.get("/api/get-bulls-foreing")
async def get_bulls_foreing(token: str = Depends(oauth2_scheme)):
    login = token.replace("fake-jwt-", "") if token.startswith("fake-jwt-") else None
    if not login or login not in users:
        raise HTTPException(status_code=401, detail="Недействительный токен")

    data = load_data_bulls_foreing(login)
    return data

@app.delete("/api/delete-bulls-foreing/{individual_number}")
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
