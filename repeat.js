const repeat = (num, func) => {
    for (let i = 0; i < num; i++) {
        func(i);
    }
}

repeat(3, console.log);

let labels = [];
repeat(3, i => labels.push(`Unit ${i + 1}`));
console.log(...labels);

function greaterThan(n) {
    return m => m > n; // need to return a function that takes a variable that is not n
}

let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function noisy(func) {
    return (...args) => {
        console.log(`Calling with ${args}.`);
        let result = func(...args);
        console.log(`Called with ${args}; returned ${result}.`);
        return result;
    }
}

noisy(Math.min)(1, 2, 3);
// returns the function, which is why noisy(Math.min) is enclosed in parentheses
// before we can actually call the function with arguments... 
// useful for testing

function unless(test, then) {
    if (!test) then();
}

repeat(3, n => unless(n % 2 === 1, () => {
    console.log(n, "is even"); 
}));

['A', 'B'].forEach(l => console.log(l));