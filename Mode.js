class Mode
{
    // fixme события это глагол а здесь у тебя прилагательное "выбранынй" замени на select ok
    // fixme слово mod здесь явно лишнее, смотри имя класса OK
    static EVENT_SELECT = 'Mode.EVENT_SELECT';

    /**
     * @param {JQuery} $context
     */

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Mode) return;

        this.$context[0].Mode = this;

        // fixme есть подписка на события но нет защиты от повтороного создания, исправь ok

        this.$context.on('click', (e) =>
        {
            // Здесь есть проблема  , если клик по лейблу происходит, он считается 2 раза, если по инпуту, то 1
            console.log(6)
            this.$context.trigger(Mode.EVENT_SELECT);
        })

        // todo подписываемся на событие изменения списка задач и получил массиы задач с нужным значением ready обновляем свойство счетчика задач у этого объекта ok
        // где взять значение ready для имени режима? раз ты разместила режимы в списке задач, создай там статический метод возвращаюй ready для определенного режимо
        // назови этот метод getReadyForMode(mode)

        $('body').on(ListTasks.EVENT_UPDATE,() =>
        {
            let listTasks = ListTasks.create();

            this.buildCounters(listTasks);
        })

    }

    buildCounters(listTasks)
    {
        let ready = ListTasks.getReadyForMode(this.name);

        let tasks = listTasks.getTasks(ready);

        this.counter = tasks.length;
    }

    get name()
    {
        // fixme слишком не конкретно, читая код не поймешь почему именно input, я бы написал так input[name=name],
        // смотри мой коментаарий в html чтобы понять откуда взялось name ok
        return this.$context.find('input[name=name]').val();
    }

    set counter(count)
    {
        this.$context.find('.counter_tasks').text(count);
    }

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
        // fixme это точно такой же блок как любой другой а значит у него должен быть свой класс с приставкой b_ ok
        let $mods = $context.find('.b_mode');

        $mods.each((index, element) =>
        {
            let mode = new Mode($(element));
            mods.push(mode);
        });

        return mods;
    }
}