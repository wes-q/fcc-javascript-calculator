import { useState } from 'react'

const FLCalculator = () => {
    const [display, setDisplay] = useState('0');

    function ac () {
        setDisplay('0');
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

           
    function handleOperatorClick (op) {
        const operators = ['+','-','x','/'];

        setDisplay(prevDisplay => {
            const lastCharacter = prevDisplay[prevDisplay.length - 1];

            if (prevDisplay === '0') { 
                return op
            } else if (operators.includes(lastCharacter)) {

                return prevDisplay.slice(0, -1) + op;
            } else {
                return prevDisplay + op
            } // TODO add handling of decimal
        });
    }


    function computeExpression(expression) {
        const operators = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '/': (a, b) => a / b,
        };
      
        const operatorPriority = {
          '+': 1,
          '-': 1,
          'x': 2,
          '/': 2,
        };
      
        const outputStack = [];
        const operatorStack = [];
      
        for (const elem of expression) {
          if (!isNaN(elem)) {
            outputStack.push(Number(elem));
          } else if (elem in operators) {
            while (
              operatorStack.length > 0 &&
              operatorPriority[operatorStack[operatorStack.length - 1]] >= operatorPriority[elem]
            ) {
              const operator = operatorStack.pop();
              const b = outputStack.pop();
              const a = outputStack.pop();
              outputStack.push(operators[operator](a, b));
            }
            operatorStack.push(elem);
          }
        }
      
        while (operatorStack.length > 0) {
          const operator = operatorStack.pop();
          const b = outputStack.pop();
          const a = outputStack.pop();
          outputStack.push(operators[operator](a, b));
        }
      
        return outputStack[0];
    }
  
    function handleEqualClick () {
        setDisplay(computeExpression(display));
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
            <div id='multiply' onClick={() => handleOperatorClick('x')}>x</div>
            <div id='divide' onClick={() => handleOperatorClick('/')}>÷</div>
            
            <div id='clear' onClick={ac}>AC</div>
            <div id='backspace' onClick={backspace}>⌫</div>

            <div id='display'>{display}</div>

        </div>        
    );
};

export default FLCalculator;
