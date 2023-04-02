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

function showValue(e) {
  const para = document.querySelector('.calc-display p');
  const paraText = para.textContent;
  const val = e.target.textContent;
  if (
    operators.includes(paraText[paraText.length - 1]) &&
    operators.includes(val)
  ) {
    para.textContent[paraText.length - 1] = val;
    return;
  }
  para.textContent += val;
}

function getNumbers(str) {
  return str.split(/-|\+|\/|\*/);
}

function getOperators(str) {
  return str.split('').filter((val) => operators.includes(val));
}

// MAIN SCOPE
const operators = ['+', '/', '-', '*'];

const calcButtons = document.querySelectorAll('.operator, .num');
calcButtons.forEach((button) => {
  button.addEventListener('click', showValue);
});

// const opButtons = document.querySelectorAll('.operator, .evaluator');
// opButtons.forEach((button) => {
//   button.addEventListener('click', storeValue);
// });
// tried via storing the values and stuff dynamically, but is easiest to do this at the end of operations!!! and also by using the reduce method.

const evalButton = document.querySelector('.evaluator');
evalButton.addEventListener('click', (e) => {
  const displayStr = document.querySelector('.calc-display p').textContent;
  const terms = getNumbers(displayStr);
  const usedOperators = getOperators(displayStr);
  console.log(displayStr, terms, usedOperators);
  let i = 1;
  const result = terms.reduce((total, term, index) => {
    if (index == 0 || index == 1) return total;
    total = operate(usedOperators[i], total, +term);
    i += 1;
    return total;
  }, operate(usedOperators[0], +terms[0], +terms[1]));
  console.log(result);
});

const clearButton = document.querySelector('.clear');
