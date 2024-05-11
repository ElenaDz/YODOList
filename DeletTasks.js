// Кнопки удалить всё и удалить готовые
class DeletTasks {
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
    }
    /**
     * @param {JQuery}$task
     */
    static create($task) {

        let task = [];
        $task.each((index, element) => {
            task.push(new Task($(element)));
        });
        return task;
    }
}