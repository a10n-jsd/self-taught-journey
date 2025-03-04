import { cart } from "../../data/cart-class.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/order.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    // First, Get the full product details using product id
    const product = getProduct(cartItem.productId);
    
    // Step to calculate the items price:
    // 1. loop through the cart
    // 2. for each product: price * quantity
    // 3. Add everything together
    productPriceCents += product.priceCents * cartItem.quantity;
    
    // Step to calculate cost of shipping
    // 1. loop through the cart
    // 2. Add everything together
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents;
    
  });

  // Total before tax
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  // Estimated tax: 10%
  const taxCents = totalBeforeTaxCents * 0.1;

  // Total cost
  const total = totalBeforeTaxCents + taxCents;

 const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        // get data that attached to the response
        // response.json() is also a promise so we can use await
        const order = await response.json() 
        // console.log(order);
  
        addOrder(order);
        
      } catch (error) {
        console.log('Unexpected error. Please try again later!')
      }

      window.location.href = 'orders.html';
    })
};