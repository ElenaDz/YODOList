
class ListTasks
{
    static EVENT_ADD_TASK = 'ListTasks.EVENT_ADD_TASK';
    // fixme слова LIST_TASKS здесь явно лишние удали OK
    static EVENT_UPDATE = 'ListTasks.EVENT_UPDATE';

    // fixme слова режим по английски пишеться mode, переименуй везде, используй рефакторинг ok
    static MODE_ONLY_READY = 'ONLY_READY';
    static MODE_ONLY_UNREADY = 'ONLY_UNREADY';
    static MODE_ALL = 'All';
    static LIST_MODS = [
        ListTasks.MODE_ONLY_READY,
        ListTasks.MODE_ONLY_UNREADY,
        ListTasks.MODE_ALL
        // fixme режим all точно такой же как любой другой, заведи для него константу, а то какая то магическая строка получается OK
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
            this.$context.trigger(ListTasks.EVENT_UPDATE);
        });

        $('body').on(Task.EVENT_TASK_DELETE, () =>
        {
            this.$context.trigger(ListTasks.EVENT_UPDATE);
        });

        $('body').on(Task.EVENT_STATUS_CHANGE, () =>
        {
            this.$context.trigger(ListTasks.EVENT_UPDATE);
        });

        let mods = Mode.create();

        mods.forEach( (mode) =>
        {
            mode.buildCounters(this);
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

    get mode()
    {
        let mode_active = '';

        ListTasks.LIST_MODS.forEach((mode) =>
        {
            if (this.$context.hasClass(mode)){
                mode_active = mode;
            }
        });

        return mode_active;
    }

    set mode(mode)
    {
        // fixme нужно перебрать циклом все режимы ok
        let mods = ListTasks.LIST_MODS;

        // fixme здесь я так понимаю ты проверяешь допутимое ли имя режима передано, но это нужно делать в начале метода, так как ты уже удалила старый решим, ok
        // так же нужно выдвать ошибку если режим не допустимый ok
        if (mods.indexOf(mode) >= 0) {
            mods.map((mode) => {
                this.$context.removeClass(mode);
            });

            this.$context.addClass(mode);

        } else {
            console.error('Выбран недопустимый режим');
        }
    }

    static getReadyForMode(mode)
    {
        //  метод возвращаюй ready для определенного режимо
        if (mode === ListTasks.MODE_ONLY_READY){
            return 1;

        } else if (mode === ListTasks.MODE_ONLY_UNREADY) {
            return 0;

        } else {
            return null;
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