define('Event', ['underscore'], function (_) {
    var Event = function () {
        this._callbacks = {};
    };

    //----------------------------
    //----------------------------

    Event.prototype.on = function (name, callback) {
        var callbacks = this._callbacks[name];
        if (_(callbacks).isUndefined()) {
            callbacks = this._callbacks[name] = [];
        }
        callbacks.push(callback);
    };

    Event.prototype.off = function (name, callback) {
        var callbacks = this._callbacks[name];
        if (callbacks) {
            if (callback) {
                this._callbacks[name] = _(callbacks).reject(function (_callback) {
                    return _callback === callback;
                });
            } else {
                delete this._callbacks[name];
            }
        }
    };

    Event.prototype.fire = function (name) {
        var callbacks = this._callbacks[name],
            args = arguments.length > 0 ? arguments : [];
        if (!_(callbacks).isUndefined()) {
            _(callbacks).each(function (callback) {
                callback(Array.prototype.splice.call(args, 1));
            });
        }
    };

    return Event
});