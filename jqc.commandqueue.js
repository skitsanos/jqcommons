/*
@author Skitsanos.com
*/

var skitsanos = {};
skitsanos.utils = {};

skitsanos.utils.commands = {};
skitsanos.utils.commands.version = '1.0.06112009';

skitsanos.utils.commands.Events = {};

skitsanos.utils.commands.Events.COMPLETE = 'commandqueue.events.complete';
skitsanos.utils.commands.Events.ERROR = 'commandqueue.events.error';
skitsanos.utils.commands.Events.PROGRESS = 'commandqueue.events.progress';

skitsanos.utils.commands.ICommand = {};

Object.extend(skitsanos.utils.commands.ICommand, {
    execute: function() { /*not implemented */ },
    toString: function() { return 'skitsanos.utils.commands.ICommand'; }
});

skitsanos.utils.commands.AbstractCommand = {};
Object.extend(skitsanos.utils.commands.AbstractCommand, skitsanos.utils.commands.ICommand);

Object.extend(skitsanos.utils.commands.AbstractCommand, {
    _currentDomElement: $('<div style="display: none;"></div>'),

    toString: function() { return 'skitsanos.utils.commands.AbstractCommand'; },

    onCommandComplete: function(e) {
        //console.log('skitsanos.utils.commands.AbstractCommand.onCommandComplete()');
        $(this._currentDomElement).trigger({
            type: skitsanos.utils.commands.Events.COMPLETE,
            command: this,
            eventType: skitsanos.utils.commands.Events.COMPLETE
        });
    },
    onCommandFail: function() {
        $(this._currentDomElement).trigger({
            type: skitsanos.utils.commands.Events.ERROR,
            command: this,
            eventType: skitsanos.utils.commands.Events.ERROR
        });
    }
});

skitsanos.utils.commands.CommandQueue = {};
Object.extend(skitsanos.utils.commands.CommandQueue, skitsanos.utils.commands.AbstractCommand);

Object.extend(skitsanos.utils.commands.CommandQueue, {
    _self: this,
    _commandList: new Hashtable(),
    _currentCommandIndex: 0,
    _currentCommand: {},

    toString: function() { return 'skitsanos.utils.commands.CommandQueue'; },

    count: function() { return this._commandList.length; },

    onCurrentCommandExecuted: function(e) {
        //$(this._currentCommand._currentDomElement).unbind(skitsanos.utils.commands.Events.COMPLETE);
        //$(this._currentCommand._currentDomElement).unbind(skitsanos.utils.commands.Events.ERROR);
        this._currentCommand._currentDomElement.remove();
        this.removeCommand([this._currentCommand]);

        switch (e.eventType) {
            case skitsanos.utils.commands.Events.COMPLETE:
                this.execute();
                break;

            case skitsanos.utils.commands.Events.ERROR:
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
                this._commandList.remove(this._commandList.keys()[i]);
            }
        }
    },

    execute: function() {
        //console.log('---getting into execution (' + this._commandList.values().length + ')');

        if (this._commandList.values().length < 1) {
            //console.log('all done');
            //this.onCommandComplete();
            $(window).trigger({ type: skitsanos.utils.commands.Events.COMPLETE, queue: this });
        }
        else {
            var _self = this;
            this._currentCommand = this._commandList.get(this._commandList.keys()[0]);

            $(this._currentCommand._currentDomElement).bind(skitsanos.utils.commands.Events.COMPLETE, function(e) {
                _self.onCurrentCommandExecuted(e);
            });
            $(this._currentCommand._currentDomElement).bind(skitsanos.utils.commands.Events.ERROR, function(e) {
                _self.onCurrentCommandExecuted(e);
            });
            //console.log('executing command...');
            this._currentCommand.execute();

            //            console.log('queue.execute, and then trigger');
            //$(window).trigger({ type: skitsanos.utils.commands.Events.PROGRESS, command: this._currentCommand });
        }
    }
});

