class SwitcherMode
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].SwitcherMode) return;

        this.$context[0].SwitcherMode = this;

        let modes = Mode.create(this.$context);

        this.$context.on(Mode.EVENT_SELECT, () =>
        {
            // todo должно быть что то вроде такого
            ListTasks.create().mode = this.selectedMode;
            // this.build(modes);
        });

        // fixme а это вообще не понадобиться если сделать на css
        $('body').on(ListTasks.EVENT_UPDATE, () =>
        {
			this.build(modes);
        });
    }

    // fixme так не пойдет, договор был что ты сделаешь скрытие задач с помощью css а не js,
    // здесь мы только добавляем режим списку задач, а именно css класс, а css делает все остальное
    // такое решение как ты сделала это потенциальная головная боль, нельзя просто так скрывать и показывать какие то блоки,
    // показывается блок или скрыт должно зависять от css классов, а не от js
    build(mods)
    {
        mods.forEach((mode) =>
        {
            let list_tasks = ListTasks.create();

            if (mode.selectMode === true) {

                list_tasks.getTasks().forEach((task) =>
                {
                    task.$context.hide();
                });

                list_tasks.mode = mode.name;

                list_tasks.getTasks(ListTasks.getReadyForMode(mode.name)).forEach((task) =>
                {
                    task.$context.show();
                });
            }
        });
    }

    get selectedMode()
    {
        return '';
    }


    /**
     * @param {JQuery} $context
     *
     */
    static create($context = $('body'))
    {
        return new SwitcherMode($context.find('.b_switcher_mode'));
    }
}