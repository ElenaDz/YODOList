// fixme фигурная скобка
// fixme здесь должно быть единственное число
class Tasks {
    // fixme мы договорились что статуст задачи храниться в едиснтвенном места а именно в html, а это свойство объекта, это получается второе место, может возникнуть
    // рассинхронизация, смори как надо в том примере который есть в test.html
    ready = false;

	/** @type JQuery $context */
	$context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

    delete()
    {
        this.$context.remove();
    }

    // todo нету свойства отвечающего за получение статуса задачи выполнена или нет

    /**
     * @param {JQuery}$task
     */
	// fixme фигурная скобка
    static create($task) {
		// fixme множественное число
        let task = [];

        $task.each((index, element) => {
            task.push(new Tasks($(element)));
        });

        return task;
    }
}