type DoubleLinkedListNode<T> = {
  value: T;
  prev: DoubleLinkedListNode<T>;
  next: DoubleLinkedListNode<T>;
};

export class DoubleLinkedList<T> {
  private head: DoubleLinkedListNode<T> | null;
  private tail: DoubleLinkedListNode<T> | null;
  private _length: number = 0;
  get length() {
    return this._length;
  }
  add(value: T, index?: number) {
    if (index < 0 || index > this._length) return;
    const current: DoubleLinkedListNode<T> = {
      value,
      prev: null,
      next: null,
    }
    const target_index = index === undefined ? this._length : index;
    if (this._length === 0) {
      this.head = this.tail = current;
    } else if (target_index === 0) {
      current.next = this.head;
      this.head.prev = current;
      this.head = current;
    } else if (target_index === this._length) {
      this.tail.next = current;
      current.prev = this.tail;
      this.tail = current;
    } else {
      let pointer = this.head;
      let pointer_index = 0;
      while (pointer_index !== target_index) {
        pointer_index++;
        pointer = pointer.next;
      }
      current.prev = pointer.prev;
      pointer.prev.next = current;
      current.next = pointer;
      pointer.prev = current;
    }
    this._length++;
  }
  delete(index?: number) {
    if (this.length === 0 || index < 0 || index >= this._length) return null;
    const target_index = index === undefined ? this._length - 1 : index;
    let res = null;
    if (this._length === 1) {
      res = this.head;
      this.head = this.tail = null;
    } else if (target_index === 0) {
      res = this.head;
      this.head = this.head.next;
      this.head.prev = null;
    } else if (target_index === this._length - 1) {
      res = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      res = this.head;
      let pointer_index = 0;
      while (pointer_index !== target_index) {
        pointer_index++;
        res = res.next;
      }
      res.prev.next = res.next;
      res.next.prev = res.prev;
    }
    this._length--;
    res.prev = null;
    res.next = null;
    return res
  }
}