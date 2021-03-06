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
        if (!(entry instanceof HashEntry)) {
            throw new Error('Entry must be of type HashEntry');
        }
        const currentHead = this.head;
        this.head = entry;
        if (currentHead) {
            this.head.setNextEntry(currentHead);
        }
    }
    removeHead() {
        const removedHead = this.head;
        if (!removedHead) {
            return null;
        }
        this.head = removedHead.getNextEntry();
        return [removedHead.key, removedHead.value];
    }
    printList() {
        let currentEntry = this.head;
        let output = "<head> ";
        while (currentEntry != null) {
            output += "[" + currentEntry.key + ': ' + currentEntry.value + '] ';
            currentEntry = currentEntry.getNextEntry();
        }
        return output + "<tail>";
    }
    includes(key) {
        let currentEntry = this.head;
        while (currentEntry) {
            if (currentEntry.key === key) {
                return true;
            } else {
                currentEntry = currentEntry.getNextEntry();
            }
        } return false;
    }
    getEntryByKey(key) {
        let currentEntry = this.head;
        while (currentEntry) {
            if (currentEntry.key === key) {
                return currentEntry;
            } else {
                currentEntry = currentEntry.getNextEntry();
            }
        } return null;
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
            this.table[hash] = new LinkedList(); // add the hash as a key to table and initialize to empty LinkedList
        }
        if (!this.table[hash].includes(entry.key)) {
            this.size++; // if the provided key doesn't already exist at that hash
        } // we can increment the size to add it
        this.table[hash].addToHead(entry); // finally we add the key value pair into the linkedList
    }

    search(key) {
        const hash = this.hash(key);
        if (this.table.hasOwnProperty(hash) && this.table[hash].includes(key)) {
            return this.table[hash][key];
// remember that we have to check to make sure the hash AND the key exist, since a hash could contain a number of key-value pairs
        } else {
            return null;
        }
    }
}

