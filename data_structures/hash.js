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
        if (!this.values.hasOwnProperty(hash)) { // if it doesn't already have that hash
            this.values[hash] = {}; // add the hash as a key to values and initialize to empty object
        }
        if (!this.values[hash].hasOwnProperty(key)) {
            this.length++; 
        }
        this.values[hash][key] = value;
        // values get added within the object associated with the hash as a key-value pair
    }
}