
var BalanceDTO = {
    month: null
    , normal_income: null
    , extra_income: null
    , actual_income: null
    , normal_expenses: null
    , extra_expenses: null
    , actual_expenses: null
    , normal_balance: null
    , actual_balance: null
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
