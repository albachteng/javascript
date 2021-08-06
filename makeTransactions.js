const VALID = true;
const INVALID = false;

function buildTransaction(from, to, amount, isValid, time) {
  return {
    from,
    to,
    amount,
    validate: () => new Promise((resolve, reject) => {
      setTimeout(() => isValid ? resolve() : reject(), time);
    })
  };
}

// function handleApproved(accounts, to, from, amount) {
//     return {
//         ...accounts,
//         [from]: accounts[from] - amount,
//         [to]: accounts[to] + amount,
//     }
// }

const accounts = {
    1: 100,
    2: -20,
    3: 150,
    4: 30
};
const transactions = [
    buildTransaction(1, 2, 70, VALID, 10),
    buildTransaction(4, 3, 100, VALID, 30),
    buildTransaction(2, 4, 50, VALID, 15)
];

//   const correctAccountsAfterTransactions = {
//     1: 30
//     2: 0,
//     3: 250,
//     4: -20
//   };

function makeTransactions(accounts, transactions) {
    // if there are no transactions, accounts can be resolved as-is
    if (transactions.length === 0) return Promise.resolve(accounts);
    // otherwise we must await all pending transactions before returning
    const pending = [];
    transactions.forEach((action) => {
        const { from, to, amount } = action;
        pending.push(action.validate().then(
            // resolve and return new accounts if valid
            () => {
                accounts[from] -= amount;
                accounts[to] += amount;
                return accounts;
            }, 
            // if invalid, return accounts unchanged
            () => accounts
        ));
    });
    // return accounts after resolving all pending transactions
    return Promise.all(pending).then(results => results[0]);
}

makeTransactions(accounts, transactions).then((res) => console.log(res));