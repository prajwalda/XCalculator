import "./index.css";
import {useState,useEffect} from "react"

export default function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

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
      setError('');
    } catch (error) {
      setResult('');
      setError('Error');
    }
  };

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    if (input.trim() === '' || isOperator(input.charAt(input.length - 1))) {
      setError('Invalid Expression');
    } else {
      calculate(input);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
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
      {error && <div className="error">{error}</div>}
      {result && !error && <div>{result}</div>}
    </div>
  );
}
