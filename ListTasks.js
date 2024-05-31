
class ListTasks
{
    static EVENT_ADD_TASK = 'ListTasks.EVENT_ADD_TASK';
    // fixme слова LIST_TASKS здесь явно лишние удали
    static EVENT_UPDATE_LIST_TASKS = 'ListTasks.EVENT_UPDATE_LIST_TASKS';

    // fixme слова режим по английски пишеться mode, переименуй везде, используй рефакторинг
    static MOD_ONLY_READY = 'ONLY_READY';
    static MOD_ONLY_UNREADY = 'ONLY_UNREADY';
    static LIST_MODS = [
        ListTasks.MOD_ONLY_READY,
        ListTasks.MOD_ONLY_UNREADY,
        // fixme режим all точно такой же как любой другой, заведи для него константу, а то какая то магическая строка получается
        'All'
    ];


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
        // fixme нужно перебрать циклом все режимы
        this.$context.removeClass(ListTasks.MOD_ONLY_READY);
        this.$context.removeClass(ListTasks.MOD_ONLY_UNREADY);

        let mods = ListTasks.LIST_MODS;

        // fixme здесь я так понимаю ты проверяешь допутимое ли имя режима передано, но это нужно делать в начале метода, так как ты уже удалила старый решим,
        // так же нужно выдвать ошибку если режим не допустимый
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