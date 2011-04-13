

var settings = {
    listen_ip: "0.0.0.0",
    listen_port: 8081,
    fileserver: {
        wwwroot: "../wwwroot",
        defaults: ["index.html"]
    }
}

var s = require("./server.js").create(settings);

s.run()
console.log("Listening to " + s.listen_ip + ":" + s.listen_port);


