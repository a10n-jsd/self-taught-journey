import { cart } from "../../data/cart-class.js";

export function renderAmazonHeaderRightSection() {
  const headerRightSectionHTML = 
  `
    <a class="orders-link header-link" href="orders.html">
      <span class="returns-text">Returns</span>
      <span class="orders-text">& Orders</span>
    </a>

    <a class="cart-link header-link" href="checkout.html">
      <img class="cart-icon" src="https://i.ibb.co.com/6FLYTmB/cart-icon.png">
      <div class="cart-quantity">${cart.calculateCartQuantity()}</div>
      <div class="cart-text">Cart</div>
    </a>
  `;

  document.querySelector('.js-amazon-header-right-section')
    .innerHTML = headerRightSectionHTML;

};