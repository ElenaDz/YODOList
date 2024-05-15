
class ListTasks
{
    /** @type {Task[]} */
    tasks = [];

    /** @type JQuery $context */
    $context;

    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$context = $context;

        this.$context.data('ListTasks', this);

        this.tasks = Task.create(this.$context);
    }

    addTask(name_task)
    {
        this.$context.prepend(this.getTemplate(name_task));

        // fixme забыла обновить свойство tasks этого класса
        Task.create(this.$context);
    }

    // fixme перенеси метод в класс Task, я там его уже создал
    static getTemplate(name_task)
    {
        // fixme переменная лишняя, сразу return
        // fixme симфолы переноса строки лишние, убрать
        // исправил форматирование, здесь форматирование так же важно как в html
        let text =`
            <li class="b_task">\n 
                <div class="inner_task">\n 
                    <input type="checkbox">\n
                    <span>${name_task}</span>\n 
                </div>\n 
                <div class="wrap_delete">\n 
                    <button class="delete">x</button>\n 
                </div>\n 
            </li>
        `;
        return text;
    }

    /**
     * @param {JQuery}$context
     */
    static create($context)
    {
        let $listTasks = $context.find('.b_list_tasks');

        return  new ListTasks($listTasks);
    }
}