# Command Queue in JavaScript #

The Command best practices are particularly useful in JavaScript projects because of the asynchronous nature of it's event driven workings. Most of the time we don't really have control of what will happen or in what order.

To handle this easily, we pack the different operations in discrete small objects that all share a simple interface (normally, just requiring an execute() method). And those objects can be later called by other processes that need not know anything about how they work.

You can pass these command objects around, store them in arrays, etc., without having to know their inner mechanics, only what they are for and that whenever you need them to do their thing (however it is that they do it) you just need to call their execute() method.

JavaScript Example:
```
var cmd1 = new jqCommons.queues.AbstractCommand();
cmd1.execute = function() {
       console.log('doing something at command #1');
       cmd1.onCommandComplete();
};

var cmd2 = new jqCommons.queues.AbstractCommand();
cmd2.execute = function() {
       console.log('doing something at command #2');
       cmd2.onCommandComplete();
};

var q = new jqCommons.queues.CommandQueue();
q.addCommand([cmd1, cmd2]);

$(window).bind(jqCommons.queues.Events().COMPLETE, function(e) {
       console.log('done====');
});

$(window).bind(jqCommons.queues.Events().PROGRESS, function(e) {
       console.log(e);
});

q.execute();
```
_This module been inspired by Command Queue implementation of GABRIEL MONTAGNÉ, [ttp://rojored.com/#pure-as3-commands](http://rojored.com/#pure-as3-commands)_