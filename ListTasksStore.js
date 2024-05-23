// fixme Так как этот класс не содержить состояния (каких то свойст у которых есть значения) его можно сделать статитческим,
// тоесть все методы делаем статическими ok
class ListTasksStore
{
    static keyLocalStore = 'tasks';


    constructor()
    {
        this.$context = $('body');


        /** @type {ListTasks} */
        let listTasks = ListTasks.create();

        listTasks.$context.on(ListTasks.EVENT_ADD_TASK, () =>
        {
           ListTasksStore.setTasks(listTasks.getTasks());
        });

        let tasks = listTasks.getTasks();

        tasks.forEach((element, index) =>
        {
            element.$context.on(Task.EVENT_STATUS_CHANGE, () =>
            {
                // fixme здесь мы делаем тоже самое что при добавлении задачи, а именно сохраняем все задачи нопиши тоже что в ListTasksStore.js:20
                ListTasksStore.setTasks(listTasks.getTasks());
            });

            element.$context.on(Task.EVENT_TASK_DELETE, () =>
            {
				// fixme здесь мы делаем тоже самое что при добавлении задачи, а именно сохраняем все задачи нопиши тоже что в ListTasksStore.js:20 ok
                ListTasksStore.setTasks(listTasks.getTasks());
            });
        });
        // fixme почему это внизу? для чего вообще нужны эти строки если они внизу?ok
    }

    static getTasks()
    {
        // fixme не подходит такое имя пременной так как оно совпадает с тем когда в нем объект ListTasks, используй например такое list_tasks_store_string ok
        let list_tasks_store_string = localStorage.getItem(ListTasksStore.keyLocalStore);
        // fixme когда в локал сторе еще ни чего нет может выдать ошибку если ты методу парс скормишь пустую строку JSON.parse('') ok
        // делай проверку если в строке ни чего сразу делай return не доходя до этой строки ok
        if (list_tasks_store_string === null) return [];
        // fixme очень распространеная ошибка, содержание перменной изменилось, а название осталось тем же, так нельзя,
        // это уже не строка это уже массив поэтому подойдет имя list_tasks_store_array ok
        let list_tasks_store_array = JSON.parse(list_tasks_store_string);

        // fixme этот метод возвращает массив а здесь вовращается Null это вызовет ошибку когда кто то его вызовет и попробует сделать forEach
        // как это делаешь ты здесь ListTasks.js:47 ok
        if (list_tasks_store_array === null) return [];

       return list_tasks_store_array.map((task_value) =>
       {
            return {
                ready: task_value.slice(0,1) === '1',
                name:  task_value.slice(1)
            }
        });
    }


    /**
     * @param {[Task]} list_tasks
     */
    static setTasks(list_tasks)
    {
        // fixme одно и тоже должно иметь одинаковое имя переменной смотри выше ListTasksStore.js:89 ok
        let list_tasks_store_array = [];

        // fixme переименовать element и указать тип явно ok
        list_tasks.forEach((/** Task */ task) =>
        {
            // fixme так name или getName ? там только одно ok
            let name = task.name;
            // fixme не используй двойное равно только тройное, двойное делает конвертацию типа, если это не нужно то не нужно его использовать ok
            let ready = task.ready === true ? '1' : '0';

            list_tasks_store_array.push(ready + name);
        });

        localStorage.setItem(
            ListTasksStore.keyLocalStore,
            JSON.stringify(list_tasks_store_array)
        );
    }
}