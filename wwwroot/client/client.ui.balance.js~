define(['jquery', 'jquery-ui'], function ($) {
    function Balance() {
        var cont = null;
        
        this.render = function(container) {
            cont = container;
            cont.html('Totals!');
            
            return this;
        }
        
        this.update = function(dto) {
            var div = $("<div>");
            cont.append(div);
            div.html(dto);
            
            return this;
        }
    }
    
    
    
    return new Balance();
});
