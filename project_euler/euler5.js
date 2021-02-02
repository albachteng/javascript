/* prompt: 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 
without any remainder. What is the smallest positive number that is evenly divisible by 
all of the numbers from 1 to 20? */ 

// we know that 20! would be evenly divisible by all of the numbers 1 - 20 since it is their product
// but that is an astronomical number, so there is doubtless a much smaller solution 
// also many of the numbers 1 - 20 share factors; all even numbers are divisible by 2 for example
// so what we really need to know is what number is the product of all unique factors of the numbers
// in range from 1-20 (1 * 2 * 3 * 4 * 5 * 7 = 210) hmm
// that doesn't actually work because 210 is not divisible evenly by 4, 8, 9 
// to resolve the discrepency, I noticed we can multiply by 2 again to make it divisible by 4
// multiply it by 2 again to make it divisible by 8 (2^3 = 8)
// multiply it by 3 again to make it divisible by 9 (3^2 = 9)
// so the solution seems to be to multiply all prime numbers together
// and then multiply by those prime numbers again once for each time a power of that prime appears
// i.e. 3 ^ 2 appears in 1 - 10 so we need to multiply by 3 twice
// 2 ^ 3 (8) appears in 1 - 10 so we need to mulitply by 2 thrice

// so let's write code to factor a number

const factor = (num) => {
    let factors = []; 
    for (i = 2; i <= num; i++) { // start at 2
        if (num % i === 0) {
            factors.push(i);
            num /= i;
        }
    }
    return factors;
}

let primeFactors = [];
for (let i = 2; i <= 20; i++) {
    let factors = factor(i);
    // push each factor from the factors array to primeFactors
    primeFactors.push(...factors);
}
console.log(primeFactors);

// how many times does 2 appear in primeFactors

const counter = (arr, item) => {
    // function takes an array and an item and returns the item count;
    let counter = 0; 
    arr.forEach(num => {
        if (num === item) {
            counter++;
        }
    });
    return counter;
}

console.log(counter(primeFactors, 2)); // expect 10;

let uniqueFactors = [];
primeFactors.forEach(num => {
    if (!uniqueFactors.some(e => e.num === num)) {
        uniqueFactors.push({num: num, count: counter(primeFactors, num)});
    }
});

console.log(uniqueFactors);

// 38798760 is the product of all unique factors, but is not divisible by 18, 16 or 9
// from our example at the top, we know we need to multiply by 2 at least one more time
// 3 has a count of 6, which means we need to multiply by 3 one more time

// 232,792,560 is the final answer