import { evaluate } from 'mathjs';
import React from 'react';

/* eslint-disable no-unused-vars */
import { useState } from 'react'

const FLCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [equationDisplay, setEquationDisplay] = useState("");
    
    function ac (): void {
        setDisplay('0');
        setEquationDisplay("");
    }

    function handleClickDigit (digit: string): void {        

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

    // function handleOperatorClick(op: Operator): void {
    function handleOperatorClick (op : string): void {
        type Operator = '+' | '-' | '*' | '/';
        const operators: Operator[] = ['+', '-', '*', '/'];
        const operatorDisplay = display as Operator; // To prevent type mismatch, declare new variable as the type

        if (op === "-") { // Allow negative numbers logic
            if (operators.includes(operatorDisplay)) {
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
            const numbervalue = parseInt(display)
            if (!isNaN(numbervalue)) { // If displayed is a number
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
  
    function handleEqualClick () : void {
        // 1) Concat display into equationDisplay
        const x : string = equationDisplay + display;
        const result = evaluate(x) as number; // Evaluate the string equation into a number

        // 2) Show answer on display
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
            <button id='decimal' onClick={handleClickDecimal}>.</button>
            <button id="equals" onClick={handleEqualClick}>=</button>

            <button id='add' onClick={() => handleOperatorClick('+')}>+</button>
            <button id='subtract' onClick={() => handleOperatorClick('-')}>-</button>
            <button id='multiply' onClick={() => handleOperatorClick('*')}>x</button>
            <button id='divide' onClick={() => handleOperatorClick('/')}>÷</button>
            
            <button id='clear' onClick={ac}>AC</button>
            <button id='backspace' onClick={backspace}>⌫</button>

            <button id='equationDisplay'>{equationDisplay}</button>
            <button id='display'>{display}</button>

        </div>        
    );
};

export default FLCalculator;
