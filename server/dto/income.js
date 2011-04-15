
var IncomeDTO = {
    id: null
    , month: null
    , name: null
    , type: null // Recurring, Temporary
    , sum: null
    , recurring: 0 // Month-wise
    , locked: false;
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