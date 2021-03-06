//@ts-ignore
export class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  
    setNextNode(node) {
      if (!(node instanceof ListNode)) {
        throw new Error('Next node must be a member of the Node class');
      }
      this.next = node;
    }
  
    setNext(data) {
      this.next = data;
    }
  
    getNextNode() {
      return this.next;
    }
  }
  
//@ts-ignore
export class LinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const nextNode = new ListNode(data);
    const currentHead = this.head;
    this.head = nextNode;
    if (currentHead) {
      this.head.setNextNode(currentHead);
    }
  }

  addToTail(data) {
    let lastNode = this.head;
    if (!lastNode) {
      this.head = new ListNode(data);
    } else {
      let temp = this.head;
      while (temp.getNextNode() !== null) {
        temp = temp.getNextNode();
      }
      temp.setNextNode(new ListNode(data));
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

  removeTail() {
    let previousNode = this.head;
    if (!previousNode) { // no head, therefore no tail
      return null; 
    }
    let currentNode = this.head.next;
    if (!currentNode) { // i.e. if list is only a head
      return this.removeHead();
    }
    while (currentNode.getNextNode()) {
      currentNode = currentNode.getNextNode();
      previousNode = previousNode.getNextNode();
    }
    previousNode.next = null; // orphan the tail
    return currentNode.data;
  }

  nthLastNode(n) {
    let nthLastNodePointer = null;
    let tailPointer = this.head;
    let count = 0;

    while (tailPointer) {
      tailPointer = tailPointer.getNextNode(); 
      if (count >= n) {
        if (!nthLastNodePointer) {
          nthLastNodePointer = this.head;
        }
        nthLastNodePointer = nthLastNodePointer.getNextNode(); 
      }
      count++;
    }
    return nthLastNodePointer;
  }

  findMiddle() {
    let fastPointer = this.head;
    let middlePointer = this.head;

    while (fastPointer) {
      fastPointer = fastPointer.getNextNode();
      if (fastPointer !== null) {
        fastPointer = fastPointer.getNextNode();
        middlePointer = middlePointer.getNextNode();  
      }
    }
    return middlePointer;
  }

  printList() {
    let currentNode = this.head;
    let output = '<head> ';
    while (currentNode !== null) {
      output += currentNode.data + ' ';
      currentNode = currentNode.next;
    }
    output = output.concat("<tail>");
    console.log(output);
  }
}

let numbers = new LinkedList;
for (let i = 0; i < 100; i++) {
  numbers.addToTail(i);
}
numbers.printList(); 

console.log(numbers.findMiddle()); // expect 49;