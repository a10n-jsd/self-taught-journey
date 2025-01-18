### Exercises for lesson 13

To do the exercises you can either:
1. Create a copy of the ‘javascript-amazon-project’ folder (for example, “13-javascript-amazon-project’) and do the exercises in the copy.
- Advantage = exercises won't affect original folder.
2. Do the exercises directly in the ‘javascript-amazon-project’ folder.
- Advantage = you can combine everything together (everything we build in the course and everything we build in the exercises).
- Disadvantage = your code won't exactly match the video.
I recommend Option 1 since it's easier to follow the video, but if you want to challenge yourself, you can do Option 2.

> We'll create the quantity selector step by step.
When adding a product to the cart, instead of increasing the quantity by 1, we'll increase the quantity by the number in the selector.

![](https://i.ibb.co.com/99ftr2P/exercises13001.png)


13a. The HTML element for a dropdown selector is \<select>. Use Ctrl + F or Cmd + F to find this in the code (in amazon.js).

13b. When generating the HTML, add a unique class to \<select> to identify which product the dropdown is for (class="js-quantity-selector-${product.id}")

13c. When clicking the ‘Add to Cart’ button, use the DOM to get the quantity selector (the \<select> element) for the product. Hint: use document.querySelector(".js-quantity-selector-${productId}’)

13d. Get the value selected in the quantity selector (to get the value out of a \<select> element, you can use the property ‘value’)

13e. When updating the cart, instead of using a quantity of 1 every time, use the quantity that we got from 13d. Hint: in order for the math to work properly, convert the value from 13d into a number first using Number() (since values we get from the DOM are strings by default).

13f. Select a quantity other than 1 and click ‘Add to Cart’. The quantity selector should now work. Check the changes for 13a - 13e in Git and commit the changes.

For the rest of the exercises, commit the changes into Git after finishing.

13g. We'll add some more products to the page.
- Inside data/products.js add some more objects to the array.
- For the id, use any id that you want, like ‘id1’, ‘id2’, etc. (just make sure
its unique).
+ For the image, I've provided "images/products/backpack.jpg" and
"images/products/umbrella.jpg" or find an image yourself online.
+ For the name, rating, and priceCents, use any values that you want.

13h. We'll review some JavaScript shortcuts we can use. In amazon.js:
+ Search for the code ‘const productId = button.dataset.productId;’ and
use the destructuring shortcut to simplify it.
+ Search for ‘cart.push({’ and use shorthand property in the 2 lines
below this code.

#### Challenge Exercises

We'll create the ‘Added’ message on the right. The HTML element for this already exists:
\<div class="added-to-cart">
![](https://i.ibb.co.com/sF1yXLR/Peek-2025-01-18-04-37.gif)

However, in the CSS, this element has opacity: O (it’s invisible).

13i. Add a unique class to this element (like we did in exercise 13b) to identify which product it is for.

13j. When clicking ‘Add to Cart’, use the DOM to get the ‘Added’ message element for the product (like we did in exercise 13c).

13k. Add a class to the message element using .classList.add(). Then, in styles/pages/amazon.css, style this class so it has opacity: 1;

13l. After 2 seconds (use setTimeout), make the message disappear by removing the class.

13m. If we click ‘Add to Cart’, wait 1 to 1.5 seconds, and click again, the
message disappears quickly (since the previous setTimeout is still running and will make the message disappear soon).
+ Modify the code so when we click ‘Add to Cart, it “refreshes” the 2
second wait time (waits 2 seconds again and message disappears)
+ Hint: you can cancel the previous setTimeout using clearTimeout()

![](https://i.ibb.co.com/gTCF2Zq/Peek-2025-01-18-04-39.gif)