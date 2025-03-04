### Exercises for Lesson 18

For the first few exercises, put your code in a file called “lesson18.html".
Use the backend URL: https://supersimplebackend.dev

18a. Using XMLHttpRequest, make a GET request to /greeting and display
the response in the console.

<hr>

18b. Using fetch(), make the same request GET /greeting and display the response in the console. Note: this URL path responds with some text, so instead of using `response.json()`, use `response.text()`

<hr>

18c. Make the same request GET /greeting as 18b, but using fetch() and async await. Note: in order to use `await`, put your code inside an `async function` first, and then run the function.

<hr>

18d. Using fetch() and async await, create a POST request to /greeting. In your request, send the JSON { name: "your_name" } (send your own name instead of your_name). Display the response in the console.

Notice that even though GET /greeting and POST /greeting use the same URL path /greeting, they do different things.

<hr>

18e. Try making a GET request to https://amazon.com. You'll get an error known as a CORS (Cross-Origin Resource Sharing) error. This means the URL your code is running on (probably http://127.0.0.1:5500) is different than https://amazon.com, so Amazon's backend blocked your request for security reasons. Your code is correct, Amazon needs to change some settings in their backend to allow your requests.

<hr>

18f. Add error handling to 18e. When there’s an error, display 'CORS error. Your request was blocked by the backend.' in the console.

<hr>

18g. Make a request POST /greeting to https://supersimplebackend.dev/greeting, but don’t send any data (don't send a `body`). My backend will give back a 400 error (invalid request). fetch() does not throw an error for 400 errors (only network errors) so we'll manually create an error:
+ Check `if (response.status >= 400)` and manually create an error using `throw response;`
+ Add error handling to catch this manual error. When the error is caught, check `if (error.status === 400)` and display the JSON attached to the response in the console: `await error.json()`
+ Otherwise, display 'Network error. Please try again later.’

<hr>

The rest of these exercises will be done in the project code.

18h. In data/cart.js, create an `async function loadCartFetch()` and create an async await version of `loadCart()`. console.log() the text attached to the response. In scripts/checkout.js, inside `loadPage()`, replace `loadCart()` with `loadCartFetch()`.

<hr>

18i. In checkout.js, use Promise.all to run `loadProductsFetch()` and `loadCartFetch()` at the same time. Note: give the promises directly to Promise.all (don't `await` them, otherwise they will run one at a time). Then, use `await Promise.all(...)` to wait for Promise.all to finish.

<hr>

18j. In orderSummaryTest.js, in the beforeAll hook, instead of using a done function, make the inner function `async` and use `await` to wait for `loadProductsFetch()` to finish.

<hr>

18k. (Optional) If you did the exercises from the previous lessons, you may
have some failing tests. Fix those failing tests (if there are any).

#### Challenge Exercises

Note: in these next exercises, you will independently create entire pages
and features, so you can practice figuring things out yourself. Good luck!

18l. We'll finish the orders page. Create a new file `scripts/orders.js` for creating the orders page, and load it in `orders.html`. Using the array of orders in `data/orders.js`, generate the HTML for this page.

<hr>

18m. Make the orders page interactive:
+ “Buy it again” button should add the product to the cart.
+ “Track package” button should open the tracking page (remember to insert the orderId and productId into the URL parameters).

<hr>

18n. We'll finish the tracking page. Create a new file `scripts/tracking.js` and load it in `tracking.html`. Then, go to the orders page, and click “Track package” to go to the tracking page. This will save the `orderId`
and `productId` in the URL parameters (make the URL always has these 2 parameters, otherwise the tracking page won't work).
+ Use `orderId` and `productId` from the URL parameters to get the order and product to track. Use this data to generate the HTML for this page.

<hr>

18o. Make the tracking page interactive:
+ Calculate the percent progress of the delivery:
((currentTime - orderTime) / (deliveryTime - orderTime)) * 100
+ Set the width of the green progress bar to this percent. 
Hint: add the style attribute: style="width: _%;"
+ Set the correct status above the progress bar to green (0% - 49% = Preparing, 50% - 99% = Shipped, 100+% = Delivered).

<hr>

18p. At the top of the home page (amazon.html) there's a search bar:

+ When you type in the search bar and press the search button, it should go to the home page (amazon.html) and also save your search in a URL parameter: `amazon.html?search=your_search`
+ On the home page, check if there's a URL parameter called search. If it exists, filter the products on the home page and only show products whose name contains what you searched (hint: use `.includes()`).

<hr>

18q. We'll improve the search feature from 18p:
+ Make the search case-insensitive (capitals don’t matter).
+ Each product has a property called “keywords”. Add this property to the Product class. When filtering the products, also check if one of the keywords contains what you searched (case-insensitive).

<hr>

18r. Add some more features to this project that you think makes sense.

