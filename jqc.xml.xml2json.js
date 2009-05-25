(function($) {
    $.xmlToJson = function(xml, marker/*optional*/) {
        var result;
        if (xml.childNodes && xml.childNodes.length === 0) {
            result = null;
        }
        else if (xml.childNodes && xml.childNodes.length == 1 && xml.childNodes[0].nodeName == "#text") {
            result = xml.childNodes[0].nodeValue;
        }
        else if (xml.childNodes && xml.childNodes.length == 1 && xml.childNodes[0].nodeName == "#cdata-section") {
            result = xml.childNodes[0].nodeValue;
        }
        else if (xml.documentElement) {
            result = {};
            result[xml.documentElement.nodeName] = $.xmlToJson(xml.documentElement);
        } else {
            result = {};
            for (var i = 0; i < xml.childNodes.length; i++) {
                if (result[xml.childNodes[i].nodeName]) {
                    if (!(result[xml.childNodes[i].nodeName] instanceof Array)) {
                        result[xml.childNodes[i].nodeName] = [result[xml.childNodes[i].nodeName]];
                    }
                    result[xml.childNodes[i].nodeName].push($.xmlToJson(xml.childNodes[i]));
                } else if (xml.childNodes[i].nodeName.indexOf('#') == -1) {
                    result[xml.childNodes[i].nodeName] = $.xmlToJson(xml.childNodes[i]);
                }
            }
        }

        if (xml.attributes) {
            if (result == undefined) {
                result = {};
            }
            for (var j = 0; j < xml.attributes.length; j++) {
                if (marker != undefined) {
                    result[marker + xml.attributes[j].nodeName] = xml.attributes[j].nodeValue;
                }
                else {
                    result[xml.attributes[j].nodeName] = xml.attributes[j].nodeValue;
                }
            }
        }
        return result;
    };
})(jQuery);