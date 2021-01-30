//@ts-ignore
class ListNode {
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
class LinkedList {
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