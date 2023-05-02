"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var Queue = /** @class */ (function () {
    function Queue() {
        this.store = [];
    }
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.store.length;
        },
        enumerable: false,
        configurable: true
    });
    Queue.prototype.top = function () {
        if (this.length === 0)
            return null;
        return this.store[0];
    };
    Queue.prototype.dequeue = function () {
        if (this.length === 0)
            return null;
        return this.store.shift();
    };
    Queue.prototype.enqueue = function (value) {
        this.store.unshift(value);
    };
    return Queue;
}());
exports.Queue = Queue;
