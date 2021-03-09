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
    resize() { // alias
        this.double(); 
    }
    add(key, value) {
        if (this.size >= .6 * this.maxSize) {
            this.double();
        }
        let x = 1;
        let keyhash = this.getIndex(key)
        let index = keyhash;
        while (this.table[index] != null) {
            index = (keyhash + this.p(x)) % this.maxSize;
            x++;
        } 
        if (!this.table[index]) {
            this.table[index] = {};
        }
        if (!this.table[index].hasOwnProperty(key)) {
            this.size++;
        }
        this.table[index][key] = value;
    }
    insert() { // alias
        this.add();
    }
    push() { // alias
        this.add(); 
    }
    search(key) {
        let x = 1;
        let keyhash = this.getIndex(key);
        let index = keyhash;
        while (this.table[index] != null) {
            if (this.table[index].hasOwnProperty(key)) {
                return this.table[index];
            } else {
                index = (keyhash + this.p(x)) % this.maxSize;
                x++;
            }
        }
        return null;
    }
    delete(key) {
        const keyhash = this.getIndex(key);
        let index = keyhash;
        let x = 1;
        while (this.table[index] != null) {
            if (this.table[index].hasOwnProperty(key)) {
                let deleted = this.table[index];
                this.table[index] = null;
                return deleted; 
            } else {
                index = (keyhash + this.p(x)) % this.maxSize;
                x++; 
            }
        }
        return null;
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
for (let i = 0; i < names.length; i++) {
    peopleList[i] = {name: names[i], score: Math.ceil(Math.random() * 100)};
}
console.log(peopleList.length);

const peopleHash = new HashTable;
peopleList.forEach(person => {
    peopleHash.add(person.name, person.score);
})

console.log(peopleHash.table);
console.log(peopleHash.delete('Elvira Harrison')); 
console.log(peopleHash.table);

// add() should update when it has the same key
// include aliases? add = insert = push?
// probing function P(x) = x is a common choice
// keep alpha (the threshold factor) as a property of the hashtable?
// memoize hash values to make co pying / doubling faster

