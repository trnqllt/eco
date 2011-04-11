// Configure requirejs
require({ priority: ["jquery"]});

require(['jquery', './client/client.ui.js'], function($, ui) {
    $(document).ready(function() {        
        ui.init('#contents');    
    });
});

