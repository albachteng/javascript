class HashTable {
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
        this.size = 0;
        this.table = [];
        for (let i = 0; i < this.maxSize; i++) {
            this.table[i] = null; 
        } // initialize all tables for the given number of maxSize to null
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
        return index % this.maxSize;
    }
    double() {
        // doubles maxSize when size reaches 60% of maxSize 
        this.maxSize*= 2;
        console.log(this.maxSize);
        let oldtable = this.table;
        let newtable = [];
        for (let i = 0; i < this.maxSize; i++) {
            newtable[i] = null; 
        } // create a newtable of the appropriate size
        this.table = newtable;
        this.size = 0; // reset size to zero or else the copying below will throw off the count
        oldtable.forEach(index => {
            if (index) {
                Object.keys(index).forEach(key => {
                    this.add(key, index[key]);
                })
        }});
    }
    add(key, value) {
        if (this.size >= .6 * this.maxSize) {
            this.double();
        }
        const hash = this.getIndex(key);
        if (!this.table[hash]) {
            this.table[hash] = {};
        }
        if (!this.table[hash].hasOwnProperty(key)) {
            this.size++;
        }
        this.table[hash][key] = value;
    }
    search(key) {
        const hash = this.getIndex(key);
        if (this.table[hash] && this.table[hash].hasOwnProperty(key)) {
            return this.table[hash][key];
        } else {
            return null;
        }
    }
    delete(key) {
        const hash = this.getIndex(key); 
        if (this.table[hash] && this.table[hash].hasOwnProperty(key)) {
            delete this.table[hash][key]; // should return true
            if (this.table[hash] && Object.keys(this.table[hash]).length === 0) {
                this.table[hash] = null; 
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
const peopleHash = new HashTable;
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
// linear probing ichromenstead of separate chaining? 
// separate chaining - use a linked list data structure
// include aliases? add = insert = push?
// probing function P(x) = x is a common choice
// keep alpha (the threshold factor) as a property of the hashtable?
// memoize hash values to make co pying / doubling faster

