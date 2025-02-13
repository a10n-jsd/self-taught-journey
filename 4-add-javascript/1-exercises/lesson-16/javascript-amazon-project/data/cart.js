import { checkDeliveryOption } from "./deliveryOptions.js";

export let cart; 

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
    // set initial item to development only
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
      
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

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
      // For compatibility with Lesson 16, this section must be skipped.
      // Need to be revisited after the course
      /*
      const quantitySelectorElem = document.querySelector(`.js-quantity-selector-${productId}`);
      const value = Number(quantitySelectorElem.value);
      */

      // 2. if is in the cart, increase quantity
      if (matchingItem) {
        // matchingItem.quantity += value;
        matchingItem.quantity += 1; // *lesson 16
      
      // 3. if is not, add to the cart
      } else {
        cart.push({
          // productId: productId,
          productId,
          // quantity: value,
          quantity: 1, // *lesson 16
          deliveryOptionId: '1' // set default value
        })
      }

      saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = []
      cart.forEach((cartItem) => {
        if (cartItem.productId !== productId ) {
          newCart.push(cartItem);
        }
      })
      cart = newCart;
      // console.log(cart);

      saveToStorage()
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

// Step to update delivery option
// 1. loop through the cart & find the product
// 2. update the deliveryOptionId of the product

export function updateDeliveryOption(productId, deliveryOptionId) {

  if (!checkDeliveryOption(deliveryOptionId)) {
    return;
  } 

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem; 
    }
  });

  if (!matchingItem) return;
  // use an early exit (return) can improve readability by reducing nesting and making it clear that subsequent code relies on matchingItem being truthy.

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}