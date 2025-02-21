### Exercises for Lesson 17

17a. Let's practice OOP by creating a class that represents a car.
+ Create a new file `data/car.js`, and create a `class Car {}`
+ Give the Car class 2 properties: `brand` and `model`. Then, create a `constructor` that sets these 2 properties.
+ Keep all properties public for now (we'll learn why in a later exercise).
+ Use this class to generate a few car objects:
`{ brand: 'Toyota', model: 'Corolla' }`
`{ brand: 'Tesla', model: 'Model 3' }`
+ console.log the car objects.
+ in checkout.js, load `data/car.js` using the `import '...';` syntax, and check the console.

<hr>

17b. Add a method `displayInfo()` that console.logs `“${brand} ${model}"`

Run `.displayInfo()` for each car, and check the console.

<hr>

17c. Add a speed property, which represents how fast the car is going.
+ The `speed` should start at O.
+ Add 2 methods `go()` (increases speed by 5) and `brake()` (decreases speed by 5).
+ The speed should be limited between 0 and 200.
+ Update `displayInfo()` to display the speed at the end:
`${brand} ${model}, Speed: ${speed} km/h`
+ Call `go()` and `brake()` a few times for each car, call `displayInfo()` and check the console to confirm the code is working.

<hr>

17d. Add `isTrunkOpen` property, which tracks if the car's trunk is open.
+ Should be a boolean property (true = open, false = closed).
+ Create `openTrunk()` and `closeTrunk()`, which opens / closes the trunk.
+ `openTrunk()` should not work if the car is moving.
+ `go()` should not work if the trunk is open.
+ Update `displayInfo()` to display trunk info at the end. Try the code.

17e. Create a new `class RaceCar` which extends `Car`.
+ Race cars go faster than normal cars, so the `RaceCar` has an additional property `acceleration`. When using `go()`, increase the speed by `acceleration` instead of 5, and update the top speed to 300.
+ Race cars do not have a trunk. Update `openTrunk()` and `closeTrunk()`
+ Create a race car `{ brand: 'McLaren', model: 'F1', acceleration: 20 }` and try the code.

<hr>

17f. Make `brand` and `model` properties private (just like in real life, we
should not be able to change the brand and model of a car!)
+ Update `displayInfo()` with the private properties, and try the code.

<hr>

17g. Now, try making the `speed` property private.
+ Update the rest of the code and try the code.
+ Notice the speed output doesn't work because the RaceCar class cannot access the private `#speed` property (private properties can only be accessed in the same class. They can’t be accessed in a child class).
+ Therefore, we'll have to change speed back to public.
+ In other languages, a property can be `public`, `private`, Or `protected` (`protected` = it can be accessed inside a class and its child classes).
+ Object-Oriented Programming is less popular in JavaScript because it is missing some features of OOP, like `protected` properties.

<hr>

#### Challenge Exercises
17h. In the Amazon project, create a `class Appliance {}`
+ An appliance is a specific type of product (it extends `Product`).
+ It has 2 extra properties: `instructionsLink` and `warrantyLink`.
+ In the products array, add `type`, `instructionsLink`, and `warrantyLink` to the toaster (4th product).

+ Convert the toaster into an `Appliance` class instead of a `Product` class.
+ When displaying extra info, display the instructions and the warranty. Follow the design below:

![](https://i.ibb.co.com/cXsj3VsG/2025-02-19-14-38-11.png)

+ Find other products that are appliances (kettle, blender, etc.) and convert them to `Appliance` class.

<hr>

17i. Create tests for the `Product`, `Clothing`, and `Appliance` classes.
+ Create a new test file `data/productsTest.js` and load it in tests `.html`
+ Create a test suite for each class and create tests for each class.
(Export the classes, generate objects using each class, and check if the properties and methods are correct).
+ When testing `extraInfoHTML` you can use `expect(...).toContain(...)` to check if the result contains a certain string.
Note: you may want to create a copy of the project code for exercise 17j.

<hr>

17j. Replace all uses of the cart array with the cart class.
+ In `data/cart-class.js` export the `cart` object. Replace all uses of `import` ... `data/cart.js` with `import ... data/cart-class.js`
+ Update the code and the tests to make everything work again.
Hint: in the tests, instead of mocking `localStorage.getItem` you can just directly set `cart.cartItems = [...]`

