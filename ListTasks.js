
class ListTasks
{
    static EVENT_ADD_EVENT = 'add_event';
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

        this.store = new ListTasksStore();
        Task.create(this.$context);
    }

    addTask(name_task, ready = null)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        Task.create(this.$context);
        this.$context.trigger(ListTasks.EVENT_ADD_EVENT);
    }
    getTask()
    {
        return(Task.create(this.$context));
    }
    buildTasks()
    {
        let build_tasks = '';

        this.getTask().forEach((element, index) =>
        {
            let name = element.getName();
            let ready = element.ready;

            build_tasks = build_tasks + Task.getTemplate(name, ready);
        });
        ListTasks.create();

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