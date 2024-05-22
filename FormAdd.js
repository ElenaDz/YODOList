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
            let listTask =  ListTasks.create();
            let input_add_task = this.$context.find('.add_task');

            listTask.addTask(input_add_task.val());
            new ListTasksStore();

            input_add_task.val("");

            return false;
        });
    }

}