import Model from './Model'


const taskList = new Model();

// @ts-ignore
document.onload = new function () {
    updateView(taskList.tasks);
};

function viewStart(){
    updateView(taskList.tasks);
}

document.getElementById("clear_all_button")!.onclick = () => {
    if (confirm("Удалить таски?")) {
        taskList.clearAllTasks();

        viewStart();
    };
};

document.getElementById("add_button")!.onclick = () => {
    const newTask = prompt("Введите текст задачи");
    if (newTask) {
        taskList.add(newTask);
        (document.getElementById("search_input") as HTMLInputElement).value = "";

        viewStart();
    };
};

document.getElementById("search_input")!.onkeyup = () => {
    let filteredTaskList = taskList.searchByWord((document.getElementById("search_input")! as HTMLInputElement).value);

    updateView(filteredTaskList);
};

function updateView(tasks: any[]) {

    let tasklistDiv = document.getElementById("task_list");
    tasklistDiv!.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let days;
        if (tasks[i]._deadline) {
            let date = Date.now() - tasks[i]._deadline;
            days = date / 86400000;
            if (-days >= 0) {
                // @ts-ignore
                days = " (Времени осталось:" + (-Number.parseInt(days)) + ")";
            }
            else {
                days = "Сдача";
                if (tasks[i]._isComplete === false) {
                    tasks[i]._isComplete = true;
                };
            };
        } else {
            days = "";
        };

        let isChecked = (tasks[i]._isComplete === true) ? "checked" : "";

        document.getElementById("task_list")!.insertAdjacentHTML('afterbegin',
            `<div id="div` + tasks[i]._id + `">  
                <input type="checkbox"` + isChecked + ` id="setActive` + tasks[i]._id + `"></input>
                <label>`+ tasks[i]._name + days + `</label>
                <button class="button button-sub" id="addSubtask`+ tasks[i]._id + `"> + Связный список</button>   
                <button class="button button-date" id="addDate`+ tasks[i]._id + `"> + Дата</button>  
                <button class="button button-remove" id="remove`+ tasks[i]._id + `">Удалить</button>
            </div>`
        );


        document.getElementById("setActive" + tasks[i]._id)!.onclick = () => {
            taskList.setActive(tasks[i]._id);
        };


        document.getElementById("remove" + tasks[i]._id)!.onclick = () => {
            document.getElementById("div" + tasks[i]._id)!.remove();
            taskList.remove(tasks[i]._id);
        };


        document.getElementById("addSubtask" + tasks[i]._id)!.onclick = () => {
            let name = prompt("Введите текст задачи");
            if (name) {
                taskList.addSubtask(tasks[i]._id, name);
                updateView(taskList.tasks);
            };
        };


        document.getElementById("addDate" + tasks[i]._id)!.onclick = () => {
            let date = prompt("Введите дату");
            // @ts-ignore
            if (Date.parse(date)) {
                // @ts-ignore
                taskList.addDate(tasks[i]._id, date);
                updateView(taskList.tasks);
            }
            else {
                alert("Давайте еще раз");
            };
        };



        if (tasks[i]._arr_subtask.length > 0) {

            document.getElementById("div" + tasks[i]._id)!.insertAdjacentHTML(
                'beforeend', '<h3>Связный список</h3>');

            for (let y = 0; y < tasks[i]._arr_subtask.length; y++) {

                let isChecked = (tasks[i]._arr_subtask[y]._isComplete === true) ? "checked" : "";

                document.getElementById("div" + tasks[i]._id)!.insertAdjacentHTML(
                    'beforeend', `<div id="subdiv` + tasks[i]._arr_subtask[y]._id + `" class="subtask"> 
                        <input type="checkbox"` + isChecked + ` id="subSetActive` + tasks[i]._arr_subtask[y]._id + `"></input>
                        <label>`+ tasks[i]._arr_subtask[y]._name + `</label>
                        <button class="btn btn-large text-danger" id="subRemove`+ tasks[i]._arr_subtask[y]._id + `">Удалить</button>
                    </div>`
                );

                document.getElementById("subSetActive" + tasks[i]._arr_subtask[y]._id)!.onclick = () => {
                    taskList.setActiveSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                };
                document.getElementById("subRemove" + tasks[i]._arr_subtask[y]._id)!.onclick = () => {
                    taskList.removeSubtask(tasks[i]._id, tasks[i]._arr_subtask[y]._id);
                    updateView(tasks);
                };
            };
        };
    };
};
