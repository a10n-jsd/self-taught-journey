import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
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
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
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
      <div class="payment-summary-money">$${formatCurrency(total)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}