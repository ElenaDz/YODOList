// Кнопки удалить всё и удалить готовые
// fixme правильно delete, удивлен что ты делаешь такие ошибки, ведь phpstrom их под подчеркивает ты что не обращаешь внимание на подчеркивания?
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