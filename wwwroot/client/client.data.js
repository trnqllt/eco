define(["jquery"], function ($) {

    function Data(baseurl) {
        var income_callbacks = [];
        var expense_callbacks = [];
        var balance_callbacks = [];
        
        // Events
        this.income_updated = function(cb) {
            income_callbacks.push(cb);
            return this;
        }

        this.expense_updated = function(cb) {
            expense_callbacks.push(cb);
            return this;
        }

        this.balance_updated = function(cb) {
            balance_callbacks.push(cb);
            return this;
        }
        
        // Stuff
        function on_income_updated(dto) {
            for (var x = 0; x < income_callbacks.length; x++) {
                income_callbacks[x](dto);
            }
        }
        
        function on_expense_updated(dto) {
            for (var x = 0; x < expense_callbacks.length; x++) {
                expense_callbacks[x](dto);
            }
        }
        
        function on_balance_updated(dto) {
            for (var x = 0; x < balance_callbacks.length; x++) {
                balance_callbacks[x](dto);
            }
        }
        
        // Internals
        
        
        
        // Income
        this.save_income = function(dto) {
            on_income_updated(dto);
            
            return this;
        }
        
        this.update_incomes = function(month) {
            
            
            return this;
        }
        
        // Expense
        this.save_expense = function(dto) {
            on_expense_updated(dto);
            
            return this;
        }
        
        this.update_expenses = function(month) {
            
            
            return this;
        }
        
        // Balance
        this.update_balance = function(month) {
            
            
            return this;
        }                        
    }



    return new Data("/api/");
});
