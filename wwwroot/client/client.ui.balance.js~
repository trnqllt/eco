define(['jquery', 'jquery-ui'], function ($) {
    function Balance() {
        var container_prov = null;
        
        this.init_container = function(container) {
            container.html('Balance!');
            
            return this;
        }
        
        this.update = function(dto) {
            if (container_prov == null) {
                throw new Error("Tried to update balance before a container provider has been set!");
            }
            
            var cont = container_prov(dto.month);            
            var div = $("<div>");
            cont.append(div);
            div.html(dto);
            
            return this;
        }
    }
    
    
    
    return new Balance();
});
