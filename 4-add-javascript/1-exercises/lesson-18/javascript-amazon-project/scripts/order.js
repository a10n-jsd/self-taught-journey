import { orders } from "../data/order.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { renderOrderHeader } from "./order/orderHeader.js";

async function renderOrderPage() {
  // Since we load products from the backend, getProduct() will return undefined without loadProductsFetch()
  await loadProductsFetch();

  let orderHTML = '';
  
  orders.forEach((order) => {
    // console.log(order)
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    orderHTML += 
    `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
  
        <div class="order-details-grid">
          ${renderProductsOrder(order)}
        </div>
      </div>
    `
  })

  function renderProductsOrder(order) {
    let productListHTML = '';
    
    // console.log(order.products);
    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);
      
      productListHTML += 
        `
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">${product.name}</div>

            <div class="product-delivery-date">
              Arriving on: ${
                dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
              }
            </div>

            <div class="product-quantity">
              Quantity: ${productDetails.quantity}
            </div>

            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>

          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `
    });

    return productListHTML;
  }

  document.querySelector('.js-order-grid').innerHTML = orderHTML;
}

renderOrderHeader()
renderOrderPage();