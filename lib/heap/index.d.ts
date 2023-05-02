export declare class Heap<T> {
    private store;
    private compare;
    private equal;
    get length(): number;
    get_left_child_index(parent_index: number): number;
    get_right_child_index(parent_index: number): number;
    get_parent_index(child_index: number): number;
    has_parent(child_index: any): boolean;
    has_left_child(index: number): boolean;
    has_right_child(index: number): boolean;
    left_child(index: number): T;
    right_child(index: number): T;
    parent(child: number): T;
    swap(index_one: any, index_two: any): void;
    heapify_down(index?: number): void;
    heapify_up(index: number): void;
    find(item: T): number[];
    add(item: T): this;
    remove(item: T): void;
    constructor(compare?: <T>(a: T, b: T) => boolean, equale?: <T>(a: T, b: T) => boolean);
}
