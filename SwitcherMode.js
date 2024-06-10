class SwitcherMode
{
    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        // fixme не явное объявление свойства класса, не делай так, объявление должно быть явно, смотри как это сделано в Task, исправь во всех классах ok
        this.$context = $context;

        if (this.$context[0].SwitcherMode) return;

        this.$context[0].SwitcherMode = this;

		// fixme не явное объявление свойства класса ok
        this.modes = Mode.create(this.$context);

        this.$context.on(Mode.EVENT_SELECT, () =>
        {
            ListTasks.create().mode = this.selectedMode;
        });
    }


    get selectedMode()
    {
        let selected_mode = '';

        /** fixme следи за тем что ide понимает тип переменных которые ты используешь иначе не будет работать рефакторин, это очень важно, здесь тип нужно указать */
        this.modes.forEach((/** Mode */mode) =>
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