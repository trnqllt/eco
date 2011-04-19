define(['jquery', 'jquery-ui'], function ($) {

    function PaneTable() {
        this._cont = null;
        this._listeners = [];
        this._container_prov = null;
        
        this._table_caption = "PaneTable";
        this._button_label = "Create new";
        this._fields = [];
    }
    
    PaneTable.prototype.on_created = function(dto) {
        for (var x = 0; x < this._listeners.length; x++) {
            this._listeners[x](dto);
        }
    }
    
    PaneTable.prototype.created = function(cb) {
        this._listeners.push(cb);
        return this;
    }
    
    PaneTable.prototype.request_container = function(cb) {
        this._container_prov = cb;
        return this;
    }
    
    PaneTable.prototype.init_container = function(container, month) {
        var tbl = $('<table>');

        var cap = $('<caption>');
        tbl.append(cap);
        cap.text(this._table_caption);
        
        var tblhead = $('<thead>');
        tbl.append(tblhead);
        var tr = $('<tr>');
        tblhead.append(tr);

        
        for (var x = 0; x < this._fields.length; x++) {
            var th = $('<th>');
            tr.append(th);
            th.text(this._fields[x][0]);
        }
        
        var tblbody = $('<tbody>');
        tbl.append(tblbody);
        
        container.append(tbl);
        
        var btn = $("<button>").button({ label:this._button_label });
        container.append(btn);
        var that = this;
        btn.click(function() { that.create_new(month) });
        
        return this;
    }
    
    PaneTable.prototype.create_new = function(month) {
        throw new Error("create_new _must_ be overridden by subclasses");
    }
    
    PaneTable.prototype.build_link = function(dto, field) {
        throw new Error("build_link _must_ be overridden by subclasses");
    }
    
    PaneTable.prototype.update = function(dto) {
        if (this._container_prov == null) {
            throw new Error("Tried to run update(dto) before a container provider has been set!");
        }
        
        var cont = this._container_prov(dto.month);            
        var tbody = $('tbody', cont);
                    
        var tr = $('<tr>');

        for (var x = 0; x < this._fields.length; x++) {
            var td = $('<td>');
            tr.append(td);
            var field = this._fields[x];
            var val = dto[field[1]];
            var w = field[2];
            var make_link = field[3];
            
            
            if (make_link) {
                var url = this.build_link(dto, field);
                // Skapa klickbar länk för att visa/ändra mer info, typ OCR etc etc...
            }
            
            if (!dto.locked) {
                var inpt = $('<input>');
                inpt.attr('type', 'text');
                inpt.val(val);
                if (w > 0) {
                    inpt.attr('size', w);
                    inpt.attr('maxlength', w);
                }
                td.append(inpt);
                
            } else {
                td.text(val);
            }
        }
        tbody.append(tr);
        
        
        return this;
    }

    
    
    
    return PaneTable;
});

