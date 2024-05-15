
class ListTasks
{
    /** @type {Task[]} */
    tasks = [];

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;
        this.$context.data('ListTasks', this);
        this.tasks = Task.create(this.$context);

    }

    addTask(name_task)
    {
        this.$context.prepend(this.getTemplate(name_task));
        Task.create(this.$context);
    }

    getTemplate(name_task)
    {
        let text =`<li class="b_task" data_task="">\n 
                            <div class="inner_task">\n 
                                <input type="checkbox">\n
                                <span>${name_task}</span>\n 
                            </div>\n 
                                <div class="wrap_delete">\n 
                                <button class="delete">x</button>\n 
                            </div>\n 
                        </li>`

        return text;
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let $listTasks = $context.find('.b_list_tasks');

        return  new ListTasks($listTasks);
    }
}