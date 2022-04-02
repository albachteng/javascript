class Matrix {
    width: number;
    height: number;
    content: unknown[];

    constructor(width: number, height: number, element = (x: number, y: number) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y += 1) {
            for (let x = 0; x < width; x += 1) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x: number, y: number) {
        return this.content[y * this.width + x];
    }

    set(x: number, y: number, value: unknown) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    x: number;
    y: number;
    matrix: Matrix;

    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y === this.matrix.height) return { done: true };

        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        this.x += 1;
        
        if (this.x === this.matrix.width) {
            this.x = 0;
            this.y += 1;
        }
        return { value, done: false };
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
}

class SymmetricMatrix extends Matrix {
    size: number;
    content: unknown[];

    constructor(size: number, element = (x: number, y: number) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }

    set(x: number, y: number, value: unknown) {
        super.set(x, y, value);
        if (x !== y) {
            super.set(y, x, value);
        }
    }
}