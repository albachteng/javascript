class HashTable {
    constructor() {
        this.values = {}; 
        this.length = 0;
        this.size = 0; 
    }

    calculateHash(key) { // simple arithmetic modular hash function
        return key.toString().length % this.size;
    }

    add(key, value) {
        const hash = this.calculateHash(key); 
        if (!this.values.hasOwnProperty(hash)) { // if values doesn't already have that hash
            this.values[hash] = {}; // add the hash as a key to values and initialize to empty object
        }
        if (!this.values[hash].hasOwnProperty(key)) {
            this.length++; // if the provided key doesn't already exist at that hash
        } // we can increment the length to add it
        this.values[hash][key] = value; // finally we add the key value pair into the hash object
    }

    search(key) {
        const hash = this.calculateHash(key);
        if (this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
            return this.values[hash][key];
// remember that we have to check to make sure the hash AND the key exist, since a hash could contain a number of key-value pairs
        } else {
            return null;
        }
    }d
}

class HashEntry {
    constructor(key, data) {
        this.key = key; 
        this.value = data;
        this.next = null;
    }
}

class HashTableTwo {
    constructor() {
        this.slots = 10;
        this.size = 0;
        this.bucket = [];
        for (let i = 0; i < this.slots; i++) {
            this.bucket[i] = null; 
        } // initialize all buckets for the given number of slots to null
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.getSize() == 0;
    }
    getIndex(key) {
        let index = 0;
        for (let i = 0; i < key.length; i++) {
            index += index + key.charCodeAt(i);
        }
        return index % this.slots;
    }
    double() {
        // doubles slots when size reaches 60% of slots 
        this.slots*= 2;
        console.log(this.slots);
        let oldBucket = this.bucket;
        let newBucket = [];
        for (let i = 0; i < this.slots; i++) {
            newBucket[i] = null; 
        } // create a newBucket of the appropriate size
        this.bucket = newBucket;
        this.size = 0; // reset size to zero or else the copying below will throw off the count
        oldBucket.forEach(index => {
            if (index) {
                Object.keys(index).forEach(key => {
                    this.add(key, index[key]);
                })
        }})
    }
    add(key, value) {
        if (this.size >= .6 * this.slots) {
            this.double();
        }
        const hash = this.getIndex(key);
        if (!this.bucket[hash]) {
            this.bucket[hash] = {};
        }
        if (!this.bucket[hash].hasOwnProperty(key)) {
            this.size++;
        }
        this.bucket[hash][key] = value;
    }
    search(key) {
        const hash = this.getIndex(key);
        if (this.bucket[hash] && this.bucket[hash].hasOwnProperty(key)) {
            return this.bucket[hash][key];
        } else {
            return null;
        }
    }
    delete(key) {
        const hash = this.getIndex(key); 
        if (this.bucket[hash] && this.bucket[hash].hasOwnProperty(key)) {
            delete this.bucket[hash][key]; // should return true
            if (this.bucket[hash] && Object.keys(this.bucket[hash]).length === 0) {
                this.bucket[hash] = null; 
            }
        } else {
            return null;
        }
    }
}

const peopleList = [{name: 'bob', age: 12}, 
                    {name: 'sally', age: 18}, 
                    {name: 'constance', age: 32}, 
                    {name: 'george', age: 35}, 
                    {name: 'sam', age: 15},
                    {name: 'harry', age: 22},
                    {name: 'bill', age: 5},
                    {name: 'peter', age: 16},
                    {name: 'luis', age: 54},
                    {name: 'gustavo', age: 19},
                    {name: 'gilgamesh', age: 20}];
const peopleHash = new HashTableTwo;
console.log(peopleHash.isEmpty()); // expect true
for (person of peopleList) {
    peopleHash.add(person.name, person.age);
}
console.log(peopleHash);
console.log(peopleHash.getSize(), peopleHash.isEmpty()); // 11, false
console.log(peopleHash.search('gustavo')); // 19 (his age)
peopleHash.delete('constance'); 
console.log(peopleHash.search('constance')); // null
console.log(peopleHash);
const morePeople = [{name: 'fritz', age: 9},
                    {name: 'clara', age: 12},
                    {name: 'bobby', age: 27},
                    {name: 'amanda', age: 29},
                    {name: 'andrew', age: 31},
                    {name: 'graham', age: 30}];
for (person of morePeople) {
    peopleHash.add(person.name, person.age);
}
console.log(peopleHash);

// add() should update when it has the same key
// linear probing instead of separate chaining? 
// separate chaining - use a linked list data structure
// include aliases? add = insert = push?
// probing function P(x) = x is a common choice
// keep alpha (the threshold factor) as a property of the hashtable?
// memoize hash values to make co pying / doubling faster

