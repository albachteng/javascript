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
            if (currentEntry.key.toLowerCase() === key.toLowerCase()) {
                return true;
            } else {
                currentEntry = currentEntry.getNextEntry();
            }
        } return false;
    }
    getEntryByKey(key) {
        let currentEntry = this.head;
        while (currentEntry) {
            if (currentEntry.key.toLowerCase() === key.toLowerCase()) {
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

    getSize() {
        return this.size;
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
        let name = key.toLowerCase();
        let output = 0;
        for (let i = 0; i < name.length; i++) {
            output += name.charCodeAt(i);
        }
        return output % this.maxSize;
    }

    add(entry) {
        const hash = this.hash(entry.key); 
        if (!this.table.hasOwnProperty(hash)) {
            this.table[hash] = new LinkedList(); 
        }
        if (!this.table[hash].includes(entry.key)) {
            this.size++; 
        } 
        this.table[hash].addToHead(entry); 
        if (this.size / this.maxSize >= .6) {
            this.resize(); 
        }
    }

    insert(entry) { // alias
        this.add(entry);
    }

    push(entry) { // alias
        this.add(entry);
    }

    search(key) {
        const hash = this.hash(key);
        if (this.table.hasOwnProperty(hash) && this.table[hash].includes(key)) {
            return this.table[hash].getEntryByKey(key);
        } else {
            return null;
        }
    }

    find(key) { // alias
        this.search(key);
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
    
    printTable() {
        Object.keys(this.table).forEach(key => {
            console.log(key, this.table[key].printList()); 
        });
        console.log(`Size: ${this.size} out of ${this.maxSize}.`, 
        `Next resize at ${Math.ceil(this.maxSize * .6)}.`);
    }

    print() {
        this.printTable();
    }
}

const names = ['Max Willis','Tamara Chapman', 'Kelli Carroll',
    'Philip Holloway','Elvira Harrison','Franklin Jordan','Lela Mitchell',
    'Terrell Peterson','Judith Gill','Cindy Mills','Myron Robertson',
    'Alyssa Cobb','Eva Quinn','Jan Gibson','Shirley Wilkins',
    'Joanna Tyler','Paulette Farmer','Boyd Baker','Ricardo Watson',
    'Michele Martinez','Monique Singleton','Tyler Chavez','Marcos Robinson',
    'Dale Bennett','Joey Clayton','Marian Todd','Cary Kelly',
    'Diana Woods','Carlton Mclaughlin','Frankie Stewart','Hugo Manning',
    'Roy Graham','Megan Wise','May Allen','Olivia Rivera',
    'Margarita Kennedy','Sheryl Castillo','Dwayne Flowers','Harry Welch',
    'Jessica Garza','Israel Turner','Albert Jimenez','Aubrey Rowe',
    'Noah Ball','Caleb Hunter','Ed Burns','Lynne Mcdonald',
    'Lori Parker','Sonia Porter','Stephanie Roy','Krystal Clark',
    'Chris Chambers','Belinda Lyons','Wilson Townsend','Jimmy Mccormick',
    'Calvin Scott','Alma Gibbs','Rex Copeland','Dewey Moore',
    'Felix Powers','Frederick Hansen','Dorothy Green','Maxine Schneider',
    'Antonia Doyle','Randal Weaver','Eula Norton','Cecilia Aguilar',
    'Cecelia Hammond','Monica Walters','Allan Phelps','Shaun Tucker',
    'Clark Warner','Johanna Barnett','Leigh Alvarez','Wilma Edwards',
    'Tabitha Hunt','Darrell French','Beulah Richards','Salvador West',
    'Charlotte Robbins','Phil Wilkerson','Judy Austin','Jamie Reid',
    'Loretta Mcgee','Cora Pittman','Clifton Hart','Connie Palmer',
    'Traci Lee','Geoffrey Moreno','Lynn Medina','Sandra Vasquez',
    'Benjamin Gilbert','Alberto Schmidt','Vernon Thompson','Antoinette Hamilton',
    'Susan Gordon','Orlando Benson','Lamar Hicks','Lucy Young',
    'Gladys King'];

const entries = [];
for (let i = 0; i < names.length; i++) {
    entries.push(new HashEntry(names[i], Math.floor(Math.random() * 100)));
}

let myHashTable = new HashTable();

for (let i = 0; i < entries.length; i++) {
    myHashTable.add(entries[i]);
}

myHashTable.printTable();