class SwitcherMod
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        Mod.create(this.$context);

        this.$context.on(Mod.EVENT_SELECTED_MOD, () =>
        {

        })
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