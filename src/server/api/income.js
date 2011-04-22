
var Income = function() {
    function add(vals, cb) {
        return 234342;
    }
    
    function edit(vals, id, cb) {
        return true;
    }
    
    function get(mindate, maxdate, cb) {
        return {"blah": 1, "gneh": 2}
    }

    function del(id, cb) {
        return true;
    }


    return {
        edit: edit
        , get: get
        , del: del
    }
}

exports.handler = Income();