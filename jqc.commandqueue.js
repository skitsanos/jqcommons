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

skitsanos.utils.commands.ICommand = function() { };
skitsanos.utils.commands.ICommand.prototype.execute = function() { };
skitsanos.utils.commands.ICommand.prototype.toString = function() { return 'skitsanos.utils.commands.ICommand'; };

skitsanos.utils.commands.AbstractCommand = function() {
    this.constructor = new skitsanos.utils.commands.ICommand();
    this._eventsDispatcher = new EventDispatcher();
};
//http://joshdavis.wordpress.com/2007/04/10/custom-event-listeners/
skitsanos.utils.commands.AbstractCommand.execute = function() { /*not implemented */ };
skitsanos.utils.commands.AbstractCommand.prototype.onCommandComplete = function() { this._eventsDispatcher.trigger(null, this, skitsanos.utils.commands.Events.COMPLETE); };
skitsanos.utils.commands.AbstractCommand.prototype.onCommandFail = function(e) { this._eventsDispatcher.trigger(null, this, skitsanos.utils.commands.Events.ERROR); };
skitsanos.utils.commands.AbstractCommand.toString = function() { return 'skitsanos.utils.commands.AbstractCommand'; };

skitsanos.utils.commands.CommandQueue = function(abortOnFail) {
    this.constructor = new skitsanos.utils.commands.AbstractCommand();

    this._commandList = [];
    this._currentCommandIndex = 0;
    this._currentCommand;
    this._abortOnFail = abortOnFail;

    this.onCurrentCommandExecuted = function(e, obj, evt) {
        //        this._currentCommand.Events.removeEventListener(skitsanos.utils.commands.Events.COMPLETE, onCurrentCommandExecuted);
        //        this._currentCommand.Events.removeEventListener(skitsanos.utils.commands.Events.ERROR, onCurrentCommandExecuted);
        console.log(evt);

        this._currentCommand = null;

        switch (event.type) {
            case skitsanos.utils.commands.Events.COMPLETE:
                console.log('execute');
                this.execute();
                break;

            case skitsanos.utils.commands.Events.ERROR:
                if (this._abortOnFail) {
                    this.onCommandFail(event);
                }
                else {
                    this.execute();
                }
                break;
        }
    }
};

skitsanos.utils.commands.CommandQueue.toString = function() { return 'skitsanos.utils.commands.CommandQueue'; };

skitsanos.utils.commands.CommandQueue.prototype.addCommand = function(commands) {
    for (var i = 0; i < commands.length; i++) {
        console.log(commands[i].toString());
        this._commandList = this._commandList.concat(commands[i]);
    }
};
skitsanos.utils.commands.CommandQueue.prototype.removeCommand = function(commands) {
    for (var i = 0; i < commands.length; i++) {
        for (var j = 0; j < this._commandList.length; j++) {
            if (this._commandList[j] === commands[i]) {
                this._commandList.splice(i, 1);
                break;
            }
        }
    }
};
skitsanos.utils.commands.CommandQueue.prototype.count = function() { return this._commandList.length; };

skitsanos.utils.commands.CommandQueue.prototype.execute = function() {
    if (this._currentCommandIndex >= this._commandList.length) {
        this.onCommandComplete();
    }
    else {
        var _self = this;
        this._currentCommand = this._commandList[this._currentCommandIndex++];

        this._currentCommand._eventsDispatcher.addListener(this._currentCommand, skitsanos.utils.commands.Events.COMPLETE, function(e, obj, evt) {
            _self.onCurrentCommandExecuted(e);
        });
        this._currentCommand._eventsDispatcher.addListener(this, skitsanos.utils.commands.Events.ERROR, function(e, obj, evt) { _self.onCurrentCommandExecuted(); });
        this._currentCommand.execute();
        this._currentCommand._eventsDispatcher.trigger({ index: this._currentCommandIndex, commandsListLength: this._commandList.length }, this, skitsanos.utils.commands.Events.PROGRESS);
    }
};

skitsanos.utils.commands.CommandQueue.prototype.onCommandComplete = function() { alert('done'); };
skitsanos.utils.commands.CommandQueue.prototype.onCommandFail = function() { };