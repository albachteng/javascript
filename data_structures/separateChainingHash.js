class HashEntry { // 
    constructor(key, value) {
        this.key = key; 
        this.value = value;
        this.next = null;
    }
    setNextEntry(entry) {
        if (!(entry instanceof HashEntry)) {
            throw new Error('Next must be of type HashEntry');
        }
        this.next = entry;
    }
    getNextEntry() {
        return this.next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addToHead(entry) {

    }
}

class HashTable {
    constructor() {
        this.table = {}; 
        this.maxSize = 0;
        this.size = 0; 
    }

    hash(key) { // simple arithmetic modular hash function
        return key.toString().length % this.size;
    }

    add(entry) {
        const hash = this.hash(entry.key); 
        if (!this.table.hasOwnProperty(hash)) { // if table doesn't already have that hash
            this.table[hash] = new LinkedList(); // add the hash as a key to table and initialize to empty object
        }
        if (!this.table[hash].hasOwnProperty(entry.key)) {
            this.size++; // if the provided key doesn't already exist at that hash
        } // we can increment the length to add it
        this.table[hash][entry.key] = entry.value; // finally we add the key value pair into the hash object
    }

    search(key) {
        const hash = this.hash(key);
        if (this.table.hasOwnProperty(hash) && this.table[hash].hasOwnProperty(key)) {
            return this.table[hash][key];
// remember that we have to check to make sure the hash AND the key exist, since a hash could contain a number of key-value pairs
        } else {
            return null;
        }
    }
}

