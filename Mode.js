class Mode
{
    static EVENT_SELECT = 'Mode.EVENT_SELECT';

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Mode) return;

        this.$context[0].Mode = this;

        this.$context.on('click', (e) =>
        {
            this.$context.trigger(Mode.EVENT_SELECT);
        });

        $('body').on(ListTasks.EVENT_UPDATE,() =>
        {
            this.updateCounter();
        })

    }

    updateCounter()
    {
        let listTasks = ListTasks.create();

        let ready = ListTasks.getReadyForMode(this.name);

        let tasks = listTasks.getTasks(ready);

        this.counter = tasks.length;
    }

    get name()
    {
        return this.$context.find('input[name=name]').val();
    }

    set counter(count)
    {
        this.$context.find('.counter_tasks').text(count);
    }

    get selected()
    {
        return this.$context.find('input[type=radio]').prop('checked');
    }

    /**
     * @param {JQuery}$context
     */
    static create($context = $('.b_switcher_mode'))
    {
        let mods = [];

        let $mods = $context.find('.b_mode');

        $mods.each((index, element) =>
        {
            let mode = new Mode($(element));
            mods.push(mode);
        });

        return mods;
    }
}