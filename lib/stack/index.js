"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack() {
        this.store = [];
    }
    Object.defineProperty(Stack.prototype, "length", {
        get: function () {
            return this.store.length;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.top = function () {
        if (this.length === 0)
            return null;
        return this.store[this.length - 1];
    };
    Stack.prototype.pop = function () {
        if (this.length === 0)
            return null;
        return this.store.pop();
    };
    Stack.prototype.push = function (value) {
        this.store.push(value);
    };
    return Stack;
}());
exports.Stack = Stack;
