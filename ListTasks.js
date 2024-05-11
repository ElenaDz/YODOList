// Список
class ListTasks {
    // fixme это видимо статус правильное имя было бы LIST_TASKS_STATUS_ALL если бы он был объявлен за пределами класса ListTasks
    // но так как он внутри то правильно будет STATUS_ALL
    // fixme статуса all не бывает, бывает готово или не готово, видимо здесь не статусы а режимы отобрадения списка,
    // но тут им не место так как список задач ни чего не должен знать про режимы
    static LIST_TASKS_ALL = 2;
    static LIST_TASKS_READY = 1;
    static LIST_TASKS_UNREADY = 0;

    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$listTasks = $context;
        // fixme смотрю я как ты смешала список задач и работу и спосок задач в local storage и вижу что ерунда получилась
        // нужно local storage выносить в отдальный класс, и работать он долен так же как другие сторонние объекты подписываясь на события списка задач,
        // разница лишь в том что список задач знает про этот класс и при инициализации заполняется из него
        this.getTaskFromLocalStorage(1);
        this.$listTasks.on('click', '.delete', (event) => {
            this.deleteTask(event)
        });

    }
    addTask(name_task, index)
    {
        let index_task = index;
        // fixme тут должна быть одна многострочная шаблонная строка, неужели ты не чуствуешь, то что ты написала очень не удобно
        // @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals
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
            // fixme следи за форматированием
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

    // fixme не делай синхронизацию списков, сделай проще просто сохраняй в storage при каждом изменении списка задач
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