define(['jquery'], function ($) {
    var pane = function(container) {
        
        this.render = function() {
            container.html('Expenses!');
        }
    }
    
    
    
    return {
        init: function(container) {
            var p = new pane(container);
            p.render();
        }};
});