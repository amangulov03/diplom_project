import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import { MdAddToPhotos } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function RightMenu({ formData, onSearchResult, onResetForm, dataType = "breedingStock" }) {
    const [isSearch, setIsSearch] = useState(false);
    const [value, setValue] = useState("");
    const [breedingStockData, setBreedingStockData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const SearchRef = useRef(null);
    const hiddenSearchRef = useRef(null);
    const preventCloseRef = useRef(false);

    const toggSearch = () => {
        setIsSearch((prev) => !prev);
    };

    const onChangeInput = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        updateSearchValue(inputValue);

        if (inputValue.trim() === "") {
            if (onSearchResult) onSearchResult(null);
            setIsEditing(false);
        }
    };

    const onClickClear = () => {
        preventCloseRef.current = true;
        setValue("");
        if (onSearchResult) onSearchResult(null);
        setIsEditing(false);

        setTimeout(() => {
            preventCloseRef.current = false;
        }, 100);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isSearch &&
                !preventCloseRef.current &&
                SearchRef.current &&
                hiddenSearchRef.current &&
                !SearchRef.current.contains(event.target) &&
                !hiddenSearchRef.current.contains(event.target)
            ) {
                setIsSearch(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isSearch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.log("Пожалуйста, войдите в систему");
                    return;
                }

                let apiEndpoint = "";
                switch (dataType) {
                    case "breedingStock":
                        apiEndpoint = "http://localhost:8000/api/get-breeding-stock";
                        break;
                    case "bullsOwn":
                        apiEndpoint = "http://localhost:8000/api/get-bulls-own";
                        break;
                    case "bullsForeing":
                        apiEndpoint = "http://localhost:8000/api/get-bulls-foreing";
                        break;
                    default:
                        apiEndpoint = "http://localhost:8000/api/get-breeding-stock";
                }

                const response = await axios.get(apiEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const normalizedData = response.data.map((item) => ({
                    ...item,
                    индивидуальныйНомер: item.индивидуальныйНомер?.toString() || "",
                    инвентарныйНомер: item.инвентарныйНомер?.toString() || "",
                    кличка: item.кличка?.toString() || "",
                }));
                setBreedingStockData(normalizedData || []);
            } catch (error) {
                console.error(
                    "Ошибка при загрузке данных:",
                    error.response?.data || error.message
                );
            }
        };
        fetchData();
    }, [dataType]);

    const updateSearchValue = React.useMemo(
        () =>
            debounce((query) => {
                if (!query) {
                    return;
                }

                const result = breedingStockData.find(
                    (item) =>
                        (item.индивидуальныйНомер &&
                            item.индивидуальныйНомер.toString().includes(query)) ||
                        (item.кличка && item.кличка.toString().includes(query))
                );
                if (onSearchResult) onSearchResult(result || null);
                setIsEditing(!!result);
            }, 500),
        [breedingStockData, onSearchResult]
    );

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("Пожалуйста, войдите в систему");
                return;
            }

            const individualNumber = formData.индивидуальныйНомер?.toString();
            if (!individualNumber || individualNumber.trim() === "") {
                alert("Поле 'индивидуальныйНомер' обязательно для заполнения!");
                return;
            }

            if (
                breedingStockData.some(
                    (item) => item.индивидуальныйНомер === individualNumber
                )
            ) {
                alert("Запись с таким индивидуальным номером уже существует! Используйте кнопку 'Изменить'.");
                return;
            }

            let fieldsToCheck;
            if (dataType === "bullsForeing") {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    кодСемени: formData.кодСемени,
                    оригинальнаяКличка: formData.оригинальнаяКличка,
                    карточнаяКличка: formData.карточнаяКличка,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    компания_поставщикСемени: formData.компания_поставщикСемени,
                    порода: formData.порода,
                    линия: formData.линия,
                    генеалогия: formData.генеалогия,
                    фото: formData.фото,
                };
            } else if (dataType === "bullsOwn") {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    местоРождения: formData.местоРождения,
                    порода: formData.порода,
                    линия: formData.линия,
                    породность: formData.породность,
                    семейство: formData.семейство,
                    комуПринадлежит: formData.комуПринадлежит,
                    мастьИПриметы: formData.мастьИПриметы,
                    группаКрови: formData.группаКрови,
                    происхождение: formData.происхождение,
                    фото: formData.фото,
                    генеалогия: formData.генеалогия,
                    живаяМассаПриРождении: formData.живаяМассаПриРождении,
                    живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
                    живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
                    живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
                    живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
                    перемещениеОткуда: formData.перемещениеОткуда,
                    перемещениеКуда: formData.перемещениеКуда,
                    перемещениеДата: formData.перемещениеДата,
                    перемещениеВозраст: formData.перемещениеВозраст,
                    перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
                    перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
                    датаВыбытия: formData.датаВыбытия,
                    причинаВыбытия: formData.причинаВыбытия,
                };
            } else {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    местоРождения: formData.местоРождения,
                    порода: formData.порода,
                    линия: formData.линия,
                    породность: formData.породность,
                    семейство: formData.семейство,
                    комуПринадлежит: formData.комуПринадлежит,
                    назначениеКоровы: formData.назначениеКоровы,
                    мастьИПриметы: formData.мастьИПриметы,
                    группаКрови: formData.группаКрови,
                    происхождение: formData.происхождение,
                    фото: formData.фото,
                    генеалогия: formData.генеалогия,
                    живаяМассаПриРождении: formData.живаяМассаПриРождении,
                    живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
                    живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
                    живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
                    живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
                    живаяМассаПриПервомОсоменении: formData.живаяМассаПриПервомОсоменении,
                    возрастПервогоОсеменения: formData.возрастПервогоОсеменения,
                    датаОсеменения: formData.датаОсеменения,
                    номерОсеменения: formData.номерОсеменения,
                    индивидуальныйНомерБыка: formData.индивидуальныйНомерБыка,
                    кличкаБыка: formData.кличкаБыка,
                    методСлучки: formData.методСлучки,
                    датаИсследованияНаСтельность: formData.датаИсследованияНаСтельность,
                    результатИсследованияНаСтельность: formData.результатИсследованияНаСтельность,
                    датаОтела: formData.датаОтела,
                    результатОтела: formData.результатОтела,
                    легкостьОтела: formData.легкостьОтела,
                    индивидуальныеНомераПриплода: formData.индивидуальныеНомераПриплода,
                    датаЗапуска: formData.датаЗапуска,
                    продолжительностьСервисПериода: formData.продолжительностьСервисПериода,
                    продолжительностьСухостойногоПериода: formData.продолжительностьСухостойногоПериода,
                    датаКонтрольногоДоения: formData.датаКонтрольногоДоения,
                    удой: formData.удой,
                    жир: formData.жир,
                    белок: formData.белок,
                    времяДоения: formData.времяДоения,
                    скоростьМолокоотдачи: formData.скоростьМолокоотдачи,
                    баллСкоростиМолокоотдачи: formData.баллСкоростиМолокоотдачи,
                    удойЗаЛактацию: formData.удойЗаЛактацию,
                    удойЗа305Дней: formData.удойЗа305Дней,
                    жирЗаЛактацию: formData.жирЗаЛактацию,
                    жирЗа305Дней: formData.жирЗа305Дней,
                    белокЗаЛактацию: formData.белокЗаЛактацию,
                    белокЗа305Дней: formData.белокЗа305Дней,
                    датаПовторногоЗапуска: formData.датаПовторногоЗапуска,
                    количествоДойныхДней: formData.количествоДойныхДней,
                    перемещениеОткуда: formData.перемещениеОткуда,
                    перемещениеКуда: formData.перемещениеКуда,
                    перемещениеДата: formData.перемещениеДата,
                    перемещениеВозраст: formData.перемещениеВозраст,
                    перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
                    перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
                    датаВыбытия: formData.датаВыбытия,
                    причинаВыбытия: formData.причинаВыбытия,
                    линейнаяОценкаБ: formData.линейнаяОценкаБ,
                    линейнаяОценкаА: formData.линейнаяОценкаА,
                };
            }

            const isAnyFieldFilled = Object.values(fieldsToCheck).some((value) => {
                if (value === null || value === undefined) return false;
                if (typeof value === "string") return value.trim() !== "";
                if (typeof value === "object") return Object.keys(value).length > 0;
                return !!value;
            });

            if (!isAnyFieldFilled) {
                alert("Заполните хотя бы одно поле!");
                return;
            }

            const filteredFormData = Object.fromEntries(
                Object.entries(fieldsToCheck)
                    .filter(([key, value]) => key === "индивидуальныйНомер" || (value && (typeof value === "string" ? value.trim() !== "" : typeof value === "object" ? Object.keys(value).length > 0 : !!value)))
            );

            console.log("Отправляемые данные:", JSON.stringify(filteredFormData, null, 2));
            let apiEndpoint = "";
            switch (dataType) {
                case "breedingStock":
                    apiEndpoint = "http://localhost:8000/api/save-breeding-stock";
                    break;
                case "bullsOwn":
                    apiEndpoint = "http://localhost:8000/api/save-bulls-own";
                    break;
                case "bullsForeing":
                    apiEndpoint = "http://localhost:8000/api/save-bulls-foreing";
                    break;
                default:
                    apiEndpoint = "http://localhost:8000/api/save-breeding-stock";
            }

            const response = await axios.post(
                apiEndpoint,
                filteredFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Ответ от сервера:", response.data);
            alert(response.data.message);
            console.log("Данные успешно сохранены:", response.data.message);

            setBreedingStockData((prev) => [...prev, filteredFormData]);
            if (onResetForm) onResetForm();
        } catch (error) {
            console.error(
                "Ошибка при сохранении данных:",
                error.response?.data || error.message
            );
            console.log("Полный ответ сервера:", JSON.stringify(error.response?.data, null, 2));
            alert(error.response?.data?.detail || "Ошибка при сохранении данных");
        }
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                alert("Пожалуйста, войдите в систему");
                return;
            }

            const individualNumber = formData.индивидуальныйНомер?.toString();
            if (!individualNumber || individualNumber.trim() === "") {
                alert("Поле 'индивидуальныйНомер' обязательно для заполнения!");
                return;
            }

            // Находим текущую запись в breedingStockData
            const existingRecord = breedingStockData.find(
                (item) => item.индивидуальныйНомер === individualNumber
            );
            if (!existingRecord) {
                alert("Запись не найдена! Пожалуйста, выберите существующую запись через поиск.");
                return;
            }

            let fieldsToCheck;
            if (dataType === "bullsForeing") {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    кодСемени: formData.кодСемени,
                    оригинальнаяКличка: formData.оригинальнаяКличка,
                    карточнаяКличка: formData.карточнаяКличка,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    компания_поставщикСемени: formData.компания_поставщикСемени,
                    порода: formData.порода,
                    линия: formData.линия,
                    генеалогия: formData.генеалогия,
                    фото: formData.фото,
                };
            } else if (dataType === "bullsOwn") {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    местоРождения: formData.местоРождения,
                    порода: formData.порода,
                    линия: formData.линия,
                    породность: formData.породность,
                    семейство: formData.семейство,
                    комуПринадлежит: formData.комуПринадлежит,
                    мастьИПриметы: formData.мастьИПриметы,
                    группаКрови: formData.группаКрови,
                    происхождение: formData.происхождение,
                    фото: formData.фото,
                    генеалогия: formData.генеалогия,
                    живаяМассаПриРождении: formData.живаяМассаПриРождении,
                    живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
                    живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
                    живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
                    живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
                    перемещениеОткуда: formData.перемещениеОткуда,
                    перемещениеКуда: formData.перемещениеКуда,
                    перемещениеДата: formData.перемещениеДата,
                    перемещениеВозраст: formData.перемещениеВозраст,
                    перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
                    перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
                    датаВыбытия: formData.датаВыбытия,
                    причинаВыбытия: formData.причинаВыбытия,
                };
            } else {
                fieldsToCheck = {
                    индивидуальныйНомер: formData.индивидуальныйНомер,
                    инвентарныйНомер: formData.инвентарныйНомер,
                    идентификационныйНомер: formData.идентификационныйНомер,
                    кличка: formData.кличка,
                    датаРождения: formData.датаРождения,
                    местоРождения: formData.местоРождения,
                    порода: formData.порода,
                    линия: formData.линия,
                    породность: formData.породность,
                    семейство: formData.семейство,
                    комуПринадлежит: formData.комуПринадлежит,
                    назначениеКоровы: formData.назначениеКоровы,
                    мастьИПриметы: formData.мастьИПриметы,
                    группаКрови: formData.группаКрови,
                    происхождение: formData.происхождение,
                    фото: formData.фото,
                    генеалогия: formData.генеалогия,
                    живаяМассаПриРождении: formData.живаяМассаПриРождении,
                    живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
                    живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
                    живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
                    живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
                    живаяМассаПриПервомОсоменении: formData.живаяМассаПриПервомОсоменении,
                    возрастПервогоОсеменения: formData.возрастПервогоОсеменения,
                    датаОсеменения: formData.датаОсеменения,
                    номерОсеменения: formData.номерОсеменения,
                    индивидуальныйНомерБыка: formData.индивидуальныйНомерБыка,
                    кличкаБыка: formData.кличкаБыка,
                    методСлучки: formData.методСлучки,
                    датаИсследованияНаСтельность: formData.датаИсследованияНаСтельность,
                    результатИсследованияНаСтельность: formData.результатИсследованияНаСтельность,
                    датаОтела: formData.датаОтела,
                    результатОтела: formData.результатОтела,
                    легкостьОтела: formData.легкостьОтела,
                    индивидуальныеНомераПриплода: formData.индивидуальныеНомераПриплода,
                    датаЗапуска: formData.датаЗапуска,
                    продолжительностьСервисПериода: formData.продолжительностьСервисПериода,
                    продолжительностьСухостойногоПериода: formData.продолжительностьСухостойногоПериода,
                    датаКонтрольногоДоения: formData.датаКонтрольногоДоения,
                    удой: formData.удой,
                    жир: formData.жир,
                    белок: formData.белок,
                    времяДоения: formData.времяДоения,
                    скоростьМолокоотдачи: formData.скоростьМолокоотдачи,
                    баллСкоростиМолокоотдачи: formData.баллСкоростиМолокоотдачи,
                    удойЗаЛактацию: formData.удойЗаЛактацию,
                    удойЗа305Дней: formData.удойЗа305Дней,
                    жирЗаЛактацию: formData.жирЗаЛактацию,
                    жирЗа305Дней: formData.жирЗа305Дней,
                    белокЗаЛактацию: formData.белокЗаЛактацию,
                    белокЗа305Дней: formData.белокЗа305Дней,
                    датаПовторногоЗапуска: formData.датаПовторногоЗапуска,
                    количествоДойныхДней: formData.количествоДойныхДней,
                    перемещениеОткуда: formData.перемещениеОткуда,
                    перемещениеКуда: formData.перемещениеКуда,
                    перемещениеДата: formData.перемещениеДата,
                    перемещениеВозраст: formData.перемещениеВозраст,
                    перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
                    перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
                    датаВыбытия: formData.датаВыбытия,
                    причинаВыбытия: formData.причинаВыбытия,
                    линейнаяОценкаБ: formData.линейнаяОценкаБ,
                    линейнаяОценкаА: formData.линейнаяОценкаА,
                };
            }

            const isAnyFieldFilled = Object.values(fieldsToCheck).some((value) => {
                if (value === null || value === undefined) return false;
                if (typeof value === "string") return value.trim() !== "";
                if (typeof value === "object") return Object.keys(value).length > 0;
                return !!value;
            });

            if (!isAnyFieldFilled) {
                alert("Заполните хотя бы одно поле!");
                return;
            }

            // Создаём объект с обновлёнными полями, сохраняя существующие данные
            const updatedFields = Object.fromEntries(
                Object.entries(fieldsToCheck)
                    .filter(([key, value]) => key === "индивидуальныйНомер" || (value && (typeof value === "string" ? value.trim() !== "" : typeof value === "object" ? Object.keys(value).length > 0 : !!value)))
            );

            // Сливаем обновлённые поля с существующей записью
            const updatedFormData = { ...existingRecord, ...updatedFields };

            let apiEndpoint = "";
            switch (dataType) {
                case "breedingStock":
                    apiEndpoint = "http://localhost:8000/api/update-breeding-stock";
                    break;
                case "bullsOwn":
                    apiEndpoint = "http://localhost:8000/api/update-bulls-own";
                    break;
                case "bullsForeing":
                    apiEndpoint = "http://localhost:8000/api/update-bulls-foreing";
                    break;
                default:
                    apiEndpoint = "http://localhost:8000/api/update-breeding-stock";
            }

            const response = await axios.post(
                apiEndpoint,
                updatedFormData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Ответ от сервера:", response.data);
            alert(response.data.message);
            console.log("Данные успешно обновлены:", response.data.message);

            setBreedingStockData((prev) =>
                prev.map((item) =>
                    item.индивидуальныйНомер === individualNumber ? updatedFormData : item
                )
            );
            if (onResetForm) onResetForm();
            setValue("");
            setIsEditing(false);
        } catch (error) {
            console.error(
                "Ошибка при обновлении данных:",
                error.response?.data || error.message
            );
            console.log("Полный ответ сервера:", JSON.stringify(error.response?.data, null, 2));
            alert(error.response?.data?.detail || "Ошибка при обновлении данных");
        }
    };

    return (
        <div className="right-block">
            <div className="icons">
                <div className="tooltip-container">
                    <div
                        className={`icon ${isSearch ? "open" : ""}`}
                        ref={SearchRef}
                        onClick={toggSearch}
                    >
                        <FaSearch />
                    </div>
                    <span className="tooltip-text">Поиск</span>
                </div>
                <div className={`search ${isSearch ? "show" : ""}`} ref={hiddenSearchRef}>
                    <svg
                        className="search_aicon"
                        height="512px"
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 512 512"
                        width="512px"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
                    </svg>
                    <input
                        ref={hiddenSearchRef}
                        value={value}
                        onChange={onChangeInput}
                        className="root"
                        placeholder="Поиск..."
                    />
                    {value && (
                        <svg
                            onClick={onClickClear}
                            className="clear_icon"
                            fill="none"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </div>
                <div className="tooltip-container" onClick={handleUpdate}>
                    <div className="icon">
                        <MdOutlineDriveFileRenameOutline />
                    </div>
                    <span className="tooltip-text">Сохранить</span>
                </div>
                <div className="tooltip-container" onClick={handleSave} style={{ opacity: isEditing ? 0.5 : 1, pointerEvents: isEditing ? "none" : "auto" }}>
                    <div className="icon">
                        <MdAddToPhotos />
                    </div>
                    <span className="tooltip-text">{isEditing ? "Нельзя добавить, используйте 'Изменить'" : "Добавить"}</span>
                </div>
            </div>
        </div>
    );
}

export default RightMenu;
