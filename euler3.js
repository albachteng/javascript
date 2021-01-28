// prompt: The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?

// my initial instinct was to iterate down from the square root to find prime factors
// but this results in an astronomical number of unnecessary tests and a huge runtime
// instead, start testing for factors at 2 and iterate up by calculating the next prime number
// optimize by stopping at square root, the largest possible factor

const testCase = 600851475143;

// const isPrime = num => { // helper function checks for prime
//     for (let i = 2; i * i < num; i++) {
//         if (num % i === 0) return false;
//     }
//     return num > 1;
// }

// const halfOdd = num => { // helper function ensures that our halfway point is an odd number
//     let half = Math.floor(num / 2);
//     if (half % 2 === 0) {
//         return half - 1;
//     } else return half;
// }

const nextPrime = (prime) => { // try 1111
    if (prime > 2) {
        let divisor, squareRoot;
        do {
            divisor = 3; // reset i to 3 after we find something divisible in the below while loop
            prime += 2; // 1113 -> 1115 -> 1117
            squareRoot = Math.floor(Math.sqrt(prime)); // 33 (when prime is 1111)
            while (divisor <= squareRoot && prime % divisor) { // keep going until (prime % i === 0) => (false)
                divisor += 2; // inner while loop continues increasing
            } // stops when it finds an odd factor of 'prime'
        } while (divisor <= squareRoot); // if i > squareRoot then we have exhausted possibility of finding factors
        return prime; // prime has therefore reached the next prime number
    }
    return prime === 2 ? 3 : 2; // if it's 2, the next value is 3; if it's 1, the next prime is 2
}

console.log(nextPrime(1111)); // 1117

let primeFactors = [];
for (let i = 2; // iterating up is actually better, because the larger factors are more likely to not be prime
    i < Math.floor(Math.sqrt(testCase)); // sqrt(testCase) is the largest possible factor
    i = nextPrime(i)) { // test the next prime number using our helper function
        if (testCase % i === 0) { // thanks to nextPrime() we know i is prime so check if it is a factor
            console.log(i);
            primeFactors.push(i);
        }
    }

console.log(primeFactors[primeFactors.length - 1]); // 6857 is the largest prime factor

