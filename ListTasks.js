
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

        this.$context.data('ListTasks', this);

        this.tasks = Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        // fixme забыла обновить свойство tasks этого класса ok
         Task.create(this.$context);
    }

    // fixme перенеси метод в класс Task, я там его уже создал ok

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let $listTasks = $context.find('.b_list_tasks');

        return  new ListTasks($listTasks);
    }
}