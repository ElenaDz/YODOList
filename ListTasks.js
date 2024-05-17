
class ListTasks
{
    // fixme избавься от этой переменной так как мы ее не используем, а только доставляет головную боль с необходимостью сонхронизировать ее с состоянием dom
    /** @type {Task[]} */
    tasks = [];

    /** @type {JQuery} $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        // todo добавь защиту от повторного создания объекта, если он раньше уже был создан, по аналогии как здесь Task.js:13
        this.$context[0].ListTasks = this;

        this.tasks = Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        this.tasks = Task.create(this.$context);
    }


    /**
     * @param {JQuery} $context
     * @return ListTasks
     */
    // todo сделай параметр $context не обязательным, по умолчанию будет равен $('body'), ну и поменяй вызовы этого метода увери не обязательный параметр из вызова
    static create($context)
    {
        let $listTasks = $context.find('.b_list_tasks');

        return new ListTasks($listTasks);
    }
}