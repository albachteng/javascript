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

const generatePal = () => {
    let palindromes = [];
    for (let i = 999 * 999; i > 100 * 100; i--) {
        if (palTest(i)) { // if it's a palindrome, push it to the list
            palindromes.push(i);
        }
    }
    return palindromes;
}

console.log(generatePal().length); // generates a list of 1798 palindromes within our bounds

let arr = generatePal().filter(num => { // filter out numbers not evenly divisible by a 3-digit number
    for (let i = 100; i < 999; i++) {
        if (num % i === 0) {
            return true; // if it can be divided evenly by any 3-digit number, stop
        }
    } // we got through all the 3-digit numbers and it couldn't be divided by any of them
    return false;
}); // narrows it down to about 1000 items that a) are palindromes and b) can be divided by at least one 3-digit number
// it is also ordered - the highest number will be first

console.log(arr.length); // 1072 palindromes divisible by at least one 3-digit number

for (let i = 0; i < arr.length; i++) {
    for (let j = 999; j > 99; j--) {
        if (arr[i] % j === 0 
            && arr[i] / j > 99 
            && arr[i] / j < 1000) {
                console.log(arr[i]);
                return arr[i];
            }
    }
} // the greatest palindrome that is a factor of two three digit numbers is 906609 = 913 * 993 