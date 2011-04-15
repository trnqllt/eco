define(["jquery", "./client.ui.total", "./client.ui.expenses", "./client.ui.income"], function($, total, expenses, income) {
    
    var Client = function(selector, total, expenses, income) {
        var container = $(selector);
        
        
        
        this.init = function() {
            
            container.addClass('client-container');
            
            var totdiv = $('<div>');
            container.append(totdiv);
            total.init(totdiv);
            
            var incdiv = $('<div>');
            container.append(incdiv);
            income.init(incdiv);
            
            var expdiv = $('<div>');
            container.append(expdiv);
            expenses.init(expdiv);            
            
        }
        
    }
    
    
    
    return {
        init: function(selector, data) {
            var cli = new Client(selector, total, expenses, income);
            cli.init();
            
            
        }
        
    }
});


