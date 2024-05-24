
class ListTasksStore
{
    static keyLocalStore = 'tasks';

    static flag_init;


    /** fixme так как мы решили что класс будет статический в нем должно быть конструктора, если все таки конструктор нужен для инициализации
     * нужно добавить статический методо init (типа инициализация) ok */
    static init()
    {
        // fixme не используется, удалить ok(используем)
        this.$context = $('body');

        /** @type {ListTasks} */
        let listTasks = ListTasks.create();

        // todo так как в этом методе есть подписки на события, а этом метод может быть вызван несколько раз, и подпиской будет столько сколькр раз он будет вызван
        // это не то что нам нужно поэтому защищам этот метод от вопторных вызовов, так как класс статический делаем это через статическое свойство, смотри и запомниай, сделал сам
        if (ListTasksStore.flag_init) return;

		ListTasksStore.flag_init = true;

        listTasks.$context.on(ListTasks.EVENT_ADD_TASK, () =>
        {
           ListTasksStore.setTasks(listTasks.getTasks());
        });

        this.$context.on(Task.EVENT_TASK_DELETE, () =>
        {
            ListTasksStore.setTasks(listTasks.getTasks());
        });

        // Пришлось событие смены статуса тоже повесить на боди, иначе, оно не срабатывала на новые добавленные
        // таски, потому что не видело их, ошибка подобная ошибки с удалением
        this.$context.on(Task.EVENT_STATUS_CHANGE, () =>
        {
            ListTasksStore.setTasks(listTasks.getTasks());
        });
    }


    static getTasks()
    {
        let list_tasks_store_string = localStorage.getItem(ListTasksStore.keyLocalStore);
        // fixme замени проверку пустоты на ! ok
        if (!list_tasks_store_string) return [];

        let list_tasks_store_array = JSON.parse(list_tasks_store_string);
		// fixme замени проверку пустоты на ! ok
        if (!list_tasks_store_array) return [];

       return list_tasks_store_array.map((task_value) =>
       {
            return {
                ready: task_value.slice(0, 1) === '1',
                name:  task_value.slice(1)
            }
        });
    }


    /**
     * @param {[Task]} list_tasks
     */
    static setTasks(list_tasks)
    {
        let list_tasks_store_array = [];

        list_tasks.forEach((/** Task */ task) =>
        {
            // fixme удрать === true избыточно ok
            let ready = task.ready ? '1' : '0';

            list_tasks_store_array.push(ready + task.name);
        });

        localStorage.setItem(
            ListTasksStore.keyLocalStore,
            JSON.stringify(list_tasks_store_array)
        );
    }
}