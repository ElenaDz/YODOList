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

        this.modes = Mode.create(this.$context);

        this.$context.on(Mode.EVENT_SELECT, () =>
        {
            // todo должно быть что то вроде такого ok
            ListTasks.create().mode = this.selectedMode;

        });
    }

    // fixme так не пойдет, договор был что ты сделаешь скрытие задач с помощью css а не js, ok
    // здесь мы только добавляем режим списку задач, а именно css класс, а css делает все остальное
    // такое решение как ты сделала это потенциальная головная боль, нельзя просто так скрывать и показывать какие то блоки,
    // показывается блок или скрыт должно зависять от css классов, а не от js

    get selectedMode()
    {
        let  selected_mode = '';

        this.modes.forEach((mode) =>
        {
            if (mode.selected === true) {

                selected_mode = mode.name;
            }
        });

        return selected_mode;
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