// Imports
var http = require("http");
var bee = require("beeline");
var api = require("./api");

// Settings
var settings = {
    listen_ip: "0.0.0.0",
    listen_port: 9091,
    fileserver: {
        wwwroot: "../wwwroot/"
        , defaultpage: { name: "index.html", mime: "text/html" }
    }
}

// Mime
var mimes = {
    "html": "text/html"
    , "js": "text/javascript"
    , "css": "text/stylesheet"
    
    // Images
    , "gif": "image/gif", "png": "image/png"
    , "jpg": "image/jpeg", "jpeg": "image/jpeg"

}

// Routing
var router = bee.route({
    "r`^/api/(.+)$`": api.handleRequest
    , "/": bee.staticFileHandler(settings.fileserver.wwwroot + settings.fileserver.defaultpage.name, settings.fileserver.defaultpage.mime)
    , "r`/(.*)`": bee.staticDirHandler(settings.fileserver.wwwroot, mimes)

});


// Server
var server = http.createServer(router);
server.listen(settings.listen_port, settings.listen_ip);


// W3C Logging
require("elf-logger").createLogger(server, {
    dir: "/home/trnqllt/programming/code/eco2/server/log"
    , template: "{date}.log"
    , fields: ["date", "time", "c-ip", "cs-username", "s-ip", "s-port", "cs-method", "cs-uri-stem", "cs-uri-query", "sc-status", "cs(User-Agent)"]
});



