define(['jquery', 'jquery-ui'], function ($) {
    function Expenses() {
        var cont = null;
        var listeners = [];
        var container_prov = null;
        
        var fields = [
            ['Label', 'label', 0, true]
            , ['Due date', 'due_date', 10, false]
            , ['Amount', 'normal_amount', 5, false]
            , ['Extra', 'extra_amount', 5, false]
            , ['Paid', 'paid_amount', 5, false]
        ];
        
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
            cap.text("Expenses");
            
            var tblhead = $('<thead>');
            tbl.append(tblhead);
            var tr = $('<tr>');
            tblhead.append(tr);

            
            for (var x = 0; x < fields.length; x++) {
                var th = $('<th>');
                tr.append(th);
                th.text(fields[x][0]);
            }
            
            var tblbody = $('<tbody>');
            tbl.append(tblbody);
            
            container.append(tbl);
            
            var btn = $("<button>").button({ label: "Create" });
            container.append(btn);
            btn.click(function() {
                on_created({
                    month: month
                    , label: "New expense"
                });
            });
            
            return this;
        }
        
        this.update = function(dto) {
            if (container_prov == null) {
                throw new Error("Tried to update expense before a container provider has been set!");
            }
            
            var cont = container_prov(dto.month);            
            var tbody = $('tbody', cont);
            console.log(tbody.length);
                        
            var tr = $('<tr>');
            
            for (var x = 0; x < fields.length; x++) {
                var td = $('<td>');
                tr.append(td);
                var val = dto[fields[x][1]];
                var w = fields[x][2];
                
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
    
    
    
    return new Expenses();
});
