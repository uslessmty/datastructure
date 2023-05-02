export declare class DoubleLinkedList<T> {
    private head;
    private tail;
    private _length;
    get length(): number;
    add(value: T, index?: number): void;
    delete(index?: number): any;
}
