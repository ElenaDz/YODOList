// fixme Имя файла и имя класса должны совпадать ок
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
        // fixme много лишнего, исправь на то что прислал я на скриншете ok
        if (this.$context[0].Task) return;
        this.$context[0].Task = this;
        this.ready = false;
        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

    get ready()
    {
        return this.$context.find('input[type=checkbox]').prop('checked');
    }

    set ready(ready)
    {
        this.$context.find('input[type=checkbox]').prop('checked', ready);
    }

    delete()
    {
        this.$context.remove();
    }

    static getTemplate(text)
    {
        return `
            <li class="b_task">
                    <div class="inner_task">
                        <input type="checkbox">
                        <span>${name_task}</span>
                    </div>
                    <div class="wrap_delete">
                        <button class="delete">x</button>
                    </div>
            </li>
        `;
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let tasks = [];
        let $tasks = $context.find('.b_task');

        $tasks.each((index, element) => {
            let task = new Task($(element));
            tasks.push(task);
        });

        return tasks;
    }
}