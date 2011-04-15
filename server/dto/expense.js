
var ExpenseDTO = {
    id: null
    , month: null
    , name: null
    , type: null // Bill, Planned, Recurring, Single etc..
    , due_date: null
    , normal_sum: null
    , paid_sum: null
    , extra_sum: null
    , total: null
    , recurring: 0 // Month-wise
    , locked: false;
}

exports.Create = function(vals) {
    var dto = new ExpenseDTO();
    
    if (vals) {
        for (var prop in dto) {
            if (dto.hasOwnProperty(prop) && vals.hasOwnProperty(prop)) {
                dto[prop] = vals[prop];
            }
        }
    }
    
    return dto;
}