"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Todo = /** @class */ (function () {
    function Todo(name) {
        this._id = new Date().getTime().toString();
        this._name = name;
        this._isComplete = false;
    }
    ;
    return Todo;
}());
exports.default = Todo;
