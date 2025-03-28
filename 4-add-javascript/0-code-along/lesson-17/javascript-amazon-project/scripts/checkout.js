import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// lesson 17: Object Oriented Programming
// import '../data/cart-oop.js';
// import '../data/cart-class.js';

// Main idea of JavaScript:
// 1. Save the data (Model)
// 2. Generate html (View)
// 3. Make it interactive (Controller)
// Note: MVC is design pattern in software development
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
