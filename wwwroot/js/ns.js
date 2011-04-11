define({
    Namespace: function(dottedname) {
        var parts = dottedname.split(".");
        var objref = window;
        for (var x = 0; x < parts.length; x++) {
            if (typeof objref[parts[x]] == "undefined") {
             objref[parts[x]] = {};   
            }
            objref = objref[parts[x]];
        }
    }
});