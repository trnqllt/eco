
var BalanceDTO = {
    month: null
    , normal_income: null
    , extra_income: null
    , actual_income: null
    , normal_expenses
}


exports.Create = function(vals) {
    var dto = new BalanceDTO();
    
    if (vals) {
        for (var prop in dto) {
            if (dto.hasOwnProperty(prop) && vals.hasOwnProperty(prop)) {
                dto[prop] = vals[prop];
            }
        }
    }
    
    return dto;
}