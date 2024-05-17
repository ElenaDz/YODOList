
class ListTasks
{
    /** @type {JQuery} $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].ListTasks) return;
        this.$context[0].ListTasks = this;

        Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        Task.create(this.$context);
    }


    /**
     * @param {JQuery} $context
     * @return ListTasks
     */
    static create($context = $('body'))
    {
        return new ListTasks($context.find('.b_list_tasks'));
    }
}