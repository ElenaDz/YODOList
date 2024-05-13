// fixme фигурная скобка
// fixme здесь должно быть единственное число ok
class Task
{
    // fixme мы договорились что статуст задачи храниться в едиснтвенном места а именно в html, а это свойство объекта, это получается второе место, может возникнуть
    // рассинхронизация, смори как надо в том примере который есть в test.html
	/** @type JQuery $context */
	$context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;
        this.ready = this.checked;
        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

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

    // todo нету свойства отвечающего за получение статуса задачи выполнена или нет ok

    /**
     * @param {JQuery}$listTasks
     */
	// fixme фигурная скобка ok
    static create($listTasks)
    {
		// fixme множественное число ok
        let tasks = [];
        let $tasks = $listTasks.find('.task');
        $tasks.each((index, element) => {
            tasks.push(new Task($(element)));
        });

        return tasks;
    }
}