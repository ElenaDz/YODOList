// fixme фигурная скобка
class ListTasks
{
    /** @type {Tasks[]} */
    tasks = [];

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery}$context
     */
	// fixme фигурная скобка
    constructor($context)
    {
        this.$context = $context;

        // fixme здесь мы передаем в каком контексте искать задачи, а именно в контексте списка,
        // но мы ни чего не знаем про то как устроены задачи поэтому здесь именно класс задачи быть не должно ok
        this.tasks = Task.create(this.$context);
    }
}