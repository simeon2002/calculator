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
    if (hasDecimal && e.target.textContent === '.') {
      para.textContent = secondNum;
      return;
    }
    if (e.target.textContent === '.') hasDecimal = true;
    secondNum += e.target.textContent;
    para.textContent = secondNum;
  }
}

function showAndStoreNumberKeyboard(e) {
  const para = document.querySelector('.calc-display p');
  para.textContent = '';
  if (isFirst) {
    if (hasDecimal && e.key === '.') {
      para.textContent = firstNum;
      return;
    }
    if (e.key === '.') hasDecimal = true;
    firstNum += e.key;
    para.textContent = firstNum;
  } else {
    firstNum = result;
    if (hasDecimal && e.key === '.') {
      para.textContent = secondNum;
      return;
    }
    if (e.key === '.') hasDecimal = true;
    secondNum += e.key;
    para.textContent = secondNum;
  }
}

function evaluateResultAtStart(e) {
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

function reset() {
  isFirst = true;
  firstNum = '';
  secondNum = '';
  operator = '';
  const para = document.querySelector('.calc-display p');
  para.textContent = '';
}

function undoNumber() {
  //removes the last digit of a firstnum of secondnum depeending on isFirst
  const para = document.querySelector('.calc-display p');
  if (isFirst) {
    firstNum = firstNum.slice(0, -1);
    para.textContent = firstNum;
  } else {
    secondNum = secondNum.slice(0, -1);
    para.textContent = secondNum;
  }
}

// MAIN SCOPE
let firstNum = '';
let secondNum = '';
let isFirst = true; //different behavior dependent on whether an operation has already been executed or not
let hasDecimal = false; //tells whether there is a decimal present in number
let result;
let operator;
const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operatorKeys = ['+', '-', '*', '/'];

const calcButtons = document.querySelectorAll('.num');
calcButtons.forEach((button) => {
  button.addEventListener('click', showAndStoreNumber);
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    breakme: if (isFirst) {
      operator = e.target.textContent;
      result = evaluateResultAtStart(e);
      isFirst = false;
    } else {
      if (secondNum === '') {
        break breakme; // ADDED CODE
      }
      result = operate(operator, +firstNum, +secondNum);
      firstNum = result;
      secondNum = ''; //resetting the second number.
    }
    console.log(result, firstNum, secondNum); // TROUBLESHOOT
    hasDecimal = false;
    operator = e.target.textContent; //setting operator to new value
    displayResult();
  });
});

const evalButton = document.querySelector('.evaluator');
evalButton.addEventListener('click', (e) => {
  if (isFirst) return;
  if (secondNum !== 0) {
    result = operate(operator, +firstNum, +secondNum);
  }
  console.log(result, firstNum, secondNum); //TROUBLESHOOT
  displayResult();
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', reset);

const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', undoNumber);

// adding keyboard support
document.addEventListener('keydown', (e) => {
  // displaying keyboard input
  if (numberKeys.includes(e.key)) {
    showAndStoreNumberKeyboard(e);
  }
  // executing operation.
  else if (operatorKeys.includes(e.key)) {
    breakme: if (isFirst) {
      operator = e.key;
      result = evaluateResultAtStart(e);
      isFirst = false;
    } else {
      if (secondNum === '') {
        break breakme; // ADDED CODE
      }
      result = operate(operator, +firstNum, +secondNum);
    }
    console.log(result, firstNum, secondNum); // TROUBLESHOOT
    hasDecimal = false;
    operator = e.key; //setting operator to new value
    displayResult();
    secondNum = ''; //resetting the second number.
  }
  // backspace option
  else if (e.key === 'Backspace') undoNumber();
  // clear option
  else if (e.key === 'Escape') reset();
  else if (e.key === 'Enter') {
    if (isFirst) return;
    if (secondNum !== 0) {
      result = operate(operator, +firstNum, +secondNum);
      firstNum = result;
      secondNum = '';
    }
    console.log(result, firstNum, secondNum); //TROUBLESHOOT
    displayResult();
  }
});
