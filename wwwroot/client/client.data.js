define(["jquery"], function ($) {

    function Client() {
        var income_listeners = [];
        var expense_listeners = [];
        var balance_listeners = [];
        
        
        this.update_all = function() {
        
        }
        
        this.balance_updated = function(cb) {
            if (typeof cb === "undefined") {
            
            }
            else {
                balance_listeners.append(cb);
            }
        }
    
    
    }



    return new Client();
});