import { useState } from 'react'

let justPressedOperator = false;
let x = null;
let y = null;
let z = null;
let operator = null;    

const IECalculator = () => {
    const [display, setDisplay] = useState('0');

    function ac () {
        setDisplay('0');
        x = null;
        y = null;
        operator = null;
        justPressedOperator = false;
    }

    function handleClickDigit (digit) {        

        setDisplay(prevDisplay => {
            if (prevDisplay === '0' || justPressedOperator === true) {
                justPressedOperator = false;
                return digit
            } else {
                return prevDisplay + digit 
            }
        });

        // TODO Add commas function
    }

    function add (x, y) {
        return (x + y);
    }
    
    function subtract (x, y) {
        return (x - y);
    }
    
    function multiply (x, y) {
        return (x * y);
    }
    
    function divide (x, y) {
    if (y === 0) {
        return "lmao";
    }
        return (x / y);
    }

    function handleOperatorClick (op) {
        justPressedOperator = true;
    
        if (x === null) {
          x = Number(display.replace(/,/g, ""));
          operator = op;
        //   alert(`${x} ${operator} ${y}`);

        } else if (y === null) {
          y = Number(display.replace(/,/g, ""));
          
        //   alert(`${x} ${operator} ${y}`);
          
          z = solve(); // solve function already returns integer type. solve simply saves the answer
          // truncate the answer
          // add commas
          setDisplay(z.toString()); // display the answer
          x = z; // transfer z to x for next computation

          operator = op;
          y = null;
        }
    }
  
    function handleEqualClick () {
        if (y === null) {
            y = Number(display.replace(/,/g, "")); // Store the current displayed value 
            
            // alert(`${x} ${operator} ${y}`);
            
            z = solve(); // solve function already returns integer type. solve simply saves the answer
            // truncate the answer
            // add commas
            setDisplay(z.toString()); // display the answer
  

            x = null;
            operator = null 
            y = null;
        }
    }
    
    function solve () {
        switch (operator) {
          case "+":
            return add(x, y);
          case "-":
            return subtract(x, y);
          case "*":
            return multiply(x, y);
          case "÷":
            return divide(x, y);
          default:
            return;
        }
    }
    
    // function truncate8decimal (number) {

    //     return parseFloat(number.toFixed(8)).toString();
    // }
    

    function backspace () {

        let newScreenValue = display.slice(0, -1);
        newScreenValue = newScreenValue === "" ? "0" : newScreenValue;
        setDisplay(newScreenValue);

        // TODO add commas
    }
    
    return (
        <div className='container'>

            <button id="equals" onClick={handleEqualClick}>=</button>

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
            
            <div id='add' onClick={() => handleOperatorClick('+')}>+</div>
            <div id='subtract' onClick={() => handleOperatorClick('-')}>-</div>
            <div id='multiply' onClick={() => handleOperatorClick('*')}>x</div>
            <div id='divide' onClick={() => handleOperatorClick('÷')}>÷</div>
            
            <div id='clear' onClick={ac}>AC</div>
            <div id='backspace' onClick={backspace}>⌫</div>

            <div id='display'>{display}</div>

        </div>        
    );
};

export default IECalculator;