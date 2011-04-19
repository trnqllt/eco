// Configure requirejs
require({ priority: ["jquery"]});

require(['jquery', './client/client.data.js', './client/client.ui.js'], function($, data, ui) {
    // Wait until the document is loaded before drawing anything
    $(document).ready(function() {        
                alert("init");
        ui.init('#contents', data);    
    });
});

