let productsHTML = '';

products.forEach((product) => {

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
              src=${pickRating(product.rating.stars)}>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
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

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // console.log(button.dataset.productId); // product-name to productId

      const productId = button.dataset.productId;
      // Steps to combine cart quantities
      // 1. Check if the product is already in the cart
      // 2. if is in the cart, increase quantity
      // 3. if is not, add to the cart
      
      let matchingItem;
      // 1. Check if the product is already in the cart
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item; // save it in a variable out of scope, later we can use it
        }

      })
      
      // 2. if is in the cart, increase quantity
      if (matchingItem) {
        matchingItem.quantity++;
      
      // 3. if is not, add to the cart
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        })
      }
      
      // Steps to make the cart interactive
      // 1. calculate the quantity
      // 2. put the quantity on the page

      // After updated the cart, we can start calculation
      let cartQuantity = 0
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

      console.log(cartQuantity);

      console.log(cart);
    })
})




// Since I archive JavaScript Amazon project on Github repo,
// Loading the image locally will increase the upload file size.
function pickRating(stars) {
  if (stars === 0) {
    return 'https://i.ibb.co.com/7zh8XJW/rating-0.png';
  }

  if (stars === 0.5) {
    return 'https://i.ibb.co.com/DbmyjRf/rating-05.png';
  }

  if (stars === 1.0) {
    return 'https://i.ibb.co.com/2WyNY9x/rating-10.png';
  }

  if (stars === 1.5) {
    return '';
  }

  if (stars === 2.0) {
    return 'https://i.ibb.co.com/s6twLWf/rating-20.png';
  }

  if (stars === 2.5) {
    return 'https://i.ibb.co.com/pjv1fFR/rating-25.png';
  }

  if (stars === 3.0) {
    return 'https://i.ibb.co.com/3S3WXXj/rating-30.png';
  }

  if (stars === 3.5) {
    return 'https://i.ibb.co.com/BjLwNzg/rating-35.png';
  }

  if (stars === 4.0) {
    return 'https://i.ibb.co.com/Npj0thX/rating-40.png';
  }

  if (stars === 4.5) {
    return 'https://i.ibb.co.com/5vpNBVh/rating-45.png';
  }

  if (stars === 5.0) {
    return 'https://i.ibb.co.com/4FT2ZGR/rating-50.png';
  }
}