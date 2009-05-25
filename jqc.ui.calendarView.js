/*
Calendar view
*/
jQuery.fn.calendarView = function(options) {
    var self = this;

    var defaults = {
        daysLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthsLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        busyDays: []
    };

    var options = $.extend(defaults, options);

    $.fn.extend({
        update: function(dates) {
            options.busyDays = dates;
            render();
        }

    });

    function daysInMonth(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    }

    function render() {
        var firstDay = new Date(options.year, options.month, 1);
        var startingDay = firstDay.getDay();

        var monthLength = daysInMonth(options.year, options.month);

        var monthName = options.monthsLabels[options.month];

        var $table = $('<table class="calendarview" month="' + options.month + '" monthName="' + monthName + '"><thead><tr><th colspan="7" class="calendarview-title">' + monthName + "&nbsp;" + options.year + '</th></tr></thead></table>');

        var $weekDays = $('<tr class="calendarview-header"></tr>');
        for (var i = 0; i <= 6; i++) {
            var $td = $('<td class="calendarview-header-day"></td>');
            $td.html(options.daysLabels[i]);
            $weekDays.append($td);
        }
        $table.append($weekDays);

        var day = 1;
        for (var row = 0; row <= (Math.floor(monthLength / 7) + 1); row++) {
            var $tr = $('<tr></tr>');

            for (var col = 0; col <= 6; col++) {
                var $td = $('<td></td>');
                var weekDayNumber = new Date(options.year, options.month, day).getDay();

                if (day <= monthLength && (row > 0 || col >= startingDay)) {
                    $td.html(day);

                    $td.addClass('calendarview-day');
                    $td.attr({
                        date: new Date(options.year, options.month, day).format('mm/dd/yyyy')
                    });

                    if (options.busyDays.exists(new Date(options.year, options.month, day).format('mm/dd/yyyy'))) {
                        $td.addClass('calendarview-busy');
                    }
                    day++;
                }

                $tr.append($td);
            }
            $table.append($tr);
        }

        $(self).html('');
        $(self).append($table);
    }

    render();
};