function calculateCost() {
  const inputElement = document.querySelector('.js-input');

  let cost = Number(inputElement.value);

  if (cost < 40) {
    cost = (( cost * 100) + 1000) / 100;
  }

  document.querySelector('.js-cost').innerHTML = `$${cost}`;
}

function handleCostKeydown(event) {
  if (event.key === 'Enter') {
    calculateCost();
  }
}