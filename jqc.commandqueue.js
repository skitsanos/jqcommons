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

Object.extend(skitsanos.utils.commands.ICommand, EventDispatcher);

skitsanos.utils.commands.ICommand.execute = function() { };
skitsanos.utils.commands.ICommand.prototype.execute = function() { /*not implemented */console.log('...'); };
skitsanos.utils.commands.ICommand.prototype.toString = function() { return 'skitsanos.utils.commands.ICommand'; };

skitsanos.utils.commands.AbstractCommand = {};
Object.extend(skitsanos.utils.commands.AbstractCommand, skitsanos.utils.commands.ICommand);

Object.extend(skitsanos.utils.commands.AbstractCommand, {
    toString: function() { return 'skitsanos.utils.commands.AbstractCommand'; },
    onCommandComplete: function(e) {
        console.log('onCommandComplete>');
        this.triggerEvent(skitsanos.utils.commands.Events.COMPLETE, { type: skitsanos.utils.commands.Events.COMPLETE, command: this });
    },
    onCommandFail: function() {
        this.triggerEvent(skitsanos.utils.commands.Events.ERROR, { type: skitsanos.utils.commands.Events.COMPLETE, command: this });
    }
});

skitsanos.utils.commands.CommandQueue = {};
Object.extend(skitsanos.utils.commands.CommandQueue, skitsanos.utils.commands.AbstractCommand);

Object.extend(skitsanos.utils.commands.CommandQueue, {
    _self: this,
    _commandList: [],
    _currentCommandIndex: 0,
    _currentCommand: {},

    toString: function() { return 'skitsanos.utils.commands.CommandQueue'; },

    count: function() { return this._commandList.length; },

    onCurrentCommandExecuted: function(e) {
        e.command.removeEventListener(skitsanos.utils.commands.Events.COMPLETE);
        e.command.removeEventListener(skitsanos.utils.commands.Events.ERROR);

        this._currentCommand = null;

        console.log('onCurrentCommandExecuted');

        switch (e.type) {
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
            this._commandList = this._commandList.concat(commands[i]);
        }
    },

    removeCommand: function(commands) {
        for (var i = 0; i < commands.length; i++) {
            for (var j = 0; j < this._commandList.length; j++) {
                if (this._commandList[j] === commands[i]) {
                    this._commandList.splice(i, 1);
                    break;
                }
            }
        }
    },

    execute: function() {
        if (this._currentCommandIndex >= this._commandList.length) {
            console.log('onCommandComplete');
            this.onCommandComplete();
        }
        else {
            var _self = this;
            this._currentCommand = this._commandList[this._currentCommandIndex++];
            this._currentCommand.addEventListener(skitsanos.utils.commands.Events.COMPLETE, function(args) {
                _self.onCurrentCommandExecuted(args);
            });
            //            this._currentCommand.addEventListener(skitsanos.utils.commands.Events.ERROR, function(args) {
            //                _self.onCurrentCommandExecuted(args);
            //            });

            this._currentCommand.execute();

            console.log('queue.execute');
            this.triggerEvent(skitsanos.utils.commands.Events.PROGRESS, { type: skitsanos.utils.commands.Events.PROGRESS, command: this._currentCommand });
        }
    },

    onCommandComplete: function() {
        this.triggerEvent(skitsanos.utils.commands.Events.COMPLETE, { type: skitsanos.utils.commands.Events.COMPLETE, queue: this });
    },

    onCommandFail: function() {
        this.triggerEvent(skitsanos.utils.commands.Events.COMPLETE, { type: skitsanos.utils.commands.Events.ERROR, queue: this });
    }
});

