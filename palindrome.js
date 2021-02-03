const solve = (s, k) => {
        let returnValue = 0;
        if (k === 1 || k === 2) {
            returnValue += s.length;
            return returnValue;
        } else {
            returnValue += s.length;
            return returnValue *= solve(s, k-2);
    }
}

// console.log(solve('abc', 3)); // expect 7;

console.log('leet'[4]);