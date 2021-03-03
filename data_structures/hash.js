class HashTable {
    constructor() {
        this.values = {}; 
        this.length = 0;
        this.size = 0; 
    }

    calculateHash(key) {
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
        } else {
            return null;
        }
    }
}