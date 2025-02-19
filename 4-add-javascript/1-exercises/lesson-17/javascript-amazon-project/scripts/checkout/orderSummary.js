import { 
  cart, 
  removeFromCart, 
  updateDeliveryOption, 
  updateQuantity
} from '../../data/cart.js';
import { 
  calculateDeliveryDate,
  deliveryOptions, 
  getDeliveryOption 
} from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  // We make this function because:
  // problem: we need to update the page one by one
  // when data is changed
  // it's better regenerate the html with a function

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    
    // normalizing or de-duplicating data
    // use id from the cart and get the detail from products
    const matchingProduct = getProduct(cartItem.productId);

    // Step to get delivery date:
    // 1. loop through the deliveryOptions 
    // 2. matching delivery id between cart.js and deliveryOptions.js
    // 3. put on the page with right formatting
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += 
    `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">${matchingProduct.name}</div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              $${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link js-delete-link 
                js-delete-link-${matchingProduct.id} link-primary" 
                data-product-id=${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${createDeliveryOptionHTML(matchingProduct, cartItem)}        
          </div>
        </div>
      </div>
    `
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Step to create delivery option html:
  // 1. loop through deliveryOptions
  // 2. for each option, generate some html
  // 3. combine the html together

  function createDeliveryOptionHTML(matchingProduct, cartItem) {
    let deliveryOptionHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      
      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId 
        ? 'checked'
        : ''
      ;

      deliveryOptionHTML += 
        `
          <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
            data-product-id=${matchingProduct.id}
            data-delivery-option-id=${deliveryOption.id}
          >
            <input type="radio" ${isChecked}
              class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    });
    return deliveryOptionHTML;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
  });

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        // console.log(productId);

        // step to delete:
        // 1. Make a new array
        // 2. loop through the cart
        // 3. Add each product to new array except the productId

        // let's make a function inside the cart.js
        removeFromCart(productId);

        renderCheckoutHeader();

        renderOrderSummary();

        renderPaymentSummary();
    })
  });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        container.classList.add('is-editing-quantity');
      })
  });

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      
      // Click event
      link.addEventListener('click', () => {
        // The quantityInput variable is passed as an argument to give handleUpdateQuantity function to access it
        handleUpdateQuantity(productId, quantityInput);
      });
      
      // Keydown event
      quantityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleUpdateQuantity(productId, quantityInput);
        }
      });
  });
    
  function handleUpdateQuantity(productId, quantityInput) {
    const newQuantity = Number(quantityInput.value);

    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 1 and less than 1000 ');
      return; // early return
    }

    updateQuantity(productId, newQuantity);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

    // We can delete the code below
    // because instead of using the DOM to update the page directly
    // we can use MVC and re-render everything. This will make sure
    // the page always matches the data.
    
    // const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    // quantityLabel.innerHTML = newQuantity;
  }
}