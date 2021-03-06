define(['./client.ui.panetable'], function (PaneTable) {

    function Expenses() {};
    Expenses.prototype = new PaneTable();
    Expenses.prototype.init = function() {
        this._table_caption = "Montly expenses";
        this._button_label = "Create new";
        this._fields = [
            ['Label', 'label', 0, true]
            , ['Due date', 'due_date', 10, false]
            , ['Amount', 'normal_amount', 5, false]
            , ['Extra', 'extra_amount', 5, false]
            , ['Paid', 'paid_amount', 5, false]
        ];
        
        return this;
    }
    
    Expenses.prototype.build_link = function(dto, field) {
        return "gnulänk";
    }
    
    Expenses.prototype.create_new = function(month) {
        this.on_created({
            month: month
            , label: "New expense"
        });
    }    
    
    return new Expenses().init();

});

