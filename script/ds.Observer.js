(function () {

    "use strict";

    ds.Observer = function () {

        this._events = {};

        this.emit = function (event) {
            if (this._events[event] === undefined) {
                return;
            }
            var i;
            for (i = 0; i < this._events[event].length; i++) {
                (this._events[event][i].callback).apply(this, Array.prototype.slice.call(arguments, 1));
            }
        };

        this.on = function (event, callback) {
            var i;

            if (typeof event === "string") {
                this.on([event], callback);
            }
            for (i = 0; i < event.length; i++) {
                if (this._events[event[i]] === undefined) {
                    this._events[event[i]] = [];
                }
                this._events[event[i]].push({
                    callback: callback
                });
            }
        };
    };

}());