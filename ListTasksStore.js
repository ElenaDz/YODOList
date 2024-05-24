
class ListTasksStore
{
    static keyLocalStore = 'tasks';

    static flag_init;


    static init()
    {
        this.$context = $('body');

        /** @type {ListTasks} */
        let listTasks = ListTasks.create();

        if (ListTasksStore.flag_init) return;

		ListTasksStore.flag_init = true;

		// fixme вместо этих 3х подписок на событие лучше было бы пописаться на одно Update у ListTasks,
        // заведи такое событие и переделай этот блок чтобы подписка была на него, я про это подробнее говорил в видео
        listTasks.$context.on(ListTasks.EVENT_ADD_TASK, () =>
        {
           ListTasksStore.setTasks(listTasks.getTasks());
        });

        this.$context.on(Task.EVENT_TASK_DELETE, () =>
        {
            ListTasksStore.setTasks(listTasks.getTasks());
        });

        // fixme здесь изменила контекст, а в генераторе собтытия забыла, оно всплывает поэтому работает, измени
        this.$context.on(Task.EVENT_STATUS_CHANGE, () =>
        {
            ListTasksStore.setTasks(listTasks.getTasks());
        });
    }


    static getTasks()
    {
        let list_tasks_store_string = localStorage.getItem(ListTasksStore.keyLocalStore);
        if ( ! list_tasks_store_string) return [];

        let list_tasks_store_array = JSON.parse(list_tasks_store_string);
        if ( ! list_tasks_store_array) return [];

       return list_tasks_store_array.map((task_value) =>
       {
            return {
                ready: task_value.slice(0, 1) === '1',
                name:  task_value.slice(1)
            }
        });
    }


    // fixme переменуй параметр в tasks
    /**
     * @param {[Task]} list_tasks
     */
    static setTasks(list_tasks)
    {
        let list_tasks_store_array = [];

        list_tasks.forEach((/** Task */ task) =>
        {
            let ready = task.ready ? '1' : '0';

            list_tasks_store_array.push(ready + task.name);
        });

        localStorage.setItem(
            ListTasksStore.keyLocalStore,
            JSON.stringify(list_tasks_store_array)
        );
    }
}