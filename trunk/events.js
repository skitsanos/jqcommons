var EventDispatcher = function () {
    return {
        events: new Hashtable(),

        addEventListener: function(event, callback) {
            this.events.put(event, callback);
        },

        triggerEvent: function(event, args) {
            var e = window.event;

            if (this.events.containsKey(event)) {
                var callback = this.events.get(event);
                callback(args);
            }
        },

        removeEventListener: function(event) {
            if (this.events.containsKey(event)) {
                this.events.remove(event);
            }
        }
    };
};
