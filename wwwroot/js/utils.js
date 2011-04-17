
define([], function() {
    var DateUtils = {
        locale: {
            en: {
                long_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                , short_names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        }
        
        
        , getMonthName: function(month, lang) {
            lang = lang && (lang in DateUtils.locale) ? lang : "en";
            return DateUtils.locale[lang].long_names[month];
        }
        , getShortMonthName: function(month, lang) {
            lang = lang && (lang in DateUtils.locale) ? lang : "en";
            return DateUtils.locale[lang].short_names[month];
        }
    }
    
    
    
    return {
        DateUtils: DateUtils
    }
    
});
