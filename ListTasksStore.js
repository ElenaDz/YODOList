class ListTasksStore
{
    static keyLocalStore = 'tasks';

    constructor()
    {
        this.$context = $('body');

        if (this.$context[0].ListTasksStore) return;

        this.$context[0].ListTasksStore = this;

        /** @type {ListTasks} */
        let  listTasks =  ListTasks.create();
        listTasks.$context.on(ListTasks.EVENT_ADD_EVENT, () =>
        {

        });

        let tasks = Task.create(listTasks.$context);
        tasks.forEach((element, index) =>
        {
            element.$context.on(Task.EVENT_STATUS_CHANGE, () =>
            {

            });
            element.$context.on(Task.EVENT_TASK_DELETE, () =>
            {

            });
        });
    }

    getStore()
    {
        let list_tasks = localStorage.getItem(ListTasksStore.keyLocalStore);
        list_tasks = JSON.parse(list_tasks);
        console.log(list_tasks)
    }

    setStore()
    {
        let list_tasks = ['0Задача 1', '0задача 2'];

        let list_tasks_store = list_tasks.map((task_value) =>
        {
            return {
               ready: task_value.slice(0,1) === '1',
               name:  task_value.slice(1)
            }
        });

        localStorage.setItem(ListTasksStore.keyLocalStore, JSON.stringify(list_tasks_store));
    }
}