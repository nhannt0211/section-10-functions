'use strict';

/**
 * 127. Default Parameters
 */
/*
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
  //ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price
  }

  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 100, 200);
createBooking('LH123', 100);

createBooking('LH123', undefined, 1000)
*/


/**
 * 128. How passing arguments works: Value vs Reference
 */
/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schemedtmann',
  passport: 4151511421
}

const checkIn = function(flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 4151511421) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
}

// checkIn(flight, jonas)
// console.log(flight);
// console.log(jonas);

//Is the same as doing
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function(person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(jonas);

checkIn(flight, jonas);
console.log(jonas);
*/


/**
 * 130. Functions Accepting Callback Functions
 */
/*
const oneWord = function(str) {
  return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
}

//JS use callbacks
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function() {
  console.log('👋');
}

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5)
*/


/**
 * 131. Functions Returning Functions
 */
/*
const greet = function(greeting) {
  return function(name) {
    console.log(`${greeting} - ${name}`);
  }
}

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

const greet2 = (greeting) => (name) => console.log(`${greeting} .... ${name}`);

greet2('Xin chao')('Nhan');
*/


/**
 * 132. The call and apply Methods
 */

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
  }
}

lufthansa.book(239, 'Jonas');
lufthansa.book(240, 'Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
}

const book = lufthansa.book;

// book(23, 'Nhan');

//Call method
book.call(eurowings, 23, 'Nhan')
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: 'SW',
  bookings: []
}

book.call(swiss, 583, 'Harry Porter');
console.log(swiss);

//Apply method
const flightData = [444, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);


/**
 * 133. The bind method
 */

//Bind method
//book.call(eurowings, 23, 'Nhan')

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSW = book.bind(swiss);

bookEW(233, 'Steven Williams');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Stewart')

//With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
  console.log(this);

  this.planes++;
  console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application 
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);

const addVAT = function(rate) {
  return function(value) {
    return value + value * rate;
  }
}

const addVAT2 = addVAT(0.23);

console.log(addVAT2(200));
