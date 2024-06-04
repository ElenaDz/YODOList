class Task
{
    static EVENT_STATUS_CHANGE = 'Task.EVENT_STATUS_CHANGE';
    static EVENT_TASK_DELETE = 'Task.EVENT_TASK_DELETE';

	/** @type JQuery $context */
	$context;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Task) return;

        this.$context[0].Task = this;

        this.$context.on('click', '.delete', () => {
            this.delete();
        });

        this.$context.on('click', 'input[type=checkbox]', () =>
        {
            if (this.ready) {
                this.ready = true;

            } else {
                this.ready = false;
            }
        });
    }


    get ready()
    {
        return this.$context.find('input[type=checkbox]').prop('checked');
    }

    set ready(ready)
    {
        this.$context.find('input[type=checkbox]').prop('checked', ready);

        $('body').trigger(Task.EVENT_STATUS_CHANGE);
    }


    delete()
    {
        this.$context.remove();

        $('body').trigger(Task.EVENT_TASK_DELETE);
    }


    static getTemplate(name, ready = false)
    {
        let checked = ready ? 'checked' : '';

        return `
            <li class="b_task">
                <div class="inner_task">
                    <input type="checkbox" ${checked}>
                    <span class="name">${name}</span>
                </div>
                <div class="wrap_delete">
                    <button class="delete">x</button>
                </div>
            </li>
        `;

    }


    get name()
    {
        return this.$context.find('.name').text();
    }


    /**
     * @param {JQuery} $context
     * @param {boolean|null} ready
     */
    static create($context, ready = null)
    {
        let tasks = [];
        let $tasks = $context.find('.b_task');

        $tasks.each((index, element) =>
        {
            let task = new Task($(element));

            if (ready === null) {
                tasks.push(task);

            } else if (ready == task.ready) {
                tasks.push(task);
            }
        });

        return tasks;
    }
}