class ButtonDelete
{
    /** @type {JQuery} $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].ButtonDelete) return;

        this.$context[0].ButtonDelete = this;

        this.$context.on('click', (/** ButtonDelete */button) =>
        {
            let ready = ListTasks.getReadyForMode(button.currentTarget.getAttribute('data-for_mode'));

            let tasks = Task.create($('body'), ready);

            tasks.forEach((/** Task */task) =>
            {
                   task.delete();
            });
        });
    }

    static create($context = $('body'))
    {
        let buttons = [];

        let $buttons = $context.find('.b_button_delete');

        $buttons.each((index, element) =>
        {
            let button = new ButtonDelete($(element));

            buttons.push(button);
        });

        return buttons;
    }
}