let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says '${line}'`);
}

rabbit.speak("I'm alive!");

function speak(line) {
    console.log(`The ${this.type} rabbit says ${line}`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: 'hungry', speak};
whiteRabbit.speak('oh it\'s getting late');
hungryRabbit.speak('I could use a carrot');
speak.call(hungryRabbit, 'Burp!'); // explicitly pass the "this" context

function normalize() {
    console.log(this.coords.map(n => n / this.length)); 
    // note that arrow function here is key, otherwise "this" would be in the wrong context
    // arrow functions do not create their own "this" context but can use the surrounding
    // scope as context 
}
normalize.call({coords: [0, 1, 2], length: 5});

console.log(Object.getPrototypeOf({}) == Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null; buck stops here
console.log(Object.getPrototypeOf([]) == Array.prototype); // true
console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // true
console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype); // true

let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = Object.create(protoRabbit); // Object.create allows you to specify a prototype
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEE!');

function createRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

// function Rabbit(type) {
//     this.type = type;
// }


// Rabbit.prototype.speak = function(line) {
//     console.log(`The ${this.type} rabbit says '${line}'`);
// };

// let weirdRabbit = new Rabbit('weird');

// console.log(Object.getPrototypeOf(Rabbit) == Function.prototype); // true;
// console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype); // also true 

// ^^ important to distinguish between prototype property of a constructor 
// ... which associates the prototype used to create instances through it
// versus the actual prototype of the constructor itself, which by default is 
// Function.prototype (since a constructor is just a function);

// class notation makes all of this a bit more intuitive and less awkward

class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let blackRabbit = new Rabbit('black');

Rabbit.prototype.teeth = 'small';
console.log(blackRabbit.teeth);
blackRabbit.teeth = 'long, sharp and bloody';
console.log(blackRabbit.teeth);
console.log(Rabbit.prototype.teeth);

console.log('toString' in Object.create(null)); // false
// if you pass null to Object.create it will not inherit from Object 
// this would allow it to be used as a map so that unwanted methods and keys
// do not pollute the namespace

console.log({x: 1}.hasOwnProperty('x')); // true
console.log({x: 1}.hasOwnProperty('toString')); // false
// even though the object {x: 1} can use toString, it is an inherited property
// hasOwnProperty ignores prototype 
console.log({x: 1}.toString());

Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};

console.log(blackRabbit.toString());
console.log(String(blackRabbit));

// symbols 

let sym = Symbol('name');
console.log(sym == Symbol('name')); // expect false, since each symbol is unique
Rabbit.prototype[sym] = 55; // attach sym as a key to the Rabbit prototype
console.log(blackRabbit[sym]); // a symbol can act as key on downstream blackRabbit object

const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function() {
    return `${this.length}cm of blue yarn`;
}
console.log([1, 2].toString()); // expect 1, 2
console.log([1, 2][toStringSymbol]()); // expect 2cm of blue yarn

let stringObject = {
    [toStringSymbol]() {return 'a jute rope';}
};
console.log(stringObject[toStringSymbol]()); // expect 'a jute rope'

console.log(Symbol.iterator) // called under the hood every time you use for/of loops
let okIterator = 'OK'[Symbol.iterator]();
console.log(okIterator.next()); // {value: 'O', done: false}
console.log(okIterator.next()); // {value: 'K', done: false}
console.log(okIterator.next()); // {value: undefined, done: true}

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height; 
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x,y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }

    set(values) {
        this.content[y * this.width + x] = value;
    }

    [Symbol.iterator]() { // allows for/of iterator interface on our matrix!
        return new MatrixIterator(this);
    }
}


class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y === this.matrix.height) return {done: true};
        // travel across the y axis one at a time until you 'step off the edge'
        let value = { // update value before anything else (in case we step off edge)
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        this.x++;
        if (this.x === this.matrix.width) { 
            this.x = 0; // reset x to zero and start again at next row
            this.y++; 
        }
        return {value, done: false};
     }
}

let matrix = new Matrix(2, 2, (x, y) => `value` + x + y);
for (let {x, y, value} of matrix) {
    console.log(x, y, value);
}

let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
}

console.log(varyingSize.size);
console.log(varyingSize.size);
console.log(varyingSize.size);

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) { // called on the class itself, not on instances
        return new Temperature((value - 32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit); // 71.6
temp.fahrenheit = 86;
console.log(temp.celsius); // 30
let tempFahrenheit = Temperature.fromFahrenheit(32); // note omitted new keyword
console.log(tempFahrenheit.celsius); // 0

class SymmetricMatrix extends Matrix {
    constructor(size, element = (x,y) => undefined) {
        super(size, size, (x, y) => { // height and width must be the same
            if (x < y) return element(y, x);
            else return element(x, y);
            // element() is wrapped to swap x & y below the line of symmetry
        });
    }

    set(x, y, value) { // set is new, so won't use superclass's setter unless...
        super.set(x, y, value); // ...super copies setter functionality from superclass
        if (x !== y) { // adding additional functionality below
            super.set(y, x, value);
        } // setter places symmetric points unless set ON the line of symmetry
    }
}

let symmetricMatrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
console.log(symmetricMatrix);
console.log(symmetricMatrix.get(2, 3)); // return 3, 2

// Vec (vector) class
class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    plus(vec) {
      let a = this.x + vec.x;
      let b = this.y + vec.y;
      return new Vec(a, b);
    }
    
    minus(vec) {
      let a = this.x - vec.x;
      let b = this.y - vec.y;
      return new Vec(a,b);
    }
  }
  
  console.log(new Vec(1, 2).plus(new Vec(2, 3)));
  // → Vec{x: 3, y: 5}
  console.log(new Vec(1, 2).minus(new Vec(2, 3)));
  // → Vec{x: -1, y: -1}
  console.log(new Vec(3, 4).length);
  // → 5

  // recreating the Set object (called 'Group');
  class Group {
    constructor() {
      this.collection = [];
    }
    
    has(value) {
      if (this.collection.some(x => x === value)) {
          return true;
      } else return false;
    };
    
    add(value) {
      if (!this.has(value)) {
          this.collection.push(value);
      } else return;
    };
    
    delete(value) {
      if (this.has(value)) {
        this.collection.splice(this.collection.indexOf(value), 1);
      }
    };
  
    static from(obj) {
      const newGroup = new Group();
      for (let item of obj) {
        newGroup.add(item);
      }
      return newGroup;
    };
    
    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
  }
  
  class GroupIterator {
    constructor(group) {
      this.index = 0;
      this.group = group;
    }
    next() {
      if (this.index === this.group.collection.length) return {done: true};
      let value = this.group.collection[this.index];
      this.index++;
      return {value, done: false};
    }
  }
  
  
  
  for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c
  
//   let group = Group.from([10, 20]);
//   console.log(group.has(10));
//   // → true
//   console.log(group.has(30));
//   // → false
//   group.add(10); // does nothing since 10 is already present
//   group.delete(10); // deletes 10
//   console.log(group.has(10)); // should be false, since we removed it
//   // → false
//   console.log(group); // {collection: [20]} 
//   // 10 is not present because duplicate values do not have meaning in a set