// Configure requirejs
require({ priority: ["jquery"]});

require(['jquery', './client/client.data.js', './client/client.ui.js'], function($, data, ui) {
    // Fetch data from backend immediately
    data.update_all();
    
    // Wait until the document is loaded before drawing anything
    $(document).ready(function() {        
        ui.init('#contents', data);    
    });
});

