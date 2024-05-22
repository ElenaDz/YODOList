
class ListTasks
{
    static EVENT_ADD_TASK = 'add_event';

    /** @type {JQuery} $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        Task.create(this.$context);

        if (this.$context[0].ListTasks) return;

        this.$context[0].ListTasks = this;

        this.buildTasks();
    }

    addTask(name_task, ready = null)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        Task.create(this.$context);

        // fixme событие "добавление задачи" а не "добавление события" переименуй OK
        this.$context.trigger(ListTasks.EVENT_ADD_TASK);
    }

    getTasks()
    {
        return Task.create(this.$context);
    }

    buildTasks()
    {
		this.store = new ListTasksStore();

        let list_tasks_store = this.store.getTasks();
        let template = '';

        list_tasks_store.forEach((element, index) =>
        {
            let name = element.name;
            let ready = element.ready;

            template = template + Task.getTemplate(name, ready);
        });

        this.$context.html(template);

        ListTasks.create();
        Task.create(this.$context);

        new ListTasksStore();
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