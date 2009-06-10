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
    this.constructor.Implements(skitsanos.utils.commands.ICommand);
    this._eventsDispatcher = $('<div/>');
    $(document).append(this._eventsDispatcher);
};

skitsanos.utils.commands.AbstractCommand.prototype.execute = function() { /*not implemented */ };
skitsanos.utils.commands.AbstractCommand.prototype.onCommandComplete = function() {
    console.log('skitsanos.utils.commands.AbstractCommand.prototype.onCommandComplete');
    //this._eventsDispatcher.trigger(skitsanos.utils.commands.Events.COMPLETE); 
};
skitsanos.utils.commands.AbstractCommand.prototype.onCommandFail = function(e) { this._eventsDispatcher.trigger(skitsanos.utils.commands.Events.ERROR, e); };
skitsanos.utils.commands.AbstractCommand.prototype.toString = function() { return 'skitsanos.utils.commands.AbstractCommand'; };

skitsanos.utils.commands.CommandQueue = function(abortOnFail) {
    this.constructor.Implements(skitsanos.utils.commands.AbstractCommand);

    this._commandList = [];          /*:Array*/
    this._currentCommandIndex = 0;   /*int*/
    this._currentCommand;            /*AbstractCommand*/
    this._abortOnFail = abortOnFail; /*Boolean*/

    function onCurrentCommandExecuted(event) {
        //        this._currentCommand.Events.removeEventListener(skitsanos.utils.commands.Events.COMPLETE, onCurrentCommandExecuted);
        //        this._currentCommand.Events.removeEventListener(skitsanos.utils.commands.Events.ERROR, onCurrentCommandExecuted);
        console.log('here');

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
skitsanos.utils.commands.CommandQueue.prototype.toString = function() { return 'skitsanos.utils.commands.CommandQueue'; };

skitsanos.utils.commands.CommandQueue.prototype.addCommand = function(commands) {
    for (var i = 0; i < commands.length; i++) {
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
        this._currentCommand._eventsDispatcher.bind(skitsanos.utils.commands.Events.COMPLETE, function() { _self.onCurrentCommandExecuted(); });
        this._currentCommand._eventsDispatcher.bind(skitsanos.utils.commands.Events.ERROR, function() { _self.onCurrentCommandExecuted(); });
        this._currentCommand.execute();
        $(document).trigger(skitsanos.utils.commands.Events.PROGRESS, { index: this._currentCommandIndex, commandsListLength: this._commandList.length });
    }
};

skitsanos.utils.commands.CommandQueue.prototype.onCommandComplete = function() { alert('done'); };
skitsanos.utils.commands.CommandQueue.prototype.onCommandFail = function() { };