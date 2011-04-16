define(['jquery', 'jquery-ui'], function ($) {
    function Expenses() {
        var cont = null;
        var listeners = [];
        
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
        
        this.render = function(container) {
            cont = container;
            cont.html('Expenses!');
            
            var btn = $("<button>").button({ label: "Create" });
            cont.append(btn);
            btn.click(function() {
                on_created("New expense");
            });
            
            
            
            return this;
        }
        
        this.update = function(dto) {
            var div = $("<div>");
            cont.append(div);
            div.html(dto);
            
            return this;
        }
    }
    
    
    
    return new Expenses();
});
