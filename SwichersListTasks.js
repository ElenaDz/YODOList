// Режим переключения: готовые все неготовые
// fixme правильно Switchers, исполдьзуй гугл переводчик если не уверена на 100% в правильности
class SwichersListTasks {
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$swichers = $context;
        this.setSwicher(this.$swichers.find('input[type="radio"]:checked'));
        this.$swichers.on('click', 'input', (event) =>
        {
            let swicher = $(event.currentTarget);
            this.setSwicher(swicher);
        });
    }

    getSwicher()
    {
        return this.swicher;
    }

    setSwicher(swicher)
    {
        this.swicher = swicher;
    }

    /**
     * @param {JQuery}$swichers
     */
    static create($swichers) {

        let swichers = [];
        $swichers.each((index, element) => {
            swichers.push(new SwichersListTasks($(element)));
        });
        return swichers;
    }
}