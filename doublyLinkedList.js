//@ts-ignore
class ListNode {
    constructor(data, next) {
     this.data = (data === undefined ? 0 : data);
     this.next = (next === undefined ? null : next);
    }
}

class DoubleNode extends ListNode {
    constructor(data, next, previous) {
        super(data, next);
        this.previous = (previous === undefined ? null : previous);
    }

    setNextNode(node) {
        if (node instanceof DoubleNode || node === null) {
            this.next = node;
        } else {
            throw new Error('Next node must be a member of the class DoubleNode or null')
        }
    }

    setPreviousNode(node) {
        if (node instanceof DoubleNode || node === null) {
            this.previous = node;
        } else {
            throw new Error('Previous node must be a member of the class DoubleNode or null')
        }
    }

    getNextNode() {
        return this.next;
    }

    getPreviousNode() {
        return this.previous;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToHead(newHead) {
      if (!newHead) { // disallow adding null values
        return null;
      }
      if (!(newHead instanceof DoubleNode)) {
        newHead = new DoubleNode(newHead);
      }
      const previousHead = this.head; // allows us to manipulate the head while we insert a new value

      if (previousHead) {
          previousHead.setPreviousNode(newHead);
          newHead.setNextNode(previousHead);
      }
      if (!this.tail) { // if there is no tail, the previous head will become the tail;
          this.tail = previousHead;
      }
      this.head = newHead; // now that we've moved the previous head into position, we can reassign this.head;
    }

    addToTail(newTail) {
      if (!newTail) {
        return null;
      }
      if (!(newTail instanceof DoubleNode)) {
        newTail = new DoubleNode(newTail);
      }
      const previousTail = this.tail;

      if (previousTail) { // i.e. if the tail is not a null node;
        previousTail.setNextNode(newTail);
        newTail.setPreviousNode(previousTail);
      }
        this.tail = newTail;
        if (!this.head) {
          this.head = previousTail; 
          // if there was a tail but no head, we set the previous tail as the head;
        }
      }

      removeHead() { // oh, the horror!
        const removedHead = this.head;
        if (!removedHead) { // if there's no head to remove
          return null;
        }
        this.head = removedHead.getNextNode(); // head is now the next node
        if (this.head) { // i.e. if the next node is not null
          this.head.setPreviousNode(null);
        }
        if (removedHead === this.tail) {
          this.removeTail();
        }
        return removedHead.data;
      }

      removeTail() {
        const removedTail = this.tail;
        if (!removedTail) {
          return null;
        }
        this.tail = removedTail.getPreviousNode();
        if (this.tail) {
          this.tail.setNextNode(null);
        }
        if (removedTail === this.head) {
          this.removeHead();
        }
        return removedTail.data;
      }

      removeByData(data) {
        let nodeToRemove;
        let currentNode = this.head;
        while (currentNode !== null) {
          if (currentNode.data === data) {
            nodeToRemove = currentNode;
            break;
          }
          currentNode = currentNode.getNextNode();
        }
        if (!nodeToRemove) {
          return null;
        }
       if (nodeToRemove === this.head) {
         this.removeHead();
       } else if (nodeToRemove === this.tail) {
         this.removeTail();
         } else {
           const nextNode = nodeToRemove.getNextNode();
           const previousNode = nodeToRemove.getPreviousNode();
           nextNode.setPreviousNode(previousNode);
           previousNode.setNextNode(nextNode);
         }
         return nodeToRemove;
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

const subwayStations = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR'];

const subway = new DoublyLinkedList();

subwayStations.forEach(item => subway.addToHead(item));

subway.printList();
subway.removeByData('DEF');
subway.printList();
subway.removeHead();
subway.printList();
subway.removeTail();
subway.printList();
console.log(subway.removeByData('ABC'));
subway.addToHead('ABC');
subway.printList();
subway.addToTail('XYZ');
subway.printList();
console.log(subway.head);
subway.addToTail(null); // disallow adding null nodes
subway.printList();
console.log(subway.tail);
subway.addToTail('STU');
subway.printList();