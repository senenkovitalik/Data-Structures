function Node() {}

// ########## Single Node ############################

function SingleNode(data) {
	this.data = data;
	this.next = null;
}

SingleNode.prototype = Object.create(Node.prototype);
SingleNode.prototype.constructor = SingleNode;

// ########## Doubly Node ############################

function DoublyNode(data) {
	if (data === undefined || data === null) {
    throw new Error("Data arguments can't be any type except null or undefined");
	}
	this.data = data;
	this.next = null;
	this.prev = null;
}

DoublyNode.prototype = Object.create(Node.prototype);
DoublyNode.prototype.constructor = DoublyNode;