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
        if (this.$context.data('Task') !== undefined){
            return false;
        }
        this.$context.data('Task', this);
        this.$context.on('click', '.delete', () => {
            this.delete()
        });
    }

    get ready()
    {
        // fixme prop ready не существует, это мы придумали, тебе тут нужно не то что мы придумали а реально сущесвующий prop checked
        // разберись пожалуйста в что такое реально существующие свойства а что такое придуманые нами свойства объекта
        // исправь везде ок
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