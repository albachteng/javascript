/* prompt: A palindromic number reads the same both ways. The largest palindrome 
made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest 
palindrome made from the product of two 3-digit numbers.*/ 

const palTest = (num) => { // helper function for testing if a number is a palindrome
    let testString = num.toString();
        for (i = 0; i < testString.length / 2; i++) {
            // iterate over the string and compare digit at index i to digit at index length - i - 1
            if (testString[i] !== testString[testString.length - i - 1]) {
                return false; // any mismatches indicates not a palindrome
            }
        }
        return true;
    } // O(N/2) => O(N) where N is string length i.e. number of digits in the original number

console.log(palTest(1113)); // expect false;
console.log(palTest(101)); // expect true;

const generatePal = () => {
    let palindromes = []; // for storing all palindrome numbers we find in range
    for (let i = 999 * 999; i > 100 * 100; i--) { // the range is from 999^2 down to 100^2
        if (palTest(i)) {
            palindromes.push(i);
        }
    }
    return palindromes;
}

console.log(generatePal().length); // generates a list of 1798 palindromes within our bounds
// but not all of these palindromes are the product of two 3-digit numbers

let arr = generatePal().filter(num => { // filter out numbers NOT evenly divisible by a 3-digit number
    for (let i = 100; i < 999; i++) {
        if (num % i === 0) {
            return true; // if it can be divided evenly by any 3-digit number, stop
        }
    } // we got through all the 3-digit numbers and it couldn't be divided by any of them
    return false;
}); // narrows it down to about 1000 items that a) are palindromes and b) can be divided by at least one 3-digit number
// it is also ordered - the highest number will be first, meaning we can return the first answer to pass

console.log(arr.length); // 1072 palindromes divisible by at least one 3-digit number

for (let i = 0; i < arr.length; i++) {
    for (let j = 999; j > 99; j--) {
        if (arr[i] % j === 0 // evenly divisible by a 3-digit number j
            && arr[i] / j > 99 // when divided by that 3-digit number, returns a 3-digit number as well
            && arr[i] / j < 1000) {
                console.log(arr[i]); // this item on the list is therefore a product of two 3-digit numbers
                return arr[i]; // since it will test the array in order from greatest palindrome to least
                // we can return it - our return value will be the highest possible palindrome that is the 
                // product of two 3-digit numbers 
            }
    }
} // the greatest palindrome that is a product of 2 three digit numbers is 906609 = 913 * 993 