// The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143?

// probably want to start at the halfway point and iterate downward, since the largest possible factor will be half the number
// but this doens't really optimize runtime since O(N/2) ~= O(N)
// we can iterate downward by 2 at a time, since we're definitely not interested in even factors
// can use the modulo operator to determine if a number is a factor
// but then comes the difficulty of determining if the number is prime... 
// brute force method would require you to again use modulo on at least each odd number below it
// optimize by stopping at square root, since any factors below the square root will already have been found by their paired factor
// again, I feel like memoization might be a useful approach here but I'm not sure how to impmlement
// we could try a different approach - simply find all factors and push to an array
// then we only need to determine if those numbers are prime

const testCase = 600851475143;

const isPrime = num => { // helper function checks for prime
    for (let i = 2; i * i < num; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

const halfOdd = num => { // helper function ensures that our halfway point is an odd number
    let half = Math.floor(num / 2);
    if (half % 2 === 0) {
        return half - 1;
    } else return half;
}

const nextPrime = (prime) => { // try 1111
    if (prime > 2) {
        let divisor, squareRoot;
        do {
            divisor = 3; // reset i to 3 after we find something divisible
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
    i = nextPrime(i)) { // step up by two (no need to test even numbers as they are not prime)
        if (testCase % i === 0) { // thanks to nextPrime() we know i is prime so check if it is a factor
            console.log(i);
            primeFactors.push(i);
        }
    }

console.log(primeFactors[primeFactors.length - 1]); // 6857 is the largest prime factor

