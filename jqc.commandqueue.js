/**
 * JavaScript Command Queues
 * @author Skitsanos
 * @version 1.1
 * @credits GABRIEL MONTAGNÉ, http://rojored.com/#pure-as3-commands
 * @dependencies jquery, jshashtable
 */
var jqCommons;
if (!jqCommons) {
	jqCommons = {};
}

jqCommons.queues = {
	Events: {
		COMPLETE : 'commandqueue.events.complete',
		ERROR: 'commandqueue.events.error',
		PROGRESS: 'commandqueue.events.progress'
	}
};

jqCommons.queues.ICommand = Class.extend({
	toString:  function() {
		return 'jqCommons.queues.task';
	},
	execute: function() {
	}
});

jqCommons.queues.AbstractCommand = jqCommons.queues.ICommand.extend({
	label:'',
	_currentDomElement: $('<div style="display: none;"></div>'),

	toString: function() {
		return 'jqCommons.queues.AbstractCommand ' + this.label;
	},

	onCommandComplete: function(e) {
		//console.log('onCommandComplete: ' + this.label);

		$(this._currentDomElement).trigger({
			type: jqCommons.queues.Events.COMPLETE,
			command: this,
			eventType: jqCommons.queues.Events.COMPLETE
		});
	},
	onCommandFail: function() {
		$(this._currentDomElement).trigger({
			type: jqCommons.queues.Events.ERROR,
			command: this,
			eventType: jqCommons.queues.Events.ERROR
		});
	}

});

jqCommons.queues.CommandQueue = jqCommons.queues.AbstractCommand.extend({
	label:'',
	_commandList: new Hashtable(),
	_currentCommandIndex: 0,
	_currentCommand: {},

	toString: function() {
		return 'jqCommons.queues.CommandQueue ' + this.label;
	},

	count: function() {
		return this._commandList.size();
	},

	onCurrentCommandExecuted: function(e) {
		//console.log('command executed ' + this._currentCommand.label);

		this._currentCommand._currentDomElement.remove();
		this.removeCommand([this._currentCommand]);

		switch (e.eventType.toString()) {
			case jqCommons.queues.Events.COMPLETE:
				this.execute();
				break;

			case jqCommons.queues.Events.ERROR:
				e.command.execute();
				break;
		}
	},

	addCommand: function(commands) {
		for (var i = 0; i < commands.length; i++) {
			this._commandList.put(this._currentCommandIndex, commands[i]);
			this._currentCommandIndex++;
		}
	},

	removeCommand: function(commands) {
		for (var i = 0; i < commands.length; i++) {
			if (this._commandList.containsValue(commands[i])) {
				//console.log('removing {' + this._commandList.keys()[i] + '}' + commands[i].label + ' from the queue')
				this._commandList.remove(this._commandList.keys()[i]);
				//console.log(this._commandList.size() + ' command are still in queue');
			}
		}
	},

	execute: function() {
		//console.log('---getting into execution ' + this._commandList.size() + ' commands');

		if (this._commandList.size() < 1) {
			//console.log('all done');
			$(window).trigger({ type: jqCommons.queues.Events.COMPLETE, queue: this });
		} else {
			//console.log('[quee.execute:] '+this._commandList.size() + ' command are in queue');

			var _self = this;

			this._currentCommand = this._commandList.get(this._commandList.keys()[0]);

			$(this._currentCommand._currentDomElement).bind(jqCommons.queues.Events.COMPLETE, function(e) {
				_self.onCurrentCommandExecuted(e);
			});

			$(this._currentCommand._currentDomElement).bind(jqCommons.queues.Events.ERROR, function(e) {
				_self.onCurrentCommandExecuted(e);
			});

			//console.log('executing command...' + this._currentCommand.label);
			this._currentCommand.execute();

			$(window).trigger({ type: jqCommons.queues.Events.PROGRESS, command: this._currentCommand });
		}
	}
});