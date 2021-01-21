// Chapter 16 Eloquent JavaScript project 'Dark Blue'-style game
// most of the code here is not mine, but is copied or based off of the chapter

class Level {
    constructor(plan) {
        let rows = plan.trim().split("\n").map(l => [...l]); 
        // trim takes away whitespace at beginning and end, then we split at each newline
        // these lines are mapped to a spread array, creating each row of the level space
        this.height = rows.length; // derived from "rows"
        this.width = rows[0].length;
        this.startActors = []; // moving elements

        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let type = levelChars[ch];
                if (typeof type == "string") return type; 
                this.startActors.push(
                    type.create(new Vec(x, y), ch));
                    return "empty";
            });
        });
    }
}

class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors; // moving elements
        this.status = status;
    }

    static start(level) {
        return new State(level, level.startActors, "playing");
    } // status will switch to "lost" or "won" when game is ended;

    get player() {
        return this.actors.find(a => a.type == "player"); // locate player
    }
} // persistent: updating game state creates a new state and leaves the old one intact

class Vec { // for two-dimensional values, including position and size
    constructor(x, y) {
        this.x = x; 
        this.y = y;
    }
    plus(other) {
        return new Vec(
            this.x + other.x, 
            this.y + other.y
            );
        }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    } // multiply a speed vector by a time interval to calculate distance traveled
}

class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    get type() { return "player"; }

    static create(pos) {
        return new Player(pos.plus(new Vec(0, -0.5)), 
                                   new Vec(0, 0));
    } // player is one-and-a-half squares high, so initial position set to align with bottom
}

Player.prototype.size = new Vec(0.8, 1.5); // size property is the same for all instances
// so we store it on the prototype rather than on the instances themselves 

class Lava {
    constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
    }

    get type() { return "lava"; }

    static create(pos, ch) {
        if (ch == "=") {
            return new Lava (pos, new Vec(2, 0));
        } else if (ch == "|") {
            return new Lava (pos, new Vec(0, 2));
        } else if (ch == "v") {
            return new Lava (pos, new Vec(0, 3), pos); // dripping lava returns to top
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

class Coin {
    constructor(pos, basePos, wobble) {
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }

    get type() { return "coin"; }

    static create(pos) {
        let basePos = pos.plus(new Vec(0.2, 0.1));
        return new Coin (basePos, basePos, Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
    ".": "empty", 
    "#": "wall", 
    "+": "lava", 
    "@": Player, 
    "o": Coin, 
    "=": Lava, 
    "|": Lava, 
    "v": Lava
};

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

let simpleLevel = new Level(simpleLevelPlan);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`); // 22 by 9;

function elt(name, attrs, ...children) {
    // helper function creates an html element you name
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
    } // sets attributes from the provided attributes object
    for (let child of children) {
        dom.appendChild(child); // appends children from the children list
    }
    return dom; // returns the generated element
} // nts: this seems like a pretty useful helper function to keep around!



