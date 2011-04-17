define(['./client.ui.panetable'], function (PaneTable) {

    Income = {};
    Income.prototype = new PaneTable();
    Income.init = function() {
        this._table_caption = "Income";
        this._button_label = "Create new";
        this._fields = [
            ['Label', 'label', 0]
        ];
        return this;
    }
    
    
    
    
    
    
    
    nepps...funkar inte...
    
    
    
    
    
    
    
    
    return new Income().init();

});
