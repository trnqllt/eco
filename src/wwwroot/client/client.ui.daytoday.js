define(['./client.ui.panetable'], function (PaneTable) {

    function D2DExpenses() {};
    D2DExpenses.prototype = new PaneTable();
    D2DExpenses.prototype.init = function() {
        this._table_caption = "Day-to-day expenses";
        this._button_label = "Create new";
        this._fields = [
            ['Date', 'date', 10, false]
            , ['Label', 'label', 0, false]
            , ['Amount', 'amount', 5, false]
            , ['Store', 'store', 0, false]
        ];
        
        return this;
    }
    
    D2DExpenses.prototype.build_link = function(dto, field) {
        return "gnulänk";
    }
    
    D2DExpenses.prototype.create_new = function(month) {
        this.on_created({
            month: month
            , label: "New d2d expense"
        });
    }    
    
    return new D2DExpenses().init();

});

