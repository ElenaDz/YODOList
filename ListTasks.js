
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

        this.tasks = Task.create(this.$context);
    }
}