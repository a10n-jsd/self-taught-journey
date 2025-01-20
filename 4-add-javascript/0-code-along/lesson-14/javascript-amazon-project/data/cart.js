export const cart = [];

export function addToCart(productId) {
  // Steps to combine cart quantities
      // 1. Check if the product is already in the cart
      // 2. if is in the cart, increase quantity
      // 3. if is not, add to the cart
      
      let matchingItem;
      // 1. Check if the product is already in the cart
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem; // save it in a variable out of scope, later we can use it
        }

      })
      const quantitySelectorElem = document.querySelector(`.js-quantity-selector-${productId}`);
      const value = Number(quantitySelectorElem.value);

      // 2. if is in the cart, increase quantity
      if (matchingItem) {
        matchingItem.quantity += value;
      
      // 3. if is not, add to the cart
      } else {
        cart.push({
          // productId: productId,
          productId,
          quantity: value
        })
      }
}