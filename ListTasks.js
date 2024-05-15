
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