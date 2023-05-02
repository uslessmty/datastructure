export class Queue<T> {
  private store: T[] = [];
  get length() {
    return this.store.length
  }
  top() {
    if (this.length === 0) return null;
    return this.store[0];
  }
  dequeue() {
    if (this.length === 0) return null;
    return this.store.shift();
  }
  enqueue(value: T) {
    this.store.unshift(value);
  }
}