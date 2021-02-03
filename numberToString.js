function numberToString(n, base = 10) {
    let result = ""; 
    let sign = "";

    if (n < 0) {
        sign = "-";
        n = -n;
    }

    do {
        result = String(n % base) + result;
        n = Math.floor(n/base);
        debugger;
    } while (n > 0);
    return sign + result;
}

console.log(numberToString(13, 10)); // "13"