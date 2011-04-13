
exports.create = function(settings) {
    // Modules
    var fs = require("fs");
    var path = require("path");
    var url = require("url");
    
    // Defaults
    var defaultdata = "Not found";
    var defaultcode = 404;
    
    function findfile(pathname) {
    
    }


    return {
        can_handle: function(req) {
            return true;
        },
        
        handle: function(req, resp) {
            var data = defaultdata;
            var code = defaultcode;
            var ctype = "text/html";
            
            var urlinfo = url.parse(req.url);            
            var fullpath = path.join(settings.wwwroot, urlinfo.pathname);
            
            // Path specified is inside of wwwroot?
            if (fullpath.indexOf(settings.wwwroot) == 0)
            {
                
                data = "Ok to view: " + urlinfo.pathname + " query: " + urlinfo.search;
                code = 200;
            }
            
            
            resp.writeHead(code, {
                "Content-Length": data.length,
                "Content-Type": ctype                
            });
            resp.end(data);
            return code;
        }
    }
}
