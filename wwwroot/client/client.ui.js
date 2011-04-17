define(["jquery", "./client.ui.balance", "./client.ui.expenses", "./client.ui.income", '../js/utils', 'jquery-ui'], function($, balance, expenses, income, utils) {
    
    var Client = function(selector, balance, expenses, income) {
        var container = $(selector);
        var slide_cont = null;
        var slider = null;
        var curmonth = null;
        var init_count = 0;
        
        this.init = function(data) {
            
            container.addClass('client-container');
            
            // Create and add client-scrolling-container etc
            slide_cont = $('<div>');
            slide_cont.addClass('client-slide-container');
            container.append(slide_cont);
            
            var slide_head = $('<div>');
            slide_head.addClass('client-slide-head');
            slide_cont.append(slide_head);
            
            slider = $('<div>');
            slider.addClass('client-slider');
            slide_cont.append(slider);
         
            
            
            // Navigation
            var btn_prev = $('<button>').button({ label: "<--" }).click(slide_left);
            slide_head.append(btn_prev);
            var btn_next = $('<button>').button({ label: "-->" }).click(slide_right);
            slide_head.append(btn_next);

            // Bind all
            connect(data);
            
            // How many initialization calls?
            var initmonths = [monthadd(null, 0), monthadd(null, -1), monthadd(null, -2)];            
            init_count = initmonths.length *2;
            for (var x = 0; x < initmonths.length; x++) {
                console.log("Initializing " + initmonths[x]);
                data.update_incomes(initmonths[x], init_completed);
                data.update_expenses(initmonths[x], init_completed);
            }
            
        }
        
        function init_completed() {
            init_count--;
            // Everything is loaded? For the first time?
            if (init_count <= 0 && curmonth == null) {
               // Select the current month
                select_month();
                
                // Handle resize
                $(window).resize(function() { select_month(curmonth); });             
            }
        }
        
        
        function slide_right() {
            select_month(monthadd(curmonth, -1));
        }
        
        function slide_left() {            
            select_month(monthadd(curmonth, 1));        
        }
        
        function format_month(month) {
            var y = parseInt(month.substr(0, 4));
            var m = parseInt(month.substr(4, 2));
            return utils.DateUtils.getMonthName(m-1) + " " + y;            
        }
        
        function create_month(month) {
            var mdiv = $('<div>');
            mdiv.addClass('month');
            mdiv.addClass(month);
            
            var h2 = $('<h2>');
            mdiv.append(h2);
            h2.text(format_month(month));
            
            // Container for income
            var incdiv = $('<div>');
            incdiv.addClass('client-income-container');
            income.init_container(incdiv, month);
            mdiv.append(incdiv);
            // Container for expenses
            var expdiv = $('<div>');
            expdiv.addClass('client-expense-container');
            expenses.init_container(expdiv, month);
            mdiv.append(expdiv);
            
            // Where should we add this new month?
            var mnext = get_month_container(monthadd(month, 1), true);

            if (mnext == null) {
                // Add it last
                slider.append(mdiv);
            } else {
                // Add it before the next one
                mnext.before(mdiv);
            }
            
            return mdiv;
        }
        
        function get_income_container(month, dont_autocreate) {
            var mdiv = get_month_container(month, dont_autocreate);
            if (mdiv == null)
                return null;
            else
                return $('.client-income-container', mdiv);
        }
        
        function get_expense_container(month, dont_autocreate) {
            var mdiv = get_month_container(month, dont_autocreate);
            if (mdiv == null)
                return null;
            else
                return $('.client-expense-container', mdiv);
        }
        
        function get_month_container(month, dont_autocreate) {
            var monthdiv = $('.month.' + month);
            // Does the specified month exist in the gui?
            if (monthdiv.length == 0) {
                if (dont_autocreate) {
                    return null;                
                } else {
                    return create_month(month);
                }
            }
            return monthdiv;
        }
        
        function select_month(month) {
            if (!month) {
                var d = new Date();
                month = parse_month(d.getFullYear(), d.getMonth()+1);
            }

            var monthdiv = get_month_container(month, true);
            // Does the specified month exist in the gui?
            if (monthdiv == null) {
                console.log("Month " + month + " does not seem to be loaded");
                return;
            }
            
            console.log("Selecting month " + month);
            curmonth = month;
            
            $('.month.active').removeClass('active');
            monthdiv.addClass('active');
            
            // Calculate where we want to center the month
            var middle = parseInt(slide_cont.width() / 2);
            var pos = monthdiv.position();
            var m = monthdiv.outerWidth(true) / 2;
            var gopos = middle - (pos.left + m);
            slider.animate({ left: gopos }, { queue: true, duration: 400});
        }
        
        function monthadd(month, add) {
            if (!month) {
                var d = new Date();
                month = parse_month(d.getFullYear(), d.getMonth()+1);
            }
            
            var y = parseInt(month.substr(0, 4));
            var m = parseInt(month.substr(4, 2));
            
            if (add > 0) {
                if (m == 12) {
                    y += Math.ceil(12/add);
                    m = 0 + add; // Could just be m = add ofcourse, but this is more self-explanatory i think
                } else {
                    m += add;
                }
            } else if (add < 0) {
                add *= -1; // Make positive
                if (m == 1) {
                    y -= Math.ceil(12/add);
                    m = 13 - add;
                } else {
                    m -= add;
                }
            }
            return parse_month(y, m);
        }
        
        function parse_month(year, month) {
            if (month < 10)
                month = "0" + month;
            return "" + year + month;
        }
        
        
        function connect(data) {
            // Bind from data
            data.income_updated(income.update);            
            data.expense_updated(expenses.update);
            data.balance_updated(balance.update);
            
            // Bind to elements
            income.request_container(get_income_container);
            expenses.request_container(get_expense_container);
            
            // Bind from view
            income.created(data.save_income);
            expenses.created(data.save_expense);
            
        }
        
    }
    
    
    
    return {
        init: function(selector, data) {
            var cli = new Client(selector, balance, expenses, income);
            cli.init(data);
        }
        
    }
});


