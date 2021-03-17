const intersection = (arr) => {
    // initialize empty array as 'results' to return
    const results = [];
    // select first subarray to use as the base numbers to compare 
    const subarr = arr[0];
    // we don't need to compare each array to the other, only the first to the others
    // i.e. if it's not in the first and second or first and third, etc. it isn't in all

    // loop over subarray
    subarr.forEach(num => {
        let shouldPush = true;
        // loop over remaining subarrays to check if current element is present on all others
        for (let i = 1; i < arr.length; i++) {
            if (!arr[i].includes(num)) {
                shouldPush = false;
                break;
            }}
            // if it is, push to results
            if (shouldPush) results.push(num);
        }
    );
    // return result array
    return results;
}

const array1 = [15, 5];
const array2 = [1, 12, 15, 22, 5];
const array3 = [5, 8, 15, 33, 95];

console.log(intersection([array3, array2, array1]));
