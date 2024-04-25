import React, { useState, useEffect } from 'react';
import CurrencyInput from './CurrenceInput';
import '../css/CurrencyConverter.css';

const API_KEY = 'f1f470a349d096f7cd50f30e'; 
const API_URL = `https://api.exchangerate-api.com/v4/latest/`;

const CurrencyConverter = () => {
    const [currencyOne, setCurrencyOne] = useState('USD');
    const [currencyTwo, setCurrencyTwo] = useState('VND');
    const [amountOne, setAmountOne] = useState(1);
    const [amountTwo, setAmountTwo] = useState(0);
    const [rate, setRate] = useState(null);
    const [options] = useState([
        'AED', 'ARS', 'AUD', 'BGN', 'BRL', 'BSD', 'CAD', 'CHF', 'CLP', 'CNY',
        'COP', 'CZK', 'DKK', 'DOP', 'EGP', 'EUR', 'FJD', 'GBP', 'GTQ', 'HKD',
        'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'KZT', 'MXN',
        'MYR', 'NOK', 'NZD', 'PAB', 'PEN', 'PHP', 'PKR', 'PLN', 'PYG', 'RON',
        'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'UAH', 'USD', 'UYU',
        'VND', 'ZAR',
    ]);


    useEffect(() => {
        const fetchRate = async () => {
            const response = await fetch(`${API_URL}${currencyOne}`);
            const data = await response.json();
            setRate(data.rates[currencyTwo]);

            // Calculate converted amount initially on mount
            setAmountTwo((amountOne * data.rates[currencyTwo]).toFixed(2));
        };

        fetchRate();
    }, [currencyOne, currencyTwo, amountOne]);

    const handleAmountChangeOne = (event) => {
        setAmountOne(event.target.value);
        setAmountTwo((event.target.value * rate).toFixed(2));
    };

    const handleAmountChangeTwo = (event) => {
        setAmountTwo(event.target.value);
        setAmountOne((event.target.value / rate).toFixed(2));
    };

    const handleCurrencyChangeOne = (event) => {
        setCurrencyOne(event.target.value);
    };

    const handleCurrencyChangeTwo = (event) => {
        setCurrencyTwo(event.target.value);
    };

    const handleSwapCurrencies = () => {
        const tempCurrency = currencyOne;
        setCurrencyOne(currencyTwo);
        setCurrencyTwo(tempCurrency);
    };


    return (
        <div className='container'>
            <div className='swap-rate-container'>
                <div className='rate'>1 {currencyOne} = {rate} {currencyTwo}</div>
                <button className='btn' onClick={handleSwapCurrencies}>
                    Swap
                </button>
            </div>
            
            <CurrencyInput
                label='From: '
                value={amountOne}
                onInputChange={handleAmountChangeOne}
                onCurrencyChange={handleCurrencyChangeOne}
                currency={currencyOne}
                options={options}
            />
            <CurrencyInput
                label='To: '
                value={amountTwo}
                onInputChange={handleAmountChangeTwo}
                onCurrencyChange={handleCurrencyChangeTwo}
                currency={currencyTwo}
                options={options}
            />
        </div>
    );
};

export default CurrencyConverter;
