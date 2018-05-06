/*
 * Feel free to right any code you want to test.
 * Find results at Developers Console.
 */
 
const stack = new Stack(5);
stack.push(12);
stack.push(23);
stack.push(34);
stack.push(45);
stack.push(56);

console.log(stack.print());

stack.pop();

console.log(stack.print());