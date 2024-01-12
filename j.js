const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let firstOperand = '';
let secondOperand = '';
let operator = '';
let calculationHistory = [];

function handleClick(event) {
  const button = event.target;
  const value = button.dataset.value;

  if (button.classList.contains('number')) {
    const currentDisplay = display.textContent;
    if (operator !== '') {
      secondOperand += value;
    } else {
      firstOperand += value;
    }
    display.textContent = currentDisplay + value;
  } else if (button.classList.contains('operator')) {
    operator = value;
    calculationHistory.push(firstOperand);
    calculationHistory.push(operator);
    firstOperand = '';
  } else if (button.classList.contains('clear')) {
    firstOperand = '';
    secondOperand = '';
    operator = '';
    display.textContent = '';
    calculationHistory = [];
  } else if (button.id === 'equal') {
    calculationHistory.push(secondOperand);
    try {
      const result = calculate(firstOperand, secondOperand, operator);
      display.textContent = result;
      calculationHistory.push('=');
      calculationHistory.push(result);
      firstOperand = result;
      secondOperand = '';
      operator = '';
    } catch (error) {
      display.textContent = error.message;
    }
  }
}

buttons.forEach(button => button.addEventListener('click', handleClick));

function calculate(firstOperand, secondOperand, operator) {
  const firstNumber = parseFloat(firstOperand);
  const secondNumber = parseFloat(secondOperand);

  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      if (secondNumber === 0) {
        throw new Error('Cannot divide by zero');
      }
      return firstNumber / secondNumber;
    default:
      throw new Error('Invalid operator');
  }
}
