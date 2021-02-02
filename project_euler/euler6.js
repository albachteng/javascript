/* prompt: The sum of the squares of the first ten natural numbers is 385
The square of the sum of the first ten natural numbers is 3025
Hence the difference between the sum of the squares of the first 
ten natural numbers and the square of the sum is 3025 - 385 = 2640
Find the difference between the sum of the squares of the first 
one hundred natural numbers and the square of the sum.*/

// brute force method appears quite easy, I'm left wondering if this is a trick.

const sumOfSquares = (n) => {
    let counter = 0;
    for (i = 1; i <= n; i++) {
        counter += (i * i);
    }
    return counter;
}

console.log(sumOfSquares(100)); // 338350

const squareOfSums = (n) => {
    let counter = 0;
    for (let i = 1; i <= n; i++) {
        counter += i;
    }
    return counter * counter;
}

console.log(squareOfSums(100)); // 25502500

console.log(squareOfSums(10) - sumOfSquares(10)); // 2640 as expected

console.log(squareOfSums(100) - sumOfSquares(100)); // 25164150, final solution

// these functions can reasonably handle pretty large numbers
// the complexity is O(N) which I believe 
// is the best possible since we must work with each number

// console.log(squareOfSums(1000000000) - sumOfSquares(1000000000)); // 2.4999999973377568e+35
// even at a billion operations, the program runs in only a second;

// we can nevertheless optimize with the knowledge that the squareOfSums function 
// can be calculated mathematically as n(n+1) / 2 (making that portion constant)
// the sumOfSquares function can also be made constant as n(n+1)(2n+1)/6

// so: 

const sum = (n) => { // sum of the numbers 1 - n
    return ((n * (n + 1)) / 2);
}
console.log(sum(10)); // 55, just need to square it

const square = (n) => { // square of the sum of numbers 1-n
    return ((n * (n + 1) * ((2 * n) + 1)) / 6);
}
console.log(square(10));

console.log(sum(10) * sum(10) - square(10)); // 2640 as expected

// now the function runs at O(1) constant time