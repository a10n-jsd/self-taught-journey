import { getOrder } from "../data/order.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from "../data/products.js";

async function renderTrackingPage() {
  await loadProductsFetch();

  let trackingHTML = '';
  
  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId'); 
  // console.log(url.searchParams.get('productId'));
  const orderId = url.searchParams.get('orderId'); 
  // console.log(url.searchParams.get('orderId'));

  // Instead add data attribute into orderHTML, we can use orderId and productId from the URL parameters to get the order and product 
  const order = getOrder(orderId);
  // console.log(order);
  const product = getProduct(productId)
  // console.log(product);

  // get additional product detail: estimatedDeliveryTime
  let productDetails;
  // console.log(order.products);
  order.products.forEach((productItem) => {
    // console.log(productItem);
    if (productItem.productId === product.id) {
      productDetails = productItem;
    } 
  });
  // console.log(productDetails);

  const arrivingTimeString = dayjs(
    productDetails.estimatedDeliveryTime)
    .format('dddd, MMMM D');
    
   trackingHTML = 
    `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${arrivingTimeString}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

renderTrackingPage();