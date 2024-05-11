// Список
class ListTasks {
    static LIST_TASKS_ALL = 2;
    static LIST_TASKS_READY = 1;
    static LIST_TASKS_UNREADY = 0;

    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$listTasks = $context;
        this.getTaskFromLocalStorage(1);
        this.$listTasks.on('click', '.delete', (event) => {
            this.deleteTask(event)
        });

    }
    addTask(name_task, index)
    {
        let index_task = index;
        let text = `<li class="task" data-index=${index_task}>\n` +
            '            <input type="checkbox">\n' +
            `            <span>${name_task}</span>\n` +
            '            <div class="wrap_delete">\n' +
            '                <button class="delete">x</button>\n' +
            '            </div>\n' +
            '        </li>'
        this.$listTasks.prepend(text);
    }
    deleteTask(event)
    {
        let index = $(event.currentTarget).parents('li').attr('data-index');
        $(event.currentTarget).parents('li').remove();
        this.deleteFromLocalStorage(index);

    }
    setTaskToLocalStorage(status, name_task ,item_key = 'tasks')
    {
        let tasks = [];
        let list_tasks = localStorage.getItem(item_key);

        if (list_tasks === null)
        {
            tasks.push({[status]:  name_task});
            localStorage.setItem(item_key, JSON.stringify(tasks));
        } else
        {
            tasks = JSON.parse(list_tasks);
            tasks.push({[status]:  name_task});
            localStorage.setItem(item_key, JSON.stringify(tasks));
        }
    }

    showListTasks(swicher)
    {
        let tasks = this.getTaskFromLocalStorage(swicher);
        if (tasks === null){
            return false
        }
        this.$listTasks.empty();
        if (swicher === ListTasks.LIST_TASKS_READY)
        {
                tasks.forEach((element, index) =>
                {
                    this.addTask(element[ListTasks.LIST_TASKS_READY], index);
                });
        }

        if (swicher === ListTasks.LIST_TASKS_UNREADY)
        {
            tasks.forEach((element, index) =>
            {
                this.addTask(element[ListTasks.LIST_TASKS_UNREADY], index);
            });
        }

        if (swicher === ListTasks.LIST_TASKS_ALL)
        {
            tasks.forEach((element, index) =>
            {

                for (const status in element) {
                    this.addTask(element[status], index);
                }
            });
        }
    }

    getTaskFromLocalStorage(status)
    {
        let list_tasks = localStorage.getItem('tasks');
        if (list_tasks === null){
            return list_tasks;
        }

        list_tasks = JSON.parse(list_tasks);

        if (status === ListTasks.LIST_TASKS_ALL) {
            return list_tasks;
        }

        if (status === ListTasks.LIST_TASKS_READY)
        {
            list_tasks.forEach((element, index) =>
            {
                if (element[ListTasks.LIST_TASKS_UNREADY]){
                    delete list_tasks[index];
                }
            });
            return list_tasks;
        }

        if (status === ListTasks.LIST_TASKS_UNREADY)
        {
            list_tasks.forEach((element, index) =>
            {
                if (element[ListTasks.LIST_TASKS_READY]){
                    delete list_tasks[index];
                }
            });
            return list_tasks;
        }
    }

    deleteFromLocalStorage(index)
    {
        let list_tasks = localStorage.getItem('tasks');
        list_tasks = JSON.parse(list_tasks);
        delete list_tasks[index];
        list_tasks = list_tasks.filter(element => element !== null);
        localStorage.setItem('tasks', JSON.stringify(list_tasks));
    }

    /**
     * @param {JQuery}$listTasks
     */
    static create($listTasks) {

        let listTasks = [];
        $listTasks.each((index, element) => {
            listTasks.push(new ListTasks($(element)));
        });
        return listTasks;
    }
}