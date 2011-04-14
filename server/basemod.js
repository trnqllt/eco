
var util = require("util");
var events = require("events");

function BaseMod() {
    events.EventEmitter.call(this);
}
util.inherits(BaseMod, events.EventEmitter);

// Events
BaseMod.prototype.begin = function(success) {
    this.emit("begin", success);
}

BaseMod.prototype.end = function() {
    this.emit("end");
}

BaseMod.prototype.write_response = function(responsedata) {
    this.emit("write_response", responsedata);
}

// Handler function
BaseMod.prototype.do_get = null;
BaseMod.prototype.do_push = null;
BaseMod.prototype.do_put = null;
BaseMod.prototype.do_delete = null;

exports.BaseMod = BaseMod;