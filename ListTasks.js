
class ListTasks
{
    /** @type {Task[]} */
    tasks = [];

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

        // fixme измени как тут Task.js:14
        this.$context.data('ListTasks', this);

        this.tasks = Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        // fixme забыла обновить свойство tasks этого класса
        // ты тут ни исправила ни чего, смотри 19 строку этого класса и посмотри на эту строку, похожи но отличаются, почему?
        Task.create(this.$context);
    }


    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let $listTasks = $context.find('.b_list_tasks');

        return  new ListTasks($listTasks);
    }
}