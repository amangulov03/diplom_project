import React, { useState, useCallback } from "react";
import InputNumber from "../components/InputNumber";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import AddFoto from "../components/AddFoto";
import Genealogy from "../components/Genealogy";
import RightMenu from "../components/RightMenu";

function BullsOwn() {
    const [formData, setFormData] = useState({
        индивидуальныйНомер: "",
        инвентарныйНомер: "",
        идентификационныйНомер: "",
        кличка: "",
        датаРождения: "",
        местоРождения: "",
        порода: "",
        линия: "",
        породность: "",
        семейство: "",
        комуПринадлежит: "",
        мастьИПриметы: "",
        группаКрови: "",
        баллОбщий: "",
        класс: "",
        кому_и_кудаПродано: "",
        датаПродажи: "",
        фото: null,
        генеалогия: {
            отец: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать: { индивидуальный_номер: "", кличка: "", удой: "", дата_рождения: "" },
            отец_отца: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать_отца: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
            отец_матери: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать_матери: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
            отец_отца_отца: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать_отца_отца: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
            отец_матери_отца: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать_матери_отца: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
            отец_отца_матери: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
            мать_отца_матери: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
            отец_матери_матери: {
                индивидуальный_номер: "",
                кличка: "",
                дата_рождения: "",
            },
            мать_матери_матери: {
                индивидуальный_номер: "",
                кличка: "",
                удой: "",
                дата_рождения: "",
            },
        },
        живаяМассаПриРождении: "",
        живаяМассаВ6Месяцев: "",
        живаяМассаВ10Месяцев: "",
        живаяМассаВ12Месяцев: "",
        живаяМассаВ18Месяцев: "",
        перемещениеОткуда: "",
        перемещениеКуда: "",
        перемещениеДата: "",
        перемещениеВозраст: "",
        перемещениеЖиваяМасса: "",
        перемещениеЦельПеремещения: "",
        датаВыбытия: "",
        причинаВыбытия: "",
    });

    // Заменим назначениеКоровы на назначениеБыка
    const mainFields = [
        { name: "индивидуальныйНомер", label: "Индивидуальный номер", type: "number" },
        { name: "инвентарныйНомер", label: "Инвентарный номер", type: "number" },
        {
            name: "идентификационныйНомер",
            label: "Идентификационный номер",
            type: "number",
        },
        { name: "кличка", label: "Кличка", type: "text" },
        { name: "датаРождения", label: "Дата рождения", type: "date" },
        { name: "местоРождения", label: "Место рождения", type: "text" },
        { name: "порода", label: "Порода", type: "text" },
        { name: "линия", label: "Линия", type: "text" },
        { name: "породность", label: "Породность", type: "text" },
        { name: "семейство", label: "Семейство", type: "text" },
        { name: "комуПринадлежит", label: "Кому принадлежит", type: "text" },
        { name: "мастьИПриметы", label: "Масть и приметы", type: "text" },
        { name: "группаКрови", label: "Группа крови", type: "number" },
        { name: "баллОбщий", label: "Балл общий", type: "number" },
        { name: "класс", label: "Класс", type: "text" },
        { name: "кому_и_кудаПродано", label: "Кому и куда продано", type: "text" },
        { name: "датаПродажи", label: "Дата продажи", type: "date" },
    ];

    const secondaryFields = [
        {
            name: "живаяМассаПриРождении",
            label: "Живая масса при рождении, кг",
            type: "number",
        },
        {
            name: "живаяМассаВ6Месяцев",
            label: "Живая масса в 6 месяцев, кг",
            type: "number",
        },
        {
            name: "живаяМассаВ10Месяцев",
            label: "Живая масса в 10 месяцев, кг",
            type: "number",
        },
        {
            name: "живаяМассаВ12Месяцев",
            label: "Живая масса в 12 месяцев, кг",
            type: "number",
        },
        {
            name: "живаяМассаВ18Месяцев",
            label: "Живая масса в 18 месяцев, кг",
            type: "number",
        },
        { name: "перемещениеОткуда", label: "Перемещение - откуда", type: "text" },
        { name: "перемещениеКуда", label: "Перемещение - куда", type: "text" },
        { name: "перемещениеДата", label: "Перемещение - дата", type: "date" },
        { name: "перемещениеВозраст", label: "Перемещение - возраст", type: "text" },
        {
            name: "перемещениеЖиваяМасса",
            label: "Перемещение - живая масса",
            type: "text",
        },
        {
            name: "перемещениеЦельПеремещения",
            label: "Перемещение - цель перемещения",
            type: "text",
        },
        { name: "датаВыбытия", label: "Дата выбытия", type: "date" },
        { name: "причинаВыбытия", label: "Причина выбытия", type: "text" },
    ];

    const handleInputChange = (field, value, nestedField = null) => {
        if (nestedField) {
            setFormData((prev) => ({
                ...prev,
                [nestedField]: {
                    ...prev[nestedField],
                    [field]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleImageUpload = (imageUrl) => {
        handleInputChange("фото", imageUrl);
    };

    const handleGenealogyChange = useCallback((genealogyData) => {
        setFormData((prev) => ({
            ...prev,
            генеалогия: genealogyData,
        }));
    }, []);

    const handleSearchResult = (searchResult) => {
        if (searchResult) {
            setFormData((prev) => ({
                ...prev,
                ...searchResult,
                генеалогия: searchResult.генеалогия || prev.генеалогия,
            }));
        } else {
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({
            индивидуальныйНомер: "",
            инвентарныйНомер: "",
            идентификационныйНомер: "",
            кличка: "",
            датаРождения: "",
            местоРождения: "",
            порода: "",
            линия: "",
            породность: "",
            семейство: "",
            комуПринадлежит: "",
            мастьИПриметы: "",
            группаКрови: "",
            баллОбщий: "",
            класс: "",
            кому_и_кудаПродано: "",
            датаПродажи: "",
            фото: null,
            генеалогия: {
                отец: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
                мать: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_отца: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
                мать_отца: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_матери: { индивидуальный_номер: "", кличка: "", дата_рождения: "" },
                мать_матери: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_отца_отца: {
                    индивидуальный_номер: "",
                    кличка: "",
                    дата_рождения: "",
                },
                мать_отца_отца: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_матери_отца: {
                    индивидуальный_номер: "",
                    кличка: "",
                    дата_рождения: "",
                },
                мать_матери_отца: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_отца_матери: {
                    индивидуальный_номер: "",
                    кличка: "",
                    дата_рождения: "",
                },
                мать_отца_матери: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
                отец_матери_матери: {
                    индивидуальный_номер: "",
                    кличка: "",
                    дата_рождения: "",
                },
                мать_матери_матери: {
                    индивидуальный_номер: "",
                    кличка: "",
                    удой: "",
                    дата_рождения: "",
                },
            },
            живаяМассаПриРождении: "",
            живаяМассаВ6Месяцев: "",
            живаяМассаВ10Месяцев: "",
            живаяМассаВ12Месяцев: "",
            живаяМассаВ18Месяцев: "",
            перемещениеОткуда: "",
            перемещениеКуда: "",
            перемещениеДата: "",
            перемещениеВозраст: "",
            перемещениеЖиваяМасса: "",
            перемещениеЦельПеремещения: "",
            датаВыбытия: "",
            причинаВыбытия: "",
        });
    };

    const renderInput = (field, nestedField = null) => {
        const value = nestedField
            ? formData[nestedField][field.name]
            : formData[field.name];
        const Component =
            field.type === "number"
                ? InputNumber
                : field.type === "date"
                ? InputDate
                : InputText;

        return (
            <div key={field.name} className="input-wrapper">
                <Component
                    value={field.noValue ? undefined : value}
                    onChange={(e) =>
                        handleInputChange(field.name, e.target.value, nestedField)
                    }
                />
                <label className="floating-label">{field.label}</label>
            </div>
        );
    };

    return (
        <div className="breeding-stock-container">
            <RightMenu
                formData={formData}
                onSearchResult={handleSearchResult}
                onResetForm={resetForm}
                dataType="bullsOwn"
            />
            <div className="text_title">
                <h1>Быки (собственные)</h1>
            </div>
            <div className="add-foto-container">
                <AddFoto
                    onImageUpload={handleImageUpload}
                    externalImage={formData.фото}
                />
            </div>
            <div className="main-breeding-stock">
                <form>{mainFields.map((field) => renderInput(field))}</form>
            </div>
            <div className="genealogy-container">
                <Genealogy
                    onGenealogyChange={handleGenealogyChange}
                    genealogyData={formData.генеалогия}
                />
            </div>
            <div className="main-breeding-stock">
                <form>{secondaryFields.map((field) => renderInput(field))}</form>
            </div>
        </div>
    );
}

export default BullsOwn;
