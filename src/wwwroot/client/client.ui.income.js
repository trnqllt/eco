define(['./client.ui.panetable'], function (PaneTable) {

    function Income() {};
    Income.prototype = new PaneTable();
    Income.prototype.init = function() {
        this._table_caption = "Income";
        this._button_label = "Create new";
        this._fields = [
            ['Label', 'label', 0, true]
        ];
        return this;
    }
    
    Income.prototype.build_link = function(dto, field) {
        return "aplänk";
    }
    
    Income.prototype.create_new = function(month) {
        alert("Should create new @ " + month);
    }    
    
    return new Income().init();

});
