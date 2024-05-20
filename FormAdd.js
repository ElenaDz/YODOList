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
            // fixme зачему здесь указано бади когда значение по умолчанию бади ok
            let listTask =  ListTasks.create();
            let input_add_task = this.$context.find('.add_task');

            // fixme ты не можешь просто указывать children или parent сегодня это children а у же завтра не children ok
            // поэтому нужно указать более конкретно лучше всего класс он врятли измениться

            listTask.addTask(input_add_task.val());
            // fixme второй раз встречается this.$context.children() значит пора вынести его в отдельную переменную ok

            input_add_task.val("");

            return false;
        });
    }

}