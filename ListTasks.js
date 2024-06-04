
class ListTasks
{
    static EVENT_ADD_TASK = 'ListTasks.EVENT_ADD_TASK';
    static EVENT_UPDATE = 'ListTasks.EVENT_UPDATE';

    static MODE_ONLY_READY = 'ONLY_READY';
    static MODE_ONLY_UNREADY = 'ONLY_UNREADY';
    static MODE_ALL = 'All';
    static LIST_MODS = [
        ListTasks.MODE_ONLY_READY,
        ListTasks.MODE_ONLY_UNREADY,
        ListTasks.MODE_ALL
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
        let mods = ListTasks.LIST_MODS;

        // fixme поменяй местами блоки внутри if, первым блоком всегда идет тот который короче
        if (mods.indexOf(mode) >= 0)
        {
            mods.map((mode) => {
                this.$context.removeClass(mode);
            });

            this.$context.addClass(mode);

        } else {
            console.error('Выбран недопустимый режим');
        }
    }

	/**
     * Возвращаает ready для определенного режимо
	 * @param {string} mode
	 * @return {boolean|null}
	 */
	static getReadyForMode(mode)
    {
        if (mode === ListTasks.MODE_ONLY_READY) {
            // fixme true так как ready у нас boolean тип, так же замени 0 ниже
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