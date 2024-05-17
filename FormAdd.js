class FormAdd
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.on('submit', (event) =>
        {
            // fixme зачему здесь указано бади когда значение по умолчанию бади
            let listTask =  ListTasks.create($('body'));

            // fixme ты не можешь просто указывать children или parent сегодня это children а у же завтра не children
            // поэтому нужно указать более конкретно лучше всего класс он врятли измениться

            listTask.addTask(this.$context.children().val());
            // fixme второй раз встречается this.$context.children() значит пора вынести его в отдельную переменную
            this.$context.children().val("");

            return false;
        });
    }

}