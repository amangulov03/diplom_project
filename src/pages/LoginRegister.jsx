// src/components/LoginRegister.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { GoShieldLock } from "react-icons/go";

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        login: "",
        password: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false); // Состояние для регистрации
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const endpoint = activeTab === "login" ? "/api/login" : "/api/register";
        const payload =
            activeTab === "login"
                ? { login: formData.login, password: formData.password }
                : {
                      login: formData.login,
                      password: formData.password,
                      email: formData.email,
                  };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Ошибка сервера");
            }

            const data = await response.json();
            if (activeTab === "login") {
                dispatch(login(data.token));
                localStorage.setItem("authToken", data.token); // Сохраняем токен
                navigate("/home");
            } else {
                setIsRegistered(true); // Успешная регистрация
                setActiveTab("login"); // Переключаем на "Вход"
                setFormData({ login: "", password: "", email: "" }); // Очищаем форму
            }
        } catch (err) {
            setError(err.message || "Не удалось выполнить запрос");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main_register">
            <div className="auth-container">
                <div className="auth-header">
                    <GoShieldLock className="shield"/>
                    <span className="auth-logo">Добро пожаловать!</span>
                    <p>Сохраняйте ваши данные в безопасности!</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            placeholder=""
                            required
                            disabled={isSubmitting}
                            className="modern-input"
                        />
                        <label className="floating-label">Логин</label>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=""
                            required
                            disabled={isSubmitting}
                            className="modern-input"
                        />
                        <label className="floating-label">Пароль</label>
                    </div>
                    {activeTab === "register" && (
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=""
                                required
                                disabled={isSubmitting}
                                className="modern-input"
                            />
                            <label className="floating-label">Email</label>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-button"
                    >
                        {isSubmitting
                            ? "Обработка..."
                            : activeTab === "login"
                            ? "Войти"
                            : "Зарегистрироваться"}
                    </button>
                </form>
                <div className="auth-tabs">
                    <span
                        className={`tab-button ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                        disabled={isSubmitting}
                    >
                        Вход
                    </span>
                    {/* Кнопка "Регистрация" исчезает после успешной регистрации */}
                    {!isRegistered && (
                        <span
                            className={`tab-button ${
                                activeTab === "register" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("register")}
                            disabled={isSubmitting}
                        >
                            Регистрация
                        </span>
                    )}
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default LoginRegister;
