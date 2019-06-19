import ToDo from "./ToDo";

export default class ToDoSub extends ToDo {

    _id: string;
    _name: string;
    _isComplete: boolean;
    _arr_subtask: any[];
    _deadline: string;

    constructor(name: string) {
        super(name);
        this._id = new Date().getTime().toString();
        this._name = name;
        this._isComplete = false;
        this._arr_subtask = [];
        // @ts-ignore
        this._deadline = undefined;
    };
}
