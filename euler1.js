/* prompt: If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 
3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000. */ 

const euler1 = function() {
    let results = [];
    // iterate through numbers zero through 1000
    for (let i = 0; i < 1000; i++) {
    // if divisible by 3 or 5, push to results array
        if (i % 3 == 0 || i % 5 == 0) {
            results.push(i);
        }
    }
    // reduce the array by summing them
    return results.reduce((a, b) => a + b);
}

console.log(euler1()); 