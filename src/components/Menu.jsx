import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { GoHomeFill } from "react-icons/go";
import { PiCowBold } from "react-icons/pi";
import { FaCow } from "react-icons/fa6";
import { GiCow } from "react-icons/gi";
import { IoIosExit } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

function Menu() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const burgerMenuRef = useRef(null);
    const hiddenMenuRef = useRef(null);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token && !isAuthenticated) {
            dispatch(login(token));
        } else if (!token && !isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuOpen &&
                burgerMenuRef.current &&
                hiddenMenuRef.current &&
                !burgerMenuRef.current.contains(event.target) &&
                !hiddenMenuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("authToken");
        navigate("/");
    };

    if (!isAuthenticated) {
        return null;
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <div className="left-container">
                <div className="icons-cows">
                    <div
                        className={`burber-menu ${menuOpen ? "open" : ""}`}
                        ref={burgerMenuRef}
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div
                        className={`hidden-menu ${menuOpen ? "show" : ""}`}
                        ref={hiddenMenuRef}
                    >
                        <ul>
                            <li>
                                <Link className="link-item" to="breedingStockCard">
                                    Карточки маточное поголовье
                                </Link>
                            </li>
                            <li>
                                <Link className="link-item" to="bullsOwnCard">
                                    Карточки быки (собственные)
                                </Link>
                            </li>
                            <li>
                                <Link className="link-item" to="bullsForeingCard">
                                    Карточки быки (ностранные)
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tooltip-container">
                        <Link className="a" to="/home">
                            <GoHomeFill />
                        </Link>
                        <span className="tooltip-text">Главная</span>
                    </div>
                    <div className="tooltip-container">
                        <Link className="a" to="/breedingStock">
                            <PiCowBold />
                        </Link>
                        <span className="tooltip-text">Маточное <br/>поголовье</span>
                    </div>
                    <div className="tooltip-container">
                        <Link className="a" to="/bullsOwn">
                            <FaCow />
                        </Link>
                        <span className="tooltip-text">Быки <br/>(собственные)</span>
                    </div>
                    <div className="tooltip-container">
                        <Link className="a" to="/bullsForeing">
                            <GiCow />
                        </Link>
                        <span className="tooltip-text">Быки <br/>(ностранные)</span>
                    </div>

                    <Link className="a" to="/home" style={{ marginTop: "375px" }}>
                        <IoMdArrowRoundBack />

                    </Link>
                </div>
                <IoIosExit className="logout-button" onClick={handleLogout} />
            </div>
        </div>
    );
}

export default Menu;
