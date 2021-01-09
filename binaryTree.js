class binaryTree {
    constructor(value, depth=1) {
        this.value = value;
        this.depth = depth;
        this.left = null;
        this.right = null;
    }
    
    insert(value) { // note that this doens't tell the binary tree what to do with equal values
        if (value < this.value) {
            if (!this.left) {
                this.left = new binaryTree(value, this.depth + 1);
            } else {
                this.left.insert(value);
            }
        } else {
            if (value > this.value) {
                if (!this.right) {
                    this.right = new binaryTree(value, this.depth + 1);
                } else {
                    this.right.insert(value);
                }
            }
        }
    }

    getNodeByValue(value) {
        if (this.value === value) {
            return this;
        } else if ((this.left) && (this.value > value)) {
            return this.left.getNodeByValue(value);
        } else if ((this.right) && (this.value < value)) {
            return this.right.getNodeByValue(value);
        } else return null;
    }

    depthFirstTraversal() {
        if (this.left) {
            this.left.depthFirstTraversal();
        }
        console.log(this.value);
        console.log(`Depth: ${this.depth}`);
        if (this.right) {
            this.right.depthFirstTraversal();
        }
    }

    sum(node) { // returns the summed value of the node and all children's values recursively
        let ans = 0;
        if (node instanceof binaryTree) {
            ans+= node.value;
        }
        if (node.left) {
            ans+= this.sum(node.left);
        }
        if (node.right) {
            ans+= this.sum(node.right);
        }
        return ans;
    }

    parities(node) {
        let ans = 0;
        if (node === null) {
            return 0;
        }
        if (node.right && node.left) {
            let left = this.sum(node.left);
            let right = this.sum(node.right);
    
            if (left % 2 !== right % 2) {
                ans+= 1 + this.parities(node.left) + this.parities(node.right);
            }
        }
        return ans;
    }
}

const bt = new binaryTree(10);
bt.insert(5);
bt.insert(14);
bt.insert(8);
bt.insert(12);
bt.insert(6);
bt.insert(15);
bt.insert(3);
bt.depthFirstTraversal();
console.log(bt.parities(bt)); // should return 3;

const randomize = () => {
    return Math.floor(Math.random() * 20);
}
const values = [];
for (let i = 0; i < 20; i++) {
    values.push(randomize());
    bt.insert(values[i]);
}
console.log(`Inserted [${values}] into binary tree.`);

bt.depthFirstTraversal();
