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
            let type = levelChars[ch];
            if (typeof type == "string") return type; 
            this.startActors.push(
                type.create(new Vec(x, y), ch));
                return "empty";
        })
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

class Vec {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
    }
    plus(other) {
        return new Vec(
            this.x + other.x, 
            thix.y + other.y
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