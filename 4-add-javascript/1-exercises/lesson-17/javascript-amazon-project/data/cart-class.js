import { checkDeliveryOption } from "./deliveryOptions.js";

// use PascalCase for things that generate objects
class Cart {
  cartItems;
  localStorageKey; // Make it public again since need to be accessed in test file.

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    // Steps to combine cart quantities
    // 1. Check if the product is already in the cart
    // 2. if is in the cart, increase quantity
    // 3. if is not, add to the cart
        
    let matchingItem;
    // 1. Check if the product is already in the cart
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem; // save it in a variable out of scope, later we can use it
      }
    });
    
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
      this.cartItems.push({
        // productId: productId,
        productId,
        // quantity: value,
        quantity: 1, // *lesson 16
        deliveryOptionId: '1' // set default value
      })
    }

      this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = []
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId ) {
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    // console.log(cart);

    this.saveToStorage()
  }

  // Step to update delivery option
  // 1. loop through the cart & find the product
  // 2. update the deliveryOptionId of the product
  
  updateDeliveryOption(productId, deliveryOptionId) {

    if (!checkDeliveryOption(deliveryOptionId)) {
      return;
    } 

    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem; 
      }
    });

    if (!matchingItem) return;
    // use an early exit (return) can improve readability by reducing nesting 
    // and making it clear that subsequent code relies on matchingItem being truthy.

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    
    matchingItem.quantity = newQuantity;
    
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    
    matchingItem.quantity = newQuantity;
    
    this.saveToStorage();
  }
}

export const cart = new Cart('cart-oop');
/*
// Create multiple objects
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
*/