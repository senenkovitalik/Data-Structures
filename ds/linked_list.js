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
 * @return {number} new length
 */
DoublyLinkedList.prototype.add = function (data) {
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

  return ++this.length;
};

/**
 * Add new Node to the end of the list
 * @param * data
 * @returns {number} New list length
 */
DoublyLinkedList.prototype.addLast = function (data) {
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
    const last = this.findByIndex(this.length - 1);
    node.prev = last;
    last.next = node;
  }

  return ++this.length;
};

/**
 * Remove Node from the beginning of the list
 * @return {number} new length of the list
 */
DoublyLinkedList.prototype.remove = function () {
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

  return --this.length;
};

/**
 * Remove last node.
 * Empty list return null.
 * @returns {(number|null)} new length or null
 */
DoublyLinkedList.prototype.removeLast = function () {
  if (arguments.length != 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  if (this.head === null) {
    return null;
  }

  const last_node = this.findByIndex(this.length - 1);
  if (last_node !== null) {
    const prev_node = last_node.prev;
    prev_node.next = null;
    return --this.length;
  }
  return null;
};

/**
 * Remove node at index if 0 <= index < length.
 * If index < 0 -> return null;
 * @params {number} index
 * @return {(number|null)} new length or null
 */
DoublyLinkedList.prototype.removeAt = function(index) {
  if (arguments.length === 0) {
    throw new Error(Errors.MISSING_ARGUMENT);
  }

  if (typeof index !== "number") {
    throw new Error(Errors.INVALID_INDEX_TYPE);
  }

  if (index < 0) {
    throw new Error(Errors.OUT_OF_RANGE);
  }

  if (index === 0) {
    this.remove();
  } else if (index === this.length - 1) {
    this.removeLast();
  } else {
    const node_to_remove = this.findByIndex(index);
    const prev_node = node_to_remove.prev;
    const next_node = node_to_remove.next;
    prev_node.next = next_node;
    next_node.prev = prev_node;
    this.length--;
  }

  return this.length;
};

/**
 * Insert Node at the specified index. 
 * If index >= length -> add to the end.
 * If index < 0 -> index will be counted from the end.
 * IF index < 0 && |index| >= length -> add to the beginning. 
 * @param [*] data - data for new Node 
 * @param [number] index - if index < 0 - insert from end, else - from start
 */
DoublyLinkedList.prototype.insertAt = function(data, index) {
  if (arguments.length === 0) {
    throw new Error("You need to pass data and index arguments");
  }

  if (arguments.length > 2) {
    throw new Error("You can pass only 2 arguments");
  }

  if (data === undefined || data === null) {
    throw new Error("Illegal data value");
  }

  if (typeof index !== "number") {
    throw new Error("Invalid type of index arg. Must be Number");
  }

  const insertBefore = function(current_node, data, index) {
    if (current_node.next === null) {
      this.addLast(data);
      return;
    }
    if (current_node.prev === null) {
      this.add(data);
      return;
    }
    
    const new_node = new DoublyNode(data);
    const prev_node = current_node.prev;
    const next_node = current_node;

    new_node.prev = prev_node;
    new_node.next = next_node;

    prev_node.next = new_node;
    next_node.prev = new_node;

    this.length++;
  }.bind(this);

  if (Math.abs(index) >= this.length) {
    if (index > 0) {
      // as a last element, index = length
      this.addLast(data)
    } else {
      // as a first element, index = 0
      this.add(data);
    }
  } else {
    if (index >= 0) {
      // from start, index = index
      const current_node = this.findByIndex(Math.abs(index));
      insertBefore(current_node, data, index);
    } else {
      // from end, index = length + index
      const current_node = this.findByIndex(Math.abs(this.length + index));
      insertBefore(current_node, data, this.length + index);
    }
  }

  return this.length;
};

/**
 * Find Node by index
 * @param [number] index
 * @returns {(number|null)}
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

  while (count < this.length) {
    if (count === index) {
      return current_node;
    }
    current_node = current_node.next;
    count++;
  }

  return null; 
};

/**
 * Print all nodes
 */
DoublyLinkedList.prototype.show = function() {
  const arr = [];
  let current_node = this.head;
  let count = 0;
  while (count < this.length) {
    arr.push(current_node);
    current_node = current_node.next;
    count++;
  }
  console.log(arr);
};