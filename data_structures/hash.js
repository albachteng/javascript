class HashTable {
    constructor() {
        this.values = {};
        this.length = 0;
        this.size = 0; 
    }

    calculateHash(key) {
        return key.toString().length % this.size;
    }
}