
var util = require("util");
var basemod = require("../basemod.js");

function Expense() {
    // Call the base-constructor
    basemod.BaseMod.call(this);
}
util.inherits(Expense, basemod.BaseMod);

Expense.do_post = function(params) {
    this.begin(false);
    this.end();
}

Expense.do_put = function(params) {
    this.begin(false);
    this.end();
}

Expense.do_delete = function(params) {
    this.begin(false);
    this.end();
}

Expense.do_get = function(params) {
    var that = this;
    this.begin(true);
    setTimeout(function() {that.write_response("Hej ")}, 100);
    setTimeout(function() {that.write_response("du ")}, 1000);
    setTimeout(function() {that.write_response("fule")}, 2000);
    setTimeout(this.end, 2500);
}

exports.handler = new Expense();