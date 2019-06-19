import ToDo from './ToDo';
import ToDoSub from './ToDoSub'

export default class TaskList {
    public tasks: any[];

    constructor() {
        if (localStorage.getItem("ItemsList")) {
            // @ts-ignore
            this.tasks = Array.from(JSON.parse(localStorage.getItem("ItemsList")));
        }
        else {
            localStorage.setItem("ItemsList", JSON.stringify([]));
            this.tasks = [];
        };
    };

    save(){
        localStorage.setItem("ItemsList", JSON.stringify(this.tasks));
    }

    add(name: string) {
        var newTask = new ToDoSub(name);
        this.tasks.push(newTask);

        this.save()
    };

    remove(id: string) {
        this.tasks = this.tasks.filter(x => x._id !== id);

        this.save()
    };

    clearAllTasks() {
        localStorage.removeItem("ItemsList");
        this.tasks = this.tasks.filter(x => x._isComplete === false);

        this.save()
    };

    setActive(id: string) {
        this.tasks.find(x => x._id === id)._isComplete =
            !this.tasks.find(x => x._id === id)._isComplete;

        this.save()
    };

    addSubtask(id: string, name: string) {
        this.tasks.find(x => x._id === id)._arr_subtask.push(new ToDo(name));

        this.save()
    };

    removeSubtask(id: string, subid: string) {
        this.tasks.find(x => x._id === id)._arr_subtask =
            this.tasks.find(x => x._id === id)._arr_subtask.filter(
                (x: { _id: string; }) => x._id !== subid);

        this.save()
    };

    setActiveSubtask(id: string, subid: string) {
        this.tasks.find(x => x._id === id)._arr_subtask.find(
            (x: { _id: string; }) => x._id === subid)._isComplete =
            !this.tasks.find(x => x._id === id)._arr_subtask.find(
                (x: { _id: string; }) => x._id === subid)._isComplete;

        this.save()
    };

    addDate(id: string, date: string) {
        this.tasks.find(x => x._id === id)._deadline = Date.parse(date);

        this.save()
    };

    searchByWord(word: string) {
        if (word !== "") {
            var filteredTasks: any[] | never[] = [];
            this.tasks.forEach(function (task) {
                var string = task._name.toLocaleLowerCase(),
                    regex = new RegExp(word.toLocaleLowerCase());
                if (regex.test(string)) {
                    // @ts-ignore
                    filteredTasks.push(task);
                }
            });
            return filteredTasks;
        }
        else {
            return this.tasks;
        };
    };
}
