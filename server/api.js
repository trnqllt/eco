

exports.duh = function(req, resp, matches) {
    resp.writeHeader(200);
    resp.end("API ok");
}