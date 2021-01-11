// All valid credit card numbers (16 digits)
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
// so the array is made up of 15 arrays with 16 numbers between 0 and 9. 
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// validateCred takes an array and returns true if valid CC or else false
const validateCred = (array) => {
    let odds = []; // initialize empty list of odd-numbered CC digits
    let evens = []; // '' even-numbered

    // fill those lists with the appropriate digits
    for (let i = 0; i < array.length; i+=2) {
        odds.push(array[i]);
    }
    for (let j = 1; j < array.length; j+=2) {
        evens.push(array[j]);
    }

    // creates a new list of the odd-numbered (even-indexed) numbers, doubled;
    let doubledOdds = odds.map(num => num * 2);

    // subtract 9 from each item of doubledOdds IF they are 10 or greater;
    let stepThree = [];
    doubledOdds.forEach((element) => {
        if (element >= 10) {
        stepThree.push(element - 9);
        } else {
            stepThree.push(element);
        }
    })
    let oddSum = stepThree.reduce((a, b) => {
        return a + b;
    })
    let evenSum = evens.reduce((a, b) => {
        return a + b;
    })
    if ((evenSum + oddSum) % 10 == 0) {
        return true;
    } else { 
        return false;
    }
}

const findInvalidCards = (nestedArray) => {
    let invalids = [];
    let valids = []; // I could simply remove the portion of code that deals with valid cards
    nestedArray.forEach((card) => {
        if (validateCred(card)) {
            valids.push(card);
        } else {
            invalids.push(card); 
        }
    })
    console.log(invalids);
    return invalids;
}

const idInvalidCompanies = (nestedArray) => {
    let companies = [];
    findInvalidCards(nestedArray).forEach((card) => {
        switch(card[0]) {
            case 3:
                if (companies.indexOf('Amex') === -1) {
                    companies.push('Amex')};
              break;
            case 4:
                if (companies.indexOf('Visa') === -1) {
                    companies.push('Visa')};
              break;
            case 5: 
                if (companies.indexOf('Mastercard') === -1) {
                    companies.push('Mastercard')};
                break;
            case 6: 
                if (companies.indexOf('Discover') === -1) {
                    companies.push('Discover')};
                break;
            default:
                if (companies.indexOf('Company not found') === -1) {
                    companies.push('Company not found');
                }}})
                console.log(companies);
            }

idInvalidCompanies([valid1, invalid1, mystery1, valid2, invalid2]); // Visa, Amex, Mastercard