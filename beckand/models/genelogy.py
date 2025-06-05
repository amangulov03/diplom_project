from pydantic import BaseModel
from typing import Optional

class FatherGenealogyMember(BaseModel):
    индивидуальный_номер: Optional[str] = ""
    кличка: Optional[str] = ""
    дата_рождения: Optional[str] = ""

class MotherGenealogyMember(BaseModel):
    индивидуальный_номер: Optional[str] = ""
    кличка: Optional[str] = ""
    удой: Optional[str] = ""
    дата_рождения: Optional[str] = ""

class Genealogy(BaseModel):
    отец: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_отца: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_отца: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_матери: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_матери: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_отца_отца: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_отца_отца: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_матери_отца: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_матери_отца: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_отца_матери: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_отца_матери: Optional[MotherGenealogyMember] = MotherGenealogyMember()
    отец_матери_матери: Optional[FatherGenealogyMember] = FatherGenealogyMember()
    мать_матери_матери: Optional[MotherGenealogyMember] = MotherGenealogyMember()

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
