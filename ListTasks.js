
class ListTasks
{
    // fixme избавься от этой переменной так как мы ее не используем, а только доставляет головную боль с необходимостью сонхронизировать ее с состоянием dom  ок

    /** @type {JQuery} $context */
    $context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        // todo добавь защиту от повторного создания объекта, если он раньше уже был создан, по аналогии как здесь Task.js:13 ok
        if (this.$context[0].ListTasks) return;
        this.$context[0].ListTasks = this;

        Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(Task.getTemplate(name_task));

        Task.create(this.$context);
    }


    /**
     * @param {JQuery} $context
     * @return ListTasks
     */
    // todo сделай параметр $context не обязательным, по умолчанию будет равен $('body'), ну и поменяй вызовы этого метода увери не обязательный параметр из вызова ок?
    static create($context = $('body'))
    {
        return new ListTasks($context.find('.b_list_tasks'));
    }
}