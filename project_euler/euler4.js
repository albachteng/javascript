/* prompt: A palindromic number reads the same both ways. The largest palindrome 
made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest 
palindrome made from the product of two 3-digit numbers.*/ 

//// need to be able to test if a given number is a palindrome
//// then we can simply iterate over the possible pairs of 3-digit numbers
//// brute-force would have us test every possible 3 digit number against 100
//// and then iterate to 101 and test every possible 3 digit number against that
//// but this duplicates work because we'd be testing 100 * 101 AND 101 * 100
//// so instead iterate from 100 to 999 and test it against every number greater or equal
//// test for palindrome status by comparing first/last, then second/second-to-last, etc.
//// when we get to the middle we'll either have a single digit, which needs no test
// //or we'll find ourselves with two numbers, which do need a test
//// we can account for these by simply determining if there are even or odd # of digits

// largest product of two three digit numbers is 999 * 999 = 998001
// palindromes can be even as 2112 or odd as in 121
// largest possible palindrome is going to be 989989... 

const palTest = (num) => { // helper function for testing if a number is a palindrome
    let testString = num.toString();
        for (i = 0; i < testString.length / 2; i++) {
            // iterate over the string and compare digit at index i to digit at index length - i
            if (testString[i] !== testString[testString.length - i - 1]) {
                return false; 
            }
        }
        return true;
    }

console.log(palTest(1113)); // expect false;
console.log(palTest(101)); // expect true;

// const products = () => {
//     // let's try going backward, starting at 1000 and going down and stopping as soon as we find a palindrome
//     for (i = 999; i > 99; i--) { // testing all triple digit numbers
//         for (j = i - 1; j > 99; j--) { // start each iteration of j at one below i to avoid duplicates
//             if (palTest(j * i)) { // if product of j and i is a palindrome
//                 return (j * i);
//             }
//         }
// }}


// console.log(products()); // runtime error

// 998899 / 11 = 90809

const factor = (num) => {
    const factors = [];
    if (num < 100) {
        return factors;
    } else { // if we've factored the number to less than 100, we have found all factors greater than 100 and can stop
    for (i = 100; i < num / 2; i++) { // search for factors greater than 99 but less than half (largest possible factor)
        if (num % i === 0) {
            let greater = i > (num / i) ? i : num / i;
            factors.push(greater); // push the greater of the two factors
            return factor(greater); // return a call to factor the greater of two
        }
    }
    return factors;
}}

// console.log(factor(989988));
console.log(factor(963936));