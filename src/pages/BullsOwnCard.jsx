import React, { useState, useEffect } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import BullsOwnPDF from "../components/BullsOwnPDF";

const BullsOwnCard = () => {
    const [bullsOwnData, setBullsOwnData] = useState([]);
    const [imageBase64Map, setImageBase64Map] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.error("Токен отсутствует");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:3000/api/get-bulls-own",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                const imagePromises = data.map(async (item) => {
                    if (item.фото) {
                        try {
                            const response = await fetch(item.фото);
                            const blob = await response.blob();

                            return new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    resolve({
                                        id: item.индивидуальныйНомер,
                                        base64: reader.result,
                                    });
                                };
                                reader.readAsDataURL(blob);
                            });
                        } catch (error) {
                            console.error(
                                `Ошибка загрузки изображения для ${item.индивидуальныйНомер}:`,
                                error
                            );
                            return { id: item.индивидуальныйНомер, base64: null };
                        }
                    }
                    return { id: item.индивидуальныйНомер, base64: null };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { id, base64 }) => {
                    acc[id] = base64;
                    return acc;
                }, {});
                setImageBase64Map(imageMap);
                setBullsOwnData(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (individualNumber) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("Токен отсутствует");
                return;
            }

            await axios.delete(
                `http://localhost:3000/api/delete-bulls-own/${individualNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBullsOwnData(
                bullsOwnData.filter(
                    (item) => item.индивидуальныйНомер !== individualNumber
                )
            );
            alert("Запись удалена успешно");
        } catch (error) {
            console.error("Ошибка при удалении:", error);
            alert("Ошибка при удалении записи");
        }
    };

    const handleDownloadSinglePDF = async (item) => {
        try {
            const modifiedItem = {
                ...item,
                фото: imageBase64Map[item.индивидуальныйНомер] || item.фото,
            };
            const blob = await pdf(<BullsOwnPDF item={modifiedItem} />).toBlob();
            const fileName = `bull-card-${item.индивидуальныйНомер || "без-номера"}.pdf`;
            saveAs(blob, fileName);
        } catch (error) {
            console.error("Ошибка при генерации PDF:", error);
            alert("Не удалось сгенерировать PDF");
        }
    };

    return (
        <div className="card-container">
            <div className="text_title">
                <h1>Карточки быков (собственные)</h1>
            </div>
            {bullsOwnData.length === 0 ? (
                <p>Нет данных для отображения</p>
            ) : (
                <div className="cards-list">
                    {bullsOwnData.map((item, index) => (
                        <div key={index} className="card" id={`card-${index}`}>
                            <h2>Карточка #{index + 1}</h2>
                            {item.фото ? (
                                <div className="card-image">
                                    <img
                                        src={item.фото}
                                        alt="Фото быка"
                                        className="cow-photo"
                                    />
                                </div>
                            ) : (
                                <div className="card-image">
                                    <span className="no-photo-text">Нет фото</span>
                                </div>
                            )}
                            <p>
                                <strong>Индивидуальный номер:</strong>{" "}
                                {item.индивидуальныйНомер}
                            </p>
                            <p>
                                <strong>Инвентарный номер:</strong>{" "}
                                {item.инвентарныйНомер}
                            </p>
                            <p>
                                <strong>Идентификационный номер:</strong>{" "}
                                {item.идентификационныйНомер}
                            </p>
                            <p>
                                <strong>Кличка:</strong> {item.кличка}
                            </p>
                            <p>
                                <strong>Дата рождения:</strong> {item.датаРождения}
                            </p>
                            <p>
                                <strong>Место рождения:</strong> {item.местоРождения}
                            </p>
                            <p>
                                <strong>Порода:</strong> {item.порода}
                            </p>
                            <p>
                                <strong>Линия:</strong> {item.линия}
                            </p>
                            <p>
                                <strong>Породность:</strong> {item.породность}
                            </p>
                            <p>
                                <strong>Кому принадлежит:</strong> {item.комуПринадлежит}
                            </p>
                            <p>
                                <strong>Масть и приметы:</strong> {item.мастьИПриметы}
                            </p>
                            <p>
                                <strong>Группа крови:</strong> {item.группаКрови}
                            </p>
                            <p>
                                <strong>Балл общий:</strong> {item.баллОбщий}
                            </p>
                            <p>
                                <strong>Класс:</strong> {item.класс}
                            </p>
                            <p>
                                <strong>Кому и куда продано:</strong>{" "}
                                {item.кому_и_кудаПродано}
                            </p>
                            <p>
                                <strong>Дата продажи:</strong> {item.датаПродажи}
                            </p>
                            <div className="card-buttons">
                                <button
                                    onClick={() => handleDelete(item.индивидуальныйНомер)}
                                    className="delete_button"
                                >
                                    Удалить
                                </button>
                                <button
                                    className="download_button"
                                    onClick={() => handleDownloadSinglePDF(item)}
                                >
                                    Скачать PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BullsOwnCard;
