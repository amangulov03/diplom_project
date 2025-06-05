import React, { useState, useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

function Genealogy({ genealogyData, onGenealogyChange }) {
    const [activeNode, setActiveNode] = useState("отец");
    const [formData, setFormData] = useState({
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
    });

    const buttonRefs = useRef({});
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const nodeDisplayNames = {
        отец: "Отец",
        мать: "Мать",
        отец_отца: "Отец отца",
        мать_отца: "Мать отца",
        отец_матери: "Отец матери",
        мать_матери: "Мать матери",
        отец_отца_отца: "Отец отца отца",
        мать_отца_отца: "Мать отца отца",
        отец_матери_отца: "Отец матери отца",
        мать_матери_отца: "Мать матери отца",
        отец_отца_матери: "Отец отца матери",
        мать_отца_матери: "Мать отца матери",
        отец_матери_матери: "Отец матери матери",
        мать_матери_матери: "Мать матери матери",
    };

    const motherNodes = [
        "мать",
        "мать_отца",
        "мать_матери",
        "мать_отца_отца",
        "мать_матери_отца",
        "мать_отца_матери",
        "мать_матери_матери",
    ];

    const prevDataRef = useRef();

    useEffect(() => {
        if (genealogyData && !isEqual(genealogyData, prevDataRef.current)) {
            setFormData((prev) => ({
                ...prev,
                ...genealogyData,
            }));
            prevDataRef.current = genealogyData;
        }
    }, [genealogyData]);

    const handleNodeClick = (node) => {
        setActiveNode(node);
    };

    const handleInputChange = (e, field) => {
        setFormData((prev) => ({
            ...prev,
            [activeNode]: {
                ...prev[activeNode],
                [field]: e.target.value,
            },
        }));
    };

    useEffect(() => {
        if (typeof onGenealogyChange === "function" && !isEqual(formData, prevDataRef.current)) {
            onGenealogyChange(formData);
            prevDataRef.current = formData;
        }
    }, [formData, onGenealogyChange]);

    const nodeDisplayName = `Генеалогия - ${nodeDisplayNames[activeNode]}`;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const container = containerRef.current;

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#3498db";
        ctx.lineWidth = 2;

        const drawLine = (parentNode, childNode) => {
            const parent = buttonRefs.current[parentNode];
            const child = buttonRefs.current[childNode];
            if (!parent || !child) return;

            const parentRect = parent.getBoundingClientRect();
            const childRect = child.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const parentX = parentRect.left + parentRect.width / 2 - containerRect.left;
            const parentY = parentRect.bottom - containerRect.top;
            const childX = childRect.left + childRect.width / 2 - containerRect.left;
            const childY = childRect.top - containerRect.top;

            ctx.beginPath();
            ctx.moveTo(parentX, parentY);
            ctx.lineTo(childX, childY);
            ctx.stroke();
        };

        drawLine("отец", "отец_отца");
        drawLine("отец", "мать_отца");
        drawLine("мать", "отец_матери");
        drawLine("мать", "мать_матери");
        drawLine("отец_отца", "отец_отца_отца");
        drawLine("отец_отца", "мать_отца_отца");
        drawLine("мать_отца", "отец_матери_отца");
        drawLine("мать_отца", "мать_матери_отца");
        drawLine("отец_матери", "отец_отца_матери");
        drawLine("отец_матери", "мать_отца_матери");
        drawLine("мать_матери", "отец_матери_матери");
        drawLine("мать_матери", "мать_матери_матери");
    }, []);

    useEffect(() => {
        let resizeTimeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const canvas = canvasRef.current;
                const container = containerRef.current;
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;

                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = "#3498db";
                ctx.lineWidth = 2;

                const drawLine = (parentNode, childNode) => {
                    const parent = buttonRefs.current[parentNode];
                    const child = buttonRefs.current[childNode];
                    if (!parent || !child) return;

                    const parentRect = parent.getBoundingClientRect();
                    const childRect = child.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();

                    const parentX = parentRect.left + parentRect.width / 2 - containerRect.left;
                    const parentY = parentRect.bottom - containerRect.top;
                    const childX = childRect.left + childRect.width / 2 - containerRect.left;
                    const childY = childRect.top - containerRect.top;

                    ctx.beginPath();
                    ctx.moveTo(parentX, parentY);
                    ctx.lineTo(childX, childY);
                    ctx.stroke();
                };

                drawLine("отец", "отец_отца");
                drawLine("отец", "мать_отца");
                drawLine("мать", "отец_матери");
                drawLine("мать", "мать_матери");
                drawLine("отец_отца", "отец_отца_отца");
                drawLine("отец_отца", "мать_отца_отца");
                drawLine("мать_отца", "отец_матери_отца");
                drawLine("мать_отца", "мать_матери_отца");
                drawLine("отец_матери", "отец_отца_матери");
                drawLine("отец_матери", "мать_отца_матери");
                drawLine("мать_матери", "отец_матери_матери");
                drawLine("мать_матери", "мать_матери_матери");
            }, 200);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div className="genealogies">
            <h3>Генеалогия</h3>
            <div
                className="main-btn-genealogies"
                ref={containerRef}
                style={{ position: "relative" }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                />
                <div className="genealogies-1">
                    <button
                        ref={(el) => (buttonRefs.current["отец"] = el)}
                        onClick={() => handleNodeClick("отец")}
                        style={{
                            background: activeNode === "отец" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать"] = el)}
                        onClick={() => handleNodeClick("мать")}
                        style={{
                            background: activeNode === "мать" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать
                    </button>
                </div>
                <div className="genealogies-2">
                    <button
                        ref={(el) => (buttonRefs.current["отец_отца"] = el)}
                        onClick={() => handleNodeClick("отец_отца")}
                        style={{
                            background:
                                activeNode === "отец_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_отца"] = el)}
                        onClick={() => handleNodeClick("мать_отца")}
                        style={{
                            background:
                                activeNode === "мать_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["отец_матери"] = el)}
                        onClick={() => handleNodeClick("отец_матери")}
                        style={{
                            background:
                                activeNode === "отец_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец матери
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_матери"] = el)}
                        onClick={() => handleNodeClick("мать_матери")}
                        style={{
                            background:
                                activeNode === "мать_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать матери
                    </button>
                </div>
                <div className="genealogies-3">
                    <button
                        ref={(el) => (buttonRefs.current["отец_отца_отца"] = el)}
                        onClick={() => handleNodeClick("отец_отца_отца")}
                        style={{
                            background:
                                activeNode === "отец_отца_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец отца отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_отца_отца"] = el)}
                        onClick={() => handleNodeClick("мать_отца_отца")}
                        style={{
                            background:
                                activeNode === "мать_отца_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать отца отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["отец_матери_отца"] = el)}
                        onClick={() => handleNodeClick("отец_матери_отца")}
                        style={{
                            background:
                                activeNode === "отец_матери_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец матери отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_матери_отца"] = el)}
                        onClick={() => handleNodeClick("мать_матери_отца")}
                        style={{
                            background:
                                activeNode === "мать_матери_отца" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать матери отца
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["отец_отца_матери"] = el)}
                        onClick={() => handleNodeClick("отец_отца_матери")}
                        style={{
                            background:
                                activeNode === "отец_отца_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец отца матери
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_отца_матери"] = el)}
                        onClick={() => handleNodeClick("мать_отца_матери")}
                        style={{
                            background:
                                activeNode === "мать_отца_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать отца матери
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["отец_матери_матери"] = el)}
                        onClick={() => handleNodeClick("отец_матери_матери")}
                        style={{
                            background:
                                activeNode === "отец_матери_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Отец матери матери
                    </button>
                    <button
                        ref={(el) => (buttonRefs.current["мать_матери_матери"] = el)}
                        onClick={() => handleNodeClick("мать_матери_матери")}
                        style={{
                            background:
                                activeNode === "мать_матери_матери" ? "#2e6dcc" : "#3498db",
                        }}
                    >
                        Мать матери матери
                    </button>
                </div>
            </div>
            <form className="genealogy-form">
                <h3>{nodeDisplayName}</h3>
                <div className="main_input">
                    <div className="input-wrapper">
                        <input
                            type="number"
                            placeholder=""
                            className="modern-input"
                            value={formData[activeNode]?.индивидуальный_номер || ""}
                            onChange={(e) => handleInputChange(e, "индивидуальный_номер")}
                        />
                        <label className="floating-label">индивидуальный номер</label>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder=""
                            className="modern-input"
                            value={formData[activeNode]?.кличка || ""}
                            onChange={(e) => handleInputChange(e, "кличка")}
                        />
                        <label className="floating-label">кличка</label>
                    </div>
                    {motherNodes.includes(activeNode) && (
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder=""
                                className="modern-input"
                                value={formData[activeNode]?.удой || ""}
                                onChange={(e) => handleInputChange(e, "удой")}
                            />
                            <label className="floating-label">удой</label>
                        </div>
                    )}
                    <div className="input-wrapper">
                        <input
                            type="date"
                            placeholder=""
                            className="modern-input"
                            value={formData[activeNode]?.дата_рождения || ""}
                            onChange={(e) => handleInputChange(e, "дата_рождения")}
                        />
                        <label className="floating-label">дата рождения</label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Genealogy;
