// fixme Так как этот класс не содержить состояния (каких то свойст у которых есть значения) его можно сделать статитческим,
// тоесть все методы делаем статическими
class ListTasksStore
{
    static keyLocalStore = 'tasks';


    constructor()
    {
        this.$context = $('body');

		// fixme зачем это? удалить
        this.getTasks();

        /** @type {ListTasks} */
        let listTasks = ListTasks.create();

        listTasks.$context.on(ListTasks.EVENT_ADD_TASK, () =>
        {
           this.setTasks(listTasks.getTasks());
        });

        let tasks = listTasks.getTasks();

        tasks.forEach((element, index) =>
        {
            element.$context.on(Task.EVENT_STATUS_CHANGE, () =>
            {
                // fixme здесь мы делаем тоже самое что при добавлении задачи, а именно сохраняем все задачи нопиши тоже что в ListTasksStore.js:20
                this.setStatusChangeTaskStore(element);
            });

            element.$context.on(Task.EVENT_TASK_DELETE, () =>
            {
				// fixme здесь мы делаем тоже самое что при добавлении задачи, а именно сохраняем все задачи нопиши тоже что в ListTasksStore.js:20
                this.deleteTaskStore(element.getName());
            });
        });

        // fixme почему это внизу? для чего вообще нужны эти строки если они внизу?
        if (this.$context[0].ListTasksStore) return;

        this.$context[0].ListTasksStore = this;
    }

    // fixme удалить не нужно
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


    // fixme удалить не нужно
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
        // fixme не подходит такое имя пременной так как оно совпадает с тем когда в нем объект ListTasks, используй например такое list_tasks_store_string
        let list_tasks = localStorage.getItem(ListTasksStore.keyLocalStore);

        // fixme когда в локал сторе еще ни чего нет может выдать ошибку если ты методу парс скормишь пустую строку JSON.parse('')
        // делай проверку если в строке ни чего сразу делай return не доходя до этой строки
        // fixme очень распространеная ошибка, содержание перменной изменилось, а название осталось тем же, так нельзя,
        // это уже не строка это уже массив поэтому подойдет имя list_tasks_store_array
        list_tasks = JSON.parse(list_tasks);

        // fixme этот метод возвращает массив а здесь вовращается Null это вызовет ошибку когда кто то его вызовет и попробует сделать forEach
        // как это делаешь ты здесь ListTasks.js:47
        if (list_tasks === null) return;

       return list_tasks.map((task_value) =>
       {
            return {
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
        // fixme одно и тоже должно иметь одинаковое имя переменной смотри выше ListTasksStore.js:89
        let list_tasks_new_format = [];

        // fixme переименовать element и указать тип явно
        lest_tasks.forEach((element) =>
        {
            // fixme так name или getName ? там только одно
            let name = element.name || element.getName();
            // fixme не используй двойное равно только тройное, двойное делает конвертацию типа, если это не нужно то не нужно его использовать
            let ready = element.ready == true ? '1' : '0';

            list_tasks_new_format.push(ready + name);
        });

        localStorage.setItem(
            ListTasksStore.keyLocalStore,
            JSON.stringify(list_tasks_new_format)
        );
    }
}