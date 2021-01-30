// most of this code is from eloquentjavascript.net ['EJS'] by Marijn Haverbeke
// some portions are my own solutions to practice problems, which I will label
// this is Chapter 10: Modules

const weekDay = function() {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return {
        name(number) {return names[number];},
        number(name) {return names.indexOf(name);}
    };
}(); // this is called an immediately invoked function expression or IFFE

console.log(weekDay.name(weekDay.number('Sunday'))); // expect 'Sunday'

// this is an outdated style of modularity
// isolation (scope) but no control of dependencies

// eval takes a string of data and executes it within the current scope as code
// predictably, this can have unintended consequences
const x = 1;
function evalAndReturnX(codeString) {
    eval(codeString);
    return x;
}

console.log(evalAndReturnX('var x = 2')); // expect 2
console.log(x); // expect 1

// better way to interpret data as code is the Function constructor
// two arguments: a string with comma-separated list of arguments and a body string
let plusOne = Function('n', 'return n + 1;');
console.log(plusOne(2)); // expect 3

// require module syntax

const ordinal = require("ordinal"); // must download in terminal via "npm install ordinal"
const {days, months} = require("date-names"); // "npm install date-names"
// note that destructuring is useful for clarity when downloading large objects as modules

exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == 'YYYY') return date.getFullYear();
        if (tag == 'M') return date.getMonth();
        if (tag == 'MMMM') return months[date.getMonth()];
        if (tag == 'D') return date.getDate();
        if (tag == 'Do') return ordinal(date.getDate());
        if (tag == 'dddd') return days[date.getDay()];
    });
};

console.log(exports.formatDate(new Date(2017, 9, 13), "dddd the Do")); // expect 'Friday the 13th'

// defining require (this is illustrative and EJS points out readFile, for example, is not a real function)

// require.cache = Object.create(null);

// function require(name) {
//     if (!(name in require.cache)) {
//         let code = readFile(name);
//         let module = {exports: {}};
//         require.cache[name] = module;
//         let wrapper = Function('require, exports, module', code);
//         wrapper(require, module.exports, module);
//     }
//     return require.cache[name].exports;
// }

const {parse} = require('ini');
console.log(parse('x = 10\ny = 20')); // expect {x: '10', y: '20'}
// interesting that the object returned by the ini parser has a null prototype... 

// ES Modules (ECMAScript)

// import ordinal from 'ordinal';
// import {days, months} from 'date-names';
// export function formatDate(date, format) {/* ... */};

// export default creates a default export that will be treated as the 'main' export
// import without braces around the binding, you will get the default binding as with ordinal above
// also possible to rename imported bindings: import {days as dayNames} from "date-names";
