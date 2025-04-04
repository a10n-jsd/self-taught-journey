import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader() {
  const checkoutHeaderHTML = 
  `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="https://i.ibb.co.com/hmJ22kz/amazon-logo.png">
          <img class="amazon-mobile-logo" src="https://i.ibb.co.com/NYqCQbz/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link"
          href="amazon.html">${cart.calculateCartQuantity()}</a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="https://i.ibb.co.com/YNjY1RR/checkout-lock-icon.png">
      </div>
    </div>
  `;

  document.querySelector('.js-checkout-header')
    .innerHTML = checkoutHeaderHTML;

};