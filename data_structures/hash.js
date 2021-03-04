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
        let index = key % this.slots;
        return index;
    }
    add(key, value) {
        const hash = this.getIndex(key);
        if (!this.bucket[hash]) {
            this.bucket[hash] = {};
        }
        if (!this. buckets[hash].hasOwnProperty(key)) {
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
            this.bucket[hash] = null;
        }
    }
}