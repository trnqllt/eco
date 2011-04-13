

var settings = {
    listen_ip: null,
    listen_port: 9090,
    fileserver: {
        wwwroot: "../wwwroot",
        defaults: ["index.html"]
    }
}

var s = require("./server.js").create(settings);

s.run()
console.log("Listening to " + s.listen_ip + ":" + s.listen_port);


