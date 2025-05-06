import React from "react";

function InputNumber({ value, onChange }) {
    return (
        <input
            type="number"
            name="number"
            placeholder=""
            required
            value={value}
            onChange={onChange}
            className="modern-input"
        />
    );
}

export default InputNumber;
