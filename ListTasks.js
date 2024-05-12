class ListTasks {
    /** @type {Tasks[]} */
    tasks = [];

    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$listTasks = $context;
        this.tasks = Tasks.create(this.$listTasks.find('.task'));
    }
}