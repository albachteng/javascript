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
    current = current.getNextNode();
}

console.log(oldestName); // expect 'oldest'

class LinkedList {
    constructor() {
        this.head = null; // initialize empty
    }

    addToHead(data) {
        const newHead = new Node(data);
        const currentHead = this.head;
        this.head = newHead;
        if (currentHead) {
            this.head.setNextNode(currentHead);
        }
    }

    addToTail(data) {
        let current = this.head;
        if (!current) {
            this.head = new Node(data);
        } else {
            while (current.getNextNode() !== null) {
                current = current.getNextNode();
            }
            current.setNextNode(new Node(data));
        }
    }

    removeHead() {
        const removedHead = this.head;
        if (!removedHead) {
            return;
        }
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }

    printList() {
        let currentNode = this.head;
        let output = '<head> ';
        while (currentNode !== null) {
            output += currentNode.data + ' ';
            currentNode = currentNode.getNextNode();
        }
        output += '<tail>';
        console.log(output); 
    }
}

const list = new LinkedList();
let seasons = ['spring', 'summer', 'fall', 'winter', 'spring'];
for (season in seasons) {
    list.addToTail(seasons[season]); 
}
list.printList();