import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  // Two things to test:
  // 1. How the page looks
  // 2. How the page behaves

  it('displays the cart', () => {
    spyOn(localStorage, 'setItem');
    // Since we don't have element with class 'js-order-summary' in the test
    // we make one and put it a div to be it's container 
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
    `;

    // renderOrderSummary take data from the cart
    // we don't want to make a mess within localStorage
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
          
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();

    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
    document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    // Clean the page after test done
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('removes a product', () => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
          
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();

    renderOrderSummary();

    document.querySelector(`.js-delete-link-${productId1}`).click();

    // Check that after delete product-1, the cart only contain an item
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);

    // Clean the page after test done
    document.querySelector('.js-test-container').innerHTML = '';

  });
}) 