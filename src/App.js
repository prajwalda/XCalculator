import "./index.css";
import {useState,useEffect} from "react"

export default function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

  const calculate = (expression) => {
    try {
      let result = 0;
      let currentOperator = '+';
      let currentNumber = '';
      
      for (let char of expression) {
        if (isOperator(char)) {
          currentOperator = char;
        } else {
          currentNumber += char;
          if (isOperator(expression.charAt(expression.indexOf(char) + 1)) || expression.indexOf(char) === expression.length - 1) {
            switch (currentOperator) {
              case '+':
                result += parseInt(currentNumber, 10);
                break;
              case '-':
                result -= parseInt(currentNumber, 10);
                break;
              case '*':
                result *= parseInt(currentNumber, 10);
                break;
              case '/':
                result /= parseInt(currentNumber, 10);
                break;
              default:
                break;
            }
            currentNumber = '';
          }
        }
      }

      setResult(result);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    calculate(input);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="buttons">
        {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '/', '=', 'C'].map((button) => (
          <button key={button} onClick={() => (button === '=' ? handleCalculate() : button === 'C' ? handleClear() : handleButtonClick(button))}>
            {button}
          </button>
        ))}
      </div>
      <div>{result}</div>
    </div>
  );
}
