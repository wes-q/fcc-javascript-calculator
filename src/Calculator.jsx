import { useState } from 'react'

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const justPressedOperator = false; // TODO edit later

    function ac () {
        setDisplay('0');
    }

    function handleClickDigit (digit) {
        
        setDisplay(prevDisplay => {
            if (prevDisplay === '0' || justPressedOperator === true) {
                return digit
            } else {
                return prevDisplay + digit 
            }
        });

        // TODO Add commas function
    }

    const add = (x, y) => {
        return truncate8decimal(x + y);
    };
    
    const subtract = (x, y) => {
        return truncate8decimal(x - y);
    };
    
    const multiply = (x, y) => {
        return truncate8decimal(x * y);
    };
    
    const divide = (x, y) => {
    if (y === 0) {
        return "lmao";
    }
        return truncate8decimal(x / y);
    };
      
    const truncate8decimal = (number) => {
        return parseFloat(number.toFixed(8)).toString();
    };
    
    const backspace = () => {
        let newScreenValue = display.slice(0, -1);
        newScreenValue = newScreenValue === "" ? "0" : newScreenValue;
        setDisplay(newScreenValue);

        // TODO add commas
    };
    
    return (
        <div className='container'>
            <div id='equals'>=</div>

            <button id='zero' onClick={() => handleClickDigit('0')}>0</button>
            <button id='one' onClick={() => handleClickDigit('1')}>1</button>
            <button id='two' onClick={() => handleClickDigit('2')}>2</button>
            <button id='three' onClick={() => handleClickDigit('3')}>3</button>
            <button id='four' onClick={() => handleClickDigit('4')}>4</button>
            <button id='five' onClick={() => handleClickDigit('5')}>5</button>
            <button id='six' onClick={() => handleClickDigit('6')}>6</button>
            <button id='seven' onClick={() => handleClickDigit('7')}>7</button>
            <button id='eight' onClick={() => handleClickDigit('8')}>8</button>
            <button id='nine' onClick={() => handleClickDigit('9')}>9</button>
            <div id='decimal'>.</div>
            
            <div id='add'>+</div>
            <div id='subtract'>-</div>
            <div id='multiply'>x</div>
            <div id='divide'>÷</div>
            
            
            <div id='clear' onClick={ac}>AC</div>
            <div id='backspace' onClick={backspace}>⌫</div>

            <div id='display'>{display}</div>

        </div>        
    );
};

export default Calculator;