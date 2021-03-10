function binarySearch(list, item) {
    let high = list.length - 1, low = 0;
    let steps = 0;
    while (low <= high) {
        let mid = Math.floor((high + low) / 2);
        if (list[mid] == item) {
            steps++;
            return [mid, steps];
        } else if (mid < item) {
            steps++;
            low = mid + 1;
        } else {
            steps++;
            high = mid - 1;
        }
    }
    return [null, steps];
}

const numbers = new Array;
for (let i = 0; i < 100000000; i++) {
    numbers[i] = i;
}

console.log(binarySearch(numbers, 209));

/* we actually run out of valid array length memory allocation 
before we get anywhere close to 30 iterations of the binary search */ 