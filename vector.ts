class Vector {
    x: number
    y: number
    length: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.length = Math.sqrt(x**2 + y**2);
    }

    plus(vec: Vector) {
        const x = this.x + vec.x;
        const y = this.y + vec.y;
        return new Vector(x, y);
    }

    minus(vec: Vector) {
        const x = this.x - vec.x;
        const y = this.y - vec.y;
        return new Vector(x, y);
    }

    getLength() {
        return this.length;
    }

    setX(x: number)  {
        this.x = x;
    }

    setY(y: number)  {
        this.y = y;
    }

    setCoordinates(x: number, y: number) {
        this.y = y;
        this.x = x;
        this.length = Math.sqrt(x**2 + y**2);
    }
}