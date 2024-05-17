class FormAdd
{
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.parents().on('submit', (event) =>
        {
            let listTask =  ListTasks.create($('body'));

            listTask.addTask(this.$context.val());

            this.$context.val("");

            return false;
        });
    }

}