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
    firstNum += e.target.textContent;
    para.textContent = firstNum;
  } else {
    firstNum = result;
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

// MAIN SCOPE
let firstNum = '';
let secondNum = '';
let isFirst = true;
let result;
let operator;

const calcButtons = document.querySelectorAll('.num');
calcButtons.forEach((button) => {
  button.addEventListener('click', showAndStoreNumber);
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const para = document.querySelector('.calc-display p');
    if (isFirst) {
      result = evaluateResultAtStart(e);
      isFirst = false;
    } else result = operate(operator, +firstNum, +secondNum);
    secondNum = ''; //resetting the second number.
    operator = e.target.textContent; //setting operator to new value
    para.textContent = result; //displaying result
  });
});

const evalButton = document.querySelector('.evaluator');
evalButton.addEventListener('click', (e) => {
  if (isFirst) return;
  result = operate(operator, +firstNum, +secondNum);
  document.querySelector('.calc-display p').textContent = result;
});
