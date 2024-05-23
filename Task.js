class Task
{
    static EVENT_STATUS_CHANGE = 'status_change';
    static EVENT_TASK_DELETE = 'delete_task';

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

        this.$context.trigger(Task.EVENT_STATUS_CHANGE);
    }


    delete()
    {
        this.$context.trigger(Task.EVENT_TASK_DELETE);

        this.$context.remove();
    }


    static getTemplate(name, ready = false)
    {
        // fixme очень сложная запись тяжело читать, правильно так ready ? 'checked' : ''
        // fixme не правильное имя пеменной, переменная с именем is_ должна содержать true/false, приставку is_ нужно убрать
        let is_checked = ready === false ? '' : 'checked';

        return `
            <li class="b_task">
                <div class="inner_task">
                    <input type="checkbox" ${is_checked}>
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
     * @param {JQuery}$context
     */
    static create($context)
    {
        let tasks = [];
        let $tasks = $context.find('.b_task');

        $tasks.each((index, element) =>
        {
            let task = new Task($(element));

            tasks.push(task);
        });

        return tasks;
    }
}