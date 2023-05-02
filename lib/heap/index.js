"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heap = void 0;
var Heap = /** @class */ (function () {
    function Heap(compare, equale) {
        var _newTarget = this.constructor;
        this.store = [];
        if (_newTarget !== Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }
        this.compare = compare ? compare : function (a, b) { return a > b; };
        this.equal = equale ? equale : function (a, b) { return a === b; };
    }
    Object.defineProperty(Heap.prototype, "length", {
        get: function () {
            return this.store.length;
        },
        enumerable: false,
        configurable: true
    });
    Heap.prototype.get_left_child_index = function (parent_index) {
        return (parent_index * 2) + 1;
    };
    Heap.prototype.get_right_child_index = function (parent_index) {
        return (parent_index * 2) + 2;
    };
    Heap.prototype.get_parent_index = function (child_index) {
        return Math.floor((child_index - 1) / 2);
    };
    Heap.prototype.has_parent = function (child_index) {
        return this.get_parent_index(child_index) >= 0;
    };
    Heap.prototype.has_left_child = function (index) {
        return this.get_left_child_index(index) < this.store.length;
    };
    Heap.prototype.has_right_child = function (index) {
        return this.get_right_child_index(index) < this.store.length;
    };
    Heap.prototype.left_child = function (index) {
        return this.store[this.get_left_child_index(index)];
    };
    Heap.prototype.right_child = function (index) {
        return this.store[this.get_right_child_index(index)];
    };
    Heap.prototype.parent = function (child) {
        return this.store[this.get_parent_index(child)];
    };
    Heap.prototype.swap = function (index_one, index_two) {
        var tmp = this.store[index_two];
        this.store[index_two] = this.store[index_one];
        this.store[index_one] = tmp;
    };
    Heap.prototype.heapify_down = function (index) {
        if (index === void 0) { index = 0; }
        var current_index = index;
        var next_index = -1;
        while (this.has_left_child(current_index)) {
            if (this.has_right_child(current_index)
                && this.compare(this.right_child(current_index), this.left_child(current_index))) {
                next_index = this.get_right_child_index(current_index);
            }
            else {
                next_index = this.get_left_child_index(current_index);
            }
            if (this.compare(this.store[current_index], this.store[next_index])) {
                break;
            }
            this.swap(current_index, next_index);
            current_index = next_index;
        }
    };
    Heap.prototype.heapify_up = function (index) {
        var current_index = index;
        var next_index = -1;
        while (this.has_parent(current_index)) {
            next_index = this.get_parent_index(current_index);
            if (this.compare(this.store[next_index], this.store[current_index])) {
                break;
            }
            this.swap(current_index, next_index);
            current_index = next_index;
        }
    };
    Heap.prototype.find = function (item) {
        var res = [];
        var idx = 0;
        for (var _i = 0, _a = this.store; _i < _a.length; _i++) {
            var i = _a[_i];
            if (this.equal(item, i)) {
                res.push(idx);
            }
            idx++;
        }
        return res;
    };
    Heap.prototype.add = function (item) {
        this.store.push(item);
        this.heapify_up(this.store.length - 1);
        return this;
    };
    Heap.prototype.remove = function (item) {
        // Find number of items to remove.
        var equal_arr = this.find(item);
        while (equal_arr.length > 0) {
            var target_index = equal_arr.pop();
            if (target_index === (this.store.length - 1)) {
                this.store.pop();
            }
            else {
                this.store[target_index] = this.store.pop();
                if (this.has_left_child(target_index) && (!this.has_parent(target_index) || this.compare(this.parent(target_index), this.store[target_index]))) {
                    this.heapify_down(target_index);
                }
                else {
                    this.heapify_up(target_index);
                }
            }
        }
    };
    return Heap;
}());
exports.Heap = Heap;
