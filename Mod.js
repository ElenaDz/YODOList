class Mod
{
    static EVENT_SELECTED_MOD = 'Mod.EVENT_SELECTED_MOD';

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.on('click', () =>
        {
            this.$context.trigger(Mod.EVENT_SELECTED_MOD);
        })
    }

    get name()
    {
        return this.$context.find('input').val();
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let mods = [];
        let $mods = $context.find('label');

        $mods.each((index, element) =>
        {
            let mod = new Mod($(element));
            mods.push(mod);
        });

        return mods;
    }
}