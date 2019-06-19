"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __importDefault(require("./Model"));
var taskList = new Model_1.default();
// @ts-ignore
document.onload = new function () {
    updateView(taskList.tasks);
};
function viewStart() {
    updateView(taskList.tasks);
}
document.getElementById("clear_all_button").onclick = function () {
    if (confirm("Удалить таски?")) {
        taskList.clearAllTasks();
        viewStart();
    }
    ;
};
document.getElementById("add_button").onclick = function () {
    var newTask = prompt("Введите текст задачи");
    if (newTask) {
        taskList.add(newTask);
        document.getElementById("search_input").value = "";
        viewStart();
    }
    ;
};
document.getElementById("search_input").onkeyup = function () {
    var filteredTaskList = taskList.searchByWord(document.getElementById("search_input").value);
    updateView(filteredTaskList);
};
function updateView(tasks) {
    var tasklistDiv = document.getElementById("task_list");
    tasklistDiv.innerHTML = "";
    var _loop_1 = function (i) {
        var days = void 0;
        if (tasks[i]._deadline) {
            var date = Date.now() - tasks[i]._deadline;
            days = date / 86400000;
            if (-days >= 0) {
                // @ts-ignore
                days = " (Времени осталось:" + (-Number.parseInt(days)) + ")";
            }
            else {
                days = "Сдача";
                if (tasks[i]._isComplete === false) {
                    tasks[i]._isComplete = true;
                }
                ;
            }
            ;
        }
        else {
            days = "";
        }
        ;
        var isChecked = (tasks[i]._isComplete === true) ? "checked" : "";
        document.getElementById("task_list").insertAdjacentHTML('afterbegin', "<div id=\"div" + tasks[i]._id + "\">  \n                <input type=\"checkbox\"" + isChecked + " id=\"setActive" + tasks[i]._id + "\"></input>\n                <label>" + tasks[i]._name + days + "</label>\n                <button class=\"button button-sub\" id=\"addSubtask" + tasks[i]._id + "\"> + \u0421\u0432\u044F\u0437\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A</button>   \n                <button class=\"button button-date\" id=\"addDate" + tasks[i]._id + "\"> + \u0414\u0430\u0442\u0430</button>  \n                <button class=\"button button-remove\" id=\"remove" + tasks[i]._id + "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n            </div>");
        document.getElementById("setActive" + tasks[i]._id).onclick = function () {
            taskList.setActive(tasks[i]._id);
        };
        document.getElementById("remove" + tasks[i]._id).onclick = function () {
            document.getElementById("div" + tasks[i]._id).remove();
            taskList.remove(tasks[i]._id);
        };
        document.getElementById("addSubtask" + tasks[i]._id).onclick = function () {
            var name = prompt("Введите текст задачи");
            if (name) {
                taskList.addSubtask(tasks[i]._id, name);
                updateView(taskList.tasks);
            }
            ;
        };
        document.getElementById("addDate" + tasks[i]._id).onclick = function () {
            var date = prompt("Введите дату");
            // @ts-ignore
            if (Date.parse(date)) {
                // @ts-ignore
                taskList.addDate(tasks[i]._id, date);
                updateView(taskList.tasks);
            }
            else {
                alert("Давайте еще раз");
            }
            ;
        };
        if (tasks[i]._arr_subtask.length > 0) {
            document.getElementById("div" + tasks[i]._id).insertAdjacentHTML('beforeend', '<h3>Связный список</h3>');
            var _loop_2 = function (y) {
                var isChecked_1 = (tasks[i]._arr_subtask[y]._isComplete === true) ? "checked" : "";
                document.getElementById("div" + tasks[i]._id).insertAdjacentHTML('beforeend', "<div id=\"subdiv" + tasks[i]._arr_subtask[y]._id + "\" class=\"subtask\"> \n                        <input type=\"checkbox\"" + isChecked_1 + " id=\"subSetActive" + tasks[i]._arr_subtask[y]._id + "\"></input>\n                        <label>" + tasks[i]._arr_subtask[y]._name + "</label>\n                        <button class=\"btn btn-large text-danger\" id=\"subRemove" + tasks[i]._arr_subtask[y]._id + "\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n                    </div>");
                document.getElementById("subSetActive" + tasks[i]._arr_subtask[y]._id).onclick = function () {
                    taskList.setActiveSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                };
                document.getElementById("subRemove" + tasks[i]._arr_subtask[y]._id).onclick = function () {
                    taskList.removeSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                    updateView(tasks);
                };
            };
            for (var y = 0; y < tasks[i]._arr_subtask.length; y++) {
                _loop_2(y);
            }
            ;
        }
        ;
    };
    for (var i = 0; i < tasks.length; i++) {
        _loop_1(i);
    }
    ;
}
;
