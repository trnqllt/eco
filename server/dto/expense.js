
var ExpenseDTO = {
    id: null
    , month: null
    , label: null
    , group: null
    , type: null // Bill, Planned, Recurring, Single etc..
    , due_date: null
    , normal_amount: null
    , paid_amount: null
    , extra_amount: null
    , recurring: 0 // Month-wise
    , locked: false
    , data: { } // Different depending on type
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
