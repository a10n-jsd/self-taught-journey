import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// lesson 17: Object Oriented Programming
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// lesson 18:
// import '../data/backend-practice.js';
import { loadCart } from "../data/products.js";

// Main idea of JavaScript:
// 1. Save the data (Model)
// 2. Generate html (View)
// 3. Make it interactive (Controller)
// Note: MVC is design pattern in software development

/*
async function loadPage() {
  // async is a shortcut of promise
  // async make a function return a promise
  console.log('load page');

  // await: let wait for promises to finish but in a normal code (line by line)
  await loadProductsFetch();
}

loadPage().then(() => {
  console.log('next step');
})
*/

async function loadPage() {
  // error handling for async-await with try-catch
  try {
    await loadProductsFetch();

    // loadCart() still using callback, not a fetch()
    // const value = await loadCartFetch();
    await new Promise((resolve) => {
      loadCart(() => {
        resolve('a cart value');
      })
    });
  
  } catch (error) {
    console.log('Unexpected error. Please try again later!');
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('a cart value');
    })
  })

]).then((values) => {
  // console.log(values); // values[0], values[1]
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  // resolve() same with done() from jasmine for controlling when to go to next step
  loadProducts(() => {
    resolve('a product value');
  })

}).then((value) => {
  console.log(value); // 'a value'

  return new Promise((resolve) => {
    loadCart(() => {
      resolve('a value again');
    })
  })

}).then((cartValue) => {
  console.log(cartValue);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// callback with anonymous function
// the problem with callback: a lot of nesting
// promises: flatten the code
/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
})
*/