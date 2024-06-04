// fixme имя класса в js и html не совпадают ok
class SwitcherMode
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        // fixme требуется защита от повторного создания ok
        if (this.$context[0].SwitcherMode) return;

        this.$context[0].SwitcherMode = this;

        let mods = Mode.create(this.$context);

        this.$context.on(Mode.EVENT_SELECT, () =>
        {
            // todo меняем режим списка задач ok
           this.build(mods);
        });

        $('body').on(ListTasks.EVENT_UPDATE, () =>
        {
            this.build(mods);
        });
    }

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


    /**
     * @param {JQuery} $context
     *
     */
    static create($context = $('body'))
    {
        return new SwitcherMode($context.find('.b_switcher_mode'));
    }
}