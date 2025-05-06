// src/components/Home.js
import React from "react";

import Gerb from "../img/Kyrgyzstan 1.png";
import Cow from "../img/cow_2.png";

const Home = () => {
    return (
        <>
            <div className="home-container">
                <nav>
                    <h2>МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ</h2>
                    <img src={Gerb} alt="" />
                    <h2>МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ</h2>
                </nav>
                <div className="line"></div>
                <div className="main">
                    <img src={Cow} alt="" />
                    <h1>Племенной учет животных</h1>
                </div>
            </div>
        </>
    );
};

export default Home;
