"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleLinkedList = void 0;
var DoubleLinkedList = /** @class */ (function () {
    function DoubleLinkedList() {
        this._length = 0;
    }
    Object.defineProperty(DoubleLinkedList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    DoubleLinkedList.prototype.add = function (value, index) {
        if (index < 0 || index > this._length)
            return;
        var current = {
            value: value,
            prev: null,
            next: null
        };
        var target_index = index === undefined ? this._length : index;
        if (this._length === 0) {
            this.head = this.tail = current;
        }
        else if (target_index === 0) {
            current.next = this.head;
            this.head.prev = current;
            this.head = current;
        }
        else if (target_index === this._length) {
            this.tail.next = current;
            current.prev = this.tail;
            this.tail = current;
        }
        else {
            var pointer = this.head;
            var pointer_index = 0;
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
    };
    DoubleLinkedList.prototype.delete = function (index) {
        if (this.length === 0 || index < 0 || index >= this._length)
            return null;
        var target_index = index === undefined ? this._length - 1 : index;
        var res = null;
        if (this._length === 1) {
            res = this.head;
            this.head = this.tail = null;
        }
        else if (target_index === 0) {
            res = this.head;
            this.head = this.head.next;
            this.head.prev = null;
        }
        else if (target_index === this._length - 1) {
            res = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        else {
            res = this.head;
            var pointer_index = 0;
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
        return res;
    };
    return DoubleLinkedList;
}());
exports.DoubleLinkedList = DoubleLinkedList;
