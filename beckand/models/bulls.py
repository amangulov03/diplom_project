from pydantic import BaseModel
from typing import Optional
from models.genelogy import Genealogy

class BullsOwn(BaseModel):
    индивидуальныйНомер: str
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
    баллОбщий: Optional[str] = ""
    класс: Optional[str] = ""
    кому_и_кудаПродано: Optional[str] = ""
    датаПродажи: Optional[str] = ""
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
    баллОбщий: Optional[str] = ""
    класс: Optional[str] = ""
    кому_и_кудаПродано: Optional[str] = ""
    датаПродажи: Optional[str] = ""
    фото: Optional[str] = ""
    генеалогия: Optional[Genealogy] = Genealogy()
