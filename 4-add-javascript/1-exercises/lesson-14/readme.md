### Exercises for Lesson 14 
In the checkout page, the header at the top always says “3 items”.
![](https://i.ibb.co.com/PWGG0Hk/checkout.png)

14a. In checkout.html, find the element that displays “3 items” and delete
the text inside. It should display “Checkout ()” when the page loads.
<hr>

14b. In checkout.js, when the page loads, calculate the actual quantity of
products in the cart, and display it in the header: ~ ${quantity} items"
Hints:
- In amazon.js, inside the function updateCartQuantity(), we wrote
some code to calculate the cart quantity. Reuse this code.
- In checkout.html, you'll need to add a class to the element so you
can select it with the DOM and change the innerHTML
<hr>

14c. Continuing from 14b, also calculate and display the quantity in the
header when clicking “delete”.
- First, create a function updateCartQuantity() and put the code from 14b inside
- Run this function when loading the page and when clicking delete (notice that this function doesn’t conflict with updateCartQuantity in amazon.js because we're using modules)
<hr>

14d. If we open the home page (amazon.html) notice the cart quantity in the top-right always starts at O.
- Remove the text “0” (so the cart quantity starts as blank)
![](https://i.ibb.co.com/fq0TrJY/cart.png)

- When the page loads, calculate the cart quantity and display it in
the top right (reuse the updateCartQuantity function)
<hr>

14e. Inside the function updateCartQuantity, we have some code that calculates the cart quantity (creates a variable, loops through the cart, and adds up all the quantities). Notice this code is repeated in
checkout.js and amazon.js.
- Create a function calculateCartQuantity() and move this code into the function so we can reuse it
- Put calculateCartQuantity() inside cart.js (because this code relates to the cart) and use export/import to share it between the 2 files

### Challenge Exercises
We'll make “Update” interactive step-by-step.
![](https://i.ibb.co.com/x5RRKHQ/Peek-2025-01-21-22-40.gif)

14f. In checkout.js, get all the "Update" links from the page and add a "click" event listener to each link. Also, attach the productId to each link. When clicking the link, get the productId and console.log() it.
<hr>

14g. Add 2 HTML elements after the "Update" link:

- an \<input class="quantity-input"> (for entering a new quantity)
- a \<span class="save-quantity-link">Save\</span> (to save the quantity)
- style the \<input> and set its width to 30px (put the styles in the file:
styles/pages/checkout/checkout.css)
![](https://i.ibb.co.com/pfp4kZL/checkout-style-22-41-38.png)
- add the class "link-primary" to the \<span>
<hr>

14h. Make "Save" appear when clicking "Update"
![](https://i.ibb.co.com/wQ9Mc5G/Peek-2025-01-21-22-42.gif)

- When clicking "Update", get the cart-item-container for the product, and add the class "is-editing-quantity" to the container (use .classList)
- In checkout.css, style the \<input> & "Save" link and add display: none; (they will be invisible at the start)
- The CSS ".is-editing-quantity .quantity-input { ... }" styles elements with class "quantity-input" inside an element with class "is-editing-quantity"
- Use this, and "display: initial;" (resets the display property) to make the \<input> appear when editing the quantity. Same for the "Save" link
<hr>

14i. Using similar CSS selectors as 14h, make the quantity and "Update" link disappear when editing the quantity.
![](https://i.ibb.co.com/HrKshsC/Peek-2025-01-21-22-43.gif)
<hr>

14j. Now we'll implement switching between "Update" and "Save"
![](https://i.ibb.co.com/XzQQCg8/Peek-2025-01-21-22-44.gif)

Add "click" event listeners to all "Save" links. When clicking "Save", do the opposite of "Update": get the cart-item-container for the product, and remove the class "is-editing-quantity". This should reverse all the styling that's applied when editing the quantity.
<hr>

14k. When clicking "Save", use the DOM to get the quantity \<input> for the product, and get the value inside (remember to convert this value to a number). This will be the new quantity of the product in the cart.
<hr>

14l. In cart.js, create a function updateQuantity(productId, newQuantity) which will find a matching productId in the cart, and update its quantity to the new quantity (remember to save to storage after).
- Then, import and use this function when clicking a "Save" link
<hr>

14m. Now that we've updated the quantity in the cart, the last step is to update the quantity in the HTML. Update these 2 places:
- Inside the product
- in the header at the top

![](https://i.ibb.co.com/qCS0gBB/2025-01-22-14-17-11.png)

<hr>

14n. Try to come up with more features to add to the "Update" link like:
- Add validation (check the new quantity is >= 0 and < 1000)
- Add keyboard support (allow updating by pressing ‘Enter’)
