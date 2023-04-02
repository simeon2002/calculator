// FUNCTIONS SCOPE
function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return substract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  }
}

function showAndStoreNumber(e) {
  const para = document.querySelector('.calc-display p');
  para.textContent = '';
  if (isFirst) {
    if (hasDecimal && e.target.textContent === '.') {
      para.textContent = firstNum;
      return;
    }
    if (e.target.textContent === '.') hasDecimal = true;
    firstNum += e.target.textContent;
    para.textContent = firstNum;
  } else {
    firstNum = result;
    if (hasDecimal && e.target.textContent === '.') {
      para.textContent = secondNum;
      return;
    }
    if (e.target.textContent === '.') hasDecimal = true;
    secondNum += e.target.textContent;
    para.textContent = secondNum;
  }
}

function evaluateResultAtStart(e) {
  operator = e.target.textContent;
  if (operator === '/' || operator === '*') {
    return operate(operator, +firstNum, 1);
  } else {
    return operate(operator, +firstNum, 0);
  }
}

function displayResult() {
  const para = document.querySelector('.calc-display p');
  para.textContent = result === Infinity ? 'NASTY ERROR' : result;
}

// MAIN SCOPE
let firstNum = '';
let secondNum = '';
let isFirst = true;
let hasDecimal = false;
let result;
let operator;

const calcButtons = document.querySelectorAll('.num');
calcButtons.forEach((button) => {
  button.addEventListener('click', showAndStoreNumber);
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (isFirst) {
      result = evaluateResultAtStart(e);
      isFirst = false;
    } else result = operate(operator, +firstNum, +secondNum);
    console.log(result, firstNum, secondNum);
    secondNum = ''; //resetting the second number.
    hasDecimal = false;
    operator = e.target.textContent; //setting operator to new value
    displayResult();
  });
});

const evalButton = document.querySelector('.evaluator');
evalButton.addEventListener('click', (e) => {
  if (isFirst) return;
  result = operate(operator, +firstNum, +secondNum);
  console.log(result, firstNum, secondNum);
  displayResult();
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', (e) => {
  //resetting everything (including isFirst again)
  isFirst = true;
  firstNum = '';
  secondNum = '';
  operator = '';
  const para = document.querySelector('.calc-display p');
  para.textContent = '';
});
