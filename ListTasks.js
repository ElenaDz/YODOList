
class ListTasks
{
    // fixme имя класса изменилось, ты видимо делала переименование не через рефакторинг поэтому возникла такая ошибка
    // любое переменование только через рефакторинг
    /** @type {Tasks[]} */
    tasks = [];

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

        this.tasks = Task.create(this.$context);
    }
}