define(['./client.ui.panetable', '../js/utils'], function (PaneTable, Utils) {

    function Balance() {};
    Balance.prototype = new PaneTable();
    Balance.prototype.init = function() {
        this._table_caption = "Totals";
        this._button_label = "n/a";
        this._fields = [
            ['&nbsp;']
            , ['Normal']
            , ['Extra']
            , ['Actual']
            ];
            
        return this;
    }
    
    Balance.prototype.build_link = function(dto, field) {
        return "aplänk";
    }
    
    Balance.prototype.create_new = function(month) {
        alert("Should create new @ " + month);
    }
    
    Balance.prototype.init_container = function(container, month) {
        var tbl = $('<table>');

        //--- Caption
        var cap = $('<caption>');
        tbl.append(cap);
        cap.text(this._table_caption);
        
        
        //--- Head
        var tblhead = $('<thead>');
        tbl.append(tblhead);
        var tr = $('<tr>');
        tblhead.append(tr);

        for (var x = 0; x < this._fields.length; x++) {
            var th = $('<th>');
            tr.append(th);
            th.html(this._fields[x][0]);
        }
        
        //--- Body
        var tblbody = $('<tbody>');
        tblbody.addClass('client-group');
        tbl.append(tblbody);
        
        //--- The fixed rows
        // Balance
        var row = $('<tr>');
        row.addClass('client-balance-row-balance');
        tblbody.append(row);
        row.append('<td>Balance</td><td></td><td></td><td></td>');
        // Income
        row = $('<tr>');
        row.addClass('client-balance-row-income');
        tblbody.append(row);
        row.append('<td>Income</td><td></td><td></td><td></td>');
        // Balance
        row = $('<tr>');
        row.addClass('client-balance-row-expenses');
        tblbody.append(row);
        row.append('<td>Expenses</td><td></td><td></td><td></td>');

        
        
        
        container.append(tbl);
        
        return this;
    }
    
    Balance.prototype.update = function(dto) {
        if (this._container_prov == null) {
            throw new Error("Tried to run update(dto) before a container provider has been set!");
        }
        
        var cont = this._container_prov(dto.month);
        var balrowcells = $('.client-balance-row-balance > td', cont);
        var incrowcells = $('.client-balance-row-income > td', cont);
        var exprowcells = $('.client-balance-row-expenses > td', cont);

        $(balrowcells[1]).html(Utils.Monetary.format_money(dto.normal_balance));        
        $(balrowcells[3]).html(Utils.Monetary.format_money(dto.actual_balance));        
        
        $(incrowcells[1]).html(Utils.Monetary.format_money(dto.normal_income));        
        $(incrowcells[2]).html(Utils.Monetary.format_money(dto.extra_income));        
        $(incrowcells[3]).html(Utils.Monetary.format_money(dto.normal_income));        

        $(exprowcells[1]).html(Utils.Monetary.format_money(dto.normal_expenses));        
        $(exprowcells[2]).html(Utils.Monetary.format_money(dto.extra_expenses));        
        $(exprowcells[3]).html(Utils.Monetary.format_money(dto.actual_expenses));                
        
        return this;
    }
    
    return new Balance().init();
    
});
