
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

        // fixme здесь не должно быть кода до проверки что объект уже создан, перенеси его ниже
        Task.create(this.$context);

        if (this.$context[0].ListTasks) return;

        this.$context[0].ListTasks = this;

        this.buildTasks();
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

        // fixme зачем это? удалить
        ListTasks.create();

        Task.create(this.$context);

		// fixme зачем это? удалить
        new ListTasksStore();
    }


	addTask(name_task, ready = null)
	{
		this.$context.prepend(Task.getTemplate(name_task));

		Task.create(this.$context);

		this.$context.trigger(ListTasks.EVENT_ADD_TASK);
	}


	getTasks()
	{
		return Task.create(this.$context);
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