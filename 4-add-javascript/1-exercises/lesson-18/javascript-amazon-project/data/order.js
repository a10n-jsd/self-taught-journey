import { cart } from "./cart-class.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();

  // After place order, cart should be empty
  cart.cartItems.forEach((item) => {
    cart.removeFromCart(item.productId);
  })
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}