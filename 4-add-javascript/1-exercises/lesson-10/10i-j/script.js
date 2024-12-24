let calculation = '';
let memory = localStorage.getItem('memory') || '0';

const displayElement = document.querySelector('.js-calc-display');

function updateCalculation(key) {
  
  if (key === '=') {
    // save operation to new variable 
    memory = calculation;
    
    // Avoid using eval() in real world projects
    calculation = eval(calculation);
    
    memory = memory + ' = ' + String(calculation);
    localStorage.setItem('memory', memory);
    
    displayElement.innerHTML = calculation;
    return;
  }
    calculation += `${key}`;
    displayElement.innerHTML = calculation;
  }
  
function clearAll() {
  calculation = '';
  // localStorage.removeItem('memory');
  // memory = '0';
  displayElement.innerHTML = '0';
}
  
function clearEntry() {
  if (typeof calculation === 'string') {
    if (calculation.length <= 1) {
      calculation = '';
      displayElement.innerHTML = '0';
      return;
    }
    calculation = calculation.slice(0, -1);
    displayElement.innerHTML = calculation;
    
  } else {
    calculation = '';
    displayElement.innerHTML = '0';
  }
}

function getLastCalculation() {
  displayElement.innerHTML = `${memory}`;
}
