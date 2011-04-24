
var D2DExpenseDTO = {
    id: null
    , month: null
    , label: null
    , group: null // Food, alcohol, fun, etc..?
    , store: null // Willys, COOP, etc..
    , date: null
    , amount: null
    , locked: false
}

exports.Create = function(vals) {
    var dto = new D2DExpenseDTO();
    
    if (vals) {
        for (var prop in dto) {
            if (dto.hasOwnProperty(prop) && vals.hasOwnProperty(prop)) {
                dto[prop] = vals[prop];
            }
        }
    }
    
    return dto;
}
