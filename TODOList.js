class TODOList {
    /**
     * @param {JQuery}$context
     */
    constructor($context)
    {
        this.$box_list = $context;
        let input_add_task = this.$box_list.find('.add_task');
        this.listTasks = ListTasks.create(this.$box_list.find('.tasks'));
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