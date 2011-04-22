
var Balance = function() {    
    function get(mindate, maxdate) {
        return {"blah": 1, "gneh": 2}
    }

    return {
        get: get
    }
}

exports.handler = Balance();