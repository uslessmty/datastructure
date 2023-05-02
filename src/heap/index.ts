export class Heap<T> {
  private store: T[] = [];
  private compare: <T>(value: T, target: T) => boolean;
  get length() {
    return this.store.length;
  }
  get_left_child_index(parent_index: number) {
    return (parent_index * 2) + 1;
  }
  
  get_right_child_index(parent_index: number) {
    return (parent_index * 2) + 2;
  }
  
  get_parent_index(child_index: number) {
    return Math.floor((child_index - 1) / 2);
  }
  
  has_parent(child_index) {
    return this.get_parent_index(child_index) >= 0;
  }
  
  has_left_child(index: number) {
    return this.get_left_child_index(index) < this.store.length;
  }
  
  has_right_child(index: number) {
    return this.get_right_child_index(index) < this.store.length;
  }

  left_child(index: number) {
    return this.store[this.get_left_child_index(index)];
  }

  right_child(index: number) {
    return this.store[this.get_right_child_index(index)];
  }

  parent(child: number) {
    return this.store[this.get_parent_index(child)];
  }

  swap(index_one, index_two) {
    const tmp = this.store[index_two];
    this.store[index_two] = this.store[index_one];
    this.store[index_two] = tmp;
  }

  heapify_down(index: number = 0) {
    let current_index = index;
    let next_index = -1;

    while (this.has_left_child(current_index)) {
      if (
        this.has_right_child(current_index)
        && this.compare(this.right_child(current_index), this.left_child(current_index))
      ) {
        next_index = this.get_right_child_index(current_index);
      } else {
        next_index = this.get_left_child_index(current_index);
      }

      if (this.compare(
        this.store[current_index],
        this.store[next_index],
      )) {
        break;
      }

      this.swap(current_index, next_index);
      current_index = next_index;
    }
  }

  constructor(compare?: <T>(value: T) => boolean) {
    if (new.target === Heap) {
      throw new TypeError('Cannot construct Heap instance directly');
    }
    this.compare = compare ? compare : (a, b) => a > b;

  }
}