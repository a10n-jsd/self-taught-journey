class Car {
  // just like in real life, we should not be able to change the brand and model of a car!
  #brand;
  #model;
  #speed;
  // Assignment here is a shortcut in constructor
  // #speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.#speed = 0;
    // this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.#speed} km/h, Trunk: ${trunkStatus}`)
  }

  go() {
    // should not move if trunk is open
    if (!this.isTrunkOpen) {
      this.#speed += 5;
    }

    // limit the speed to 200
    if (this.#speed > 200) {
      this.#speed = 200;
    }
  }

  brake() {
    this.#speed -= 5;

    // limit the speed to 0
    if (this.#speed < 0) {
      this.#speed = 0;
    }
  }

  openTrunk() {
    if (this.#speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    // limit the speed to 200
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }
  
  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}

const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

console.log(raceCar1);

const car1 = new Car({
  brand: 'Toyota', 
  model: 'Corolla'
});
console.log(car1);

const car2 = new Car({
  brand: 'Tesla', 
  model: 'Model 3'
});
console.log(car2);

// Car should not moving since trunk is currently open
car1.openTrunk();
car1.displayInfo();

// Car should moving since trunk is now closed
car1.closeTrunk()
car1.go();
car1.displayInfo();

car2.go()
car2.go()
car2.brake()
car2.displayInfo();

raceCar1.go();
raceCar1.displayInfo();
// Notice the speed output doesn't work (show the initial value: 0) because the RaceCar class cannot access the private `#speed` property (private properties can only be accessed in the same class. They can’t be accessed in a child class)

/*
+ In other languages, a property can be `public`, `private`, Or `protected` (`protected` = it can be accessed inside a class and its child classes).

+ Object-Oriented Programming is less popular in JavaScript because it is missing some features of OOP, like `protected` properties.
*/