"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ToDo_1 = __importDefault(require("./ToDo"));
var ToDoSub = /** @class */ (function (_super) {
    __extends(ToDoSub, _super);
    function ToDoSub(name) {
        var _this = _super.call(this, name) || this;
        _this._id = new Date().getTime().toString();
        _this._name = name;
        _this._isComplete = false;
        _this._arr_subtask = [];
        // @ts-ignore
        _this._deadline = undefined;
        return _this;
    }
    ;
    return ToDoSub;
}(ToDo_1.default));
exports.default = ToDoSub;
