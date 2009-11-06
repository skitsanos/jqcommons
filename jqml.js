var jqml = {};
jqml.version = '1.0';

jqml.namespace = new AMLNamespace;
ample.domConfig.setNamespace("http://www.skitsanos.com/ns/jqml", jqml.namespace);

jqml.ui = {};
/**
 * Box
 */
jqml.ui.box = function() {
};
jqml.ui.box.prototype = new AMLElement;
jqml.ui.box.prototype.style = null;
jqml.ui.box.prototype['class'] = null;
jqml.ui.box.prototype.$getTagOpen = function() {
    return '<div xtype="jqml-box"' + iif(this.getAttribute('style') != null, ' style="' + this.getAttribute('style') + '"', '') + ' class="ui-widget ui-widget-content ui-corner-all ' + iif(this.getAttribute('class') != null, this.getAttribute('class'), '') + '">';
};
jqml.ui.box.prototype.$getTagClose = function() {
    return '</div>';
};
jqml.namespace.setElement('box', jqml.ui.box);
/**
 * RoundedBox
 */
jqml.ui.roundedbox = function() {
};
jqml.ui.roundedbox.prototype = new AMLElement;
jqml.ui.roundedbox.prototype.style = 'width:200; border:none; border-collapse: collapse;';
jqml.ui.roundedbox.prototype['class'] = null;
jqml.ui.roundedbox.prototype.$getTagOpen = function() {
    var _ret = '<table cellspacing="0" xtype="jqml-roundedbox"' + iif(this.getAttribute('style') != null, ' style="' + this.getAttribute('style') + '"', '') + '>' +
               '<tr>' +
               '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=tl);background-repeat:no-repeat;background-position:top left;">&nbsp;</td>' +
               '<td style="background-color:#FF00AA"></td>' +
               '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=tr);background-repeat:no-repeat;background-position:top right;"></td>' +
               '</tr>' +
               '<tr>' +
               '<td style="background-color:#FF00AA">&nbsp;</td>' +
               '<td style="background-color:#FF00AA;color: #ffffff;">'
    return _ret;
};
jqml.ui.roundedbox.prototype.$getTagClose = function() {
    var _ret = '</td><td style="background-color:#FF00AA">&nbsp;</td></tr>' +
               '<tr>' +
               '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=bl);background-repeat:no-repeat;background-position:bottom left;">&nbsp;</td>' +
               '<td style="background-color:#FF00AA">&nbsp;</td>' +
               '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=br);background-repeat:no-repeat;background-position:bottom right;">&nbsp;</td>' +
               '</tr>' +
               '</table>';
    return _ret;
};
jqml.namespace.setElement('roundedbox', jqml.ui.roundedbox);

/**
 * Label
 */
jqml.ui.label = function() {
};
jqml.ui.label.prototype = new AMLElement;
jqml.ui.label.prototype.value = '';
jqml.ui.label.prototype.$getTagOpen = function() {
    return '<span xtype="jqml-label">' + this.getAttribute('text');
};
jqml.ui.label.prototype.$getTagClose = function() {
    return '</span>';
};
jqml.namespace.setElement('label', jqml.ui.label);
/**
 * Button
 */
//http://www.filamentgroup.com/lab/styling_buttons_and_toolbars_with_the_jquery_ui_css_framework/
jqml.ui.button = function() {
};
jqml.ui.button.prototype = new AMLElement;
jqml.ui.button.prototype.icon = 'ui-icon-circle-plus';
jqml.ui.button.prototype.$getTagOpen = function() {
    if (this.icon != '')
    {
        return '<a xtype="jqml-button" href="#" class="fg-button ui-state-default fg-button-icon-left ui-corner-all"><span class="ui-icon ' + this.icon + '"></span>' + this.getAttribute('text');
    }
    else
    {
        return '<a xtype="jqml-button" href="#" class="fg-button ui-state-default fg-button-icon-left ui-corner-all">' + this.getAttribute('text');
    }
};
jqml.ui.button.prototype.$getTagClose = function() {
    return '</a>';
};
jqml.ui.button.handlers = {
    "DOMNodeInsertedIntoDocument":    function(oEvent) {
        //console.log('inserted');
    },
    "DOMNodeRemovedFromDocument":    function(oEvent) {
        //console.log('removed');
    }
};
jqml.namespace.setElement('button', jqml.ui.button);
/**
 * Tab Panel
 */
jqml.ui.tabPanel = function() {
};
jqml.ui.tabPanel.prototype = new AMLElement;
jqml.ui.tabPanel.prototype.selectedIndex = -1;
jqml.ui.tabPanel.prototype.selectedTab = null;
jqml.ui.tabPanel.prototype.selectedPanel = null;
jqml.ui.tabPanel.prototype.$getTagOpen = function() {
    return '<div xtype="jqml-tabpanel">';
};
jqml.ui.tabPanel.prototype.$getTagClose = function() {
    return '</div>';
};
jqml.namespace.setElement('tabpanel', jqml.ui.tabPanel);


function iif(i, j, k) {
    if (i) {
        return j;
    } else {
        return k;
    }
}
