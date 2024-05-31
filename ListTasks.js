
class ListTasks
{
    static EVENT_ADD_TASK = 'ListTasks.EVENT_ADD_TASK';
    static EVENT_UPDATE_LIST_TASKS = 'ListTasks.EVENT_UPDATE_LIST_TASKS';

    static MOD_ONLY_READY = 'ONLY_READY';
    static MOD_ONLY_UNREADY = 'ONLY_UNREADY';
    static LIST_MODS = [ListTasks.MOD_ONLY_READY, ListTasks.MOD_ONLY_UNREADY, 'All']


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

        this.buildTasks();

		ListTasksStore.init();

        $('body').on(ListTasks.EVENT_ADD_TASK, () =>
        {
            this.$context.trigger(ListTasks.EVENT_UPDATE_LIST_TASKS);
        });

        $('body').on(Task.EVENT_TASK_DELETE, () =>
        {
            this.$context.trigger(ListTasks.EVENT_UPDATE_LIST_TASKS);
        });

        $('body').on(Task.EVENT_STATUS_CHANGE, () =>
        {
            this.$context.trigger(ListTasks.EVENT_UPDATE_LIST_TASKS);
        });
    }

    buildTasks()
    {
        let list_tasks_store = ListTasksStore.getTasks();

        let template = '';

        list_tasks_store.forEach((element, index) =>
        {
            let name = element.name;
            let ready = element.ready;

            template = template + Task.getTemplate(name, ready);
        });

        this.$context.html(template);

        Task.create(this.$context);
    }


	addTask(name_task, ready = false)
	{
		this.$context.prepend(Task.getTemplate(name_task, ready));

		Task.create(this.$context);

		this.$context.trigger(ListTasks.EVENT_ADD_TASK);
	}


	getTasks(ready = null)
	{
		return Task.create(this.$context, ready);
	}

    get mod()
    {
        let mod_active = '';
        ListTasks.LIST_MODS.forEach((mod) =>
        {
            if (this.$context.hasClass(mod)){
                mod_active = mod;
            }
        });
        return mod_active;
    }

    set mod(mod)
    {
        this.$context.removeClass(ListTasks.MOD_ONLY_READY);
        this.$context.removeClass(ListTasks.MOD_ONLY_UNREADY);
        let mods = ListTasks.LIST_MODS;
        if (mods.indexOf(mod) >= 0) {
            this.$context.addClass(mod)
        }
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