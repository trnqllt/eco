
var util = require("util");
var basemod = require("../basemod.js");

function D2DExpense() {
    // Call the base-constructor
    basemod.BaseMod.call(this);
}
util.inherits(D2DExpense, basemod.BaseMod);

D2DExpense.prototype.do_post = function(params) {
    this.begin(false);
    this.end();
}

D2DExpense.prototype.do_put = function(params) {
    this.begin(false);
    this.end();
}

D2DExpense.prototype.do_delete = function(params) {
    this.begin(false);
    this.end();
}

D2DExpense.prototype.do_get = function(params) {
    var that = this;
    this.begin(true);
    setTimeout(function() {that.write_response("Hej ")}, 100);
    setTimeout(function() {that.write_response("du ")}, 1000);
    setTimeout(function() {that.write_response("fule")}, 2000);
    setTimeout(function() {that.end()}, 2500);
}

exports.handler = new D2DExpense();