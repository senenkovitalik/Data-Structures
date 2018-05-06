function Stack(size) {
  if (size === undefined) {
    throw new Error(Errors.ARGUMENTS_MISSED);
  }

  if (typeof size !== 'number') {
    throw new Error(Errors.INVALID_ARGUMENT_TYPE);
  }

  this.size = size;
  this.top = -1;

  this.stack = []; // could be improved
}

Stack.prototype.peek = function () {
  if (arguments.length > 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  if (this.stack.length === 0) {
    return null;
  }

  return this.stack[this.top];
};

Stack.prototype.isFull = function () {
  if (arguments.length > 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  return this.stack[this.top] !== undefined && this.top === this.size - 1;
};

Stack.prototype.isEmpty = function () {
  if (arguments.length > 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  return this.stack[0] === undefined && this.top === -1;
};

Stack.prototype.push = function (element) {
  if (element === undefined) {
    throw new Error(Errors.ARGUMENTS_MISSED);
  }

  if (this.isFull()) {
    throw new Error(Errors.STACK_IS_FULL);
  }

  this.stack.push(element);
  this.top++;
};

Stack.prototype.pop = function () {
  if (arguments.length > 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  if (this.isEmpty()) {
    throw new Error(Errors.STACK_IS_EMPTY);
  }

  this.stack.pop();
  this.top--;
};

Stack.prototype.print = function () {
  if (arguments.length > 0) {
    throw new Error(Errors.ARGUMENTS_DENIED);
  }

  return this.stack
};