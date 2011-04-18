define(['jquery', 'jquery-ui'], function ($) {

    function PaneTable() {
        var cont = null;
        var listeners = [];
        var container_prov = null;
        
        this._table_caption = "PaneTable";
        this._button_label = "Create new";
        this._fields = [];
        
        // Stuff
        function on_created(dto) {
            for (var x = 0; x < listeners.length; x++) {
                listeners[x](dto);
            }
        }
        
        this.created = function(cb) {
            listeners.push(cb);
            return this;
        }
        
        this.request_container = function(cb) {
            container_prov = cb;
            return this;
        }
        
        this.init_container = function(container, month) {
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
            btn.click(this.create_new);
            
            return this;
        }
        
        this.create_new = function() {
            throw new Error("create_new _must_ be overridden by subclasses");
        }
        
        this.build_link = function(dto, field) {
            throw new Error("build_link _must_ be overridden by subclasses");
        }
        
        this.update = function(dto) {
            if (container_prov == null) {
                throw new Error("Tried to run update(dto) before a container provider has been set!");
            }
            
            var cont = container_prov(dto.month);            
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
                    // Skapa klickbar l�nk f�r att visa/�ndra mer info, typ OCR etc etc...
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
    }
    
    
    
    return PaneTable;
});

