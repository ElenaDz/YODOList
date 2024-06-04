class Mode
{
    static EVENT_SELECT = 'Mode.EVENT_SELECT';

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
            // Здесь есть проблема  , если клик по лейблу происходит, он считается 2 раза, если по инпуту, то 1
            // fixme это видимо связано с всплыванием события или типа того, решается проверкой свойства selectMode здесь если true то выходим отсюда не генерируя событие
            this.$context.trigger(Mode.EVENT_SELECT);
        });


        $('body').on(ListTasks.EVENT_UPDATE,() =>
        {
            let listTasks = ListTasks.create();

            this.buildCounters(listTasks);
        })

    }

    // fixme переименуй в updateCounter
    // fixme не надо передавать listTasks получай его внутри метода
    buildCounters(listTasks)
    {
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

    // fixme переименовать в selected (выбранный да или нет), свойство checked которое ты проверяешь должно было тебе это подсказать
    get selectMode()
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