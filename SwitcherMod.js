// fixme имя класса в js и html не совпадают
class SwitcherMod
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        // fixme требуется защита от повторного создания

        Mod.create(this.$context);

        this.$context.on(Mod.EVENT_SELECTED_MOD, () =>
        {
            // todo меняем режим списка задач
        });
    }


    /**
     * @param {JQuery} $context
     *
     */
    static create($context = $('body'))
    {
        return new SwitcherMod($context.find('.b_switchers'));
    }
}