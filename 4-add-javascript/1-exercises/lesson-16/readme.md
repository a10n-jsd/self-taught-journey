### Exercises for Lesson 16

16a. In moneyTest.js, add a test case for formatCurrency(2000.4). This test checks if the code rounds down to the nearest cent. After creating the test case, re-run the tests after to see if your code is correct.

<hr>

16b. Add another test case for formatCurrency() and test with a negative number (you decide which number to use). Re-run the tests after. 

<hr>

`expect()` has another method we can use: ` toHaveBeenCalledWith()` This checks what values a mocked method received. For example:
`expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]')`
Checks if the code called `localStorage.setItem('cart', '[]')` at some point.

16c. In cartTest.js, in the first test, add an `expect(localStorage.setItem)` and check if setItem received the correct values. The first value should be `'cart'` and the second value should be the cart array that was saved (convert the cart array into a string using JSON.stringify since localStorage only supports saving strings).

<hr>

16d. In the second test in cartTest.js, also check if localStorage.setItem() received the correct values.

<hr>

16e. In cartTest.js, create a beforeEach() hook. Put the setup code `spyOn(localStorage, 'setItem')`; in it to share this code between the two tests.

<hr>

16f. In orderSummaryTest.js, create an afterEach() hook. Put the cleanup code `document.querySelector('.js-test-container')...` in it

<hr>

16g. In orderSummaryTest.js, in each test, check if the product name is display correctly on the page. (Hint: in orderSummary.js, you'll need to add a class to the name element in order to get it from the page).

<hr>
 
16h. In orderSummaryTest.js, check if the product prices are displayed correctly on the page. Each price should have a $ sign in front of it.

<hr>

#### Challenge Exercises

16i. In cartTest.js, create a test suite for the removeFromCart() function.
+ Mock `localStorage.setItem` and `localStorage.getItem` at the start.
+ Create a test: remove a productId that is in the cart.
+ Create a test: remove a productId that’s not in the cart (does nothing).
+ In each test, check if the cart looks correct. Also, check that `localStorage.setItem` was called once and with the correct values. (Note: your code doesn’t have to match the solution exactly).

<hr>

16j. In orderSummaryTest.js, create a test for updating the delivery option.

+ In orderSummary.js, add a class to each delivery option element (insert the productId and deliveryOptionId into this class).
+ Using the DOM, get the 3rd delivery option for the 1st product and click it.
+ Using the DOM, get the \<input> inside this 3rd delivery option (hint: add a class to the \<input> with the productId and deliveryOptionId). Test that this \<input> is now checked (the `.checked` property is `true`).
+ Check the cart.length is correct.
+ Check the first cart item's productId and deliveryOptionId are correct (the deliveryOptionId should be '3' now).
+ After updating the delivery option, the payment summary should be displayed on the page. Get the shipping price and total price from the payment summary and check if they're correct (`$14.98` & `$63.50`).

<hr>

16k. In cartTest.js, create a test suite for updateDeliveryOption()
+ Mock `localStorage.setItem` and `localStorage.getItem` at the start.
+ Create a basic test: update the delivery option of a product in the cart.
+ Check that the cart looks correct.
+ Check `localStorage.setItem` was called once with the correct values.

<hr>

16l. In cart.js, modify updateDeliveryOption() so if we give it a `productId` that is not in the cart, the function will `return` and do nothing (it does not update the cart and does not save to localStorage).
+ Create an edge case test: update the delivery option of a product that is not in the cart.
+ Check the cart looks correct and check that `localStorage.setItem` was not called.

<hr>

16m. Modify updateDeliveryOption() so if we give it a deliveryOptionId that does not exist, the function will `return` and do nothing.
+ Hint: to check if a deliveryOptionId exists, use `getDeliveryOption()` function in deliveryOptions.js and check if the result exists.
- Create an edge case test: use a deliveryOptionId that does not exist.
+ Check the cart looks correct and check that `localStorage.setItem` was not called.

<hr>

16n. (Optional) Generally, we create tests for each file of code. Examples: `money.js` => `moneyTest.js` and `cart.js` => `cartTest.js`

If you want more practice, choose some other files like `products.js` or `paymentSummary.js` and create tests for these. (Note: creating tests takes time so this exercise is optional. There's no solution code for this exercise, but you can check your code by re-running the tests).
