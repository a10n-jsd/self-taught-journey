import { cart} from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js";

async function loadPage() {
  await loadProductsFetch();
  renderProductsGrid();
}

loadPage();


function renderProductsGrid() {

  let productsHTML = '';

  // Search products
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  // use filteredProduct instead products only
  let filteredProduct = products;

  if (search) {
    // The filter() method creates a new array filled with elements that pass a test provided by a function.
    // Read more: https://w3schools.com/jsref/jsref_filter.asp
      filteredProduct = products.filter((product) => {
        let matchingKeyword = false;

        product.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(search.toLowerCase())) {
            matchingKeyword = true;
          }
        });

        // a test provided by a function
        return matchingKeyword || product.name.includes(search);
        // If matchingKeyword is true, the filter() method will include the current product in the new filteredProduct array, based on the test provided by the condition in line 30: keyword.toLowerCase().includes(search.toLowerCase()).
        
        // If matchingKeyword is false, the filter() method will use the alternative test product.name.includes(search) to determine whether to include the product in the new filteredProduct array.

      })
  }

  // Line 23 explanation
  // If there is search value, we use custom filteredProduct instead just an original filterProduct
  // 



  filteredProduct.forEach((product) => {

    productsHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${product.getStarsUrl()}>
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <!-- Here are the benefit of polymorphism from OOP -->
            <!-- polymorphism = use a method without knowing the class -->
            <!-- so, We don't need an if statement or ternary op. here -->
            <!-- the class will determine what method is being used -->
            <!-- Just overriding parents method -->
            ${product.getExtraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-message-${product.id}">
              <img src="https://i.ibb.co.com/cNWynSQ/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `
  })

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Use an object to save the timeout ids.
  // The reason is because each product
  // will have its own timeoutId. So an object can
  // save multiple timeout ids for different products.
  // For example:
  // {
  //   'product-id1': 2,
  //   'product-id2': 5,
  //   ...
  // }
  // (2 and 5 are ids that are returned when calling setTimeout).
  const timeoutIDs = {};

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        // console.log(button.dataset.productId); // product-name to productId

        // const productId = button.dataset.productId;
        const {productId} = button.dataset;

        cart.addToCart(productId);
        updateCartQuantity();
        displayMessage(productId);
      })
  })

  updateCartQuantity();

  function displayMessage(productId) {
    const addedToCartElem = document.querySelector(`.js-added-message-${productId}`);
        
    addedToCartElem.classList
      .add('added-to-cart--visible');
    
    const previousTimeoutId = timeoutIDs[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
  
    const timeoutID = setTimeout(() => {
      addedToCartElem.classList.remove('added-to-cart--visible');
    }, 2000)

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    // For example:
    // {
    //   'product-id1': 2,
    //   'product-id2': 5,
    //   ...
    // }
    // (2 and 5 are ids that are returned when calling setTimeout).
    timeoutIDs[productId] = timeoutID;
  }

  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
  const searchBarElement = document.querySelector('.js-search-bar');
  const search = searchBarElement.value;
  
  window.location.href = `amazon.html?search=${search}`;
});
}

export function updateCartQuantity() {
  // Steps to make the cart interactive
  // 1. calculate the quantity
  // 2. put the quantity on the page

  // After updated the cart, we can start calculation
  const cartQuantity = cart.calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}