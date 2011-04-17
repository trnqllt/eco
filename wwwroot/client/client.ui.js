define(["jquery", "./client.ui.balance", "./client.ui.expenses", "./client.ui.income", 'jquery-ui'], function($, balance, expenses, income) {
    
    var Client = function(selector, balance, expenses, income) {
        var container = $(selector);
        var slide_cont = null;
        var slider = null;
        var curmonth = null;
        
        this.init = function(data) {
            
            container.addClass('client-container');
            
            // Create and add client-scrolling-container etc
            slide_cont = $('.client-slide-container');
            slider = $('.client-slider', slide_cont);
            
            var baldiv = $('<div>');
            container.append(baldiv);
            balance.render(baldiv);
            
            var incdiv = $('<div>');
            container.append(incdiv);
            income.render(incdiv);
            
            var expdiv = $('<div>');
            container.append(expdiv);
            expenses.render(expdiv);            
            
            // --------- Footer
            var foot = $('<div>');
            foot.addClass("client-foot");
            slide_cont.append(foot);
            
            // Navigation
            var btn1 = $('<button>').button({ label: "<" })
            btn1.css('height', '100%');
            btn1.css('position','relative');
            btn1.css('left', '0');
            btn1.css('z-index', '500');
            slide_cont.append(btn1);
            
            var btn_prev = $('<button>').button({ label: "<--" }).click(slide_left);
            foot.append(btn_prev);
            var btn_next = $('<button>').button({ label: "-->" }).click(slide_right);
            foot.append(btn_next);
            
            // Select the current month
            select_month();
            
            // Handle resize
            $(window).resize(function() { select_month(curmonth); });
            
            // Finish up by binding all
            connect(data);
        }
        
        function parse_month(year, month) {
            if (month < 10)
                month = "0" + month;
            return "" + year + month;
        }
        
        function select_month(month) {
            if (!month) {
                var d = new Date();
                month = parse_month(d.getFullYear(), d.getMonth()+1);
            }

            var monthdiv = $('.month.' + month);
            // Does the specified month exist in the gui?
            if (monthdiv.length == 0) {
                console.log("Month " + month + " does not seem to be loaded");
                return;
            }
            console.log("Selecting month " + month);
            curmonth = month;
            
            $('.month.active').removeClass('active');
            monthdiv.addClass('active');
            
            // Calculate where we want to center the month
            var middle = parseInt(slide_cont.width() / 2);

            /*
            // Draw temp ruler
            var ruler = $('#ruler');
            if (ruler.length == 0) {
                ruler = $('<div>');
                ruler.attr('id', 'ruler');
                ruler.css('position', 'absolute');
                ruler.css('width', '1px');
                ruler.css('height', '150px');
                ruler.css('top', '50px');
                ruler.css('background-color', 'lime');
                $('body').append(ruler);
            }
            ruler.css('left', slide_cont.offset().left + middle);
            */
            
            var pos = monthdiv.position();
            var m = monthdiv.outerWidth(true) / 2;
            var gopos = middle - (pos.left + m);
            slider.animate({ left: gopos }, { queue: true, duration: 400});
        }
        
        function slide_right() {
            var y = parseInt(curmonth.substr(0, 4));
            var m = parseInt(curmonth.substr(4, 2));
            if (m == 1) {
                y -= 1;
                m = 12;
            } else {
                m -= 1;
            }
            select_month(parse_month(y, m));
        }
        
        function slide_left() {
            var y = parseInt(curmonth.substr(0, 4));
            var m = parseInt(curmonth.substr(4, 2));
            if (m == 12) {
                y += 1;
                m = 1;
            } else {
                m += 1;
            }
            select_month(parse_month(y, m));        
        }
        
        function connect(data) {
            // Bind from data
            data.income_updated(income.update);
            data.expense_updated(expenses.update);
            data.balance_updated(balance.update);
            
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


