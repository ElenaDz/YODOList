class FormAdd
{
    // fixme избавиться так как не используется
    static EVENT_SUBMIT = 'FormAdd.EVENT_SUBMIT';
    
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.parents().on('submit', (event) =>
        {
            // fixme убрать, так как ты не где на это событие не подписываешься, события заводим только тогда когда появилась необходимость на них подписаться
            this.$context.trigger(FormAdd.EVENT_SUBMIT);

            return false;
        });
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        // fixme когда код меняешь его надо тестировать, то что он раньше работал не значит что он работает сейчас
        // похоже эту строку можно удалить а без этой строки и метод можно удалить так как он ни чего полезного не делает
        let $formAdd = $context.find('.add_task');

        return  new FormAdd($formAdd);
    }
}