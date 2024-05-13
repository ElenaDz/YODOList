
class Task
{
	/** @type JQuery $context */
	$context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

		/**
         * fixme здесь ты сохраняешь состоящние задачи во внутренее свойсто объекта чем самым создаешь
         * два места для хранения статуса задачи в html и в свойстве этого объекта, а мы от этого хотим уйти
 		 */
        this.ready = this.checked;

        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

    // fixme у задачи нет свойства checked у нее есть свойство ready
    get checked()
    {
        return this.$context.find('input[type=checkbox]').prop('checked');
    }

    set checked(checked)
    {
        this.$context.find('input[type=checkbox]').prop('checked', checked);
    }

    delete()
    {
        this.$context.remove();
    }


    // fixme этот класс ни чего не знаешь про список задач, это не список задач это просто контекст в котором нужно искать задачи
    /**
     * @param {JQuery}$listTasks
     */
    static create($listTasks)
    {
        let tasks = [];
        // fixme где приставка b_ все элеменнты у которых есть свой объект должен иметь такую приставку
        let $tasks = $listTasks.find('.task');

        $tasks.each((index, element) => {
            let task = new Task($(element));
            tasks.push(task);
        });

        return tasks;
    }
}