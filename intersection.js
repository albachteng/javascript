// from CSX platform - technical communication example

const intersection = (arr) => {
    // initialize empty array as 'results' to return
    const results = [];
    // select first subarray to use as the base array to compare 
    const subarr = arr[0];
    // we don't need to compare each array to all others, only the first to the others
    // i.e. if it's not in the first and second or first and third, etc. it isn't in all

    // loop over subarray
    subarr.forEach(item => {
        let shouldPush = true;
        // loop over remaining subarrays to check if current element is present on all others
        for (let i = 1; i < arr.length; i++) {
            if (!arr[i].includes(item)) {
                shouldPush = false;
                // we can break now, since we know at least one subarr is missing the element
                break;
            }}
            // if it is, push to results
            if (shouldPush) results.push(item);
        }
    );
    // return result array
    return results;
}

// note that it doesn't have to be a number, as below
const array1 = ['dog', 'cat'];
const array2 = [1, 12, 'cat', 22, 'dog'];
const array3 = ['dog', 8, 'cat', 33, 95];

console.log(intersection([array3, array2, array1]));
