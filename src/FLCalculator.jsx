/* eslint-disable no-unused-vars */
import { useState } from 'react'

const FLCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [equationDisplay, setEquationDisplay] = useState("");
    
    function ac () {
        setDisplay('0');
        setEquationDisplay("");
    }

    function handleClickDigit (digit) {        

        setDisplay(prevDisplay => {
            if (prevDisplay === '0') {
                return digit
            } else {
                return prevDisplay + digit 
            }
        });

        // TODO Add commas function
    }

/*
if - 
    if operator 
        if - is the operator
            do nothing
        else 
            append -
    else (number) execute
            
if + / *
    if number execute
    if operator 
*/
           
    function handleOperatorClick (op) {
        const operators = ['+','-','*','/'];

        if (op === "-") { // Allow negative numbers logic
            if (operators.includes(display)) { //
                if (display === "-") {
                    return
                } else {
                    setDisplay(prevDisplay => {
                        return prevDisplay + "-"
                    });
                }
            } else {
                // 1) Concat display into equationDisplay
                setEquationDisplay(prevEquationDisplay => {
                    return prevEquationDisplay + display
                });
        
                // 2) Show operator on display
                setDisplay(op);
            }
            
        } else { // If pressed + * or /
            // alert("* pressed")
            if (!isNaN(display)) { // If displayed is a number
                // alert("displayed is number")
                // 1) Concat display into equationDisplay
                setEquationDisplay(prevEquationDisplay => {
                    return prevEquationDisplay + display
                });
        
                // 2) Show operator on display
                setDisplay(op);
            } else { // If displayed is not a number (operator or operators)
                // alert("displayed is operator")
                setDisplay(op);
            }
        }
    }
  
    function handleEqualClick () {
        // 1) Concat display into equationDisplay
        const x = equationDisplay + display;
        
        // // 2) Show answer on display
        // setDisplay(prevDisplay => eval(x).toString());

        // 2) Show answer on display
        const result = new Function('return ' + x)();
        setDisplay(result.toString());

        // 3) Clear equationDisplay
        setEquationDisplay("");
    }
    
    function handleClickDecimal () {
        const operators = ['+','-','*','/'];

        setDisplay(prevDisplay => {
            const lastCharacter = prevDisplay[prevDisplay.length - 1];
            
            if (operators.includes(lastCharacter)) { //if last char is operator then add a 0 before decimal
                return prevDisplay + "0."
            } else if (!prevDisplay.includes(".")) {  //if last char is number and doesn't include . then append .
                return prevDisplay + "."
            } else {
                return prevDisplay
            }
        });
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
            <div id='decimal' onClick={handleClickDecimal}>.</div>
            <div id="equals" onClick={handleEqualClick}>=</div>

            <div id='add' onClick={() => handleOperatorClick('+')}>+</div>
            <div id='subtract' onClick={() => handleOperatorClick('-')}>-</div>
            <div id='multiply' onClick={() => handleOperatorClick('*')}>x</div>
            <div id='divide' onClick={() => handleOperatorClick('/')}>÷</div>
            
            <div id='clear' onClick={ac}>AC</div>
            <div id='backspace' onClick={backspace}>⌫</div>

            <div id='equationDisplay'>{equationDisplay}</div>
            <div id='display'>{display}</div>

        </div>        
    );
};

export default FLCalculator;
