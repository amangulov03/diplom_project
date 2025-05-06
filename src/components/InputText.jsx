import React from 'react'

function InputText({ value, onChange }) {
    return (

            <input
                type="text"
                name="text"
                placeholder=""
                required
                value={value}
            onChange={onChange}
                className="modern-input"
            />

    );
}

export default InputText;
