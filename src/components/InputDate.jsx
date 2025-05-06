import React from 'react'

function InputDate({ value, onChange }) {
    return (

            <input
                type='date'
                name='date'
                value={value}
            onChange={onChange}
                className="modern-input"
                placeholder=''
            />

    );
}

export default InputDate;
