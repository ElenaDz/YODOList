class SwitcherMode
{
    /** @type JQuery $context */
    $context;

    /** @type Mode[] modes */
    modes;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].SwitcherMode) return;

        this.$context[0].SwitcherMode = this;

		// fixme не явное объявление свойства класса ok?
        this.modes = Mode.create(this.$context);

        this.$context.on(Mode.EVENT_SELECT, () =>
        {
            ListTasks.create().mode = this.selectedMode;
        });
    }


    get selectedMode()
    {
        let selected_mode = '';

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