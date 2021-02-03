let x = new Object(); // or let x = {};

let y = []; // or let y = new Array();

console.log(Object.getPrototypeOf(x)); // returns {} in node (idk why);
// but will return methods and properties of the Object.prototype in browser;

console.log(x.toString()); // returns [object Object];

console.log(Array.prototype.isPrototypeOf(y)); // returns true;
// this is because y is an array, and therefore inherits from Array.prototype;

console.log(Object.prototype.isPrototypeOf(Array.prototype)); // true;
// this is because Array.prototype inherits from object;

console.log(y instanceof Array); // true;

console.log(Object.prototype === Object.getPrototypeOf(x)); // true;
console.log(Object.prototype); // still an empty object in node, not sure why;
// chain ends with Object.prototype; any further attempts to access the prototype... 
// will return null;

function Hero(name, level) {
    this.name = name;
    this.level = level;
}

Hero.prototype.greet = function() {
    return `${this.name} says hello!`;
}

const isho = new Hero('Isho', 8);
console.log(isho.greet());

