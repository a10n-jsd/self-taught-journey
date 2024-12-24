function calculateCost() {
  const inputElement = document.querySelector('.js-input');

  let cost = Number(inputElement.value);

  // Before do calculation, reset all previous text
  resetAllText()

  if (cost < 0) {
    document.querySelector('.js-error').classList
      .add('js-error-message');
    document.querySelector('.js-error')
      .innerHTML = 'Error: cost cannot be less than $0';
    return;
  }

  if (cost >= 0 && cost < 40) {
    cost = (( cost * 100) + 1000) / 100;
    
    document.querySelector('.js-cost').innerHTML = `$${cost}`;
    return;
  }
}

function handleCostKeydown(event) {
  if (event.key === 'Enter') {
    calculateCost();
  }
}

function resetAllText() {
  document.querySelector('.js-cost')
  .innerHTML = '';

  document.querySelector('.js-error').innerHTML = '';
}