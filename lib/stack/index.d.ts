export declare class Stack<T> {
    private store;
    get length(): number;
    top(): T;
    pop(): T;
    push(value: T): void;
}
