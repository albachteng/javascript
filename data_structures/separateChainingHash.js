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
    constructor(maxSize = 11) {
        this.table = {}; 
        this.maxSize = maxSize;
        this.size = 0; 
    }

    nextPrime(prime) { 
        if (prime > 2) {
            let divisor, squareRoot;
            do {
                divisor = 3; 
                prime += 2; 
                squareRoot = Math.floor(Math.sqrt(prime)); 
                while (divisor <= squareRoot && prime % divisor) { 
                    divisor += 2; 
                } 
            } while (divisor <= squareRoot);
            return prime; 
        }
        return prime === 2 ? 3 : 2; 
    }

    hash(key) { 
        let output = 0;
        for (let i = 0; i < key.toString().length; i++) {
            output += key.charCodeAt(i);
        }
        return output % this.maxSize;
    }

    add(entry) {
        if (.6 * this.maxSize <= this.size + 1) {
            this.resize();
        }
        const hash = this.hash(entry.key); 
        if (!this.table.hasOwnProperty(hash)) { // if table doesn't already have that hash
            this.table[hash] = new LinkedList(); // add the hash as a key to table and initialize to empty LinkedList
        }
        if (!this.table[hash].includes(entry.key)) {
            this.size++; // if the provided key doesn't already exist at that hash
        } // we can increment the size to add it
        this.table[hash].addToHead(entry); // finally we add the entry into the linkedList
    }

    search(key) {
        const hash = this.hash(key);
        if (this.table.hasOwnProperty(hash) && this.table[hash].includes(key)) {
            return this.table[hash].getEntryByKey(key);
// remember that we have to check to make sure the hash AND the key exist, since a hash could contain a number of key-value pairs
        } else {
            return null;
        }
    }

    resize() {
        const previousTable = this.table;
        this.table = {};
        this.maxSize = this.nextPrime(this.maxSize);
        this.size = 0;
        Object.keys(previousTable).forEach(key => {
            let currentEntry = previousTable[key].head;
            do {
                let nextEntry = currentEntry.getNextEntry();
                currentEntry.next = null;
                this.add(currentEntry);
                currentEntry = nextEntry;
            }
            while (currentEntry);
            });
        }
}

const entries = [
    new HashEntry('alpha', 2),
    new HashEntry('beta', 12),
    new HashEntry('zeta', 21),
    new HashEntry('omega', 7),
    new HashEntry('epsilon', 18),
    new HashEntry('phi', 6),
    new HashEntry('rho', 5),
    new HashEntry('pi', 10),
    new HashEntry('delta', 17),
    new HashEntry('gamma', 14),
    new HashEntry('omicron', 9),
]

let myHashTable = new HashTable();

for (let i = 0; i < entries.length; i++) {
    myHashTable.add(entries[i]);
}

console.log(myHashTable.table);
console.log(myHashTable.search('epsilon'));