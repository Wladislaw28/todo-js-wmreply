"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ToDo_1 = __importDefault(require("./ToDo"));
var ToDoSub_1 = __importDefault(require("./ToDoSub"));
var TaskList = /** @class */ (function () {
    function TaskList() {
        if (localStorage.getItem("ItemsList")) {
            // @ts-ignore
            this.tasks = Array.from(JSON.parse(localStorage.getItem("ItemsList")));
        }
        else {
            localStorage.setItem("ItemsList", JSON.stringify([]));
            this.tasks = [];
        }
        ;
    }
    ;
    TaskList.prototype.save = function () {
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    };
    TaskList.prototype.add = function (name) {
        var newTask = new ToDoSub_1.default(name);
        this.tasks.push(newTask);
        this.save();
    };
    ;
    TaskList.prototype.remove = function (id) {
        this.tasks = this.tasks.filter(function (x) { return x._id !== id; });
        this.save();
    };
    ;
    TaskList.prototype.clearAllTasks = function () {
        localStorage.removeItem("ItemsList");
        this.tasks = this.tasks.filter(function (x) { return x._isComplete === false; });
        this.save();
    };
    ;
    TaskList.prototype.setActive = function (id) {
        this.tasks.find(function (x) { return x._id === id; })._isComplete =
            !this.tasks.find(function (x) { return x._id === id; })._isComplete;
        this.save();
    };
    ;
    TaskList.prototype.addSubtask = function (id, name) {
        this.tasks.find(function (x) { return x._id === id; })._arr_subtask.push(new ToDo_1.default(name));
        this.save();
    };
    ;
    TaskList.prototype.removeSubtask = function (id, subid) {
        this.tasks.find(function (x) { return x._id === id; })._arr_subtask =
            this.tasks.find(function (x) { return x._id === id; })._arr_subtask.filter(function (x) { return x._id !== subid; });
        this.save();
    };
    ;
    TaskList.prototype.setActiveSubtask = function (id, subid) {
        this.tasks.find(function (x) { return x._id === id; })._arr_subtask.find(function (x) { return x._id === subid; })._isComplete =
            !this.tasks.find(function (x) { return x._id === id; })._arr_subtask.find(function (x) { return x._id === subid; })._isComplete;
        this.save();
    };
    ;
    TaskList.prototype.addDate = function (id, date) {
        this.tasks.find(function (x) { return x._id === id; })._deadline = Date.parse(date);
        this.save();
    };
    ;
    TaskList.prototype.searchByWord = function (word) {
        if (word !== "") {
            var filteredTasks = [];
            this.tasks.forEach(function (task) {
                var string = task._name.toLocaleLowerCase(), regex = new RegExp(word.toLocaleLowerCase());
                if (regex.test(string)) {
                    // @ts-ignore
                    filteredTasks.push(task);
                }
            });
            return filteredTasks;
        }
        else {
            return this.tasks;
        }
        ;
    };
    ;
    return TaskList;
}());
exports.default = TaskList;
