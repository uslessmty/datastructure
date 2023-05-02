export class Stack<T> {
  private store: T[] = [];
  get length() {
    return this.store.length
  }
  top() {
    if (this.length === 0) return null;
    return this.store[this.length - 1];
  }
  pop() {
    if (this.length === 0) return null;
    return this.store.pop();
  }
  push(value: T) {
    this.store.push(value);
  }
}