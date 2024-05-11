// Элемент списка
class Task {
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$task = $context;

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