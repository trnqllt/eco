

exports.create = function(settings) {
    var handlers = [];
    var filehandler = require("./FileHandler.js").create(settings.fileserver);
    var http = require("http");
    var urlmod = require("url");

    function selectHandler(req, resp) {
        var httpcode = null;
        for (var x = 0; x < handlers.length; x++) {
            if (handlers[x].can_handle(req)) {
                httpcode = handlers[x].handle(req, resp);
                break;
            }            
        }
        if (httpcode == null)
            httpcode = filehandler.handle(req, resp);
            
        console.log(req.method + " " + req.url + " Responded:" + httpcode);
    }
    
    return {
        run: function() {
            http.createServer(selectHandler).listen(settings.listen_port, settings.listen_ip);
        },
        
        registerHandler: function(handler) {
            handlers.append(handler);
        },
        
        listen_ip: settings.listen_ip,
        listen_port: settings.listen_port
    }
}

