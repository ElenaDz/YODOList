class ListTasksStore
{
    static keyLocalStore = 'tasks';

    constructor()
    {
        this.$context = $('body');

        this.getTasks();

        /** @type {ListTasks} */
        let  listTasks =  ListTasks.create();

        listTasks.$context.on(ListTasks.EVENT_ADD_TASK, () =>
        {
           this.setTasks(listTasks.getTasks());
        });

        let tasks = listTasks.getTasks();

        tasks.forEach((element, index) =>
        {
            element.$context.on(Task.EVENT_STATUS_CHANGE, () =>
            {
                this.setStatusChangeTaskStore(element);
            });

            element.$context.on(Task.EVENT_TASK_DELETE, () =>
            {
                this.deleteTaskStore(element.getName());
            });
        });

        if (this.$context[0].ListTasksStore) return;

        this.$context[0].ListTasksStore = this;
    }

    deleteTaskStore(name)
    {
        let list_tasks = this.getTasks();

        list_tasks.forEach((element, index) =>
        {
            if (element.name === name) {
                delete list_tasks[index];
            }
        });

        this.setTasks(list_tasks);
    }

    /**
     * @param {Task}task
     */
    setStatusChangeTaskStore(task)
    {
        let list_tasks = this.getTasks();

        list_tasks.forEach((element, index) =>
        {
            if (element.name === task.getName()) {
                element.ready = task.ready;
            }
        });

        this.setTasks(list_tasks);
    }


    getTasks()
    {
        let list_tasks = localStorage.getItem(ListTasksStore.keyLocalStore);

        list_tasks = JSON.parse(list_tasks);

        if (list_tasks === null) return;

       return  list_tasks.map((task_value) =>
        {
            return{
                ready: task_value.slice(0,1) === '1',
                name:  task_value.slice(1)
            }
        });
    }

    /**
     * @param {[Task]} lest_tasks
     */
    setTasks(lest_tasks)
    {
        let  list_tasks_new_format = [];
        lest_tasks.forEach((element, index) =>
        {
            let name = element.name || element.getName();
            let ready = element.ready == true? '1' : '0';

            list_tasks_new_format.push(ready + name);
        });

        localStorage.setItem(ListTasksStore.keyLocalStore, JSON.stringify(list_tasks_new_format));
    }
}