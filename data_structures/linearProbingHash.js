class HashTable {
    constructor(maxSize = 10, resizeThreshold = .6) {
        this.maxSize = maxSize;
        this.resizeThreshold = resizeThreshold;
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
    getAlpha() {
        return this.resizeThreshold;
    }
    getResizeThreshold() { // alias
        this.getAlpha();
    }
    setAlpha(alpha) {
        this.resizeThreshold = alpha;
    }
    setResizeThreshold(alpha) { // alias
        this.setAlpha(alpha);
    }
    getIndex(key) {  
        let index = 0;
        for (let i = 0; i < key.length; i++) {
            index += index + key.charCodeAt(i);
        }
        return index % this.maxSize;
    }
    hash(key) { // alias
        this.getIndex(key);
    }
    p(x) { // probing function
        return x;
    }
    double() {
        // doubles maxSize when size reaches 60% of maxSize 
        this.maxSize*= 2;
        console.log(this.maxSize);
        let oldTable = this.table;
        let newTable = [];
        for (let i = 0; i < this.maxSize; i++) {
            newTable[i] = null; 
        } // create a newTable of the appropriate size
        this.table = newTable;
        this.size = 0; // reset size to zero or else the copying below will throw off the count
        oldTable.forEach(index => {
            if (index && index != 'TOMBSTONE') {
                Object.keys(index).forEach(key => {
                    this.add(key, index[key]);
                })
        }});
    }
    resize() { // alias
        this.double(); 
    }
    add(key, value) {
        if (this.size >= this.resizeThreshold * this.maxSize) {
            this.double();
        }
        let j = -1, x = 0;
        let keyhash = this.getIndex(key)
        let index = keyhash;

        do {
            // current slot was previously deleted
            if (this.table[index] == "TOMBSTONE") {
                // remember where we found the first tombstone
                if (j == -1) j = index; 
            // current cell contains a key already
            } else if (this.table[index] != null) {
                // if the key we're inserting already exists, we update it
                if (this.table[index].hasOwnProperty(key)) {
                    let oldValue = this.table[index];
                    if (j == -1) {
                        this.table[index][key] = value;
                    } else {
                        // swap with the TOMBSTONE we found earlier
                        this.table[index] = "TOMBSTONE";
                        this.table[j] = {};
                        this.table[j][key] = value;  
                    }
                    this.size++;
                    return oldValue;
                }
            // current cell is null
            } else {
                // if no tombstones yet
                if (j == -1) {
                    this.size++;
                    this.table[index] = {};
                    this.table[index][key] = value;
                // if we found a tombstone
                } else {
                    this.size++;
                    this.table[j] = {};
                    this.table[j][key] = value; 
                }
                return null;
            }
            index = (keyhash + this.p(x++)) % this.maxSize;
        } while (true);
    }
    insert(key, value) { // alias
        this.add(key, value);
    }
    put() { // alias
        this.add(key, value); 
    }
    search(key) {
        if (key == null) throw new Error("Null key");
        let x = 0;
        let keyhash = this.getIndex(key);
        let index = keyhash;
        while (this.table[index] != null) {
            if (this.table[index].hasOwnProperty(key)) {
                return this.table[index];
            } else {
                index = (keyhash + this.p(x++)) % this.maxSize;
            }
        }
        return null;
    }
    delete(key) {
        if (key == null) throw new Error("Null key");
        const keyhash = this.getIndex(key);
        let index = keyhash;
        let x = 0;
        while (this.table[index] != null) {
            // it has our object
            if (this.table[index].hasOwnProperty(key)) {
                let deleted = this.table[index];
                // our "something here was deleted" placeholder
                this.table[index] = "TOMBSTONE";
                this.size--;
                // return deleted in case we need it
                return deleted; 
            } else {
                // keep probing if that returned 'TOMBSTONE' or a different object
                index = (keyhash + this.p(x++)) % this.maxSize;
            }
        }
        // does not exist
        return null;
    }
    remove(key) { // alias
        this.delete(key);
    }
    clear() {
        this.maxSize = 10;
        this.size = 0;
        this.table = [];
        for (let i = 0; i < this.maxSize; i++) {
            this.table[i] = null; 
        }
    }
    print() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] != null) {
                console.log(`Index: ${i} || ${JSON.stringify(this.table[i])}`);
            }
        }
        console.log(`Current size: ${this.size} || Current capacity: ${this.maxSize}`);
        console.log(`Next resize at ${Math.ceil(this.maxSize * this.resizeThreshold)}`);
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

const peopleList = [];
for (let i = 0; i < 20; i++) {
    peopleList[i] = {name: names[i], score: Math.ceil(Math.random() * 100)};
}

const peopleHash = new HashTable;
peopleList.forEach(person => {
    peopleHash.add(person.name, person.score);
})

console.log(peopleHash.table);

for (let i = 21; i < 40; i++) {
    peopleList[i] = {name: names[i], score: Math.ceil(Math.random() * 100)};
    peopleHash.insert(peopleList[i].name, peopleList[i].score);
}

console.log(peopleHash.table);
peopleHash.delete('Marcos Robinson');
peopleHash.delete('Shirley Wilkins');
peopleHash.delete('Marian Todd');
peopleHash.delete('Cary Kelly');
console.log(peopleHash.table);

for (let i = 41; i < 60; i++) {
    peopleList[i] = {name: names[i], score: Math.ceil(Math.random() * 100)};
    peopleHash.insert(peopleList[i].name, peopleList[i].score);
}

console.log(peopleHash.table);
peopleHash.delete('Elvira Harrison');
peopleHash.print();

// memoize hash indices to make copying / doubling faster?
// additional functionalities: 
    // error handling (no negative or zero capacity, no null keys, etc)
    // collision count? could be interesting for testing