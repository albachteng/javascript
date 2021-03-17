const fb = [];

for (let i = 1; i < 101; i++) {
    let result = '';
    if (i % 3 == 0) {
        result += 'fizz';
        console.log(result);
    }
    if (i % 5 == 0) {
        result += 'buzz';
    }
    if (!result) {
        result = i;
    }
    fb.push(result); 
}

console.log(fb);