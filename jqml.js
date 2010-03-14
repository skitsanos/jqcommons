/**
 * jqml - jQuery Markup Language
 * @author Skitsanos (http://skitsanos.com, twitter: http://twitter.com/skitsanos)
 * @version 1.0
 */
var jqml = {
	version: '1.0',
	events: {
		CHANGE_LANGUAGE: 'JQMLChangeLanguageEvent',
		dispatch: function(event, data) {
			var oEvent = document.createEvent('Events');
			oEvent.initEvent(event, true, true);
			document.dispatchEvent(oEvent);
		}
	}
};

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
	var _ret = '<table cellspacing="0" xtype="jqml-roundedbox"' + iif(this.getAttribute('style') != null, ' style="' + this.getAttribute('style') + '"', '') + '>' + '<tr>' + '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=tl);background-repeat:no-repeat;background-position:top left;">&nbsp;</td>' + '<td style="background-color:#FF00AA"></td>' + '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=tr);background-repeat:no-repeat;background-position:top right;"></td>' + '</tr>' + '<tr>' + '<td style="background-color:#FF00AA">&nbsp;</td>' + '<td style="background-color:#FF00AA;color: #ffffff;">'
	return _ret;
};
jqml.ui.roundedbox.prototype.$getTagClose = function() {
	var _ret = '</td><td style="background-color:#FF00AA">&nbsp;</td></tr>' + '<tr>' + '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=bl);background-repeat:no-repeat;background-position:bottom left;">&nbsp;</td>' + '<td style="background-color:#FF00AA">&nbsp;</td>' + '<td style="height:15px;width:15px;	background-image: url(http://groups.google.com/groups/roundedcorners?c=FF00AA&amp;w=18&amp;h=19&amp;a=br);background-repeat:no-repeat;background-position:bottom right;">&nbsp;</td>' + '</tr>' + '</table>';
	return _ret;
};
jqml.namespace.setElement('roundedbox', jqml.ui.roundedbox);

/**
 * Label
 */
jqml.ui.label = function() {
};
jqml.ui.label.prototype = new AMLElement;
jqml.ui.label.prototype.key = '';
jqml.ui.label.prototype.$getTagOpen = function() {
	return '<span xtype="jqml-label">' + this.getAttribute('text');
};
jqml.ui.label.prototype.$getTagClose = function() {
	return '</span>';
};

jqml.ui.label.handlers = {
	'DOMNodeInsertedIntoDocument': function(e){
		console.log('label::DOMNodeInsertedIntoDocument')
	},
	'JQMLChangeLanguageEvent': function(e) {
		console.log('got call to change language');
	}
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
	if (this.attributes.icon != undefined) {
		return '<a xtype="jqml-button" href="#" class="fg-button ui-state-default fg-button-icon-left ui-corner-all"><span class="ui-icon ' + this.getAttribute('icon') + '"></span>' + this.getAttribute('text');
	} else {
		return '<a xtype="jqml-button" href="#" class="fg-button ui-state-default fg-button-icon-left ui-corner-all">' + this.getAttribute('text');
	}
};
jqml.ui.button.prototype.$getTagClose = function() {
	return '</a>';
};
jqml.namespace.setElement('button', jqml.ui.button);
/**
 * Window
 */
jqml.ui.window = function() {
};
jqml.ui.window.prototype = new AMLElement;
jqml.ui.window.prototype.title = '';
jqml.ui.window.prototype.$getTagOpen = function() {
	return '<div xtype="jqml-window">';
};
jqml.ui.window.prototype.$getTagClose = function() {
	return '</div>';
};
jqml.ui.window.handlers = {
	"DOMNodeInsertedIntoDocument":	function(e) {
		var id = iif(this.attributes.id != undefined, this.attributes.id, this.uniqueID);
		$('#' + id).dialog({
			autoOpen: iif(this.getAttribute('autoOpen') == undefined, this.autoOpen, this.getAttribute('autoOpen')),
			modal: iif(this.attributes.modal == null, this.modal, this.attributes.modal),
			resizable: iif(this.attributes.resizable == null, this.resizable, this.attributes.resizable),
			title: iif(this.attributes.title == null, this.title, this.attributes.title)
		});
	}
};
jqml.namespace.setElement('window', jqml.ui.window);
/**
 * Tab Panel
 */
jqml.ui.tabs = function() {
};
jqml.ui.tabs.prototype = new AMLElement;
jqml.ui.tabs.prototype.selectedIndex = -1;
jqml.ui.tabs.prototype.selectedTab = null;
jqml.ui.tabs.prototype.selectedPanel = null;
jqml.ui.tabs.prototype.$getTagOpen = function() {
	return '<div xtype="jqml-tabs">';
};
jqml.ui.tabs.prototype.$getTagClose = function() {
	return '</div>';
};
jqml.namespace.setElement('tabs', jqml.ui.tabs);
/**
 * Tab
 */
jqml.ui.tab = function() {
};
jqml.ui.tab.prototype = new AMLElement;
jqml.ui.tab.prototype.title = '';
jqml.ui.tab.handlers = {
	"DOMNodeInsertedIntoDocument":	function(e) {
		var id = iif(this.attributes.id != undefined, this.attributes.id, this.uniqueID);
		var idParent = iif(this.parentNode.attributes.id != undefined, this.parentNode.attributes.id, this.parentNode.uniqueID);

		if (document.getElementById(idParent).firstChild.localName == 'div' && document.getElementById(idParent).firstChild.getAttribute('xtype') == 'jqml-tab') {
			var ul = document.createElement('ul');
			var li = document.createElement('li');
			li.innerHTML = '<a href="#' + id + '">' + this.attributes.title + '</a>';
			ul.appendChild(li);
			document.getElementById(idParent).insertBefore(ul, document.getElementById(idParent).firstChild)
		} else {
			var li = document.createElement('li');
			li.innerHTML = '<a href="#' + id + '">' + this.attributes.title + '</a>';
			document.getElementById(idParent).firstChild.appendChild(li);
		}

		if (this.parentNode.lastChild == this) {
			$('#' + idParent).tabs();
		}
	}
};
jqml.ui.tab.prototype.$getTagOpen = function() {
	return '<div xtype="jqml-tab" class="tabpane">';
};
jqml.ui.tab.prototype.$getTagClose = function() {
	return '</div>';
};
jqml.namespace.setElement('tab', jqml.ui.tab);

/**
 * Context Menu
 */
jqml.ui.contextmenu = function() {
};
jqml.ui.contextmenu.prototype = new AMLElement;
jqml.ui.contextmenu.prototype.value = '';
jqml.ui.contextmenu.prototype.select = function(action, el, pos) {
};
jqml.ui.contextmenu.prototype.$getTagOpen = function() {
	return '<ul xtype="jqml-contextmenu">';
};
jqml.ui.contextmenu.prototype.$getTagClose = function() {
	return '</ul>';
};
jqml.namespace.setElement('contextmenu', jqml.ui.contextmenu);
jqml.ui.menuitem = function() {
};
jqml.ui.menuitem.prototype = new AMLElement;
jqml.ui.menuitem.prototype.action = '';
jqml.ui.menuitem.prototype.$getTagOpen = function() {
	return '<li><a class="" href="#' + this.attributes.action + '">';
};
jqml.ui.menuitem.prototype.$getTagClose = function() {
	return '</a></li>';
};
jqml.ui.menuitem.handlers = {
	"DOMNodeInsertedIntoDocument":	function(e) {
		var id = iif(this.attributes.id != undefined, this.attributes.id, this.uniqueID);
		var idParent = iif(this.parentNode.parentNode.attributes.id != undefined, this.parentNode.parentNode.attributes.id, this.parentNode.parentNode.uniqueID);
		if (this.parentNode.lastChild == this) {
			//function(action, el, pos)
			$('#' + idParent).contextMenu({ menu: id });
		}
	}
};
jqml.namespace.setElement('menuitem', jqml.ui.menuitem);
/**
 * Accordion
 */
jqml.ui.accordion = function() {
};
jqml.ui.accordion.prototype = new AMLElement;
jqml.ui.accordion.prototype.$getTagOpen = function() {
	return '<ul xtype="jqml-accordion">';
};
jqml.ui.accordion.prototype.$getTagClose = function() {
	return '</ul>';
};
jqml.namespace.setElement('accordion', jqml.ui.accordion);

jqml.ui.accordionitem = function() {
};
jqml.ui.accordionitem.prototype = new AMLElement;
jqml.ui.accordionitem.prototype.title = '';
jqml.ui.accordionitem.prototype.$getTagOpen = function() {
	return '<li><a href="#">' + this.attributes.title + '</a><div>';
};
jqml.ui.accordionitem.prototype.$getTagClose = function() {
	return '</div></li>';
};
jqml.ui.accordionitem.handlers = {
	"DOMNodeInsertedIntoDocument":	function(e) {
		var id = iif(this.attributes.id != undefined, this.attributes.id, this.uniqueID);
		var idParent = iif(this.parentNode.parentNode.attributes.id != undefined, this.parentNode.parentNode.attributes.id, this.parentNode.parentNode.uniqueID);
		if (this.parentNode.lastChild == this) {
			$('#' + idParent).accordion();
		}
	}
};
jqml.namespace.setElement('accordionitem', jqml.ui.accordionitem);

function iif(i, j, k) {
	if (i) {
		return j;
	} else {
		return k;
	}
}