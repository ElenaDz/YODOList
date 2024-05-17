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

            listTask.addTask(this.$context.children().val());
            this.$context.children().val("");

            return false;
        });
    }

}