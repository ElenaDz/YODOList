class FormAdd
{
    static EVENT_SUBMIT = 'FormAdd.EVENT_SUBMIT';
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;
        this.$context.on('keydown', (event) =>
        {
            if (event.key === 'Enter')
            {
                this.$context.trigger(FormAdd.EVENT_SUBMIT);
                return false;
            }
        });
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let $formAdd = $context.find('.add_task');

        return  new FormAdd($formAdd);
    }
}