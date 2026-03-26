class Node {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.capacity = 16;
    this.buckets = [];
    this.loadFactor = 0.75;
    this.size = 0;

    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = null;
    }
  }

  hash(key) {
    let hashCode = 0;
    let primeNumber = 31;
    let capacity = this.buckets.length;

    for (let i = 0; i < key.length; i++) {
      let charCode = key.charCodeAt(i);
      hashCode = primeNumber * hashCode + charCode;
      hashCode = hashCode % capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      let newNode = new Node(key, value, null);
      this.buckets[index] = newNode;
      this.size = this.size + 1;
      return;
    }

    let currentNode = this.buckets[index];

    while (currentNode !== null) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }

      if (currentNode.next === null) {
        let newNode = new Node(key, value, null);
        currentNode.next = newNode;
        this.size = this.size + 1;
        break;
      }

      currentNode = currentNode.next;
    }

    // if (this.size > (this.capacity * this.loadFactor)) {
    //     this.grow();
    // }
  }
  get(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] === null) {
      return null;
    }

    let currentNode = this.buckets[index];

    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }

      currentNode = currentNode.next;
    }

    return null;
  }
  has(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index of bounds");
    }

    if (this.buckets[index] === null) {
      return false;
    }

    let currentNode = this.buckets[index];

    while (currentNode !== null) {
      if (currentNode.key === key) {
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }
  remove(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings");
    }

    let index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index of bounds");
    }

    if (this.buckets[index] === null) {
      return false;
    }

    if (this.buckets[index].key === key) {
      this.buckets[index] = this.buckets[index].next;
      this.size = this.size - 1;
      return true;
    }

    let currentNode = this.buckets[index];

    while (currentNode.next !== null) {
      if (currentNode.next.key === key) {
        currentNode.next = currentNode.next.next;
        this.size = this.size - 1;
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }
  length() {
    return this.size;
  }
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
        this.buckets[i] = null;
    }

    this.size = 0;
  }
}


