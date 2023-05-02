"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTable = void 0;
var BUCKET_STATE;
(function (BUCKET_STATE) {
    BUCKET_STATE[BUCKET_STATE["BLANK"] = 0] = "BLANK";
    BUCKET_STATE[BUCKET_STATE["ONE"] = 1] = "ONE";
    BUCKET_STATE[BUCKET_STATE["ARRAY"] = 2] = "ARRAY";
})(BUCKET_STATE || (BUCKET_STATE = {}));
;
var HashTable = /** @class */ (function () {
    function HashTable(capacity, hash_function) {
        this._length = 0;
        if (capacity <= 0)
            throw new Error('constructor param error.');
        this.capacity = capacity;
        this.store = new Array(capacity);
        this.bucket_state_map = new Array(capacity);
        this.bucket_state_map.fill(BUCKET_STATE.BLANK);
        this.hash_function = hash_function;
    }
    HashTable.prototype.expansion = function () {
        var _this = this;
        var target_capacity = this.capacity * 2;
        this.capacity = target_capacity;
        var cache_store = this.store;
        this.store = new Array(target_capacity);
        var cache_state_map = this.bucket_state_map;
        this.bucket_state_map = new Array(target_capacity);
        this.bucket_state_map.fill(BUCKET_STATE.BLANK);
        this._length = 0;
        for (var idx = 0; idx < cache_store.length; idx++) {
            var item = cache_store[idx];
            if (Array.isArray(item)) {
                item.forEach(function (i) { return _this.add(i); });
            }
            else if (cache_state_map[idx] !== BUCKET_STATE.BLANK) {
                this.add(item);
            }
        }
    };
    Object.defineProperty(HashTable.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    HashTable.prototype.add = function (value) {
        var validate_hash_code = this.hash_function(value);
        if (typeof validate_hash_code !== 'number')
            throw new Error('hash code isn`t number.');
        var hash_code = Math.round(validate_hash_code) % this.capacity;
        if (this.bucket_state_map[hash_code]) {
            var target = this.store[hash_code];
            if (Array.isArray(target)) {
                target.push(value);
            }
            else {
                this.store[hash_code] = [target, value];
            }
        }
        else {
            this.store[hash_code] = value;
            this.bucket_state_map[hash_code] = 1;
        }
        switch (this.bucket_state_map[hash_code]) {
            case BUCKET_STATE.BLANK: {
                this.store[hash_code] = value;
                this.bucket_state_map[hash_code] = BUCKET_STATE.ONE;
                break;
            }
            case BUCKET_STATE.ARRAY: {
                this.store[hash_code].push(value);
                break;
            }
            case BUCKET_STATE.ONE: {
                this.store[hash_code] = [this.store[hash_code], value];
                this.bucket_state_map[hash_code] = BUCKET_STATE.ARRAY;
                break;
            }
        }
        this._length++;
    };
    HashTable.prototype.delete = function (value, compare) {
        var compare_function = !compare ? function (a, b) { return a === b; } : compare;
        var target_index = Math.round(this.hash_function(value)) % this.capacity;
        var target_bucket_state = this.bucket_state_map[target_index];
        switch (target_bucket_state) {
            case BUCKET_STATE.BLANK: {
                return null;
            }
            case BUCKET_STATE.ARRAY: {
                var idx = 0;
                var target = null;
                for (var _i = 0, _a = this.store[target_index]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (compare_function(item, value)) {
                        target = item;
                        break;
                    }
                    idx++;
                }
                if (target) {
                    this.store[target_index].splice(idx, 1);
                    this._length--;
                    if (this.store[target_index].length === 1) {
                        this.store[target_index] = this.store[target_index][0];
                        this.bucket_state_map[target_index] = BUCKET_STATE.ONE;
                    }
                    return target;
                }
                break;
            }
            case BUCKET_STATE.ONE: {
                if (compare_function(this.store[target_index], value)) {
                    var res = this.store[target_index];
                    this.store[target_index] = undefined;
                    this.bucket_state_map[target_index] = BUCKET_STATE.BLANK;
                    this._length;
                    return res;
                }
                break;
            }
        }
        return null;
    };
    HashTable.prototype.forceExpansion = function () {
        this.expansion();
    };
    return HashTable;
}());
exports.HashTable = HashTable;
