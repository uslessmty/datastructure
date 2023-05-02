export declare class HashTable<T> {
    private store;
    private bucket_state_map;
    private capacity;
    private _length;
    private hash_function;
    private expansion;
    get length(): number;
    constructor(capacity: number, hash_function: (value: T) => number);
    add(value: T): void;
    delete(value: T, compare?: (a: T, b: T) => boolean): any;
    forceExpansion(): void;
}
