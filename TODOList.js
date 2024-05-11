// fixme удали этот класс, это так называемый "божественный класс" который будет делать все и управлять всем, я хотел чтобы ты сделала подругому
// у тебя должен быть класс список задач, оберка над ul.tasks и он ни чего не должен знать про остальные классы, они - остальные классы будут работать с ним
class TODOList {
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        // fixme это context а не box_list
        this.$box_list = $context;
        // fixme блок объявлений должен быть отделен пустыми строками, повторяиш одни  и те же ошибки, у меня не будет ни каокй мотивации проверять если от этого нет тольку
        let input_add_task = this.$box_list.find('.add_task');
        this.listTasks = ListTasks.create(this.$box_list.find('.tasks'));
        // fixme SwichersListTasks нельзя сокращать до swichers если мы только не внутри класса SwichersListTasks
        this.swichers = SwichersListTasks.create(this.$box_list.find('.swichers'));

        this.swichers.forEach((swichers) =>
        {
            this.current_swicher = swichers.getSwicher()
        });

        this.listTasks.forEach((listTasks) =>
        {
            listTasks.showListTasks(parseInt(this.current_swicher.val()))
        });
        input_add_task.on('keydown', (event) =>
        {
            if (event.key === 'Enter') {
                this.swichers.forEach((swichers) =>
                {
                    this.current_swicher = swichers.getSwicher()
                });
                let name_task = $(event.currentTarget).val();
                this.listTasks.forEach((listTasks) =>
                {
                    listTasks.setTaskToLocalStorage('0', name_task);
                    listTasks.showListTasks(parseInt(this.current_swicher.val()));
                });
                $(event.currentTarget).val("");
            }
        });
    }

    static create()
    {
        let $lists = $('.box_list');
        let lists = [];

        $lists.each((index, element) => {
            let $list = $(element);
            lists.push(new TODOList($list));
        })
        return lists;

    }
}