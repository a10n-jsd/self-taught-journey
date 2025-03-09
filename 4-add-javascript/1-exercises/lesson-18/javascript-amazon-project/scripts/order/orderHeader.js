import { cart } from "../../data/cart-class.js";

export function renderOrderHeader() {
  const orderHeaderHTML = 
  `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="https://i.ibb.co.com/Sdv3zDq/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="https://i.ibb.co.com/j5Sjj4t/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar" type="text" placeholder="Search">

      <button class="search-button">
        <img class="search-icon" src="https://i.ibb.co.com/Npb4kgN/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="https://i.ibb.co.com/6FLYTmB/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">${cart.calculateCartQuantity()}</div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;

  document.querySelector('.js-amazon-header')
    .innerHTML = orderHeaderHTML;

};