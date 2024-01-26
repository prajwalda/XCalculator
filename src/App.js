import "./index.css";
import {useState,useEffect} from "react"

export default function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEvaluate = () => {
    try {
      const sanitizedInput = input.replace(/[^-()\d/*+.]/g, ''); 
      setResult(parseExpression(sanitizedInput));
    } catch (error) {
      setResult('Error');
    }
  };

  const parseExpression = (expr) => {
    const operators = ['+', '-', '*', '/'];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

    const output = [];
    const operatorsStack = [];

    const processOperator = (operator) => {
      while (
        operatorsStack.length &&
        precedence[operatorsStack[operatorsStack.length - 1]] >= precedence[operator]
      ) {
        output.push(operatorsStack.pop());
      }
      operatorsStack.push(operator);
    };

    const processToken = (token) => {
      if (/\d/.test(token)) {
        output.push(parseFloat(token));
      } else if (operators.includes(token)) {
        processOperator(token);
      } else if (token === '(') {
        operatorsStack.push(token);
      } else if (token === ')') {
        while (operatorsStack.length && operatorsStack[operatorsStack.length - 1] !== '(') {
          output.push(operatorsStack.pop());
        }
        operatorsStack.pop();
      }
    };

    const tokens = expr.match(/(?:\d+\.?\d*|\.\d+|[+\-*/()])/g) || [];

    tokens.forEach((token) => processToken(token));

    while (operatorsStack.length) {
      output.push(operatorsStack.pop());
    }

    const evaluateRPN = (rpn) => {
      const stack = [];
      rpn.forEach((token) => {
        if (typeof token === 'number') {
          stack.push(token);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
            case '+':
              stack.push(a + b);
              break;
            case '-':
              stack.push(a - b);
              break;
            case '*':
              stack.push(a * b);
              break;
            case '/':
              
              if(a === 0 && b === 0)stack.push(0);
              else stack.push(a / b);
              break;
            default:
              break;
          }
        }
      });
      if (stack.length !== 1) {
        throw new Error('Invalid expression');
      }
      return stack[0];
    };

    const result = evaluateRPN(output);

    return isFinite(result) ? result : 'Infinity';
  };

  return (
    <div>
      <input type="text" value={input} readOnly />
      <div>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleClear()}>C</button>
        <button onClick={() => handleEvaluate()}>=</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
}
