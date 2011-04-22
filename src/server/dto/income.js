
var IncomeDTO = {
    id: null
    , month: null
    , label: null
    , group: null
    , type: null // Recurring, Temporary
    , normal_amount: null
    , extra_amount: null
    , recurring: 0 // Month-wise
    , locked: false
    , data: { } // Different depending on type
}

exports.Create = function(vals) {
    var dto = new IncomeDTO();
    
    if (vals) {
        for (var prop in dto) {
            if (dto.hasOwnProperty(prop) && vals.hasOwnProperty(prop)) {
                dto[prop] = vals[prop];
            }
        }
    }
    
    return dto;
}
