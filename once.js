function once(callback) {
    let done = false;
    let cachedAnswer;

    // because there can only be one, we will name the inner function "highlander"
    function highlander(...args) {
        if (!done) {
            cachedAnswer = callback(...args);
            done = true; 
        }
        return cachedAnswer;
    }
    return highlander;
}

const barbaricYawp = once(name => {
    return `${name}, you fool! There can only be one!`;
});

console.log(barbaricYawp('Graham')); // "Graham, you fool! There can only be one!"
console.log(barbaricYawp('Peter')); // "Graham, you fool! There can only be one!"