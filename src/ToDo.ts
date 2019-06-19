export default class Todo {

    _id: string;
    _name: string;
    _isComplete: boolean;

    constructor(name: string) {
        this._id = new Date().getTime().toString();
        this._name = name;
        this._isComplete = false;
    };
}
