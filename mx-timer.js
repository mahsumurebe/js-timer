/**
 * MXTimer - Timer Plugin for JavaScript
 *
 * The purpose of the plugin is to collect, manage and group
 * the timers used in a single class. The plugin is free to use.
 * Distribution and development is only open if it is to be
 * distributed free of charge.
 *
 * For donation: http://www.fb.com/mahsumurebe :)
 *
 * @author Mahsum UREBE | https://github.com/mahsumurebe/
 * @since 2017
 */
'use strict'
/**
 * Argument error catcher.
 * @param {string} message
 * @constructor
 */
function TimerInvalidAddArgs(message) {
    this.message = message + ' For details: http://www.github.com/mahsumurebe/js-timer/#errors';
    this.name = 'TimerInvalidAddArgument';
}
/**
 * The error trapping function called because the correct function was not
 * @param {string} message
 * @constructor
 */
function TimerIsNotFunction(message) {
    this.message = message + ' For details: http://www.github.com/mahsumurebe/js-timer/#errors';
    this.name = 'TimerIsNotFunction';
}
/**
 * MXTimer class
 *
 * @type {{add, stop, getByGroupName, info, remove}}
 */
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
    // If {}.merge not defined, define object merge
    if (is_undefined(Object.prototype.merge)) {
        /**
         * Define object merge.
         *
         * @returns {{}}
         */
        Object.prototype.merge = function () {
            'use strict';
            var dst = {};
            var args = [].splice.call(arguments, 0);
            var item;
            while (args.length > 0) {
                item = args.splice(0, 1)[0];
                if (is_object(item)) {
                    for (var q in item) {
                        if (item.hasOwnProperty(q)) {
                            if (is_object(item[q]))
                                dst[q] = {}.merge(dst[q] || {}, item[q]);
                            else
                                dst[q] = item[q];
                        }
                    }
                }
            }
            return dst;
        }
    }
    /**
     * Add timer
     *
     * @param {object} opts Options of timer.
     * @returns {{count: number, handle: null, run_times: Array, getCount: getCount, isStarted: isStarted, _trigger: _trigger, trigger: trigger, on: on, start: start, reset: reset, stop: stop, _initializer: _initializer}}
     */
    var add = function (opts) {
        if (!is_object(opts))
            throw new TimerInvalidAddArgs('Invalid argument was sent for adding timer.');
        /**
         * Options object.
         *
         * @type {Object} options
         */
        var options = {}.merge({
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
        /**
         * Timer object.
         *
         * @type {Object}
         */
        var timer = {
            count: 0,
            handle: null,
            run_times: [],
            status: 0,
            /**
             * Function that returns the number of times the timer has been run.
             * @returns {number}
             */
            getCount: function () {
                return this.count;
            },
            /**
             * Is timer started ?
             *
             * @returns {boolean}
             */
            isStarted: function () {
                return this.status === 1;
            },
            /**
             * Trigger event on timer.
             * @param {string} method Event name
             * @param {Array} params
             * @private
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
            /**
             * Trigger event on timer.
             * @param {string} method Event Name
             * @param {Array} params Send params to event
             * @returns {timer}
             */
            trigger: function (method, params) {
                return this._trigger('on' + method, params);
            },
            /**
             * Set event
             * @param {string} method Event Name
             * @param {function} func Event Function
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
                if (!this.handle)
                    this.handle = setInterval(function ($this) {
                        $this.run_times.push(new Date());
                        $this._trigger('onstart', [this]);
                        $this.status = 1; // set status to started
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
             * @returns {timer}
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
                if (clear) {
                    this.count = 0;
                    this.run_times = [];
                }
                if (this.handle !== null) {
                    clearInterval(this.handle);
                    this.status = 0; // set status stopped.
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
                this._trigger('initializer', []);
            }
        };
        timer = {}.merge(timer, options);
        timers[options.group_name].push(timer);
        timer._initializer();
        return timer;
    };
    /**
     * Get timers by group name;
     * @param {string} group_name
     * @returns {Array}
     */
    var getByGroupName = function (group_name) {
        if (timers.hasOwnProperty(group_name))
            return timers[group_name];
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
                for (var j in items[i]) {
                    if (items[i].hasOwnProperty(j)) {
                        var timer = items[i][j];
                        timer.stop(clear);
                    }
                }
            }
        }
        return this;
    };
    /**
     * Remove timer group
     * @param {string}  group_name Group name
     *
     * @returns {remove}
     */
    var remove = function (group_name) {
        stop(true, group_name);
        for (var i in timers) {
            if (timers.hasOwnProperty(i))
                if (i === group_name || is_undefined(group_name))
                    delete timers[i];
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
        info: info,
        remove: remove
    };
}();
/**
 *
 * Timer class
 * @param {object} opts Options
 * @returns {{count: number, handle: null, run_times: Array, getCount: getCount, isStarted: isStarted, _trigger: _trigger, trigger: trigger, on: on, start: start, reset: reset, stop: stop, _initializer: _initializer}|{onafterStart: onafterstart, onstart: onstart, onafterStop: onafterstop, onstop: onstop, callback: callback, getCount: getCount, trigger: _trigger, count: number, handle: null, start: start, reset: reset, stop: stop, _initializer: _initializer}}
 * @constructor
 */
var Timer = function (opts) {
    return MXTimer.add(opts);
};
