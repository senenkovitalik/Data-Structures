// ############### LinkedList ###################################

function LinkedList() {}

LinkedList.prototype.head = null;
LinkedList.prototype.length = 0;

// ############### DoublyLinkedList #############################

function DoublyLinkedList() {}

DoublyLinkedList.prototype = Object.create(LinkedList.prototype);
DoublyLinkedList.prototype.constructor = DoublyLinkedList;

/**
 * Add new Node to the beginning of the list
 * @param * data
 */
DoublyLinkedList.prototype.addNode = function (data) {
  if (arguments.length > 1) {
    throw new Error("More than one argument");
  }

	if (data === null || data === undefined) {
		throw new Error("Specify 'data' arg. What ever you want, but not 'null' or 'undefined'");
	}

  const node = new DoublyNode(data);

  if (this.head === null) {
    this.head = node;
  } else {
  	const f_node = this.head;
  	f_node.prev = node;
  	node.next = f_node;
  	this.head = node;
  }

  this.length++;
};

/**
 * Remove Node from the beginning of the list
 */
DoublyLinkedList.prototype.removeNode = function () {
  if (arguments.length > 0) {
    throw new Error("This function takes no arguments");
  }
 
  if (this.length === 0) {
  	throw new Error("List is empty");
  }

  let f_node = this.head;
  let s_node;

  if (this.length > 1) {
    s_node = f_node.next;

    s_node.prev = null;
    this.head = s_node;

    f_node.next = null; 
  } else {
    this.head = null;
  }

  this.length--;
};

/**
 * Insert Node at the specified index
 * @param [number] index
 */
DoublyLinkedList.prototype.insertBefore = function(data, index) {
  if (arguments.length === 0) {
    throw new Error("You need to pass data and index arguments");
  }

  if (arguments.length > 2) {
    throw new Error("You can pass only 2 arguments");
  }

  if (data === undefined || data === null) {
    throw new Error("Illegal data value");
  }

  if (typeof index !== "number" || index < 0) {
    throw new Error("Illegal index arg. Must be number >= 0");
  }

  // it will be next
  const next = this.findByIndex(index);

  if (next === null) {
    throw new Error("No Node at specified index");
  }

  let prev = next.prev;
  const current = new DoublyNode(data);
  
  if (prev === null) {
    this.head = current;
    current.prev = null;
  } else {
    prev.next = current;
    current.prev = prev;
  }

  current.next = next;
  next.prev = current;

  this.length++;
};

/**
 * Find Node by index
 * @param [number] index
 */
DoublyLinkedList.prototype.findByIndex = function(index) {
  if (arguments.length === 0) {
    throw new Error("You need to pass index argument");
  }

  if (arguments.length > 1) {
    throw new Error("You can pass only 1 arguments");
  }

  if (typeof index !== "number" || index < 0) {
    throw new Error("Illegal index arg. Must be number >= 0");
  }

  if (this.head === null) {
    return null;
  }

  let current_node = this.head;
  let count = 0;

  if (count === index) {
    return current_node;
  }

  while (current_node.next) {
    if (count === index) {
      return current_node;
    }
    current_node = current_node.next;
    count++;
  }

  return null; 
};