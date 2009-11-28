/**
 * jqCommons
 * @author Skitsanos
 * @version 1.0.11252009
 */
(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                              typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                              (function(name, fn) {
                                  return function() {
                                      var tmp = this._super;

                                      // Add a new ._super() method that is the same method
                                      // but on the super-class
                                      this._super = _super[name];

                                      // The method only need to be bound temporarily, so we
                                      // remove it when we're done executing
                                      var ret = fn.apply(this, arguments);
                                      this._super = tmp;

                                      return ret;
                                  };
                              })(name, prop[name]) :
                              prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

var jqCommons;
if (!jqCommons) {
    jqCommons = {};
}


function iif(i, j, k) {
    if (i) {
        return j;
    } else {
        return k;
    }
}
function addslashes(str) {
    return (str + '').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
}
var GUID = {};
GUID.newGuid = function()
{
    function S4()
    {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

};

Function.prototype.inherits = function(parentClassOrObject) {
    if (parentClassOrObject.constructor == Function)
    {
        //Normal Inheritance
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else
    {
        //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

String.prototype.times = function(n) {
    var s = this, total = "";
    while (n > 0) {
        if (n % 2 == 1) total += s;
        if (n == 1) break;
        s += s;
        n = n >> 1;
    }
    return total;
};
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
    for (var i = 0; i < times; i++) {
        ret += this;
    }
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

var StringBuilder = function()
{

    var buffer = [];
    var length = 0;

    this.getLength = function()
    {
        return length;
    };

    this.clear = function()
    {
        buffer = [];
        length = 0;
    };

    this.append = function(s)
    {
        if (s == null) return;

        length += s.length;
        buffer.push(s);
    };

    this.appendLine = function(s)
    {
        if (s == null) return;

        var _s = s + "\r\n";

        length += _s.length;
        buffer.push(_s);
    };

    this.toString = function()
    {
        return buffer.join("");
    };

};


/****************************************************** String methods added by Ashit ***********************************/
/*
 Replaces first letter of the word with Uppercase and rest all with Lowercase.
 usage: "heLLo woRLD".capitalize();
 */

String.prototype.capitalize = function() {
    return this.replace(/\w+/g, function(a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};


/*
 Replaces multiple white spaces and tabs with single white space.
 usage: "Hello		World.	".squeeze();
 */

String.prototype.squeeze = function() {
    return this.replace(/(\t|\s+)/gm, " ");
};


/************************************************************************************************************************/

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
Array.prototype.sortNum = function() {
    return this.sort(function(a, b) {
        return a - b;
    });
};

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

Array.prototype.remove = function(from, to) {
    this.splice(from,
            !to ||
            1 + to - from + (!(to < 0 ^ from >= 0) && (to < 0 || -1) * this.length));
    return this.length;
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
        if (this[i] == str) {
            index = i;
        }
    }
    return index;
};

Array.prototype.append = function(arr) {
    var a = arr;
    if (!(arr instanceof Array)) {
        a = [arr];
    }
    for (var i = 0; i < a.length; i++) {
        this.push(a[i]);
    }
};

if (Array.prototype.pop == null) {
    Array.prototype.pop = function() {
        var UNDEFINED;
        if (this.length === 0) {
            return UNDEFINED;
        }
        return this[--this.length];
    };
}

if (Array.prototype.push == null) {
    Array.prototype.push = function() {
        for (var i = 0; i < arguments.length; ++i) {
            this[this.length] = arguments[i];
        }
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
}();

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

Date.prototype.add = function(/**String*/unit, /**Number*/value) {

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

/**
 * Checks if the current time is on daylight saving time or not
 * @return  true when the current time is daylight saving time and false when it is standard time
 */
Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

Date.prototype.addGmtOffset = function(offset, ds) {
    var d = this;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    if (typeof (offset) == 'string') {
        //00:00
        var shift = 0;
        if (ds != undefined && ds == true)
            shift = 1;
        var _h = 3600000 * (Number(offset.split(':')[0]) + shift);
        var _m = 60000 * offset.split(':')[1];

        return new Date(utc + _h + _m);
    }
    else {
        var shift = 0;
        if (ds != undefined && ds == true)
            shift = 1;
        return new Date(utc + (3600000 * (offset + shift)));
    }
};

Date.prototype.addGmtOffsetByMinutes = function(offset, ds) {
    if (ds != undefined && ds == true)
        offset += 60;
    var d = this;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (60000 * offset));
};


Date.prototype.subtract = function(/**String*/unit, /**Number*/value) {

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

Date.prototype.truncate = function(/**String*/to) {

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


if (jQuery.browser.mozilla || jQuery.browser.opera) {
    document.removeEventListener("DOMContentLoaded", jQuery.ready, false);
    document.addEventListener("DOMContentLoaded", function() {
        jQuery.ready();
    }, false);
}
jQuery.event.remove(window, "load", jQuery.ready);
jQuery.event.add(window, "load", function() {
    jQuery.ready();
});

jQuery.extend({
    includeStates: {},
    include: function(url, callback, dependency) {
        if (typeof callback != 'function' && !dependency) {
            dependency = callback;
            callback = null;
        }
        jQuery.includeStates[url] = false;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = function() {
            jQuery.includeStates[url] = true;
            if (callback)
                callback.call(script);
        };
        script.onreadystatechange = function() {
            if (this.readyState != "complete" && this.readyState != "loaded") return;
            jQuery.includeStates[url] = true;
            if (callback)
                callback.call(script);
        };
        script.src = url;
        if (dependency) {
            if (dependency.constructor != Array)
                dependency = [dependency];
            setTimeout(function() {
                var valid = true;
                $.each(dependency, function(k, v) {
                    if (!v()) {
                        valid = false;
                        return false;
                    }
                })
                if (valid)
                    document.getElementsByTagName('head')[0].appendChild(script);
                else
                    setTimeout(arguments.callee, 10);
            }, 10);
        }
        else
            document.getElementsByTagName('head')[0].appendChild(script);
        return function() {
            return jQuery.includeStates[url];
        }
    },
    readyOld: jQuery.ready,
    ready: function() {
        if (jQuery.isReady) return;
        imReady = true;
        $.each(jQuery.includeStates, function(url, state) {
            if (!state)
                return imReady = false;
        });
        if (imReady) {
            jQuery.readyOld.apply(jQuery, arguments);
        } else {
            setTimeout(arguments.callee, 10);
        }
    }
});

$.redirect = function(url) {
    document.location.href = url;
};
/**
 * Get query string parameter by key
 * @param name <string> query string key
 */
$.urlParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(document.location.href);
    if (results == null) {
        return undefined;
    }
    else {
        return results[1] || 0;
    }
};
$.clickableUrls = function() {
    var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    this.each(function() {
        $(this).html($(this).html().replace(regexp, '<a href="$1">$1</a>'));
    });
    return $(this);
};

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

$.fn.autoClear = function() {
    return this.each(function() {
        $(this).focus(function() {
            if (this.value == this.defaultValue) {
                this.value = "";
            }
        })
                .blur(function() {
            if (!this.value.length) {
                this.value = this.defaultValue;
            }
        });
    });
};

$.fn.dropDown = function(options) {

    // build main options before element iteration
    var opts = $.extend({}, $.fn.dropDown.defaults, options);

    // iterate each matched element
    return this.each(function() {
        menu = $(this);

        // Show the submenus on click
        menu.children('li:has(ul)').hover(
                function() {
                    $(this)
                            .addClass(opts.active_class)
                            .children('ul').animate(opts.show, opts.show_speed);
                },
                function() {
                    $(this)
                            .removeClass(opts.active_class)
                            .children('ul').animate(opts.hide, opts.hide_speed);
                }
                ).children('ul').hide();
    });
};

// Default options
$.fn.dropDown.defaults = {
    show: {opacity: 'show'},     // Effect to use when showing the sub-menu
    show_speed: 300,            // Speed of the show transition
    hide: {opacity: 'hide'},     // Effect to use when hiding the sub-menu
    hide_speed: 200,            // Speed of the hide transition
    active_class: 'open'        // Class to give open menu items
};

$.fn.vjustify = function() {
    var maxHeight = 0;
    $(".resize").css("height", "auto");
    this.each(function() {
        if (this.offsetHeight > maxHeight) {
            maxHeight = this.offsetHeight;
        }
    });
    this.each(function() {
        $(this).height(maxHeight);
        if (this.offsetHeight > maxHeight) {
            $(this).height((maxHeight - (this.offsetHeight - maxHeight)));
        }
    });
};

$.fn.hoverClass = function(classname) {
    return this.hover(function() {
        $(this).addClass(classname);
    }, function() {
        $(this).removeClass(classname);
    });
};

$.alert = function(title, msg) {
    var c = $('<div></div>');
    $(document).append(c);
    c.html(msg);
    c.dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        buttons: { 'Close': function() {
            $(this).dialog('close');
            c.remove();
        } },
        title: title
    });

    c.dialog('open');
};

//:got
$.extend($.expr[':'], {
    got: function(el, i, m) {
        return ($(el).html() == m[3]);
    }
});

function delegate(type, delegate, handler)
{
    return $(document).bind(type, function(event) {
        var target = $(event.target);
        if (target.is(delegate))
            return handler.apply(target, arguments);
    });
}