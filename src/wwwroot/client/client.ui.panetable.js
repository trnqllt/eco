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
        var tabl = $('table', cont);
        
        var groupname = dto.group;
        if (groupname)
            groupname = groupname.replace(' ', '')
        
        var sel = 'tbody';
        if (groupname) // Fetch an existing named group
            sel += '.client-group-' + groupname;
        else // Fetch the (existing?) unnamed group
            sel += ':not([class*="client-group-"])'
            
        var tbody = $(sel, tabl);

        if (tbody.length == 0) {
            tbody = $('<tbody>');
            tbody.addClass('client-group');
            
            if (dto.group) {                
                tbody.addClass('client-group-' + groupname);
                
                var grphead = $('<tr>');
                var grpcap = $('<th>');
                grpcap.addClass('client-group-head');
                grpcap.attr('colspan', this._fields.length);
                grpcap.text(dto.group);
                
                grphead.append(grpcap);
                tbody.append(grphead);    
                tabl.append(tbody);
            } else {
            
            
            
                var grphead = $('<tr>');
                var grpcap = $('<th>');
                grpcap.addClass('client-group-head');
                grpcap.attr('colspan', this._fields.length);
                grpcap.text('noname');
                
                grphead.append(grpcap);
                tbody.append(grphead);  
            
            
            
            
                var tbodies = $('tbody:first', tabl);
                if (tbodies.length == 0) {
                    tabl.append(tbody);
                } else {
                    tbodies.before(tbody);
                }
            }
        }
                    
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

