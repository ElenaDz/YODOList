
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
        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

    // fixme у задачи нет свойства ready у нее есть свойство ready
    get ready()
    {
        return this.$context.find('input[type=checkbox]').prop('ready');
    }

    set ready(checked)
    {
        this.$context.find('input[type=checkbox]').prop('ready', checked);
    }

    delete()
    {
        this.$context.remove();
    }


    // fixme этот класс ни чего не знаешь про список задач, это не список задач это просто контекст в котором нужно искать задачи
    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let tasks = [];
        // fixme где приставка b_ все элеменнты у которых есть свой объект должен иметь такую приставку
        let $tasks = $context.find('.b_task');

        $tasks.each((index, element) => {
            let task = new Task($(element));
            tasks.push(task);
        });

        return tasks;
    }
}