String.prototype.reverse = function() {
    var s = "";
    var i = this.length;
    while (i > 0) {
        s += this.substring(i - 1, i);
        i--;
    }
    return s;
};
String.prototype.trim = function() {
    var result = this.match(/^ *(.*?) *$/);
    return (result ? result[1] : this);
};

String.prototype.ltrim = function() {
    return this.replace(/^\s+/g, "");
};

String.prototype.rtrim = function() {
    return this.replace(/\s+$/g, "");
};

String.prototype.repeat = function(times) {
    var ret = '';
    for (var i = 0; i < times; i++) { ret += this; }
    return ret;
};

String.prototype.startsWith = function(str) {
    return (this.indexOf(str) === 0);
};

String.prototype.endsWith = function(str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
};
String.prototype.mid = function(start, len) {
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(this).length;
    if (start + len > iLen)
        iEnd = iLen;
    else
        iEnd = start + len;
    return String(this).substring(start, iEnd);
};

String.prototype.htmlEntities = function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

String.prototype.stripTags = function() {
    return this.replace(/<([^>]+)>/g, '');
};

Number.max = function(a, b) {
    return a < b ? b : a;
};

Number.min = function(a, b) {
    return a > b ? b : a;
};

Math.mod = function(val, mod) {
    if (val < 0) {
        while (val < 0) val += mod;
        return val;
    } else {
        return val % mod;
    }
};

/** Extended Arrays */
Array.prototype.sortNum = function() { return this.sort(function(a, b) { return a - b; }); };

Array.prototype.sortDate = function(p, d) {
    var dateRE = /^(\d{2})[\/\- ](\d{2})[\/\- ](\d{4})/;
    function sortByMonthAsc(a, b) {
        a = a.replace(dateRE, "$3$2$1");
        b = b.replace(dateRE, "$3$2$1");
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }
    function sortByMonthDesc(a, b) {
        a = a.replace(dateRE, "$3$2$1");
        b = b.replace(dateRE, "$3$2$1");
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    }
    function sortByDayAsc(a, b) {
        a = a.replace(dateRE, "$3$1$2");
        b = b.replace(dateRE, "$3$1$2");
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }
    function sortByDayDesc(a, b) {
        a = a.replace(dateRE, "$3$1$2");
        b = b.replace(dateRE, "$3$1$2");
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    }

    switch (d) {
        case 'asc':
            if (p == 'd') {
                return this.sort(sortByDayAsc);
            }
            else {
                return this.sort(sortByMonthAsc);
            }
            break;

        case 'desc':
            if (p == 'd') {
                return this.sort(sortByDayDesc);
            }
            else {
                return this.sort(sortByMonthDesc);
            }
            break;
    }
};

Array.prototype.exists = function(x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == x) return true;
    }
    return false;
};

Array.prototype.compareArrays = function(arr) {
    if (this.length != arr.length) return false;
    for (var i = 0; i < arr.length; i++) {
        if (this[i].compareArrays) { //likely nested array
            if (!this[i].compareArrays(arr[i])) return false;
            else continue;
        }
        if (this[i] != arr[i]) return false;
    }
    return true;
};

Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
};

Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
        throw new TypeError();

    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this) {
            var val = this[i]; // in case fun mutates this
            if (fun.call(thisp, val, i, this))
                res.push(val);
        }
    }

    return res;
};

Array.prototype.find = function(str) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == str) { index = i; }
    }
    return index;
};

Array.prototype.append = function(arr) {
    var a = arr;
    if (!(arr instanceof Array)) { a = [arr]; }
    for (var i = 0; i < a.length; i++) { this.push(a[i]); }
};

if (Array.prototype.pop == null) {
    Array.prototype.pop = function() {
        var UNDEFINED;
        if (this.length === 0) { return UNDEFINED; }
        return this[--this.length];
    };
}

if (Array.prototype.push == null) {
    Array.prototype.push = function() {
        for (var i = 0; i < arguments.length; ++i) { this[this.length] = arguments[i]; }
        return this.length;
    };
}

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function(val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

Date.prototype.add = function( /**String*/unit, /**Number*/value) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setYear(this.getYear() + value);
            break;
        case "month":
            this.setMonth(this.getMonth() + value);
            break;
        case "week":
            this.setTime(this.getTime() + value * 604800000);
            break;
        case "day":
            this.setTime(this.getTime() + value * 86400000);
            break;
        case "hour":
            this.setTime(this.getTime() + value * 3600000);
            break;
        case "minute":
            this.setTime(this.getTime() + value * 60000);
            break;
        case "second":
            this.setTime(this.getTime() + value * 1000);
            break;
        case "nanosecond":
            // Fall Through
        default:
            this.setTime(this.getTime() + value);
            break;
    }

    return this;
};

Date.prototype.subtract = function( /**String*/unit, /**Number*/value) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setYear(this.getYear() - value);
            break;
        case "month":
            this.setMonth(this.getMonth() - value);
            break;
        case "week":
            this.setTime(this.getTime() - value * 604800000);
            break;
        case "day":
            this.setTime(this.getTime() - value * 86400000);
            break;
        case "hour":
            this.setTime(this.getTime() - value * 3600000);
            break;
        case "minute":
            this.setTime(this.getTime() - value * 60000);
            break;
        case "second":
            this.setTime(this.getTime() - value * 1000);
            break;
        default:
            this.setTime(this.getTime() - value);
            break;
    }
    return this;
};

Date.prototype.truncate = function( /**String*/to) {

    unit = unit.replace(/s$/).toLowerCase();

    switch (unit) {
        case "year":
            this.setMonth(0, 1);
            this.setHours(0, 0, 0, 0);
            break;
        case "month":
            this.setDate(1);
            this.setHours(0, 0, 0, 0);
            break;
        case "week":
            this.subtract("day", this.getDay());
            break;
        case "day":
            this.setMinutes(0, 0, 0, 0);
            break;
        case "hour":
            this.setMinutes(0, 0, 0);
            break;
        case "minute":
            this.setSeconds(0, 0);
            break;
        case "second":
            this.setMilliseconds(0);
            break;
        default:
            break;
    }

    //return this;
};

Date.prototype.getMondaySunday = function() {
    return [new Date(this).subtract('day', this.getDay() - 1), new Date(this).add('day', 7 - this.getDay())];
};


(function($) {

    //include, (c) Jan Jarfalk
    var status = {};
    $.include = function(url, name, dependencies) {
        var name = name;
        var src = url;
        var object = {};
        var self, arg;

        function loadCSS(src, callback, self, name, arg) {
            if (!status[src]) {
                status[src] = 'loaded';
                var node = document.createElement('link');
                node.type = 'text/css';
                node.rel = 'stylesheet';
                node.href = src;
                node.media = 'screen';
                document.getElementsByTagName("head")[0].appendChild(node);
            }
            if (callback)
                callback(self, name, arg);
        }

        function loadJS(src, callback, self, name, arg) {
            if (!status[src]) {
                status[src] = 'loaded';
                $.getScript(src, function() {
                    if (callback)
                        callback(self, name, arg);
                });
            } else {
                callback(self, name, arg);
            }
        }

        function loadPlugin(self, name, arg) {
            $.getScript(src, function() {
                status[name] = 'loaded';
                if (typeof self == 'object') {
                    self.each(function() {
                        if (arg.length > 0)
                            $(this)[name].apply(self, arg);
                        else {
                            $(this)[name]();
                        }
                    });
                } else {
                    $[name].apply(null, arg);
                }
            });
        }

        object[name] = function() {
            self = this;
            arg = arguments;

            if (!status[name]) {

                status[src] = 'loading';

                if (dependencies) {
                    var css = dependencies.css || [];
                    var js = dependencies.js || [];

                    var d = css.concat(js);
                    var lCSS = css.length;
                    var l = d.length;

                    $.each(d, function(i) {
                        if (i + 1 < l) {
                            if (i < lCSS)
                                loadCSS(this);
                            else
                                loadJS(this);
                        } else {
                            if (i < lCSS)
                                loadCSS(this, loadPlugin, self, name, arg);
                            else
                                loadJS(this, loadPlugin, self, name, arg);
                        }
                    });
                } else {
                    loadPlugin(self, name, arg);
                }

            } else if (status[src] == 'loaded') {
                $.each(this, function() {
                    $(this)[name].apply(self, arg);
                });
            }
            else if (status[src] == 'loading') {
                setTimeout(function() { object[name].apply(self, arg); }, 5);
            }
        };
        jQuery.fn.extend(object);
        jQuery.extend(object);
    };
})(jQuery);


//jQuery Commons Framework
(function($) {

    jQuery.fn.getRandomNumber = function() {
        return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
    };

    jQuery.fn.getRandomPassword = function(length) {
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        pass = "";
        for (x = 0; x < length; x++) {
            i = Math.floor(Math.random() * 62);
            pass += chars.charAt(i);
        }

        $(this).val(pass);
    };
    //:got
    $.extend($.expr[':'], {
        got: function(el, i, m) {
            return ($(el).html() == m[3]);
        }
    });
})(jQuery);