
var listen_ip = "0.0.0.0";
var listen_port = process.env.C9_PORT;
var http = require("http");

http.createServer(function(req, resp) {
    resp.writeHead(200, {"Content-type": "text/plain"});
    resp.end("Hello world");
}).listen(listen_port, listen_ip);
console.log("Listening to " + listen_ip + ":" + listen_port);


