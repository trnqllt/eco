define(["jquery"], function ($) {

    function Data(baseurl) {
        var cbs = {
        	income: []
        	, expenses: []
        	, d2dexpenses: []
        	, balance: []
        }
        var urls = {
        	income: baseurl + "income/"
        	, expenses: baseurl + "expense/"
        	, d2dexpenses: baseurl + "d2dexpense/"
        	, balance: baseurl + "balance/"
        }
        
        // Events
        this.d2dexpense_updated = function(cb) {
            cbs.d2dexpenses.push(cb);
            return this;
        }
        
        this.income_updated = function(cb) {
            cbs.income.push(cb);
            return this;
        }

        this.expense_updated = function(cb) {
            cbs.expenses.push(cb);
            return this;
        }

        this.balance_updated = function(cb) {
            cbs.balance.push(cb);
            return this;
        }
        
        // Stuff
        function on_d2dexpense_updated(dto) {
            for (var x = 0; x < cbs.d2dexpenses.length; x++) {
                cbs.d2dexpenses[x](dto);
            }
        }
        
        function on_income_updated(dto) {
            for (var x = 0; x < cbs.income.length; x++) {
                cbs.income[x](dto);
            }
        }
        
        function on_expense_updated(dto) {
            for (var x = 0; x < cbs.expenses.length; x++) {
                cbs.expenses[x](dto);
            }
        }
        
        function on_balance_updated(dto) {
            for (var x = 0; x < cbs.balance.length; x++) {
                cbs.balance[x](dto);
            }
        }
        
        // Internals
        
        
        
        // day-to-day expenses
        this.save_d2dexpense = function(dto) {
            on_d2dexpense_updated(dto);
            
            return this;
        }
        
        this.update_d2dexpenses = function(month, completed_cb) {
        	var requrl = urls.d2dexpenses;
        	
        	$.ajax({
        		url: requrl
        		, type: "GET"
        		//, dataType: "json"
        		, success: function(data, textStatus, xhr) {
        			for (var x = 0; x < data.length; x++) {
        				on_d2dexpense_updated(data[x]);
        			}
        		}
        		, complete: completed_cb
        	});
        	
            return this;
        }
        
        // Income
        this.save_income = function(dto) {
            on_income_updated(dto);
            
            return this;
        }
        
        this.update_incomes = function(month, completed_cb) {
            for (var x = 0; x < (Math.random()*9)+1; x++) {
                var grp = Math.round(Math.random()*2);
                var grpname = null;
                if (grp > 0)
                    grpname = "Testgroup " + grp;
                    
                on_income_updated({month: month, label: "bajs "+x, group: grpname});
            }
            
            if (completed_cb)
                completed_cb();
            return this;
        }
        
        
        // Expense
        this.save_expense = function(dto) {
            on_expense_updated(dto);
            
            return this;
        }
        
        this.update_expenses = function(month, completed_cb) {
            for (var x = 0; x < (Math.random()*9)+1; x++) {
                    var grp = Math.round(Math.random()*2);
                    var grpname = null;
                    if (grp > 0)
                        grpname = "Testgroup " + grp;
                        
                on_expense_updated({month: month, label: "bajs"+x, group: grpname});
            }
            
            if (completed_cb)
                completed_cb();
            return this;
        }
        
        
        // Balance
        this.update_balance = function(month, completed_cb) {
            on_balance_updated({month: month
                , normal_income: Math.round(Math.random()*30000)
                , extra_income: Math.round(Math.random()*3000)
                , actual_income: this.normal_income+this.extra_income
                , normal_expenses: Math.round(Math.random()*50000)
                , extra_expenses: Math.round(Math.random()*20000)
                , actual_expenses: this.normal_expenses+this.extra_expenses
                , normal_balance: Math.round(Math.random()*7000)
                , actual_balance: Math.round(Math.random()*5000) * (Math.random() < 0.5 ? -1 : 1)
            });
            
            if (completed_cb)
                completed_cb();            
            
            return this;
        }                        
    }



    return new Data("/api/");
});
