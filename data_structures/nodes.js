class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNextNode(node) {
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error('Next node must be a member of the Node class');
        }
    }

    getNextNode() {
        return this.next;
    }
}

const youngest = new Node('young');
const middle = new Node('middle'); 
const oldest = new Node('oldest');

youngest.setNextNode(middle);
middle.setNextNode(oldest);

let current = youngest;
let oldestName = '';

while (current !== null) {
    oldestName = current.data;
    
}