var http = require("http");
var bee = require("beeline");
var api = require("api");

var settings = {
    listen_ip: "0.0.0.0",
    listen_port: 8081,
    fileserver: {
        wwwroot: "../wwwroot",
        defaults: ["index.html"]
    }
}
    
var router = bee.route({
    "/api/": 


});


var s = http.createServer(mainHandler);
s.listen(settings.listen_port, settings.listen_ip);
require("elf-logger").createLogger(s, {
    dir: "/home/trnqllt/programming/code/eco2/server/log"
    , template: "{date}.log"
    , fields: ["date", "time", "c-ip", "cs-username", "s-ip", "s-port", "cs-method", "cs-uri-stem", "cs-uri-query", "sc-status", "cs(User-Agent)"]
});
}


