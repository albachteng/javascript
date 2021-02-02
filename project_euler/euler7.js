/* prompt: By listing the first six prime numbers: 2, 3, 5, 7, 
11, and 13, we can see that the 6th prime is 13.
What is the 10 001st prime number?*/ 

// as luck would have it, I created a "nextPrime" program for euler #3

const nextPrime = (prime) => { 
    if (prime > 2) {
        let divisor, squareRoot;
        do {
            divisor = 3; 
            prime += 2; 
            squareRoot = Math.floor(Math.sqrt(prime)); 
            while (divisor <= squareRoot && prime % divisor) { 
                divisor += 2; 
            } 
        } while (divisor <= squareRoot);
        return prime; 
    }
    return prime === 2 ? 3 : 2; 
}

// so with this as a helper function, I can just call this on a prime
// until I reach the 10001st

const primeIndex = (n) => {
    let prime = 2; // the first prime
    let counter = 1; // the index of the prime at start
    while (counter < n) {
        prime = nextPrime(prime); // update prime to the next
        counter++;
    }
    return prime;
}

console.log(primeIndex(10001)); // the answer is 104743