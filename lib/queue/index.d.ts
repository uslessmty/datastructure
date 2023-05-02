export declare class Queue<T> {
    private store;
    get length(): number;
    top(): T;
    dequeue(): T;
    enqueue(value: T): void;
}
