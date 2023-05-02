enum BUCKET_STATE {
  BLANK = 0,
  ONE = 1,
  ARRAY = 2,
};

export class HashTable<T> {
  private store: (T | T[])[];
  private bucket_state_map: BUCKET_STATE[];
  private capacity: number;
  private _length: number = 0;
  private hash_function: (value: T) => number;
  private expansion() {
    const target_capacity = this.capacity * 2;
    this.capacity = target_capacity;
    const cache_store = this.store;
    this.store = new Array(target_capacity);
    const cache_state_map = this.bucket_state_map;
    this.bucket_state_map = new Array(target_capacity);
    this.bucket_state_map.fill(BUCKET_STATE.BLANK);
    this._length = 0;
    for (let idx = 0; idx < cache_store.length; idx++) {
      const item = cache_store[idx];
      if (Array.isArray(item)) {
        item.forEach((i) => this.add(i));
      } else if (cache_state_map[idx] !== BUCKET_STATE.BLANK) {
        this.add(item);
      }
    }
  }
  get length() {
    return this._length;
  }
  constructor(capacity: number, hash_function: (value: T) => number) {
    if (capacity <= 0) throw new Error('constructor param error.');
    this.capacity = capacity;
    this.store = new Array(capacity);
    this.bucket_state_map = new Array(capacity);
    this.bucket_state_map.fill(BUCKET_STATE.BLANK);
    this.hash_function = hash_function;
  }
  add(value: T) {
    const validate_hash_code = this.hash_function(value);
    if (typeof validate_hash_code !== 'number') throw new Error('hash code isn`t number.');
    const hash_code = Math.round(validate_hash_code) % this.capacity;
    if (this.bucket_state_map[hash_code]) {
      const target = this.store[hash_code];
      if (Array.isArray(target)) {
        target.push(value);
      } else {
        this.store[hash_code] = [target, value];
      }
    } else {
      this.store[hash_code] = value;
      this.bucket_state_map[hash_code] = 1;
    }
    switch(this.bucket_state_map[hash_code]) {
      case BUCKET_STATE.BLANK: {
        this.store[hash_code] = value;
        this.bucket_state_map[hash_code] = BUCKET_STATE.ONE;
        break;
      }
      case BUCKET_STATE.ARRAY: {
        (this.store[hash_code] as T[]).push(value);
        break;
      }
      case BUCKET_STATE.ONE: {
        this.store[hash_code] = [this.store[hash_code] as T, value];
        this.bucket_state_map[hash_code] = BUCKET_STATE.ARRAY;
        break;
      }
    }
    this._length++;
  }
  delete(value: T, compare?: (a: T, b: T) => boolean) {
    const compare_function = !compare ? (a, b) => a === b : compare;
    const target_index = Math.round(this.hash_function(value)) % this.capacity;
    const target_bucket_state = this.bucket_state_map[target_index];
    switch(target_bucket_state) {
      case BUCKET_STATE.BLANK: {
        return null;
      }
      case BUCKET_STATE.ARRAY: {
        let idx = 0;
        let target = null;
        for (const item of this.store[target_index] as T[]) {
          if (compare_function(item, value)) {
            target = item;
            break;
          }
          idx++;
        }
        if (target) {
          (this.store[target_index] as T[]).splice(idx, 1);
          this._length--;
          if ((this.store[target_index] as T[]).length === 1) {
            this.store[target_index] = (this.store[target_index] as T[])[0];
            this.bucket_state_map[target_index] = BUCKET_STATE.ONE;
          }
          return target;
        }
        break;
      }
      case BUCKET_STATE.ONE: {
        if (compare_function(this.store[target_index] as T, value)) {
          const res = this.store[target_index];
          this.store[target_index] = undefined;
          this.bucket_state_map[target_index] = BUCKET_STATE.BLANK;
          this._length;
          return res;
        }
        break;
      }
    }
    return null;
  }
  forceExpansion() {
    this.expansion();
  }
}