import React from 'react';
const CurrencyInput = ({ label, value, onInputChange, onValueChange, currency, onCurrencyChange, options }) => (
    <div className="currency">
        <label className='label'>{label}</label>
        <input type="number" value={value} onChange={onInputChange} placeholder="0" />
        <a className='a'>{'^'}</a>

        <select value={currency} onChange={onCurrencyChange}>

            {options.map((option) => (
                <option key={option} value={option}>
                    {option} 
                </option>
            ))}
        </select>
    </div>
);

export default CurrencyInput;
