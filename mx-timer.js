'use strict'
function TimerInvalidAddArgs(message) {
    this.message = message + ' For details: http://www.github.com/mahsumurebe/js-timer/#errors';
    this.name = 'TimerInvalidAddArgument';
}
function TimerIsNotFunction(message) {
    this.message = message + ' For details: http://www.github.com/mahsumurebe/js-timer/#errors';
    this.name = 'TimerIsNotFunction';
}
var MXTimer = function () {
    /**
     * Timer in groups
     * @type {{}}
     */
    var timers = {};

    /**
     * Get more realistic types
     * @param {*} arg
     * @returns {*}
     */
    var get_type = function (arg) {
        var _pr = Object.prototype.toString.call(arg).replace(/\[(.*) (.*)\]/g, '$2');
        if (!!_pr) {
            return _pr.toLowerCase();
        }
        return undefined;
    };
    /**
     * Check is function
     * @param {*} arg Argument
     * @returns {boolean}
     */
    var is_function = function (arg) {
        return get_type(arg) === 'function';
    };
    String.prototype.capitalize = function () {
        return this.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };
    /**
     * Check is object
     * @param {*} arg argument
     * @returns {boolean}
     */
    var is_object = function (arg) {
        return get_type(arg) === "object";
    };
    /**
     * Check is object
     * @param {*} arg argument
     * @returns {boolean}
     */
    var is_array = function (arg) {
        return get_type(arg) === "array";
    };

    /**
     * Check is undefined
     * @param {*} arg argument
     * @returns {boolean}
     */
    var is_undefined = function (arg) {
        return get_type(arg) === "undefined";
    };
    /**
     * Add timer
     * @param {object} opts
     * @returns {{onafterStart:onafterstart,onstart:onstart,onafterStop:onafterstop,onstop:onstop,callback:callback,getCount:getCount, trigger: _trigger, count: number, handle: null, start: start, reset:reset, stop: stop, _initializer: _initializer}}
     */
    var add = function (opts) {
        if (!is_object(opts))
            throw new TimerInvalidAddArgs('Invalid argument was sent for adding timer.');
        // options
        var options = Object.assign({
            func: function () {

            },
            args: [],
            group_name: '_globals',
            interval: 0,
            autoStart: false,
            initializer: function () {
                },
                onafterstart: function () {

                },
            onstart: function () {

            },
            onafterstop: function () {

            },
            onstop: function () {

            },
            callback: function () {

            }
        }, opts);

        if (!is_function(options.func))
            throw new TimerIsNotFunction('Timer function not defined correctly.');
        if (options.interval < 1)
            throw new TimerInvalidAddArgs('Invalid Interval value. Interval to be bigger than zero.');
        if (is_undefined(options.group_name)) {
            options.group_name = '_globals';
        }
        if (!timers.hasOwnProperty(options.group_name))
            timers[options.group_name] = [];

        var timer = {
            count: 0,
            handle: null,
            run_times: [],
            getCount: function () {
                return this.count;
            },
            /**
             * Trigger event on timer.
             * @param {string} method Method name
             * @param {[]} params
             * @returns {timer}
             */
            _trigger: function (method, params) {
                if (this.hasOwnProperty(method))
                    method = this[method];
                if (is_function(method))
                    method = [method];
                if (is_array(method))
                    for (var i in method) {
                        if (method.hasOwnProperty(i)) {
                            /**
                             * @var {function} m
                             */
                            var m = method[i];
                            if (is_function(m)) {
                                m.apply(this, (is_array(params) ? params : []));
                            }
                        }
                    }
                return this;
            },
            trigger: function (method, params) {
                return this.trigger('on' + method, 'params');
            },
            /**
             * Set event
             * @param {string} method
             * @param {function} func
             * @returns {timer}
             */
            on: function (method, func) {
                method = 'on' + method;
                if (!is_undefined(this[method])) {
                    if (is_function(this[method]))
                        this[method] = [this[method]];
                    else if (!is_array(this[method]))
                        return this;
                } else {
                    this[method] = [];
                }

                this[method].push(func);

                return this;
            },
            /**
             * Start timer.
             *
             * @returns {timer}
             */
            start: function () {
                this.handle = setInterval(function ($this) {
                    $this._trigger('onstart', [this]);
                    $this.run_times.push(new Date());
                    var ret = $this.func.apply($this, $this.args);
                    $this.count++;
                    $this._trigger('callback', [$this, ret]);
                    $this._trigger('onafterstart', [$this, ret]);
                }, this.interval, this);

                return this;
            },
            /**
             * Reset timer.
             *
             * @see timer.stop(true).start();
             * @returns {*|number}
             */
            reset: function () {
                return this.stop(true).start();
            },
            /**
             * Stop timer
             * @param {boolean} clear Clear count value
             * @returns {timer}
             */
            stop: function (clear) {
                this._trigger('onstop', [this]);
                if (clear)
                    this.count = 0;
                if (this.handle !== null) {
                    clearInterval(this.handle);
                    this.handle = null;
                    this._trigger('onafterstop')
                }
                return this;
            },
            /**
             * Timer construct
             * @private
             */
            _initializer: function () {
                if (this.autoStart === true)
                    this.start();
                this._trigger('initializer');
            }
        };
        Object.assign(timer, options);
        timers[options.group_name].push(timer);
        timer._initializer();
        return timer;
    };
    /**
     * Get timers by group name;
     * @param {string} group_name
     * @returns {[]}
     */
    var getByGroupName = function (group_name) {
        if (timers.hasOwnProperty(group_name))
            return group_name;
        return [];
    };
    /**
     * Stop timer. if group_name not set stop all timers. if group_name is set stop only group timers.
     * @param {boolean} clear Clean timer.
     * @param {string} group_name Group name
     * @returns {stop}
     */
    var stop = function (clear, group_name) {
        var items = (!is_undefined(group_name) ? [getByGroupName(group_name)] : timers);
        for (var i in items) {
            if (items.hasOwnProperty(i)) {
                var timer = items[i];
                timer.stop(clear);
            }
        }
        return this;
    };

    /**
     * Get Timers info.
     * @param {string} group_name Group name
     * @returns {{timers_count: number, timers: {}, timers_infos: Array}}
     */
    var info = function (group_name) {
        var items = timers;
        if (!is_undefined(group_name))
            items = [getByGroupName(group_name)];
        var out = {
            timers_count: 0,
            timers: items,
            timers_infos: []
        };
        for (var gn in items) {
            if (items.hasOwnProperty(gn)) {
                out.timers_count += Object.keys(items[gn]).length;
                for (var i in items[gn]) {
                    if (items[gn].hasOwnProperty(i)) {
                        var item = items[gn][i];
                        out.timers_infos.push({
                            item: item,
                            count: item.count,
                            last_run: !is_array(item.run_times) || item.run_times.length === 0 ? null : item.run_times[item.run_times.length - 1]
                        });
                    }
                }
            }
        }
        return out;
    };

    return {
        add: add,
        stop: stop,
        getByGroupName: getByGroupName,
        info: info
    };
}();
/**
 * Timer class
 * @param {object} opts
 * @returns {{onafterStart: onafterstart, onstart: onstart, onafterStop: onafterstop, onstop: onstop, callback: callback, getCount: getCount, trigger: _trigger, count: number, handle: null, start: start, reset: reset, stop: stop, _initializer: _initializer}}
 * @constructor
 */
var Timer = function (opts) {
    return MXTimer.add(opts);
};
