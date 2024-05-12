class Tasks {
    /** @type {boolean} */
    ready = false;
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$task = $context;
        this.$task.on('click', '.delete', (event) => {
            this.delete()
        });

    }
    delete()
    {
        this.$task.remove()
    }
    /**
     * @param {JQuery}$task
     */
    static create($task) {
        let task = [];

        $task.each((index, element) => {
            task.push(new Tasks($(element)));
        });

        return task;
    }
}