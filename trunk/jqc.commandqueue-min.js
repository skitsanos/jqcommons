var jqCommons;if(!jqCommons){jqCommons={}}jqCommons.queues={Events:{COMPLETE:"commandqueue.events.complete",ERROR:"commandqueue.events.error",PROGRESS:"commandqueue.events.progress"}};jqCommons.queues.ICommand=Class.extend({toString:function(){return"jqCommons.queues.task"},execute:function(){}});jqCommons.queues.AbstractCommand=jqCommons.queues.ICommand.extend({label:"",_currentDomElement:$('<div style="display: none;"></div>'),toString:function(){return"jqCommons.queues.AbstractCommand "+this.label},onCommandComplete:function(a){$(this._currentDomElement).trigger({type:jqCommons.queues.Events.COMPLETE,command:this,eventType:jqCommons.queues.Events.COMPLETE})},onCommandFail:function(){$(this._currentDomElement).trigger({type:jqCommons.queues.Events.ERROR,command:this,eventType:jqCommons.queues.Events.ERROR})}});jqCommons.queues.CommandQueue=jqCommons.queues.AbstractCommand.extend({label:"",_commandList:new Hashtable(),_currentCommandIndex:0,_currentCommand:{},toString:function(){return"jqCommons.queues.CommandQueue "+this.label},count:function(){return this._commandList.size()},onCurrentCommandExecuted:function(a){this._currentCommand._currentDomElement.remove();this.removeCommand([this._currentCommand]);switch(a.eventType.toString()){case jqCommons.queues.Events.COMPLETE:this.execute();break;case jqCommons.queues.Events.ERROR:a.command.execute();break}},addCommand:function(a){for(var b=0;b<a.length;b++){this._commandList.put(this._currentCommandIndex,a[b]);this._currentCommandIndex++}},removeCommand:function(a){for(var b=0;b<a.length;b++){if(this._commandList.containsValue(a[b])){this._commandList.remove(this._commandList.keys()[b])}}},execute:function(){if(this._commandList.size()<1){$(window).trigger({type:jqCommons.queues.Events.COMPLETE,queue:this})}else{var a=this;this._currentCommand=this._commandList.get(this._commandList.keys()[0]);$(this._currentCommand._currentDomElement).bind(jqCommons.queues.Events.COMPLETE,function(b){a.onCurrentCommandExecuted(b)});$(this._currentCommand._currentDomElement).bind(jqCommons.queues.Events.ERROR,function(b){a.onCurrentCommandExecuted(b)});this._currentCommand.execute();$(window).trigger({type:jqCommons.queues.Events.PROGRESS,command:this._currentCommand})}}});