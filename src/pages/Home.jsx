// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom"; // Для навигации
import Gerb from "../img/Kyrgyzstan 1.png";
import Cow from "../img/cow_2.png";

const Home = () => {
    return (
        <>
            <div className="home-container">
                <nav className="nav-header">
                    <h2>МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ</h2>
                    <img src={Gerb} alt="Герб Кыргызстана" className="gerb-logo" />
                    <h2>МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ</h2>
                </nav>
                <div className="line"></div>
                <div className="main-content">
                    <div className="main-text">
                        <img src={Cow} alt="Корова" className="cow-image" />
                        <div className="block_info">
                            <h1>Племенной учет животных</h1>
                            <p className="description">
                                Добро пожаловать! Платформа для оцифровки данных о
                                поголовье, созданная в 2025 году для фермеров Кыргызстана.
                                Управляйте данными и улучшайте работу с животными.
                            </p>
                            <Link to="/breedingStock" className="start-button">
                                Начать работу
                            </Link>
                        </div>
                    </div>
                    <div className="features-container">
                        <div className="feature-block">
                            <h3>Управление данными</h3>
                            <p>
                                Добавляйте, редактируйте и удаляйте информацию о животных
                                через удобные формы.
                            </p>
                        </div>
                        <div className="feature-block">
                            <h3>Визуализация генеалогии</h3>
                            <p>
                                Смотрите дерево происхождения животных с помощью
                                интерактивного Canvas.
                            </p>
                        </div>
                        <div className="feature-block">
                            <h3>Загрузка фото</h3>
                            <p>
                                Загружайте и просматривайте изображения животных для
                                визуального учета.
                            </p>
                        </div>
                        <div className="feature-block">
                            <h3>Генерация отчетов</h3>
                            <p>
                                Создавайте PDF-отчеты с данными о поголовье одним кликом.
                            </p>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <p>Контакты: support@agri.kg | Тел: +996 555 123 456</p>
                    <p>© 2025 Министерство сельского хозяйства КР</p>
                </footer>
            </div>
        </>
    );
};

export default Home;
