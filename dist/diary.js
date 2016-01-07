/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(138);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var defer = __webpack_require__(2).defer,
	    Router = __webpack_require__(3),
	    DiaryComponent = __webpack_require__(49),
	    MysqlManager = __webpack_require__(57);

	var router = new Router();
	var diary = new DiaryComponent();
	var mysqlManager = new MysqlManager();

/***/ },
/* 2 */
/***/ function(module, exports) {

	var clone = function (first, second) {
	    if (Object.prototype.toString.call(second) !== "[object Object]" || Object.prototype.toString.call(first) !== "[object Object]") {
	        throw new Error("variables must be type of object");
	    }

	    for (var i in first) {
	        if (first.hasOwnProperty(i)) {
	            second[i] = first[i];
	        }
	    }
	};

	var intersect = function (x, y) {
	    var ret = [],
	        x_len = x.length,
	        y_len = y.length;

	    for (var i = 0; i < x_len; i++) {
	        for (var z = 0; z < y_len; z++) {
	            if (x[i] === y[z]) {
	                ret.push(x[i]);
	                break;
	            }
	        }
	    }

	    return ret;
	};

	if (typeof Function.prototype.extends !== 'function') Function.prototype.extends = function (Parent) {
	    var thisClassName = this.name,
	        parentClassName = Parent.name,
	        thisProtoKeys = Object.keys(this.prototype),
	        parentProtoKeys = Object.keys(Parent.prototype);

	    var hasInThisPrototype = function (thisProto, parentProto) {
	        var intersection = intersect(parentProto, thisProto),
	            inter_len = intersection.length,
	            result = {};

	        for (var i = 0; i < inter_len; i++) {
	            result[intersection[i]] = true;
	        }

	        return result;
	    }(thisProtoKeys, parentProtoKeys);

	    var thisProtoKeysLength = thisProtoKeys.length,
	        parentProtoKeysLength = parentProtoKeys.length,
	        funcInStr,
	        i;

	    var getFunctionBody = function (func) {
	        var result = /function[\w\s\$]*\(([\w\s,]*)[\/\*\*\/]*\)[^{]+\{([\s\S]*)\}$/g.exec(func.toString());

	        return {
	            args: result[1].trim(),
	            body: result[2]
	        };
	    };

	    this.prototype.inheritChain = Array.prototype.slice.call(Parent.prototype.inheritChain);
	    this.prototype.inheritChain.push(thisClassName);

	    this.prototype.activeSuperContext = thisClassName;
	    this.prototype.changeSuperContext = function () {
	        var inheritChainLen = this.inheritChain.length;

	        for (var i = inheritChainLen; i > -1; i--) {
	            if (this.activeSuperContext === this.inheritChain[i]) break;
	        }

	        this.activeSuperContext = this.inheritChain[i - 1];
	    };

	    for (i = 0; i < parentProtoKeysLength; i++) {
	        if (typeof Parent.prototype[parentProtoKeys[i]] === 'function') {
	            if (!hasInThisPrototype[parentProtoKeys[i]]) {
	                if (parentProtoKeys[i] === 'changeSuperContext' || parentProtoKeys[i] === 'super') {
	                    continue;
	                } else if (parentProtoKeys[i].indexOf('$') !== -1 || Parent.prototype[parentProtoKeys[i]].inherited) {
	                    funcInStr = getFunctionBody(Parent.prototype[parentProtoKeys[i]]);

	                    this.prototype[parentProtoKeys[i]] = eval.call(null, '(function ' + parentProtoKeys[i] + '(' + funcInStr.args + ') {' + funcInStr.body + '})');
	                } else {
	                    funcInStr = getFunctionBody(Parent.prototype[parentProtoKeys[i]]);

	                    this.prototype[parentClassName + '$' + parentProtoKeys[i]] = eval.call(null, '(function ' + parentClassName + '$' + parentProtoKeys[i] + '(' + funcInStr.args + ') {' + funcInStr.body + '})');
	                    this.prototype[parentProtoKeys[i]] = eval.call(null, '(function ' + parentProtoKeys[i] + '(' + funcInStr.args + ') {' + 'if(!this[this.activeSuperContext + \'$' + parentProtoKeys[i] + '\']) {' + 'var currentActiveSuperContext = this.activeSuperContext;' + 'while(!this[this.activeSuperContext + \'$' + parentProtoKeys[i] + '\'])' + 'this.changeSuperContext();' + 'var res = this[this.activeSuperContext + \'$' + parentProtoKeys[i] + '\'](' + funcInStr.args + ');' + 'this.activeSuperContext = currentActiveSuperContext;' + 'return res;' + '} else {' + 'return this[this.activeSuperContext + \'$' + parentProtoKeys[i] + '\'](' + funcInStr.args + ');' + '}' + '})');

	                    this.prototype[parentProtoKeys[i]].inherited = true;
	                }
	            }
	        } else {
	            if (!hasInThisPrototype[parentProtoKeys[i]] && parentProtoKeys[i] !== 'inheritChain') {
	                this.prototype[parentProtoKeys[i]] = Parent.prototype[parentProtoKeys[i]];
	            }
	        }
	    }

	    var parentConstructor = getFunctionBody(Parent.toString());

	    this.prototype[parentClassName + '$constructor'] = eval.call(null, '(function ' + parentClassName + '$constructor(' + parentConstructor.args + ') {' + parentConstructor.body + '})');

	    this.prototype.super = eval.call(null, '(function superFn(' + parentConstructor.args + ') {' + 'this.changeSuperContext(); ' + 'var i = this.activeSuperContext + \'$constructor\';' + 'this[i](' + parentConstructor.args + ');' + 'this.activeSuperContext = \'' + thisClassName + '\'; })');

	    if (Parent.prototype.super) {
	        var superKeys = Object.keys(Parent.prototype.super),
	            superKeysLen = superKeys.length;

	        for (i = 0; i < superKeysLen; i++) {
	            this.prototype.super[superKeys[i]] = Parent.prototype.super[superKeys[i]];
	        }
	    }

	    for (i = 0; i < thisProtoKeysLength; i++) {
	        if (typeof this.prototype[thisProtoKeys[i]] === 'function') {
	            funcInStr = getFunctionBody(this.prototype[thisProtoKeys[i]]);

	            this.prototype[thisClassName + '$' + thisProtoKeys[i]] = eval.call(null, '(function ' + thisClassName + '$' + thisProtoKeys[i] + '(' + funcInStr.args + ') {' + funcInStr.body + '})');
	            this.prototype[thisProtoKeys[i]] = eval.call(null, '(function ' + thisProtoKeys[i] + '(' + funcInStr.args + ') {' + 'return this[this.activeSuperContext + \'$' + thisProtoKeys[i] + '\'](' + funcInStr.args + '); })');
	            this.prototype.super[thisProtoKeys[i]] = eval.call(null, '(function super$' + thisProtoKeys[i] + '(' + funcInStr.args + ') {' + 'this.changeSuperContext(); ' + 'var i = this.activeSuperContext + \'$' + thisProtoKeys[i] + '\';' + 'var res = this[i](' + funcInStr.args + ');' + 'this.activeSuperContext = \'' + thisClassName + '\';' + 'return res; })');
	        }
	    }
	};

	if (typeof Function.prototype.rootClass !== 'function') Function.prototype.rootClass = function () {
	    var thisClassName = this.name,
	        thisProtoKeys = Object.keys(this.prototype),
	        thisProtoKeysLength = thisProtoKeys.length,
	        i,
	        funcInStr;

	    var getFunctionBody = function (func) {
	        var result = /function[\w\s]*\(([\w\s,]*)\)[^{]+\{([\s\S]*)\}$/.exec(func.toString());

	        return {
	            args: result[1],
	            body: result[2]
	        };
	    };

	    this.prototype.inheritChain = [thisClassName];

	    for (i = 0; i < thisProtoKeysLength; i++) {
	        if (typeof this.prototype[thisProtoKeys[i]] === 'function') {
	            funcInStr = getFunctionBody(this.prototype[thisProtoKeys[i]]);

	            if (funcInStr.args.length === 0) {
	                this.prototype[thisClassName + '$' + thisProtoKeys[i]] = Function(funcInStr.body);
	                this.prototype[thisProtoKeys[i]] = Function('return this[\'' + thisClassName + '$' + thisProtoKeys[i] + '\']();');
	            } else {
	                this.prototype[thisClassName + '$' + thisProtoKeys[i]] = Function(funcInStr.args, funcInStr.body);
	                this.prototype[thisProtoKeys[i]] = Function(funcInStr.args, 'return this[\'' + thisClassName + '$' + thisProtoKeys[i] + '\'](' + funcInStr.args + ');');
	            }
	        }
	    }
	};

	function defer(onFulfill, onReject) {
	    return {
	        _queue: [{
	            onFulfill: onFulfill,
	            onReject: onReject
	        }],
	        then: function (onFulfill, onReject) {
	            this._queue.push({
	                onFulfill: onFulfill,
	                onReject: onReject
	            });

	            return this;
	        }
	    };
	}

	module.exports.defer = defer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var BaseRouter = __webpack_require__(4);

	function Router() {
	    this.init();
	}

	Router.prototype = {
	    routes: {
	        '/': 'index',
	        'diary': 'diary',
	        'POST api/diary': 'diary_new-record',
	        'GET api/diary/exercises/:exercise': 'diary_exercises_search'
	    }
	};

	Router.extends(BaseRouter);

	module.exports = Router;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var defer = __webpack_require__(2).defer,
	    Mediator = __webpack_require__(5)(),
	    HttpServer = __webpack_require__(12);

	'use strict';

	function BaseRouter() {};

	BaseRouter.prototype = {

	    _mediator: Mediator,

	    _server: new HttpServer(),

	    routes: void 0,

	    init: function () {
	        var routes = this.routes,
	            _routes = {},
	            uri,
	            method,
	            signal;

	        for (uri in routes) {
	            if (routes.hasOwnProperty(uri)) {
	                signal = routes[uri];

	                var arr = uri.split(' ');
	                if (arr.length === 1) {
	                    method = 'GET';
	                } else {
	                    method = arr[0];
	                    uri = arr[1];
	                }

	                var actions = [],
	                    params = [],
	                    len,
	                    handle,
	                    handle_str;

	                if (/[^\w\d\/\:\_]+/.test(uri)) {
	                    throw new Error('not valid uri');
	                }

	                if (uri === '/') {
	                    handle = '/';
	                } else {
	                    actions = uri.split('/');
	                    len = actions.length;
	                    while (len--) {
	                        if (actions[len].indexOf(':') === 0) {
	                            actions.slice(len, 1);
	                        }
	                    }
	                    handle = '/' + actions.join('/');
	                }

	                //regexp string to action parametrs
	                handle_str = handle;
	                handle_str = handle_str.replace(/\:[a-zA-Z0-9]+/g, '([\\w\\d\_]+)').replace(/\//g, '\\/'); /*jshint ignore:line */

	                _routes[handle] = {
	                    method: method,
	                    params: params,
	                    regexp: new RegExp('^' + handle_str + '$')
	                };

	                this.setRouteListener(handle, signal);
	            }
	        }

	        this._server.run(_routes);
	    },

	    setRouteListener: function (route, signal) {
	        var mediator = this._mediator;

	        this._server.on('request:' + route).then(function (data) {
	            mediator.trigger('request:' + signal, data);
	        });
	    }
	};

	BaseRouter.rootClass();

	module.exports = BaseRouter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(6);

	var Mediator = Emitter();

	Mediator.name = 'mediator';

	var getInstance = function () {
	    return Mediator;
	};

	module.exports = getInstance;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var FastEmitter = __webpack_require__(7),
	    Promise = __webpack_require__(11);

	"use strict";

	var Emitter = function () {
	    var emitter, emitterProxy;

	    emitter = new FastEmitter();

	    emitterProxy = {

	        on: function (event, context) {
	            var promise,
	                queue = [];
	            emitter.on(event, function (data) {
	                promise = new Promise(function (resolve) {
	                    resolve(data);
	                });
	                var self = this;
	                queue.forEach(function (obj) {
	                    promise = promise.bind(self).then(obj.onResolve, obj.onReject);
	                });
	            }, context);
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                }
	            };
	        },

	        off: function (event) {
	            emitter.off(event);
	        },

	        trigger: function (event, data) {
	            console.log(event, this.name);
	            emitter.emit(event, data);
	        },

	        once: function (event, context) {
	            return new Promise(function (resolve) {
	                emitter.once(event, function (data) {
	                    resolve(data);
	                }, context);
	            });
	        },

	        _commandTo: function (event, data) {
	            this.trigger(event + ':up', data);
	            return this.once(event + ':down');
	        },

	        _commandFrom: function (event, context) {
	            var promise = this.on(event + ':up', context);
	            return {
	                then: function (onResolve, onReject) {
	                    promise = promise.then(onResolve, onReject);
	                    return this;
	                },
	                end: function () {
	                    promise.then(function (data) {
	                        emitterProxy.trigger(event + ':down', data);
	                    });
	                }
	            };
	        },

	        _commands: {},

	        commandTo: function (event, data) {
	            if (!this._commands[event]) {
	                this._commands[event] = {
	                    id: 0
	                };
	            }
	            var id = this._commands[event].id;
	            this.trigger(event + ':uniqueBefore', this._commands[event].id++);
	            var self = this,
	                queue = [];
	            emitterProxy.once(event + ':uniqueAfter').then(function () {
	                var promise = self._commandTo(event + ':' + id++, data);
	                queue.forEach(function (obj) {
	                    promise = promise.then(obj.onResolve, obj.onReject);
	                });
	            });
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                }
	            };
	        },

	        commandFrom: function (event) {
	            var queue = [];
	            this.on(event + ':uniqueBefore').then(function (id) {
	                var promise = emitterProxy.once(event + ':' + id + ':up');
	                emitterProxy.trigger(event + ':uniqueAfter');
	                queue.forEach(function (obj) {
	                    promise = promise.then(obj.onResolve, obj.onReject);
	                });
	                promise.then(function (data) {
	                    emitterProxy.trigger(event + ':' + id + ':down', data);
	                });
	            });
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                    return this;
	                }
	            };
	        },

	        Promise: Promise
	    };

	    return emitterProxy;
	};

	module.exports = Emitter;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/* jshint -W014, -W116, -W106, -W064, -W097, -W079 */
	/* global process, global */
	/**
	 * @preserve Copyright (c) 2013 Petka Antonov
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	"use strict";
	//TODO Prevent passing the same function identity multiple times as a listener
	//for the same event

	//TODO maxListeners API

	var INITIAL_DISTINCT_HANDLER_TYPES = 6;
	var domain;
	var Array = global.Array;
	var isArray = Array.isArray;
	var objectCreate = Object.create;

	function EventEmitter() {
	    this.domain = null;
	    if (EventEmitter.usingDomains) {
	        domain = domain || __webpack_require__(9);
	        if (domain.active && !(this instanceof domain.Domain)) {
	            this.domain = domain.active;
	        }
	    }
	    this._maybeInit();
	}

	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.prototype.setMaxListeners = function EventEmitter$setMaxListeners(n) {
	    if (n >>> 0 !== n) {
	        throw TypeError("n must be a positive integer");
	    }
	    this._maxListeners = n;
	    return this;
	};

	EventEmitter.prototype.emit = function EventEmitter$emit(type, a1, a2) {
	    if (type === void 0) return false;
	    if (typeof type !== "string") type = "" + type;
	    this._maybeInit();

	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        if (type === "error") {
	            this._emitError(a1);
	        }
	        return false;
	    }

	    var k = index + 1;
	    var len = k + this._eventSpace;
	    var argc = arguments.length;

	    if (this.domain != null && this !== process) {
	        this.domain.enter();
	    }

	    var eventsWereFired = false;
	    if (argc > 3) {
	        var args = new Array(argc - 1);
	        for (var i = 0, len = args.length; i < len; ++i) {
	            args[i] = arguments[i + 1];
	        }
	        eventsWereFired = this._emitApply(k, len, args);
	    } else if (len - k === 1) {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emitSingle0(k);break;
	            case 2:
	                eventsWereFired = this._emitSingle1(k, a1);break;
	            case 3:
	                eventsWereFired = this._emitSingle2(k, a1, a2);break;
	        }
	    } else {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emit0(k, len);break;
	            case 2:
	                eventsWereFired = this._emit1(k, len, a1);break;
	            case 3:
	                eventsWereFired = this._emit2(k, len, a1, a2);break;
	        }
	    }

	    if (this.domain != null && this !== process) {
	        this.domain.exit();
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on = function EventEmitter$addListener(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    events[index] = listener;
	    events[index].context = context;
	    return this;
	};

	EventEmitter.prototype.once = function EventEmitter$once(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    var self = this;
	    function s() {
	        self.removeListener(type, s);
	        return listener.apply(this, arguments);
	    }
	    events[index] = s;
	    s.listener = listener;
	    s.context = context;
	    return this;
	};

	EventEmitter.prototype.listeners = function EventEmitter$listeners(type) {
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return [];
	    }
	    var ret = [];
	    var k = index + 1;
	    var m = k + this._eventSpace;
	    var events = this._events;
	    for (; k < m; ++k) {
	        if (events[k] === void 0) {
	            break;
	        }
	        ret.push(events[k]);
	    }
	    return ret;
	};

	EventEmitter.prototype.removeListener = function EventEmitter$removeListener(type, listener) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var j = k;
	    var len = k + eventSpace;
	    var skips = 0;
	    var removeListenerIndex = -2;

	    for (; k < len; ++k) {
	        var item = events[k];
	        if (item === listener || item !== void 0 && item.listener === listener) {
	            skips++;
	            events[k] = void 0;
	            if (removeListenerIndex === -2) {
	                removeListenerIndex = this._indexOfEvent("removeListener");
	            }
	            if (removeListenerIndex >= 0) {
	                this._emitRemove(type, listener);
	            }
	        } else {
	            events[j++] = item;
	        }
	    }

	    for (k = len - skips; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.prototype.removeAllListeners = function EventEmitter$removeAllListeners(type) {
	    this._maybeInit();
	    if (type === void 0) {
	        if (this._indexOfEvent("removeListener") >= 0) {
	            this._emitRemoveAll(void 0);
	        }
	        var events = this._events = new Array(this._events.length);
	        this._initSpace(events);
	        return this;
	    }
	    if (typeof type !== "string") type = "" + type;

	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var len = k + eventSpace;
	    if (this._indexOfEvent("removeListener") >= 0) {
	        this._emitRemoveAll(type);
	    }
	    for (; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	    if (!(emitter instanceof EventEmitter)) {
	        throw new TypeError("Not an event emitter");
	    }

	    var total = 0;
	    var events = emitter._events;
	    if (!isArray(events)) {
	        return 0;
	    }
	    var len = events.length;
	    if (type === void 0) {
	        for (var i = 0; i < len; ++i) {
	            if (typeof events[i] === "function") total++;
	        }
	    } else {
	        if (typeof type !== "string") type = "" + type;
	        var index = this._indexOfEvent(type) + 1;
	        var eventSpace = this._eventSpace;
	        var k = index;
	        var m = index + eventSpace;
	        for (; k < m; ++k) {
	            if (typeof events[k] === "function") total++;
	        }
	    }
	    return total;
	};

	EventEmitter.prototype._resizeForHandlers = function EventEmitter$_resizeForHandlers() {
	    var events = this._events;
	    var tmp = new Array(events.length);
	    for (var i = 0, len = tmp.length; i < len; ++i) {
	        tmp[i] = events[i];
	    }
	    var oldEventSpace = this._eventSpace;
	    var newEventSpace = this._eventSpace = oldEventSpace * 2 + 2;
	    var length = events.length = (newEventSpace + 1) * Math.max(this._eventCount, INITIAL_DISTINCT_HANDLER_TYPES) | 0;

	    newEventSpace++;
	    oldEventSpace++;
	    for (var i = 0, j = 0; i < length; i += newEventSpace, j += oldEventSpace) {

	        var k = j;
	        var m = k + oldEventSpace;
	        var n = 0;
	        for (; k < m; ++k) {
	            events[i + n] = tmp[k];
	            n++;
	        }

	        k = i + n;
	        m = i + newEventSpace;
	        for (; k < m; ++k) {
	            events[k] = void 0;
	        }
	    }
	};

	EventEmitter.prototype._doCompact = function EventEmitter$_doCompact() {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var shouldCompact = false;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j + 1] === void 0) {
	            shouldCompact = true;
	            break;
	        }
	        j += eventSpace;
	    }
	    if (!shouldCompact) return false;
	    j = 0;
	    var len = events.length;
	    var skips = 0;
	    for (var i = 0; i < len; i += eventSpace) {
	        var listener = events[i + 1];
	        if (listener === void 0) {
	            skips += eventSpace;
	        } else {
	            var k = i;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                events[j++] = events[k];
	            }
	        }
	    }
	    for (var i = len - skips; i < len; ++i) {
	        events[i] = void 0;
	    }
	    return true;
	};

	EventEmitter.prototype._resizeForEvents = function EventEmitter$_resizeForEvents() {
	    if (this._doCompact()) {
	        return;
	    }
	    var events = this._events;
	    var oldLength = events.length;
	    var newLength = (this._eventSpace + 1) * Math.max(this._eventCount * 2, INITIAL_DISTINCT_HANDLER_TYPES);
	    for (var i = oldLength; i < newLength; ++i) {
	        events.push(void 0);
	    }
	};

	EventEmitter.prototype._emitRemoveAll = function EventEmitter$_emitRemoveAll(type) {
	    var events = this._events;
	    if (type === void 0) {
	        var len = events.length;
	        var eventSpace = this._eventSpace + 1;
	        for (var i = 0; i < len; i += eventSpace) {
	            var emitType = events[i];
	            var k = i + 1;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                var listener = events[k];
	                if (listener === void 0) {
	                    break;
	                }
	                this._emitRemove(emitType, listener.listener ? listener.listener : listener);
	            }
	        }
	    } else {
	        var k = this._indexOfEvent(type) + 1;
	        var m = k + this._eventSpace + 1;

	        for (; k < m; ++k) {
	            var listener = events[k];
	            if (listener === void 0) {
	                break;
	            }
	            this._emitRemove(type, listener.listener ? listener.listener : listener);
	        }
	    }
	};

	EventEmitter.prototype._emitRemove = function EventEmitter$_emitRemove(type, fn) {
	    this.emit("removeListener", type, fn);
	};

	EventEmitter.prototype._emitNew = function EventEmitter$_emitNew(type, fn) {
	    var i = this._indexOfEvent("newListener ");
	    if (i < 0) return;
	    this.emit("newListener", type, fn);
	};

	EventEmitter.prototype._indexOfEvent = function EventEmitter$_indexOfEvent(eventName) {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j] === eventName) {
	            return j;
	        }
	        j += eventSpace;
	    }
	    return -1;
	};

	EventEmitter.prototype._warn = function EventEmitter$_warn(eventName, listenerCount) {
	    if (!this.__warnMap) {
	        this.__warnMap = objectCreate(null);
	    }
	    if (!this.__warnMap[eventName]) {
	        this.__warnMap[eventName] = true;
	        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", listenerCount);
	        console.trace();
	    }
	};

	EventEmitter.prototype._checkListenerLeak = function EventEmitter$_checkListenerLeak(eventName, listenerCount) {
	    var max = this._maxListeners;
	    if (max < 0) {
	        max = EventEmitter.defaultMaxListeners;
	    }
	    if (max >>> 0 === max && max > 0) {
	        if (listenerCount > max) {
	            this._warn(eventName, listenerCount);
	        }
	    }
	};

	EventEmitter.prototype._nextFreeIndex = function EventEmitter$_nextFreeIndex(eventName) {
	    var eventSpace = this._eventSpace + 1;
	    var events = this._events;
	    var length = events.length;
	    for (var i = 0; i < length; i += eventSpace) {
	        var event = events[i];
	        if (event === eventName) {
	            var k = i + 1;
	            var len = i + eventSpace;
	            for (; k < len; ++k) {
	                if (events[k] === void 0) {
	                    this._checkListenerLeak(eventName, k - i);
	                    return k;
	                }
	            }
	            this._resizeForHandlers();
	            return this._nextFreeIndex(eventName);
	        }
	        //Don't check leaks when there is 1 listener
	        else if (event === void 0) {
	                events[i] = eventName;
	                this._eventCount++;
	                return i + 1;
	            } else if (events[i + 1] === void 0) {
	                events[i] = eventName;
	                return i + 1;
	            }
	    }
	    this._resizeForEvents();
	    return this._nextFreeIndex(eventName);
	};

	EventEmitter.prototype._emitError = function EventEmitter$_emitError(e) {
	    if (this.domain != null) {
	        if (!e) {
	            e = new TypeError("Uncaught, unspecified 'error' event.");
	        }
	        e.domainEmitter = this;
	        e.domain = this.domain;
	        e.domainThrown = false;
	        this.domain.emit("error", e);
	    } else if (e instanceof Error) {
	        throw e;
	    } else {
	        throw new TypeError("Uncaught, unspecified 'error' event.");
	    }
	};

	EventEmitter.prototype._emitApply = function EventEmitter$_emitApply(index, length, args) {
	    var eventsWereFired = false;
	    var multipleListeners = length - index > 1;
	    var events = this._events;
	    var event = events[index];
	    if (!multipleListeners) {
	        if (event !== void 0) {
	            event.apply(event.context, args);
	            return true;
	        }
	        return false;
	    }
	    var next = void 0;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (multipleListeners && index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.apply(event.context, args);
	        //The current listener was removed from its own callback
	        if (multipleListeners && index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emitSingle0 = function EventEmitter$_emitSingle0(index) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle1 = function EventEmitter$_emitSingle1(index, a1) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle2 = function EventEmitter$_emitSingle2(index, a1, a2) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1, a2);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emit0 = function EventEmitter$_emit0(index, length) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit1 = function EventEmitter$_emit1(index, length, a1) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit2 = function EventEmitter$_emit2(index, length, a1, a2) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1, a2);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	//eventSpace =
	//The reserved space for handlers of a distinct event type

	//eventCount =
	//The amount of unique event types currently registered.
	//Might not be the actual amount

	EventEmitter.prototype._maybeInit = function EventEmitter$_maybeInit() {
	    if (!isArray(this._events)) {
	        if (this._maxListeners >>> 0 !== this._maxListeners) {
	            this._maxListeners = -1;
	        }
	        this._eventSpace = 1;
	        this._eventCount = 0;
	        var events = this._events = new Array((this._eventSpace + 1) * INITIAL_DISTINCT_HANDLER_TYPES | 0);
	        this._initSpace(events);
	    }
	};

	EventEmitter.prototype._initSpace = function EventEmitter$_initSpace(events) {
	    var len = events.length;
	    for (var i = 0; i < len; ++i) {
	        events[i] = void 0;
	    }
	};

	module.exports = EventEmitter;

	/* jshint -W014, -W116, -W106, -W064, -W097, -W079 */
	/* global process, global */
	/**
	 * @preserve Copyright (c) 2013 Petka Antonov
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	"use strict";
	//TODO Prevent passing the same function identity multiple times as a listener
	//for the same event

	//TODO maxListeners API

	var INITIAL_DISTINCT_HANDLER_TYPES = 6;
	var domain;
	var Array = global.Array;
	var isArray = Array.isArray;
	var objectCreate = Object.create;

	function EventEmitter() {
	    this.domain = null;
	    if (EventEmitter.usingDomains) {
	        domain = domain || __webpack_require__(9);
	        if (domain.active && !(this instanceof domain.Domain)) {
	            this.domain = domain.active;
	        }
	    }
	    this._maybeInit();
	}

	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.prototype.setMaxListeners = function EventEmitter$setMaxListeners(n) {
	    if (n >>> 0 !== n) {
	        throw TypeError("n must be a positive integer");
	    }
	    this._maxListeners = n;
	    return this;
	};

	EventEmitter.prototype.emit = function EventEmitter$emit(type, a1, a2) {
	    if (type === void 0) return false;
	    if (typeof type !== "string") type = "" + type;
	    this._maybeInit();

	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        if (type === "error") {
	            this._emitError(a1);
	        }
	        return false;
	    }

	    var k = index + 1;
	    var len = k + this._eventSpace;
	    var argc = arguments.length;

	    if (this.domain != null && this !== process) {
	        this.domain.enter();
	    }

	    var eventsWereFired = false;
	    if (argc > 3) {
	        var args = new Array(argc - 1);
	        for (var i = 0, len = args.length; i < len; ++i) {
	            args[i] = arguments[i + 1];
	        }
	        eventsWereFired = this._emitApply(k, len, args);
	    } else if (len - k === 1) {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emitSingle0(k);break;
	            case 2:
	                eventsWereFired = this._emitSingle1(k, a1);break;
	            case 3:
	                eventsWereFired = this._emitSingle2(k, a1, a2);break;
	        }
	    } else {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emit0(k, len);break;
	            case 2:
	                eventsWereFired = this._emit1(k, len, a1);break;
	            case 3:
	                eventsWereFired = this._emit2(k, len, a1, a2);break;
	        }
	    }

	    if (this.domain != null && this !== process) {
	        this.domain.exit();
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on = function EventEmitter$addListener(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    events[index] = listener;
	    events[index].context = context;
	    return this;
	};

	EventEmitter.prototype.once = function EventEmitter$once(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    var self = this;
	    function s() {
	        self.removeListener(type, s);
	        return listener.apply(this, arguments);
	    }
	    events[index] = s;
	    s.listener = listener;
	    s.context = context;
	    return this;
	};

	EventEmitter.prototype.listeners = function EventEmitter$listeners(type) {
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return [];
	    }
	    var ret = [];
	    var k = index + 1;
	    var m = k + this._eventSpace;
	    var events = this._events;
	    for (; k < m; ++k) {
	        if (events[k] === void 0) {
	            break;
	        }
	        ret.push(events[k]);
	    }
	    return ret;
	};

	EventEmitter.prototype.removeListener = function EventEmitter$removeListener(type, listener) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var j = k;
	    var len = k + eventSpace;
	    var skips = 0;
	    var removeListenerIndex = -2;

	    for (; k < len; ++k) {
	        var item = events[k];
	        if (item === listener || item !== void 0 && item.listener === listener) {
	            skips++;
	            events[k] = void 0;
	            if (removeListenerIndex === -2) {
	                removeListenerIndex = this._indexOfEvent("removeListener");
	            }
	            if (removeListenerIndex >= 0) {
	                this._emitRemove(type, listener);
	            }
	        } else {
	            events[j++] = item;
	        }
	    }

	    for (k = len - skips; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.prototype.removeAllListeners = function EventEmitter$removeAllListeners(type) {
	    this._maybeInit();
	    if (type === void 0) {
	        if (this._indexOfEvent("removeListener") >= 0) {
	            this._emitRemoveAll(void 0);
	        }
	        var events = this._events = new Array(this._events.length);
	        this._initSpace(events);
	        return this;
	    }
	    if (typeof type !== "string") type = "" + type;

	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var len = k + eventSpace;
	    if (this._indexOfEvent("removeListener") >= 0) {
	        this._emitRemoveAll(type);
	    }
	    for (; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	    if (!(emitter instanceof EventEmitter)) {
	        throw new TypeError("Not an event emitter");
	    }

	    var total = 0;
	    var events = emitter._events;
	    if (!isArray(events)) {
	        return 0;
	    }
	    var len = events.length;
	    if (type === void 0) {
	        for (var i = 0; i < len; ++i) {
	            if (typeof events[i] === "function") total++;
	        }
	    } else {
	        if (typeof type !== "string") type = "" + type;
	        var index = this._indexOfEvent(type) + 1;
	        var eventSpace = this._eventSpace;
	        var k = index;
	        var m = index + eventSpace;
	        for (; k < m; ++k) {
	            if (typeof events[k] === "function") total++;
	        }
	    }
	    return total;
	};

	EventEmitter.prototype._resizeForHandlers = function EventEmitter$_resizeForHandlers() {
	    var events = this._events;
	    var tmp = new Array(events.length);
	    for (var i = 0, len = tmp.length; i < len; ++i) {
	        tmp[i] = events[i];
	    }
	    var oldEventSpace = this._eventSpace;
	    var newEventSpace = this._eventSpace = oldEventSpace * 2 + 2;
	    var length = events.length = (newEventSpace + 1) * Math.max(this._eventCount, INITIAL_DISTINCT_HANDLER_TYPES) | 0;

	    newEventSpace++;
	    oldEventSpace++;
	    for (var i = 0, j = 0; i < length; i += newEventSpace, j += oldEventSpace) {

	        var k = j;
	        var m = k + oldEventSpace;
	        var n = 0;
	        for (; k < m; ++k) {
	            events[i + n] = tmp[k];
	            n++;
	        }

	        k = i + n;
	        m = i + newEventSpace;
	        for (; k < m; ++k) {
	            events[k] = void 0;
	        }
	    }
	};

	EventEmitter.prototype._doCompact = function EventEmitter$_doCompact() {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var shouldCompact = false;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j + 1] === void 0) {
	            shouldCompact = true;
	            break;
	        }
	        j += eventSpace;
	    }
	    if (!shouldCompact) return false;
	    j = 0;
	    var len = events.length;
	    var skips = 0;
	    for (var i = 0; i < len; i += eventSpace) {
	        var listener = events[i + 1];
	        if (listener === void 0) {
	            skips += eventSpace;
	        } else {
	            var k = i;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                events[j++] = events[k];
	            }
	        }
	    }
	    for (var i = len - skips; i < len; ++i) {
	        events[i] = void 0;
	    }
	    return true;
	};

	EventEmitter.prototype._resizeForEvents = function EventEmitter$_resizeForEvents() {
	    if (this._doCompact()) {
	        return;
	    }
	    var events = this._events;
	    var oldLength = events.length;
	    var newLength = (this._eventSpace + 1) * Math.max(this._eventCount * 2, INITIAL_DISTINCT_HANDLER_TYPES);
	    for (var i = oldLength; i < newLength; ++i) {
	        events.push(void 0);
	    }
	};

	EventEmitter.prototype._emitRemoveAll = function EventEmitter$_emitRemoveAll(type) {
	    var events = this._events;
	    if (type === void 0) {
	        var len = events.length;
	        var eventSpace = this._eventSpace + 1;
	        for (var i = 0; i < len; i += eventSpace) {
	            var emitType = events[i];
	            var k = i + 1;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                var listener = events[k];
	                if (listener === void 0) {
	                    break;
	                }
	                this._emitRemove(emitType, listener.listener ? listener.listener : listener);
	            }
	        }
	    } else {
	        var k = this._indexOfEvent(type) + 1;
	        var m = k + this._eventSpace + 1;

	        for (; k < m; ++k) {
	            var listener = events[k];
	            if (listener === void 0) {
	                break;
	            }
	            this._emitRemove(type, listener.listener ? listener.listener : listener);
	        }
	    }
	};

	EventEmitter.prototype._emitRemove = function EventEmitter$_emitRemove(type, fn) {
	    this.emit("removeListener", type, fn);
	};

	EventEmitter.prototype._emitNew = function EventEmitter$_emitNew(type, fn) {
	    var i = this._indexOfEvent("newListener ");
	    if (i < 0) return;
	    this.emit("newListener", type, fn);
	};

	EventEmitter.prototype._indexOfEvent = function EventEmitter$_indexOfEvent(eventName) {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j] === eventName) {
	            return j;
	        }
	        j += eventSpace;
	    }
	    return -1;
	};

	EventEmitter.prototype._warn = function EventEmitter$_warn(eventName, listenerCount) {
	    if (!this.__warnMap) {
	        this.__warnMap = objectCreate(null);
	    }
	    if (!this.__warnMap[eventName]) {
	        this.__warnMap[eventName] = true;
	        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", listenerCount);
	        console.trace();
	    }
	};

	EventEmitter.prototype._checkListenerLeak = function EventEmitter$_checkListenerLeak(eventName, listenerCount) {
	    var max = this._maxListeners;
	    if (max < 0) {
	        max = EventEmitter.defaultMaxListeners;
	    }
	    if (max >>> 0 === max && max > 0) {
	        if (listenerCount > max) {
	            this._warn(eventName, listenerCount);
	        }
	    }
	};

	EventEmitter.prototype._nextFreeIndex = function EventEmitter$_nextFreeIndex(eventName) {
	    var eventSpace = this._eventSpace + 1;
	    var events = this._events;
	    var length = events.length;
	    for (var i = 0; i < length; i += eventSpace) {
	        var event = events[i];
	        if (event === eventName) {
	            var k = i + 1;
	            var len = i + eventSpace;
	            for (; k < len; ++k) {
	                if (events[k] === void 0) {
	                    this._checkListenerLeak(eventName, k - i);
	                    return k;
	                }
	            }
	            this._resizeForHandlers();
	            return this._nextFreeIndex(eventName);
	        }
	        //Don't check leaks when there is 1 listener
	        else if (event === void 0) {
	                events[i] = eventName;
	                this._eventCount++;
	                return i + 1;
	            } else if (events[i + 1] === void 0) {
	                events[i] = eventName;
	                return i + 1;
	            }
	    }
	    this._resizeForEvents();
	    return this._nextFreeIndex(eventName);
	};

	EventEmitter.prototype._emitError = function EventEmitter$_emitError(e) {
	    if (this.domain != null) {
	        if (!e) {
	            e = new TypeError("Uncaught, unspecified 'error' event.");
	        }
	        e.domainEmitter = this;
	        e.domain = this.domain;
	        e.domainThrown = false;
	        this.domain.emit("error", e);
	    } else if (e instanceof Error) {
	        throw e;
	    } else {
	        throw new TypeError("Uncaught, unspecified 'error' event.");
	    }
	};

	EventEmitter.prototype._emitApply = function EventEmitter$_emitApply(index, length, args) {
	    var eventsWereFired = false;
	    var multipleListeners = length - index > 1;
	    var events = this._events;
	    var event = events[index];
	    if (!multipleListeners) {
	        if (event !== void 0) {
	            event.apply(event.context, args);
	            return true;
	        }
	        return false;
	    }
	    var next = void 0;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (multipleListeners && index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.apply(event.context, args);
	        //The current listener was removed from its own callback
	        if (multipleListeners && index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emitSingle0 = function EventEmitter$_emitSingle0(index) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle1 = function EventEmitter$_emitSingle1(index, a1) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle2 = function EventEmitter$_emitSingle2(index, a1, a2) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1, a2);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emit0 = function EventEmitter$_emit0(index, length) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit1 = function EventEmitter$_emit1(index, length, a1) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit2 = function EventEmitter$_emit2(index, length, a1, a2) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1, a2);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	//eventSpace =
	//The reserved space for handlers of a distinct event type

	//eventCount =
	//The amount of unique event types currently registered.
	//Might not be the actual amount

	EventEmitter.prototype._maybeInit = function EventEmitter$_maybeInit() {
	    if (!isArray(this._events)) {
	        if (this._maxListeners >>> 0 !== this._maxListeners) {
	            this._maxListeners = -1;
	        }
	        this._eventSpace = 1;
	        this._eventCount = 0;
	        var events = this._events = new Array((this._eventSpace + 1) * INITIAL_DISTINCT_HANDLER_TYPES | 0);
	        this._initSpace(events);
	    }
	};

	EventEmitter.prototype._initSpace = function EventEmitter$_initSpace(events) {
	    var len = events.length;
	    for (var i = 0; i < len; ++i) {
	        events[i] = void 0;
	    }
	};

	module.exports = EventEmitter;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// This file should be ES5 compatible
	/* eslint prefer-spread:0, no-var:0, prefer-reflect:0, no-magic-numbers:0 */
	'use strict';

	module.exports = function () {
		// Import Events
		var events = __webpack_require__(10);

		// Export Domain
		var domain = {};
		domain.createDomain = domain.create = function () {
			var d = new events.EventEmitter();

			function emitError(e) {
				d.emit('error', e);
			}

			d.add = function (emitter) {
				emitter.on('error', emitError);
			};
			d.remove = function (emitter) {
				emitter.removeListener('error', emitError);
			};
			d.bind = function (fn) {
				return function () {
					var args = Array.prototype.slice.call(arguments);
					try {
						fn.apply(null, args);
					} catch (err) {
						emitError(err);
					}
				};
			};
			d.intercept = function (fn) {
				return function (err) {
					if (err) {
						emitError(err);
					} else {
						var args = Array.prototype.slice.call(arguments, 1);
						try {
							fn.apply(null, args);
						} catch (err) {
							emitError(err);
						}
					}
				};
			};
			d.run = function (fn) {
				try {
					fn();
				} catch (err) {
					emitError(err);
				}
				return this;
			};
			d.dispose = function () {
				this.removeAllListeners();
				return this;
			};
			d.enter = d.exit = function () {
				return this;
			};
			return d;
		};
		return domain;
	}.call(this);

/***/ },
/* 10 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function (n) {
	  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function (type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events) this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler)) return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++) listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function (type, listener) {
	  var m;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events) this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function (type, listener) {
	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function (type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener)) throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type]) return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener || isFunction(list.listener) && list.listener === listener) {
	    delete this._events[type];
	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener) this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function (type) {
	  var key, listeners;

	  if (!this._events) return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function (type) {
	  var ret;
	  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function (type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = Promise;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var defer = __webpack_require__(2).defer,
	    BaseServer = __webpack_require__(13),
	    http = __webpack_require__(14),
	    url = __webpack_require__(43),
	    fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	    PORT = +process.env.PORT || 1337;

	function HttpServer() {}

	HttpServer.prototype = {

	    _util: {
	        http: http,
	        url: url,
	        fs: fs,
	        PORT: PORT
	    },

	    run: function (routes) {
	        var self = this;

	        this.routes = routes;
	        this._util.http.createServer(function (req, res) {
	            self.handleRequest(req, res);
	        }).listen(this._util.PORT);
	        console.log('Server listen on port ' + this._util.PORT);
	    },

	    handleRequest: function (req, res) {
	        var pathname = this._util.url.parse(req.url).pathname,
	            i,
	            match = false,
	            //need to check route match
	        params = [],
	            http_method,
	            routes = this.routes;
	        console.log(pathname);
	        for (i in routes) {
	            if (routes.hasOwnProperty(i)) {
	                if (routes[i].regexp.test(pathname) || pathname === i) {
	                    match = true;
	                    params = pathname.match(routes[i].regexp).splice(1); //TODO: params must be an hash object

	                    http_method = req.method;
	                    if (http_method === 'GET' && routes[i].method === 'GET') {
	                        this.onGet(req, res, i, params);
	                    } else if (http_method === 'POST' && routes[i].method === 'POST') {
	                        this.onPost(req, res, i, params);
	                    } else if (http_method === 'PUT' && routes[i].method === 'PUT') {
	                        this.onPut(req, res, i, params);
	                    } else if (http_method === 'DELETE' && routes[i].method === 'DELETE') {
	                        this.onDelete(req, res, i, params);
	                    } else {
	                        match = false;
	                    }
	                }
	            }
	        }
	        if (!match) {
	            this.onNoHandler(res, pathname);
	        }
	    },

	    callAction: function (id, params, req, res) {
	        this.trigger('request:' + id, {
	            params: params,
	            req: req,
	            res: res
	        });
	    },

	    onGet: function (req, res, route_id, params) {
	        this.callAction(route_id, params, req, res);
	    },

	    onPost: function (req, res, route_id, params) {
	        this.callAction(route_id, params, req, res);
	    },

	    onPut: function (req, res, route_id, params) {
	        this.callAction(route_id, params, req, res);
	    },

	    onDelete: function (req, res, route_id, params) {
	        this.callAction(route_id, params, req, res);
	    },

	    onNoHandler: function (res, pathname) {
	        var tmp = pathname.lastIndexOf('.'),
	            extension = pathname.substring(tmp + 1),
	            mimes = {
	            'css': 'text/css',
	            'js': 'text/javascript',
	            'html': 'text/html',
	            'png': 'image/png',
	            'jpg': 'image/jpeg',
	            'jpeg': 'image/jpeg',
	            'eot': 'application/vnd.ms-fontobject',
	            'ttf': 'application/octet-stream',
	            'woff': 'application/octet-stream',
	            'svg': 'image/svg+xml'
	        },
	            file_path,
	            key;

	        for (key in mimes) {
	            if (mimes.hasOwnProperty(key)) {
	                if (key === extension) {
	                    file_path = '.' + pathname;
	                }
	            }
	        }
	        if (file_path) {
	            console.log(file_path);
	            this._util.fs.readFile(file_path, function (err, data) {
	                if (err) {
	                    res.writeHead(500, { 'Content-type': 'text/plain' });
	                    res.end('500: Internal Server Error');
	                }
	                res.writeHead(200, { 'Content-type': mimes[extension] });
	                res.end(data);
	            });
	        } else {
	            console.warn(pathname + ' handler not found');
	            /*fs.readFile('public/404.html', function(err, data) { //TODO: change hardcoded 404 template(must be on config)
	                res.writeHead(404);
	                res.end(data);
	             });*/
	        }
	    }
	};

	HttpServer.extends(BaseServer);

	module.exports = HttpServer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var defer = __webpack_require__(2).defer,
	    Emitter = __webpack_require__(6);

	function BaseServer() {}

	BaseServer.prototype = {
	    _emitter: function () {
	        var emitter = Emitter();
	        emitter.name = 'server';
	        return emitter;
	    }(),

	    createServer: function (req, res) {
	        throw new Error('You must implement createServer method');
	    },

	    on: function (event, context) {
	        return this._emitter.on(event, context);
	    },

	    once: function (event, context) {
	        return this._emitter.once(event, context);
	    },

	    trigger: function (event, data) {
	        return this._emitter.trigger(event, data);
	    }
	};

	BaseServer.rootClass();

	module.exports = BaseServer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var http = module.exports;
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var Request = __webpack_require__(15);
	var url = __webpack_require__(43);

	http.request = function (params, cb) {
	    if (typeof params === 'string') {
	        params = url.parse(params);
	    }
	    if (!params) params = {};
	    if (!params.host && !params.port) {
	        params.port = parseInt(window.location.port, 10);
	    }
	    if (!params.host && params.hostname) {
	        params.host = params.hostname;
	    }

	    if (!params.protocol) {
	        if (params.scheme) {
	            params.protocol = params.scheme + ':';
	        } else {
	            params.protocol = window.location.protocol;
	        }
	    }

	    if (!params.host) {
	        params.host = window.location.hostname || window.location.host;
	    }
	    if (/:/.test(params.host)) {
	        if (!params.port) {
	            params.port = params.host.split(':')[1];
	        }
	        params.host = params.host.split(':')[0];
	    }
	    if (!params.port) params.port = params.protocol == 'https:' ? 443 : 80;

	    var req = new Request(new xhrHttp(), params);
	    if (cb) req.on('response', cb);
	    return req;
	};

	http.get = function (params, cb) {
	    params.method = 'GET';
	    var req = http.request(params, cb);
	    req.end();
	    return req;
	};

	http.Agent = function () {};
	http.Agent.defaultMaxSockets = 4;

	var xhrHttp = function () {
	    if (typeof window === 'undefined') {
	        throw new Error('no window object present');
	    } else if (window.XMLHttpRequest) {
	        return window.XMLHttpRequest;
	    } else if (window.ActiveXObject) {
	        var axs = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];
	        for (var i = 0; i < axs.length; i++) {
	            try {
	                var ax = new window.ActiveXObject(axs[i]);
	                return function () {
	                    if (ax) {
	                        var ax_ = ax;
	                        ax = null;
	                        return ax_;
	                    } else {
	                        return new window.ActiveXObject(axs[i]);
	                    }
	                };
	            } catch (e) {}
	        }
	        throw new Error('ajax not supported in this browser');
	    } else {
	        throw new Error('ajax not supported in this browser');
	    }
	}();

	http.STATUS_CODES = {
	    100: 'Continue',
	    101: 'Switching Protocols',
	    102: 'Processing', // RFC 2518, obsoleted by RFC 4918
	    200: 'OK',
	    201: 'Created',
	    202: 'Accepted',
	    203: 'Non-Authoritative Information',
	    204: 'No Content',
	    205: 'Reset Content',
	    206: 'Partial Content',
	    207: 'Multi-Status', // RFC 4918
	    300: 'Multiple Choices',
	    301: 'Moved Permanently',
	    302: 'Moved Temporarily',
	    303: 'See Other',
	    304: 'Not Modified',
	    305: 'Use Proxy',
	    307: 'Temporary Redirect',
	    400: 'Bad Request',
	    401: 'Unauthorized',
	    402: 'Payment Required',
	    403: 'Forbidden',
	    404: 'Not Found',
	    405: 'Method Not Allowed',
	    406: 'Not Acceptable',
	    407: 'Proxy Authentication Required',
	    408: 'Request Time-out',
	    409: 'Conflict',
	    410: 'Gone',
	    411: 'Length Required',
	    412: 'Precondition Failed',
	    413: 'Request Entity Too Large',
	    414: 'Request-URI Too Large',
	    415: 'Unsupported Media Type',
	    416: 'Requested Range Not Satisfiable',
	    417: 'Expectation Failed',
	    418: 'I\'m a teapot', // RFC 2324
	    422: 'Unprocessable Entity', // RFC 4918
	    423: 'Locked', // RFC 4918
	    424: 'Failed Dependency', // RFC 4918
	    425: 'Unordered Collection', // RFC 4918
	    426: 'Upgrade Required', // RFC 2817
	    428: 'Precondition Required', // RFC 6585
	    429: 'Too Many Requests', // RFC 6585
	    431: 'Request Header Fields Too Large', // RFC 6585
	    500: 'Internal Server Error',
	    501: 'Not Implemented',
	    502: 'Bad Gateway',
	    503: 'Service Unavailable',
	    504: 'Gateway Time-out',
	    505: 'HTTP Version Not Supported',
	    506: 'Variant Also Negotiates', // RFC 2295
	    507: 'Insufficient Storage', // RFC 4918
	    509: 'Bandwidth Limit Exceeded',
	    510: 'Not Extended', // RFC 2774
	    511: 'Network Authentication Required' // RFC 6585
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(16);
	var Response = __webpack_require__(37);
	var Base64 = __webpack_require__(41);
	var inherits = __webpack_require__(42);

	var Request = module.exports = function (xhr, params) {
	    var self = this;
	    self.writable = true;
	    self.xhr = xhr;
	    self.body = [];

	    self.uri = (params.protocol || 'http:') + '//' + params.host + (params.port ? ':' + params.port : '') + (params.path || '/');

	    if (typeof params.withCredentials === 'undefined') {
	        params.withCredentials = true;
	    }

	    try {
	        xhr.withCredentials = params.withCredentials;
	    } catch (e) {}

	    if (params.responseType) try {
	        xhr.responseType = params.responseType;
	    } catch (e) {}

	    xhr.open(params.method || 'GET', self.uri, true);

	    xhr.onerror = function (event) {
	        self.emit('error', new Error('Network error'));
	    };

	    self._headers = {};

	    if (params.headers) {
	        var keys = objectKeys(params.headers);
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (!self.isSafeRequestHeader(key)) continue;
	            var value = params.headers[key];
	            self.setHeader(key, value);
	        }
	    }

	    if (params.auth) {
	        //basic auth
	        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
	    }

	    var res = new Response();
	    res.on('close', function () {
	        self.emit('close');
	    });

	    res.on('ready', function () {
	        self.emit('response', res);
	    });

	    res.on('error', function (err) {
	        self.emit('error', err);
	    });

	    xhr.onreadystatechange = function () {
	        // Fix for IE9 bug
	        // SCRIPT575: Could not complete the operation due to error c00c023f
	        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
	        if (xhr.__aborted) return;
	        res.handle(xhr);
	    };
	};

	inherits(Request, Stream);

	Request.prototype.setHeader = function (key, value) {
	    this._headers[key.toLowerCase()] = value;
	};

	Request.prototype.getHeader = function (key) {
	    return this._headers[key.toLowerCase()];
	};

	Request.prototype.removeHeader = function (key) {
	    delete this._headers[key.toLowerCase()];
	};

	Request.prototype.write = function (s) {
	    this.body.push(s);
	};

	Request.prototype.destroy = function (s) {
	    this.xhr.__aborted = true;
	    this.xhr.abort();
	    this.emit('close');
	};

	Request.prototype.end = function (s) {
	    if (s !== undefined) this.body.push(s);

	    var keys = objectKeys(this._headers);
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = this._headers[key];
	        if (isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	                this.xhr.setRequestHeader(key, value[j]);
	            }
	        } else this.xhr.setRequestHeader(key, value);
	    }

	    if (this.body.length === 0) {
	        this.xhr.send('');
	    } else if (typeof this.body[0] === 'string') {
	        this.xhr.send(this.body.join(''));
	    } else if (isArray(this.body[0])) {
	        var body = [];
	        for (var i = 0; i < this.body.length; i++) {
	            body.push.apply(body, this.body[i]);
	        }
	        this.xhr.send(body);
	    } else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
	        var len = 0;
	        for (var i = 0; i < this.body.length; i++) {
	            len += this.body[i].length;
	        }
	        var body = new this.body[0].constructor(len);
	        var k = 0;

	        for (var i = 0; i < this.body.length; i++) {
	            var b = this.body[i];
	            for (var j = 0; j < b.length; j++) {
	                body[k++] = b[j];
	            }
	        }
	        this.xhr.send(body);
	    } else if (isXHR2Compatible(this.body[0])) {
	        this.xhr.send(this.body[0]);
	    } else {
	        var body = '';
	        for (var i = 0; i < this.body.length; i++) {
	            body += this.body[i].toString();
	        }
	        this.xhr.send(body);
	    }
	};

	// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
	Request.unsafeHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];

	Request.prototype.isSafeRequestHeader = function (headerName) {
	    if (!headerName) return false;
	    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
	};

	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    return keys;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};

	var indexOf = function (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0; i < xs.length; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	};

	var isXHR2Compatible = function (obj) {
	    if (typeof Blob !== 'undefined' && obj instanceof Blob) return true;
	    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) return true;
	    if (typeof FormData !== 'undefined' && obj instanceof FormData) return true;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(10).EventEmitter;
	var inherits = __webpack_require__(17);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(18);
	Stream.Writable = __webpack_require__(33);
	Stream.Duplex = __webpack_require__(34);
	Stream.Transform = __webpack_require__(35);
	Stream.PassThrough = __webpack_require__(36);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;

	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function (dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }

	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19);
	exports.Stream = __webpack_require__(16);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(29);
	exports.Duplex = __webpack_require__(28);
	exports.Transform = __webpack_require__(31);
	exports.PassThrough = __webpack_require__(32);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(20);
	/*</replacement>*/

	/*<replacement>*/
	var Buffer = __webpack_require__(21).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(10).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(16);

	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/

	var StringDecoder;

	/*<replacement>*/
	var debug = __webpack_require__(27);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(28);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(30).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(28);

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended) onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding) chunk = state.decoder.write(chunk);

	      if (!addToFront) state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	        if (state.needReadable) emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(30).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended) return 0;

	  if (state.objectMode) return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length) return state.buffer[0].length;else return state.length;
	  }

	  if (n <= 0) return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark) state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading) n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended) state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0) endReadable(this);

	  if (!util.isNull(ret)) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) process.nextTick(function () {
	      emitReadable_(stream);
	    });else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function () {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause', src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error) dest.on('error', onerror);else if (isArray(dest._events.error)) dest._events.error.unshift(onerror);else dest._events.error = [onerror, dest._events.error];

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function () {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function () {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0) return null;

	  if (length === 0) ret = null;else if (objectMode) ret = list.shift();else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode) ret = list.join('');else ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode) ret = '';else ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode) ret += buf.slice(0, cpy);else buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length) list[0] = buf.slice(cpy);else list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function () {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict';

	var base64 = __webpack_require__(22);
	var ieee754 = __webpack_require__(23);
	var isArray = __webpack_require__(24);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	Buffer.poolSize = 8192; // not used by this implementation

	var rootParent = {};

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

	function typedArraySupport() {
	  function Bar() {}
	  try {
	    var arr = new Uint8Array(1);
	    arr.foo = function () {
	      return 42;
	    };
	    arr.constructor = Bar;
	    return arr.foo() === 42 && // typed array instances can be augmented
	    arr.constructor === Bar && // constructor can be set
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	}

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer(arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1]);
	    return new Buffer(arg);
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0;
	    this.parent = undefined;
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg);
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
	  }

	  // Unusual.
	  return fromObject(this, arg);
	}

	function fromNumber(that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0;
	  that = allocate(that, length);

	  that.write(string, encoding);
	  return that;
	}

	function fromObject(that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object);

	  if (isArray(object)) return fromArray(that, object);

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string');
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object);
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object);
	    }
	  }

	  if (object.length) return fromArrayLike(that, object);

	  return fromJsonObject(that, object);
	}

	function fromBuffer(that, buffer) {
	  var length = checked(buffer.length) | 0;
	  that = allocate(that, length);
	  buffer.copy(that, 0, 0, length);
	  return that;
	}

	function fromArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength;
	    that = Buffer._augment(new Uint8Array(array));
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array));
	  }
	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject(that, object) {
	  var array;
	  var length = 0;

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data;
	    length = checked(array.length) | 0;
	  }
	  that = allocate(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined;
	  Buffer.prototype.parent = undefined;
	}

	function allocate(that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length));
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length;
	    that._isBuffer = true;
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
	  if (fromPool) that.parent = rootParent;

	  return that;
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding);

	  var buf = new Buffer(subject, encoding);
	  delete buf.parent;
	  return buf;
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  var i = 0;
	  var len = Math.min(x, y);
	  while (i < len) {
	    if (a[i] !== b[i]) break;

	    ++i;
	  }

	  if (i !== len) {
	    x = a[i];
	    y = b[i];
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.');

	  if (list.length === 0) {
	    return new Buffer(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length;
	    }
	  }

	  var buf = new Buffer(length);
	  var pos = 0;
	  for (i = 0; i < list.length; i++) {
	    var item = list[i];
	    item.copy(buf, pos);
	    pos += item.length;
	  }
	  return buf;
	};

	function byteLength(string, encoding) {
	  if (typeof string !== 'string') string = '' + string;

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  start = start | 0;
	  end = end === undefined || end === Infinity ? this.length : end | 0;

	  if (!encoding) encoding = 'utf8';
	  if (start < 0) start = 0;
	  if (end > this.length) end = this.length;
	  if (end <= start) return '';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'binary':
	        return binarySlice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return 0;
	  return Buffer.compare(this, b);
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;else if (byteOffset < -0x80000000) byteOffset = -0x80000000;
	  byteOffset >>= 0;

	  if (this.length === 0) return -1;
	  if (byteOffset >= this.length) return -1;

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1; // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset);
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset);
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
	    }
	    return arrayIndexOf(this, [val], byteOffset);
	  }

	  function arrayIndexOf(arr, val, byteOffset) {
	    var foundIndex = -1;
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex;
	      } else {
	        foundIndex = -1;
	      }
	    }
	    return -1;
	  }

	  throw new TypeError('val must be string, number or Buffer');
	};

	// `get` is deprecated
	Buffer.prototype.get = function get(offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.');
	  return this.readUInt8(offset);
	};

	// `set` is deprecated
	Buffer.prototype.set = function set(v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.');
	  return this.writeUInt8(v, offset);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) throw new Error('Invalid hex string');
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function binaryWrite(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	      encoding = offset;
	      length = this.length;
	      offset = 0;
	      // Buffer#write(string, offset[, length][, encoding])
	    } else if (isFinite(offset)) {
	        offset = offset | 0;
	        if (isFinite(length)) {
	          length = length | 0;
	          if (encoding === undefined) encoding = 'utf8';
	        } else {
	          encoding = length;
	          length = undefined;
	        }
	        // legacy write(string, encoding, offset, length) - remove in v0.13
	      } else {
	          var swap = encoding;
	          encoding = offset;
	          offset = length | 0;
	          length = swap;
	        }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'binary':
	        return binaryWrite(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function binarySlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~ ~start;
	  end = end === undefined ? len : ~ ~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end));
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this;

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	  if (offset < 0) throw new RangeError('index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill(value, start, end) {
	  if (!value) value = 0;
	  if (!start) start = 0;
	  if (!end) end = this.length;

	  if (end < start) throw new RangeError('end < start');

	  // Fill 0 bytes; we're done
	  if (end === start) return;
	  if (this.length === 0) return;

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds');
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds');

	  var i;
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value;
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString());
	    var len = bytes.length;
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len];
	    }
	  }

	  return this;
	};

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return new Buffer(this).buffer;
	    } else {
	      var buf = new Uint8Array(this.length);
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i];
	      }
	      return buf.buffer;
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
	  }
	};

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype;

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment(arr) {
	  arr.constructor = Buffer;
	  arr._isBuffer = true;

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set;

	  // deprecated
	  arr.get = BP.get;
	  arr.set = BP.set;

	  arr.write = BP.write;
	  arr.toString = BP.toString;
	  arr.toLocaleString = BP.toString;
	  arr.toJSON = BP.toJSON;
	  arr.equals = BP.equals;
	  arr.compare = BP.compare;
	  arr.indexOf = BP.indexOf;
	  arr.copy = BP.copy;
	  arr.slice = BP.slice;
	  arr.readUIntLE = BP.readUIntLE;
	  arr.readUIntBE = BP.readUIntBE;
	  arr.readUInt8 = BP.readUInt8;
	  arr.readUInt16LE = BP.readUInt16LE;
	  arr.readUInt16BE = BP.readUInt16BE;
	  arr.readUInt32LE = BP.readUInt32LE;
	  arr.readUInt32BE = BP.readUInt32BE;
	  arr.readIntLE = BP.readIntLE;
	  arr.readIntBE = BP.readIntBE;
	  arr.readInt8 = BP.readInt8;
	  arr.readInt16LE = BP.readInt16LE;
	  arr.readInt16BE = BP.readInt16BE;
	  arr.readInt32LE = BP.readInt32LE;
	  arr.readInt32BE = BP.readInt32BE;
	  arr.readFloatLE = BP.readFloatLE;
	  arr.readFloatBE = BP.readFloatBE;
	  arr.readDoubleLE = BP.readDoubleLE;
	  arr.readDoubleBE = BP.readDoubleBE;
	  arr.writeUInt8 = BP.writeUInt8;
	  arr.writeUIntLE = BP.writeUIntLE;
	  arr.writeUIntBE = BP.writeUIntBE;
	  arr.writeUInt16LE = BP.writeUInt16LE;
	  arr.writeUInt16BE = BP.writeUInt16BE;
	  arr.writeUInt32LE = BP.writeUInt32LE;
	  arr.writeUInt32BE = BP.writeUInt32BE;
	  arr.writeIntLE = BP.writeIntLE;
	  arr.writeIntBE = BP.writeIntBE;
	  arr.writeInt8 = BP.writeInt8;
	  arr.writeInt16LE = BP.writeInt16LE;
	  arr.writeInt16BE = BP.writeInt16BE;
	  arr.writeInt32LE = BP.writeInt32LE;
	  arr.writeInt32BE = BP.writeInt32BE;
	  arr.writeFloatLE = BP.writeFloatLE;
	  arr.writeFloatBE = BP.writeFloatBE;
	  arr.writeDoubleLE = BP.writeDoubleLE;
	  arr.writeDoubleBE = BP.writeDoubleBE;
	  arr.fill = BP.fill;
	  arr.inspect = BP.inspect;
	  arr.toArrayBuffer = BP.toArrayBuffer;

	  return arr;
	};

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var PLUS = '+'.charCodeAt(0);
		var SLASH = '/'.charCodeAt(0);
		var NUMBER = '0'.charCodeAt(0);
		var LOWER = 'a'.charCodeAt(0);
		var UPPER = 'A'.charCodeAt(0);
		var PLUS_URL_SAFE = '-'.charCodeAt(0);
		var SLASH_URL_SAFE = '_'.charCodeAt(0);

		function decode(elt) {
			var code = elt.charCodeAt(0);
			if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
			if (code < NUMBER) return -1; //no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
			if (code < UPPER + 26) return code - UPPER;
			if (code < LOWER + 26) return code - LOWER + 26;
		}

		function b64ToByteArray(b64) {
			var i, j, l, tmp, placeHolders, arr;

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4');
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length;
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders);

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length;

			var L = 0;

			function push(v) {
				arr[L++] = v;
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
				push((tmp & 0xFF0000) >> 16);
				push((tmp & 0xFF00) >> 8);
				push(tmp & 0xFF);
			}

			if (placeHolders === 2) {
				tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
				push(tmp & 0xFF);
			} else if (placeHolders === 1) {
				tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
				push(tmp >> 8 & 0xFF);
				push(tmp & 0xFF);
			}

			return arr;
		}

		function uint8ToBase64(uint8) {
			var i,
			    extraBytes = uint8.length % 3,
			    // if we have 1 byte left, pad 2 bytes
			output = "",
			    temp,
			    length;

			function encode(num) {
				return lookup.charAt(num);
			}

			function tripletToBase64(num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
				output += tripletToBase64(temp);
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1];
					output += encode(temp >> 2);
					output += encode(temp << 4 & 0x3F);
					output += '==';
					break;
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
					output += encode(temp >> 10);
					output += encode(temp >> 4 & 0x3F);
					output += encode(temp << 2 & 0x3F);
					output += '=';
					break;
			}

			return output;
		}

		exports.toByteArray = b64ToByteArray;
		exports.fromByteArray = uint8ToBase64;
	})( false ? this.base64js = {} : exports);

/***/ },
/* 23 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return objectToString(e) === '[object Error]' || e instanceof Error;
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 26 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	};
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/

	var Readable = __webpack_require__(19);
	var Writable = __webpack_require__(29);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function (method) {
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(21).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/

	var Stream = __webpack_require__(16);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(28);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(28);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};

	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function () {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function () {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (!util.isFunction(cb)) cb = function () {};

	  if (state.ended) writeAfterEnd(this, state, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length) clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) state.buffer.push(new WriteReq(chunk, encoding, cb));else doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync) process.nextTick(function () {
	    state.pendingcb--;
	    cb(er);
	  });else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function () {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++) cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function (err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length) state.buffer = state.buffer.slice(c);else state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk)) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(stream, state) {
	  return state.ending && state.length === 0 && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(21).Buffer;

	var isBufferEncoding = Buffer.isEncoding || function (encoding) {
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function (encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function (buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function (buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = buffer.length >= 3 ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function (buffer) {
	  var res = '';
	  if (buffer && buffer.length) res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(28);

	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/

	util.inherits(Transform, Duplex);

	function TransformState(options, stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data)) stream.push(data);

	  if (cb) cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function () {
	    if (util.isFunction(this._flush)) this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(31);

	/*<replacement>*/
	var util = __webpack_require__(25);
	util.inherits = __webpack_require__(26);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(16);
	var util = __webpack_require__(38);

	var Response = module.exports = function (res) {
	    this.offset = 0;
	    this.readable = true;
	};

	util.inherits(Response, Stream);

	var capable = {
	    streaming: true,
	    status2: true
	};

	function parseHeaders(res) {
	    var lines = res.getAllResponseHeaders().split(/\r?\n/);
	    var headers = {};
	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        if (line === '') continue;

	        var m = line.match(/^([^:]+):\s*(.*)/);
	        if (m) {
	            var key = m[1].toLowerCase(),
	                value = m[2];

	            if (headers[key] !== undefined) {

	                if (isArray(headers[key])) {
	                    headers[key].push(value);
	                } else {
	                    headers[key] = [headers[key], value];
	                }
	            } else {
	                headers[key] = value;
	            }
	        } else {
	            headers[line] = true;
	        }
	    }
	    return headers;
	}

	Response.prototype.getResponse = function (xhr) {
	    var respType = String(xhr.responseType).toLowerCase();
	    if (respType === 'blob') return xhr.responseBlob || xhr.response;
	    if (respType === 'arraybuffer') return xhr.response;
	    return xhr.responseText;
	};

	Response.prototype.getHeader = function (key) {
	    return this.headers[key.toLowerCase()];
	};

	Response.prototype.handle = function (res) {
	    if (res.readyState === 2 && capable.status2) {
	        try {
	            this.statusCode = res.status;
	            this.headers = parseHeaders(res);
	        } catch (err) {
	            capable.status2 = false;
	        }

	        if (capable.status2) {
	            this.emit('ready');
	        }
	    } else if (capable.streaming && res.readyState === 3) {
	        try {
	            if (!this.statusCode) {
	                this.statusCode = res.status;
	                this.headers = parseHeaders(res);
	                this.emit('ready');
	            }
	        } catch (err) {}

	        try {
	            this._emitData(res);
	        } catch (err) {
	            capable.streaming = false;
	        }
	    } else if (res.readyState === 4) {
	        if (!this.statusCode) {
	            this.statusCode = res.status;
	            this.emit('ready');
	        }
	        this._emitData(res);

	        if (res.error) {
	            this.emit('error', this.getResponse(res));
	        } else this.emit('end');

	        this.emit('close');
	    }
	};

	Response.prototype._emitData = function (res) {
	    var respBody = this.getResponse(res);
	    if (respBody.toString().match(/ArrayBuffer/)) {
	        this.emit('data', new Uint8Array(respBody, this.offset));
	        this.offset = respBody.byteLength;
	        return;
	    }
	    if (respBody.length > this.offset) {
	        this.emit('data', respBody.slice(this.offset));
	        this.offset = respBody.length;
	    }
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};

	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(39);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}

	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};

	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(40);

	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {

	  var object =  true ? exports : this; // #8: web workers
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  InvalidCharacterError.prototype = new Error();
	  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (object.btoa = function (input) {
	    for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars, output = '';
	    // if the next input index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    input.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
	      charCode = input.charCodeAt(idx += 3 / 4);
	      if (charCode > 0xFF) {
	        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  });

	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (object.atob = function (input) {
	    input = input.replace(/=+$/, '');
	    if (input.length % 4 == 1) {
	      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	    }
	    for (
	    // initialize result and counters
	    var bc = 0, bs, buffer, idx = 0, output = '';
	    // get next character
	    buffer = input.charAt(idx++);
	    // character found in table? initialize bit storage and add its ascii value;
	    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	    // and if not first of each 4 characters,
	    // convert the first 8 bits to one ascii character
	    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });
	})();

/***/ },
/* 42 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = __webpack_require__(44);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	// RFC 2396: characters reserved for delimiting URLs.
	// We actually just auto-escape these.
	delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	// RFC 2396: characters not allowed for various reasons.
	unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	autoEscape = ['\''].concat(unwise),

	// Characters that are never ever allowed in a hostname.
	// Note that any invalid chars are also handled, but these
	// are the ones that are *expected* to be seen, so we fast-path
	// them.
	nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,

	// protocols that can allow "unsafe" and "unwise" chars.
	unsafeProtocol = {
	  'javascript': true,
	  'javascript:': true
	},

	// protocols that never have a hostname.
	hostlessProtocol = {
	  'javascript': true,
	  'javascript:': true
	},

	// protocols that always contain a // bit.
	slashedProtocol = {
	  'http': true,
	  'https': true,
	  'ftp': true,
	  'gopher': true,
	  'file': true,
	  'http:': true,
	  'https:': true,
	  'ftp:': true,
	  'gopher:': true,
	  'file:': true
	},
	    querystring = __webpack_require__(46);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url();
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ? 'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }

	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function () {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query && isObject(this.query) && Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || query && '?' + query || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function (match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function (relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function (relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function (k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function (k) {
	      if (k !== 'protocol') result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function (k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
	      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
	      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = relative.host || relative.host === '' ? relative.host : result.host;
	    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	      // it's relative
	      // throw away the existing file, and take the new path instead.
	      if (!srcPath) srcPath = [];
	      srcPath.pop();
	      srcPath = srcPath.concat(relPath);
	      result.search = relative.search;
	      result.query = relative.query;
	    } else if (!isNullOrUndefined(relative.search)) {
	      // just pull out the search.
	      // like href='?foo'.
	      // Put this after the other two cases because it simplifies the booleans
	      if (psychotic) {
	        result.hostname = result.host = srcPath.shift();
	        //occationaly the auth can get stuck only in host
	        //this especialy happens in cases like
	        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	        var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	        if (authInHost) {
	          result.auth = authInHost.shift();
	          result.host = result.hostname = authInHost.shift();
	        }
	      }
	      result.search = relative.search;
	      result.query = relative.query;
	      //to support http.request
	      if (!isNull(result.pathname) || !isNull(result.search)) {
	        result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	      }
	      result.href = result.format();
	      return result;
	    }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (result.host || relative.host) && (last === '.' || last === '..') || last === '';

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || result.host && srcPath.length;

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function () {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return arg == null;
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function (root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module && !module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
			root = freeGlobal;
		}

		/**
	  * The `punycode` object.
	  * @name punycode
	  * @type Object
	  */
		var punycode,
		   

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647,
		    // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		    tMin = 1,
		    tMax = 26,
		    skew = 38,
		    damp = 700,
		    initialBias = 72,
		    initialN = 128,
		    // 0x80
		delimiter = '-',
		    // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		    regexNonASCII = /[^\x20-\x7E]/,
		    // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
		    // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
		   

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		    floor = Math.floor,
		    stringFromCharCode = String.fromCharCode,
		   

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
	  * A generic error utility function.
	  * @private
	  * @param {String} type The error type.
	  * @returns {Error} Throws a `RangeError` with the applicable error message.
	  */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
	  * A generic `Array#map` utility function.
	  * @private
	  * @param {Array} array The array to iterate over.
	  * @param {Function} callback The function that gets called for every array
	  * item.
	  * @returns {Array} A new array of values returned by the callback function.
	  */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
	  * A simple `Array#map`-like wrapper to work with domain name strings or email
	  * addresses.
	  * @private
	  * @param {String} domain The domain name or email address.
	  * @param {Function} callback The function that gets called for every
	  * character.
	  * @returns {Array} A new string of characters returned by the callback
	  * function.
	  */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
	  * Creates an array containing the numeric code points of each Unicode
	  * character in the string. While JavaScript uses UCS-2 internally,
	  * this function will convert a pair of surrogate halves (each of which
	  * UCS-2 exposes as separate characters) into a single code point,
	  * matching UTF-16.
	  * @see `punycode.ucs2.encode`
	  * @see <https://mathiasbynens.be/notes/javascript-encoding>
	  * @memberOf punycode.ucs2
	  * @name decode
	  * @param {String} string The Unicode input string (UCS-2).
	  * @returns {Array} The new array of code points.
	  */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
	  * Creates a string based on an array of numeric code points.
	  * @see `punycode.ucs2.decode`
	  * @memberOf punycode.ucs2
	  * @name encode
	  * @param {Array} codePoints The array of numeric code points.
	  * @returns {String} The new Unicode string (UCS-2).
	  */
		function ucs2encode(array) {
			return map(array, function (value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
	  * Converts a basic code point into a digit/integer.
	  * @see `digitToBasic()`
	  * @private
	  * @param {Number} codePoint The basic numeric code point value.
	  * @returns {Number} The numeric value of a basic code point (for use in
	  * representing integers) in the range `0` to `base - 1`, or `base` if
	  * the code point does not represent a value.
	  */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
	  * Converts a digit/integer into a basic code point.
	  * @see `basicToDigit()`
	  * @private
	  * @param {Number} digit The numeric value of a basic code point.
	  * @returns {Number} The basic code point whose value (when used for
	  * representing integers) is `digit`, which needs to be in the range
	  * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	  * used; else, the lowercase form is used. The behavior is undefined
	  * if `flag` is non-zero and `digit` has no uppercase form.
	  */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
	  * Bias adaptation function as per section 3.4 of RFC 3492.
	  * http://tools.ietf.org/html/rfc3492#section-3.4
	  * @private
	  */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
	  * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	  * symbols.
	  * @memberOf punycode
	  * @param {String} input The Punycode string of ASCII-only symbols.
	  * @returns {String} The resulting string of Unicode symbols.
	  */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			   
			/** Cached calculation results */
			baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base;; /* no condition */k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;
				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
			}

			return ucs2encode(output);
		}

		/**
	  * Converts a string of Unicode symbols (e.g. a domain name label) to a
	  * Punycode string of ASCII-only symbols.
	  * @memberOf punycode
	  * @param {String} input The string of Unicode symbols.
	  * @returns {String} The resulting Punycode string of ASCII-only symbols.
	  */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			   
			/** `inputLength` will hold the number of code points in `input`. */
			inputLength,
			   
			/** Cached calculation results */
			handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base;; /* no condition */k += base) {
							t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;
			}
			return output.join('');
		}

		/**
	  * Converts a Punycode string representing a domain name or an email address
	  * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	  * it doesn't matter if you call it on a string that has already been
	  * converted to Unicode.
	  * @memberOf punycode
	  * @param {String} input The Punycoded domain name or email address to
	  * convert to Unicode.
	  * @returns {String} The Unicode representation of the given Punycode
	  * string.
	  */
		function toUnicode(input) {
			return mapDomain(input, function (string) {
				return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
			});
		}

		/**
	  * Converts a Unicode string representing a domain name or an email address to
	  * Punycode. Only the non-ASCII parts of the domain name will be converted,
	  * i.e. it doesn't matter if you call it with a domain that's already in
	  * ASCII.
	  * @memberOf punycode
	  * @param {String} input The domain name or email address to convert, as a
	  * Unicode string.
	  * @returns {String} The Punycode representation of the given domain name or
	  * email address.
	  */
		function toASCII(input) {
			return mapDomain(input, function (string) {
				return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
	   * A string representing the current Punycode.js version number.
	   * @memberOf punycode
	   * @type String
	   */
			'version': '1.3.2',
			/**
	   * An object of methods to convert from JavaScript's internal character
	   * representation (UCS-2) to Unicode code points, and back.
	   * @see <https://mathiasbynens.be/notes/javascript-encoding>
	   * @memberOf punycode
	   * @type Object
	   */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}
	})(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)(module), (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(47);
	exports.encode = exports.stringify = __webpack_require__(48);

/***/ },
/* 47 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function (v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const BaseComponent = __webpack_require__(50);
	const DiaryService = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./services/DiaryService\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	const Renderer = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"base-frame-server/Renderer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	class Diary extends BaseComponent {
		constructor() {
			super();
		}

		slots() {
			return {
				global: {
					'on@request:diary': this.onIndex,
					'on@request:diary_new-record': this.onNewRecord,
					'on@request:diary_exercises_search': this.onSearchExercises
				}
			};
		}

		onIndex(data) {
			Renderer.render(__dirname + 'diary-index.html', {}, data.res);
		}

		onNewRecord(data) {
			DiaryService.addRecord(data);
			//    .then( function () {
			//    self.render( 'diary-index' );
			//} );
		}

		onSearchExercises(data) {
			DiaryService.getExercises(data.params[0]).then(d => this.json(d.map(o => dataValues.title), data.res));
		}
	}

	module.exports = DiaryComponent;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    BaseComponent: __webpack_require__(51),
	    Emitter: __webpack_require__(52),
	    Signal: __webpack_require__(55),
	    defer: __webpack_require__(54).defer
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(52);

	var defer = __webpack_require__(54).defer;
	var isGenFunc = __webpack_require__(54).isGeneratorFunc;

	"use strict";

	var GlobalEmitter = Emitter();
	GlobalEmitter.name = 'global';

	/**
	 * Base class to create component.
	 * Create signals and slots.
	 * For use it you must extend it.
	 * @constructor
	 */
	function BaseComponent(emitter) {
	    this._globalEmitter = emitter || GlobalEmitter;
	    //create local instance of emitter
	    this._emitter = Emitter();
	    //this._emitter.name = this.inheritChain[this.inheritChain.length - 1] + '-local'; //for debugging with
	    // base-frame-extends base-frame-extends
	    this._emitter.name = 'local'; //for debugging

	    //create container for signals
	    this.emit = {};

	    //object to save links to events and channels
	    this.__slots = {};
	    this.__signals = {};

	    //create slots and signals
	    if (Object.prototype.toString.call(this.slots) === '[object Function]') {
	        this.slots = this.slots();
	    }
	    this._slots(this.slots);
	    if (Object.prototype.toString.call(this.signals) === '[object Function]') {
	        this.signals = this.signals();
	    }
	    this._signals(this.signals);
	}

	BaseComponent.prototype = {
	    constructor: BaseComponent,

	    /**
	     * Method to create slots
	     * @param channels {Object}
	     * @private
	     */
	    _slots: function (channels) {
	        for (var channel in channels) {
	            if (channels.hasOwnProperty(channel)) {

	                var slots = channels[channel];

	                if (typeof slots === 'function') {
	                    slots = slots.call(this);
	                }

	                if (Object.prototype.toString.call(slots) !== '[object Object]') {
	                    throw new Error("Slots must be (or return from func) hash object");
	                }

	                var emitter = channel === 'global' ? this._globalEmitter : this._emitter;

	                for (var slot in slots) {
	                    if (slots.hasOwnProperty(slot)) {
	                        var _arr = slot.split('@');
	                        if (_arr.length > 2) {
	                            throw new Error("Incorrect name of slot");
	                        }
	                        var method = _arr[0];
	                        var event = _arr[1];

	                        this.__slots[event] = {
	                            emitter: emitter,
	                            method: method,
	                            channel: void 0
	                        };

	                        var promise;

	                        switch (method) {
	                            case 'on':
	                                promise = emitter.on(event, this);
	                                break;
	                            case 'once':
	                                promise = emitter.once(event, this);
	                                break;
	                            case 'command':
	                                promise = emitter.commandFrom(event, this);
	                                break;
	                        }

	                        if (Object.prototype.toString.call(slots[slot]) === '[object Function]') {
	                            slots[slot] = defer(slots[slot]);
	                        }

	                        slots[slot]._queue.forEach(function (cb) {
	                            promise = promise.then(cb.onFulfill, cb.onReject);
	                        });
	                    }
	                }
	            }
	        }
	    },

	    /**
	     * Method to create signals
	     * @param channels
	     * @private
	     */
	    _signals: function (channels) {
	        for (var channel in channels) {
	            if (channels.hasOwnProperty(channel)) {

	                var signals = channels[channel];

	                if (typeof signals === 'function') {
	                    signals = signals.call({});
	                }

	                if (Object.prototype.toString.call(signals) !== '[object Object]') {
	                    throw new Error("Signals must be (or return from func) hash object");
	                }

	                var emitter = channel === 'global' ? this._globalEmitter : this._emitter;

	                for (var signal in signals) {
	                    if (signals.hasOwnProperty(signal)) {
	                        var _arr = signal.split('@');
	                        if (_arr.length > 2) {
	                            throw new Error("Incorrect name of signal");
	                        }

	                        var method = _arr[0];
	                        var event = _arr[1];

	                        this.__signals[event] = {
	                            method: method
	                        };

	                        this.emit[signals[signal]] = function (event, method, emitter) {
	                            return function (data, obj) {
	                                var _event;
	                                if (obj) {
	                                    _event = event.replace(/\{([^\}]+)\}/g, function (i, f) {
	                                        return obj[f];
	                                    });
	                                } else {
	                                    _event = event;
	                                }

	                                switch (method) {
	                                    case 'trigger':
	                                        emitter.trigger(_event, data);
	                                        break;
	                                    case 'command':
	                                        return emitter.commandTo(_event, data);
	                                        break;
	                                }
	                            };
	                        }(event, method, emitter);
	                    }
	                }
	            }
	        }
	    },

	    /**
	     * Method to unsubscribe all events and to close channels
	     */
	    destroy: function () {
	        var slots = Object.keys(this.__slots);
	        slots.forEach(function (event) {
	            var slot = this.__slots[event];
	            slot.emitter.removeAll(event);
	            if (slot.channel) {
	                //slot.channel.close();
	            }
	        }, this);
	    }

	};

	module.exports = BaseComponent;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var FastEmitter = __webpack_require__(53);
	var Promise = __webpack_require__(11);

	"use strict";

	module.exports = function () {
	    var emitter, emitterProxy;

	    emitter = new FastEmitter();

	    emitterProxy = {

	        on: function (event, context) {
	            var promise,
	                queue = [];
	            emitter.on(event, function (data) {
	                promise = new Promise(function (resolve) {
	                    resolve(data);
	                });
	                queue.forEach(function (obj) {
	                    promise = promise.bind(this).then(obj.onResolve, obj.onReject);
	                }, this);
	            }, context);
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                }
	            };
	        },

	        trigger: function (event, data) {
	            console.log(event, this.name || '');
	            emitter.emit(event, data);
	        },

	        once: function (event, context) {
	            return new Promise(function (resolve) {
	                emitter.once(event, function (data) {
	                    resolve(data);
	                }, context);
	            });
	        },

	        removeAll: function (type) {
	            return emitter.removeAllListeners(type);
	        },

	        _commandTo: function (event, data) {
	            this.trigger(event + ':up', data);
	            return this.once(event + ':down');
	        },

	        _commandFrom: function (event, context) {
	            var promise = this.on(event + ':up', context);
	            return {
	                then: function (onResolve, onReject) {
	                    promise = promise.then(onResolve, onReject);
	                    return this;
	                },
	                end: function () {
	                    promise.then(function (data) {
	                        emitterProxy.trigger(event + ':down', data);
	                    });
	                }
	            };
	        },

	        _commands: {},

	        commandTo: function (event, data) {
	            if (!this._commands[event]) {
	                this._commands[event] = {
	                    id: 0
	                };
	            }
	            var id = this._commands[event].id;
	            this.trigger(event + ':uniqueBefore', this._commands[event].id++);
	            var self = this,
	                queue = [];
	            emitterProxy.once(event + ':uniqueAfter').then(function () {
	                var promise = self._commandTo(event + ':' + id++, data);
	                queue.forEach(function (obj) {
	                    promise = promise.then(obj.onResolve, obj.onReject);
	                });
	            });
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                }
	            };
	        },

	        commandFrom: function (event, context) {
	            var queue = [];
	            this.on(event + ':uniqueBefore', context).then(function (id) {
	                var promise = emitterProxy.once(event + ':' + id + ':up', context);
	                emitterProxy.trigger(event + ':uniqueAfter');
	                queue.forEach(function (obj) {
	                    promise = promise.bind(context).then(obj.onResolve, obj.onReject);
	                });
	                promise.then(function (data) {
	                    emitterProxy.trigger(event + ':' + id + ':down', data);
	                });
	            });
	            return {
	                then: function (onResolve, onReject) {
	                    queue.push({
	                        onResolve: onResolve,
	                        onReject: onReject
	                    });
	                    return this;
	                }
	            };
	        },

	        Promise: Promise,

	        emitter: emitter
	    };

	    return emitterProxy;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/* jshint -W014, -W116, -W106, -W064, -W097, -W079 */
	/* global process, global */
	/**
	 * @preserve Copyright (c) 2013 Petka Antonov
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	"use strict";
	//TODO Prevent passing the same function identity multiple times as a listener
	//for the same event

	//TODO maxListeners API

	var INITIAL_DISTINCT_HANDLER_TYPES = 6;
	var domain;
	var Array = global.Array;
	var isArray = Array.isArray;
	var objectCreate = Object.create;

	function EventEmitter() {
	    this.domain = null;
	    if (EventEmitter.usingDomains) {
	        domain = domain || __webpack_require__(9);
	        if (domain.active && !(this instanceof domain.Domain)) {
	            this.domain = domain.active;
	        }
	    }
	    this._maybeInit();
	}

	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.prototype.setMaxListeners = function EventEmitter$setMaxListeners(n) {
	    if (n >>> 0 !== n) {
	        throw TypeError("n must be a positive integer");
	    }
	    this._maxListeners = n;
	    return this;
	};

	EventEmitter.prototype.emit = function EventEmitter$emit(type, a1, a2) {
	    if (type === void 0) return false;
	    if (typeof type !== "string") type = "" + type;
	    this._maybeInit();

	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        if (type === "error") {
	            this._emitError(a1);
	        }
	        return false;
	    }

	    var k = index + 1;
	    var len = k + this._eventSpace;
	    var argc = arguments.length;

	    if (this.domain != null && this !== process) {
	        this.domain.enter();
	    }

	    var eventsWereFired = false;
	    if (argc > 3) {
	        var args = new Array(argc - 1);
	        for (var i = 0, len = args.length; i < len; ++i) {
	            args[i] = arguments[i + 1];
	        }
	        eventsWereFired = this._emitApply(k, len, args);
	    } else if (len - k === 1) {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emitSingle0(k);break;
	            case 2:
	                eventsWereFired = this._emitSingle1(k, a1);break;
	            case 3:
	                eventsWereFired = this._emitSingle2(k, a1, a2);break;
	        }
	    } else {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emit0(k, len);break;
	            case 2:
	                eventsWereFired = this._emit1(k, len, a1);break;
	            case 3:
	                eventsWereFired = this._emit2(k, len, a1, a2);break;
	        }
	    }

	    if (this.domain != null && this !== process) {
	        this.domain.exit();
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on = function EventEmitter$addListener(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    events[index] = listener;
	    events[index].context = context;
	    return this;
	};

	EventEmitter.prototype.once = function EventEmitter$once(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    var self = this;
	    function s() {
	        self.removeListener(type, s);
	        return listener.apply(this, arguments);
	    }
	    events[index] = s;
	    s.listener = listener;
	    s.context = context;
	    return this;
	};

	EventEmitter.prototype.listeners = function EventEmitter$listeners(type) {
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return [];
	    }
	    var ret = [];
	    var k = index + 1;
	    var m = k + this._eventSpace;
	    var events = this._events;
	    for (; k < m; ++k) {
	        if (events[k] === void 0) {
	            break;
	        }
	        ret.push(events[k]);
	    }
	    return ret;
	};

	EventEmitter.prototype.removeListener = function EventEmitter$removeListener(type, listener) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var j = k;
	    var len = k + eventSpace;
	    var skips = 0;
	    var removeListenerIndex = -2;

	    for (; k < len; ++k) {
	        var item = events[k];
	        if (item === listener || item !== void 0 && item.listener === listener) {
	            skips++;
	            events[k] = void 0;
	            if (removeListenerIndex === -2) {
	                removeListenerIndex = this._indexOfEvent("removeListener");
	            }
	            if (removeListenerIndex >= 0) {
	                this._emitRemove(type, listener);
	            }
	        } else {
	            events[j++] = item;
	        }
	    }

	    for (k = len - skips; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.prototype.removeAllListeners = function EventEmitter$removeAllListeners(type) {
	    this._maybeInit();
	    if (type === void 0) {
	        if (this._indexOfEvent("removeListener") >= 0) {
	            this._emitRemoveAll(void 0);
	        }
	        var events = this._events = new Array(this._events.length);
	        this._initSpace(events);
	        return this;
	    }
	    if (typeof type !== "string") type = "" + type;

	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var len = k + eventSpace;
	    if (this._indexOfEvent("removeListener") >= 0) {
	        this._emitRemoveAll(type);
	    }
	    for (; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	    if (!(emitter instanceof EventEmitter)) {
	        throw new TypeError("Not an event emitter");
	    }

	    var total = 0;
	    var events = emitter._events;
	    if (!isArray(events)) {
	        return 0;
	    }
	    var len = events.length;
	    if (type === void 0) {
	        for (var i = 0; i < len; ++i) {
	            if (typeof events[i] === "function") total++;
	        }
	    } else {
	        if (typeof type !== "string") type = "" + type;
	        var index = this._indexOfEvent(type) + 1;
	        var eventSpace = this._eventSpace;
	        var k = index;
	        var m = index + eventSpace;
	        for (; k < m; ++k) {
	            if (typeof events[k] === "function") total++;
	        }
	    }
	    return total;
	};

	EventEmitter.prototype._resizeForHandlers = function EventEmitter$_resizeForHandlers() {
	    var events = this._events;
	    var tmp = new Array(events.length);
	    for (var i = 0, len = tmp.length; i < len; ++i) {
	        tmp[i] = events[i];
	    }
	    var oldEventSpace = this._eventSpace;
	    var newEventSpace = this._eventSpace = oldEventSpace * 2 + 2;
	    var length = events.length = (newEventSpace + 1) * Math.max(this._eventCount, INITIAL_DISTINCT_HANDLER_TYPES) | 0;

	    newEventSpace++;
	    oldEventSpace++;
	    for (var i = 0, j = 0; i < length; i += newEventSpace, j += oldEventSpace) {

	        var k = j;
	        var m = k + oldEventSpace;
	        var n = 0;
	        for (; k < m; ++k) {
	            events[i + n] = tmp[k];
	            n++;
	        }

	        k = i + n;
	        m = i + newEventSpace;
	        for (; k < m; ++k) {
	            events[k] = void 0;
	        }
	    }
	};

	EventEmitter.prototype._doCompact = function EventEmitter$_doCompact() {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var shouldCompact = false;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j + 1] === void 0) {
	            shouldCompact = true;
	            break;
	        }
	        j += eventSpace;
	    }
	    if (!shouldCompact) return false;
	    j = 0;
	    var len = events.length;
	    var skips = 0;
	    for (var i = 0; i < len; i += eventSpace) {
	        var listener = events[i + 1];
	        if (listener === void 0) {
	            skips += eventSpace;
	        } else {
	            var k = i;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                events[j++] = events[k];
	            }
	        }
	    }
	    for (var i = len - skips; i < len; ++i) {
	        events[i] = void 0;
	    }
	    return true;
	};

	EventEmitter.prototype._resizeForEvents = function EventEmitter$_resizeForEvents() {
	    if (this._doCompact()) {
	        return;
	    }
	    var events = this._events;
	    var oldLength = events.length;
	    var newLength = (this._eventSpace + 1) * Math.max(this._eventCount * 2, INITIAL_DISTINCT_HANDLER_TYPES);
	    for (var i = oldLength; i < newLength; ++i) {
	        events.push(void 0);
	    }
	};

	EventEmitter.prototype._emitRemoveAll = function EventEmitter$_emitRemoveAll(type) {
	    var events = this._events;
	    if (type === void 0) {
	        var len = events.length;
	        var eventSpace = this._eventSpace + 1;
	        for (var i = 0; i < len; i += eventSpace) {
	            var emitType = events[i];
	            var k = i + 1;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                var listener = events[k];
	                if (listener === void 0) {
	                    break;
	                }
	                this._emitRemove(emitType, listener.listener ? listener.listener : listener);
	            }
	        }
	    } else {
	        var k = this._indexOfEvent(type) + 1;
	        var m = k + this._eventSpace + 1;

	        for (; k < m; ++k) {
	            var listener = events[k];
	            if (listener === void 0) {
	                break;
	            }
	            this._emitRemove(type, listener.listener ? listener.listener : listener);
	        }
	    }
	};

	EventEmitter.prototype._emitRemove = function EventEmitter$_emitRemove(type, fn) {
	    this.emit("removeListener", type, fn);
	};

	EventEmitter.prototype._emitNew = function EventEmitter$_emitNew(type, fn) {
	    var i = this._indexOfEvent("newListener ");
	    if (i < 0) return;
	    this.emit("newListener", type, fn);
	};

	EventEmitter.prototype._indexOfEvent = function EventEmitter$_indexOfEvent(eventName) {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j] === eventName) {
	            return j;
	        }
	        j += eventSpace;
	    }
	    return -1;
	};

	EventEmitter.prototype._warn = function EventEmitter$_warn(eventName, listenerCount) {
	    if (!this.__warnMap) {
	        this.__warnMap = objectCreate(null);
	    }
	    if (!this.__warnMap[eventName]) {
	        this.__warnMap[eventName] = true;
	        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", listenerCount);
	        console.trace();
	    }
	};

	EventEmitter.prototype._checkListenerLeak = function EventEmitter$_checkListenerLeak(eventName, listenerCount) {
	    var max = this._maxListeners;
	    if (max < 0) {
	        max = EventEmitter.defaultMaxListeners;
	    }
	    if (max >>> 0 === max && max > 0) {
	        if (listenerCount > max) {
	            this._warn(eventName, listenerCount);
	        }
	    }
	};

	EventEmitter.prototype._nextFreeIndex = function EventEmitter$_nextFreeIndex(eventName) {
	    var eventSpace = this._eventSpace + 1;
	    var events = this._events;
	    var length = events.length;
	    for (var i = 0; i < length; i += eventSpace) {
	        var event = events[i];
	        if (event === eventName) {
	            var k = i + 1;
	            var len = i + eventSpace;
	            for (; k < len; ++k) {
	                if (events[k] === void 0) {
	                    this._checkListenerLeak(eventName, k - i);
	                    return k;
	                }
	            }
	            this._resizeForHandlers();
	            return this._nextFreeIndex(eventName);
	        }
	        //Don't check leaks when there is 1 listener
	        else if (event === void 0) {
	                events[i] = eventName;
	                this._eventCount++;
	                return i + 1;
	            } else if (events[i + 1] === void 0) {
	                events[i] = eventName;
	                return i + 1;
	            }
	    }
	    this._resizeForEvents();
	    return this._nextFreeIndex(eventName);
	};

	EventEmitter.prototype._emitError = function EventEmitter$_emitError(e) {
	    if (this.domain != null) {
	        if (!e) {
	            e = new TypeError("Uncaught, unspecified 'error' event.");
	        }
	        e.domainEmitter = this;
	        e.domain = this.domain;
	        e.domainThrown = false;
	        this.domain.emit("error", e);
	    } else if (e instanceof Error) {
	        throw e;
	    } else {
	        throw new TypeError("Uncaught, unspecified 'error' event.");
	    }
	};

	EventEmitter.prototype._emitApply = function EventEmitter$_emitApply(index, length, args) {
	    var eventsWereFired = false;
	    var multipleListeners = length - index > 1;
	    var events = this._events;
	    var event = events[index];
	    if (!multipleListeners) {
	        if (event !== void 0) {
	            event.apply(event.context, args);
	            return true;
	        }
	        return false;
	    }
	    var next = void 0;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (multipleListeners && index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.apply(event.context, args);
	        //The current listener was removed from its own callback
	        if (multipleListeners && index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emitSingle0 = function EventEmitter$_emitSingle0(index) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle1 = function EventEmitter$_emitSingle1(index, a1) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle2 = function EventEmitter$_emitSingle2(index, a1, a2) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1, a2);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emit0 = function EventEmitter$_emit0(index, length) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit1 = function EventEmitter$_emit1(index, length, a1) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit2 = function EventEmitter$_emit2(index, length, a1, a2) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1, a2);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	//eventSpace =
	//The reserved space for handlers of a distinct event type

	//eventCount =
	//The amount of unique event types currently registered.
	//Might not be the actual amount

	EventEmitter.prototype._maybeInit = function EventEmitter$_maybeInit() {
	    if (!isArray(this._events)) {
	        if (this._maxListeners >>> 0 !== this._maxListeners) {
	            this._maxListeners = -1;
	        }
	        this._eventSpace = 1;
	        this._eventCount = 0;
	        var events = this._events = new Array((this._eventSpace + 1) * INITIAL_DISTINCT_HANDLER_TYPES | 0);
	        this._initSpace(events);
	    }
	};

	EventEmitter.prototype._initSpace = function EventEmitter$_initSpace(events) {
	    var len = events.length;
	    for (var i = 0; i < len; ++i) {
	        events[i] = void 0;
	    }
	};

	module.exports = EventEmitter;

	/* jshint -W014, -W116, -W106, -W064, -W097, -W079 */
	/* global process, global */
	/**
	 * @preserve Copyright (c) 2013 Petka Antonov
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:</p>
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	"use strict";
	//TODO Prevent passing the same function identity multiple times as a listener
	//for the same event

	//TODO maxListeners API

	var INITIAL_DISTINCT_HANDLER_TYPES = 6;
	var domain;
	var Array = global.Array;
	var isArray = Array.isArray;
	var objectCreate = Object.create;

	function EventEmitter() {
	    this.domain = null;
	    if (EventEmitter.usingDomains) {
	        domain = domain || __webpack_require__(9);
	        if (domain.active && !(this instanceof domain.Domain)) {
	            this.domain = domain.active;
	        }
	    }
	    this._maybeInit();
	}

	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.prototype.setMaxListeners = function EventEmitter$setMaxListeners(n) {
	    if (n >>> 0 !== n) {
	        throw TypeError("n must be a positive integer");
	    }
	    this._maxListeners = n;
	    return this;
	};

	EventEmitter.prototype.emit = function EventEmitter$emit(type, a1, a2) {
	    if (type === void 0) return false;
	    if (typeof type !== "string") type = "" + type;
	    this._maybeInit();

	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        if (type === "error") {
	            this._emitError(a1);
	        }
	        return false;
	    }

	    var k = index + 1;
	    var len = k + this._eventSpace;
	    var argc = arguments.length;

	    if (this.domain != null && this !== process) {
	        this.domain.enter();
	    }

	    var eventsWereFired = false;
	    if (argc > 3) {
	        var args = new Array(argc - 1);
	        for (var i = 0, len = args.length; i < len; ++i) {
	            args[i] = arguments[i + 1];
	        }
	        eventsWereFired = this._emitApply(k, len, args);
	    } else if (len - k === 1) {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emitSingle0(k);break;
	            case 2:
	                eventsWereFired = this._emitSingle1(k, a1);break;
	            case 3:
	                eventsWereFired = this._emitSingle2(k, a1, a2);break;
	        }
	    } else {
	        switch (argc) {
	            case 1:
	                eventsWereFired = this._emit0(k, len);break;
	            case 2:
	                eventsWereFired = this._emit1(k, len, a1);break;
	            case 3:
	                eventsWereFired = this._emit2(k, len, a1, a2);break;
	        }
	    }

	    if (this.domain != null && this !== process) {
	        this.domain.exit();
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype.addListener = EventEmitter.prototype.on = function EventEmitter$addListener(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    events[index] = listener;
	    events[index].context = context;
	    return this;
	};

	EventEmitter.prototype.once = function EventEmitter$once(type, listener, context) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    this._emitNew(type, listener);
	    var index = this._nextFreeIndex(type);
	    var events = this._events;
	    var self = this;
	    function s() {
	        self.removeListener(type, s);
	        return listener.apply(this, arguments);
	    }
	    events[index] = s;
	    s.listener = listener;
	    s.context = context;
	    return this;
	};

	EventEmitter.prototype.listeners = function EventEmitter$listeners(type) {
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return [];
	    }
	    var ret = [];
	    var k = index + 1;
	    var m = k + this._eventSpace;
	    var events = this._events;
	    for (; k < m; ++k) {
	        if (events[k] === void 0) {
	            break;
	        }
	        ret.push(events[k]);
	    }
	    return ret;
	};

	EventEmitter.prototype.removeListener = function EventEmitter$removeListener(type, listener) {
	    if (typeof listener !== "function") throw new TypeError("listener must be a function");
	    if (typeof type !== "string") type = "" + type;

	    this._maybeInit();
	    var index = this._indexOfEvent(type);

	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var j = k;
	    var len = k + eventSpace;
	    var skips = 0;
	    var removeListenerIndex = -2;

	    for (; k < len; ++k) {
	        var item = events[k];
	        if (item === listener || item !== void 0 && item.listener === listener) {
	            skips++;
	            events[k] = void 0;
	            if (removeListenerIndex === -2) {
	                removeListenerIndex = this._indexOfEvent("removeListener");
	            }
	            if (removeListenerIndex >= 0) {
	                this._emitRemove(type, listener);
	            }
	        } else {
	            events[j++] = item;
	        }
	    }

	    for (k = len - skips; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.prototype.removeAllListeners = function EventEmitter$removeAllListeners(type) {
	    this._maybeInit();
	    if (type === void 0) {
	        if (this._indexOfEvent("removeListener") >= 0) {
	            this._emitRemoveAll(void 0);
	        }
	        var events = this._events = new Array(this._events.length);
	        this._initSpace(events);
	        return this;
	    }
	    if (typeof type !== "string") type = "" + type;

	    var index = this._indexOfEvent(type);
	    if (index < 0) {
	        return this;
	    }
	    var events = this._events;
	    var eventSpace = this._eventSpace;
	    var k = index + 1;
	    var len = k + eventSpace;
	    if (this._indexOfEvent("removeListener") >= 0) {
	        this._emitRemoveAll(type);
	    }
	    for (; k < len; ++k) {
	        events[k] = void 0;
	    }

	    return this;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	    if (!(emitter instanceof EventEmitter)) {
	        throw new TypeError("Not an event emitter");
	    }

	    var total = 0;
	    var events = emitter._events;
	    if (!isArray(events)) {
	        return 0;
	    }
	    var len = events.length;
	    if (type === void 0) {
	        for (var i = 0; i < len; ++i) {
	            if (typeof events[i] === "function") total++;
	        }
	    } else {
	        if (typeof type !== "string") type = "" + type;
	        var index = this._indexOfEvent(type) + 1;
	        var eventSpace = this._eventSpace;
	        var k = index;
	        var m = index + eventSpace;
	        for (; k < m; ++k) {
	            if (typeof events[k] === "function") total++;
	        }
	    }
	    return total;
	};

	EventEmitter.prototype._resizeForHandlers = function EventEmitter$_resizeForHandlers() {
	    var events = this._events;
	    var tmp = new Array(events.length);
	    for (var i = 0, len = tmp.length; i < len; ++i) {
	        tmp[i] = events[i];
	    }
	    var oldEventSpace = this._eventSpace;
	    var newEventSpace = this._eventSpace = oldEventSpace * 2 + 2;
	    var length = events.length = (newEventSpace + 1) * Math.max(this._eventCount, INITIAL_DISTINCT_HANDLER_TYPES) | 0;

	    newEventSpace++;
	    oldEventSpace++;
	    for (var i = 0, j = 0; i < length; i += newEventSpace, j += oldEventSpace) {

	        var k = j;
	        var m = k + oldEventSpace;
	        var n = 0;
	        for (; k < m; ++k) {
	            events[i + n] = tmp[k];
	            n++;
	        }

	        k = i + n;
	        m = i + newEventSpace;
	        for (; k < m; ++k) {
	            events[k] = void 0;
	        }
	    }
	};

	EventEmitter.prototype._doCompact = function EventEmitter$_doCompact() {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var shouldCompact = false;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j + 1] === void 0) {
	            shouldCompact = true;
	            break;
	        }
	        j += eventSpace;
	    }
	    if (!shouldCompact) return false;
	    j = 0;
	    var len = events.length;
	    var skips = 0;
	    for (var i = 0; i < len; i += eventSpace) {
	        var listener = events[i + 1];
	        if (listener === void 0) {
	            skips += eventSpace;
	        } else {
	            var k = i;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                events[j++] = events[k];
	            }
	        }
	    }
	    for (var i = len - skips; i < len; ++i) {
	        events[i] = void 0;
	    }
	    return true;
	};

	EventEmitter.prototype._resizeForEvents = function EventEmitter$_resizeForEvents() {
	    if (this._doCompact()) {
	        return;
	    }
	    var events = this._events;
	    var oldLength = events.length;
	    var newLength = (this._eventSpace + 1) * Math.max(this._eventCount * 2, INITIAL_DISTINCT_HANDLER_TYPES);
	    for (var i = oldLength; i < newLength; ++i) {
	        events.push(void 0);
	    }
	};

	EventEmitter.prototype._emitRemoveAll = function EventEmitter$_emitRemoveAll(type) {
	    var events = this._events;
	    if (type === void 0) {
	        var len = events.length;
	        var eventSpace = this._eventSpace + 1;
	        for (var i = 0; i < len; i += eventSpace) {
	            var emitType = events[i];
	            var k = i + 1;
	            var m = k + eventSpace;
	            for (; k < m; ++k) {
	                var listener = events[k];
	                if (listener === void 0) {
	                    break;
	                }
	                this._emitRemove(emitType, listener.listener ? listener.listener : listener);
	            }
	        }
	    } else {
	        var k = this._indexOfEvent(type) + 1;
	        var m = k + this._eventSpace + 1;

	        for (; k < m; ++k) {
	            var listener = events[k];
	            if (listener === void 0) {
	                break;
	            }
	            this._emitRemove(type, listener.listener ? listener.listener : listener);
	        }
	    }
	};

	EventEmitter.prototype._emitRemove = function EventEmitter$_emitRemove(type, fn) {
	    this.emit("removeListener", type, fn);
	};

	EventEmitter.prototype._emitNew = function EventEmitter$_emitNew(type, fn) {
	    var i = this._indexOfEvent("newListener ");
	    if (i < 0) return;
	    this.emit("newListener", type, fn);
	};

	EventEmitter.prototype._indexOfEvent = function EventEmitter$_indexOfEvent(eventName) {
	    var j = 0;
	    var eventSpace = this._eventSpace + 1;
	    var eventCount = this._eventCount;
	    var events = this._events;
	    for (var i = 0; i < eventCount; ++i) {
	        if (events[j] === eventName) {
	            return j;
	        }
	        j += eventSpace;
	    }
	    return -1;
	};

	EventEmitter.prototype._warn = function EventEmitter$_warn(eventName, listenerCount) {
	    if (!this.__warnMap) {
	        this.__warnMap = objectCreate(null);
	    }
	    if (!this.__warnMap[eventName]) {
	        this.__warnMap[eventName] = true;
	        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", listenerCount);
	        console.trace();
	    }
	};

	EventEmitter.prototype._checkListenerLeak = function EventEmitter$_checkListenerLeak(eventName, listenerCount) {
	    var max = this._maxListeners;
	    if (max < 0) {
	        max = EventEmitter.defaultMaxListeners;
	    }
	    if (max >>> 0 === max && max > 0) {
	        if (listenerCount > max) {
	            this._warn(eventName, listenerCount);
	        }
	    }
	};

	EventEmitter.prototype._nextFreeIndex = function EventEmitter$_nextFreeIndex(eventName) {
	    var eventSpace = this._eventSpace + 1;
	    var events = this._events;
	    var length = events.length;
	    for (var i = 0; i < length; i += eventSpace) {
	        var event = events[i];
	        if (event === eventName) {
	            var k = i + 1;
	            var len = i + eventSpace;
	            for (; k < len; ++k) {
	                if (events[k] === void 0) {
	                    this._checkListenerLeak(eventName, k - i);
	                    return k;
	                }
	            }
	            this._resizeForHandlers();
	            return this._nextFreeIndex(eventName);
	        }
	        //Don't check leaks when there is 1 listener
	        else if (event === void 0) {
	                events[i] = eventName;
	                this._eventCount++;
	                return i + 1;
	            } else if (events[i + 1] === void 0) {
	                events[i] = eventName;
	                return i + 1;
	            }
	    }
	    this._resizeForEvents();
	    return this._nextFreeIndex(eventName);
	};

	EventEmitter.prototype._emitError = function EventEmitter$_emitError(e) {
	    if (this.domain != null) {
	        if (!e) {
	            e = new TypeError("Uncaught, unspecified 'error' event.");
	        }
	        e.domainEmitter = this;
	        e.domain = this.domain;
	        e.domainThrown = false;
	        this.domain.emit("error", e);
	    } else if (e instanceof Error) {
	        throw e;
	    } else {
	        throw new TypeError("Uncaught, unspecified 'error' event.");
	    }
	};

	EventEmitter.prototype._emitApply = function EventEmitter$_emitApply(index, length, args) {
	    var eventsWereFired = false;
	    var multipleListeners = length - index > 1;
	    var events = this._events;
	    var event = events[index];
	    if (!multipleListeners) {
	        if (event !== void 0) {
	            event.apply(event.context, args);
	            return true;
	        }
	        return false;
	    }
	    var next = void 0;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (multipleListeners && index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.apply(event.context, args);
	        //The current listener was removed from its own callback
	        if (multipleListeners && index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emitSingle0 = function EventEmitter$_emitSingle0(index) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle1 = function EventEmitter$_emitSingle1(index, a1) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emitSingle2 = function EventEmitter$_emitSingle2(index, a1, a2) {
	    var event = this._events[index];
	    if (event !== void 0) {
	        event.call(event.context, a1, a2);
	        return true;
	    }
	    return false;
	};

	EventEmitter.prototype._emit0 = function EventEmitter$_emit0(index, length) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit1 = function EventEmitter$_emit1(index, length, a1) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	EventEmitter.prototype._emit2 = function EventEmitter$_emit2(index, length, a1, a2) {
	    var eventsWereFired = false;
	    var next = void 0;
	    var events = this._events;
	    var event;
	    for (; index < length; ++index) {
	        event = events[index];
	        if (event === void 0) {
	            break;
	        }
	        eventsWereFired = true;
	        if (index + 1 < length) {
	            next = events[index + 1];
	        }
	        event.call(event.context, a1, a2);
	        //The current listener was removed from its own callback
	        if (index + 1 < length && next !== void 0 && next === events[index]) {
	            index--;
	            length--;
	        } else if (next === void 0) {
	            break;
	        }
	    }
	    return eventsWereFired;
	};

	//eventSpace =
	//The reserved space for handlers of a distinct event type

	//eventCount =
	//The amount of unique event types currently registered.
	//Might not be the actual amount

	EventEmitter.prototype._maybeInit = function EventEmitter$_maybeInit() {
	    if (!isArray(this._events)) {
	        if (this._maxListeners >>> 0 !== this._maxListeners) {
	            this._maxListeners = -1;
	        }
	        this._eventSpace = 1;
	        this._eventCount = 0;
	        var events = this._events = new Array((this._eventSpace + 1) * INITIAL_DISTINCT_HANDLER_TYPES | 0);
	        this._initSpace(events);
	    }
	};

	EventEmitter.prototype._initSpace = function EventEmitter$_initSpace(events) {
	    var len = events.length;
	    for (var i = 0; i < len; ++i) {
	        events[i] = void 0;
	    }
	};

	module.exports = EventEmitter;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	module.exports.defer = function (onFulfill, onReject) {
	    return {
	        _queue: [{
	            onFulfill: onFulfill,
	            onReject: onReject
	        }],
	        then: function (onFulfill, onReject) {
	            this._queue.push({
	                onFulfill: onFulfill,
	                onReject: onReject
	            });

	            return this;
	        }
	    };
	};

	//var GFP = Object.getPrototypeOf(function*(){});
	//if( !( Symbol.toStringTag in GFP ) ) {
	//	GFP[Symbol.toStringTag] = 'GeneratorFunction';
	//}
	//
	//console.log({}.toString.call(function*(){}));

	var genRegExp = /^function[\s]*\*/;
	var babelGenRegExp = /regeneratorRuntime/;

	module.exports.isGeneratorFunc = function (func) {
	    return typeof func === 'function' && (genRegExp.test(func.toString()) || babelGenRegExp.test(func.toString()));
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	function Signal() {}

	Signal.on = function (signal) {
		return 'on@' + signal;
	};

	Signal.once = function (signal) {
		return 'once@' + signal;
	};

	Signal.trigger = function (signal) {
		return 'trigger@' + signal;
	};

	Signal.command = function (signal) {
		return 'command@' + signal;
	};

	Signal.request = function (signal) {
		return 'request@' + signal;
	};

	module.exports = Signal;

/***/ },
/* 56 */,
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var mysql = __webpack_require__(58),
	    DbManager = __webpack_require__(137);

	function MysqlManager() {
	    this.connection = mysql.createConnection({
	        host: 'localhost',
	        user: 'root',
	        password: '119911',
	        database: 'test'
	    });

	    var self = this;
	    this.mediator.commandFrom('mysql:query').then(function (s) {
	        console.log(s);
	        return self.query(s);
	    });
	}

	MysqlManager.prototype = {
	    query: function (query_str) {
	        var _resolve, _reject, promise;

	        promise = new this.mediator.Promise(function (resolve, reject) {
	            _resolve = resolve;
	            _reject = reject;
	        });

	        this.connection.query(query_str, function (err, rows, field) {
	            if (err) {
	                _reject(err);
	            } else {
	                _resolve({
	                    rows: rows,
	                    field: field
	                });
	            }
	        });

	        return promise;
	    }
	};

	MysqlManager.extends(DbManager);

	module.exports = MysqlManager;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Classes = Object.create(null);

	/**
	 * Create a new Connection instance.
	 * @param {object} config
	 * @public
	 */
	exports.createConnection = function createConnection(config) {
	  var Connection = loadClass('Connection');
	  var ConnectionConfig = loadClass('ConnectionConfig');

	  return new Connection({ config: new ConnectionConfig(config) });
	};

	/**
	 * Create a new Pool instance.
	 * @param {object} config
	 * @public
	 */
	exports.createPool = function createPool(config) {
	  var Pool = loadClass('Pool');
	  var PoolConfig = loadClass('PoolConfig');

	  return new Pool({ config: new PoolConfig(config) });
	};

	/**
	 * Create a new PoolCluster instance.
	 * @param {object} config
	 * @public
	 */
	exports.createPoolCluster = function createPoolCluster(config) {
	  var PoolCluster = loadClass('PoolCluster');

	  return new PoolCluster(config);
	};

	/**
	 * Create a new Query instance.
	 * @public
	 */
	exports.createQuery = function createQuery(sql, values, callback) {
	  var Connection = loadClass('Connection');

	  return Connection.createQuery(sql, values, callback);
	};

	/**
	 * Escape a value for SQL.
	 * @param {*} value
	 * @param {boolean} [stringifyObjects=false]
	 * @param {string} [timeZone=local]
	 * @public
	 */
	exports.escape = function escape(value, stringifyObjects, timeZone) {
	  var SqlString = loadClass('SqlString');

	  return SqlString.escape(value, stringifyObjects, timeZone);
	};

	/**
	 * Escape an identifier for SQL.
	 * @param {*} value
	 * @param {boolean} [forbidQualified]
	 * @public
	 */
	exports.escapeId = function escapeId(value, forbidQualified) {
	  var SqlString = loadClass('SqlString');

	  return SqlString.escapeId(value, forbidQualified);
	};

	/**
	 * Format SQL and replacement values into a SQL string.
	 * @param {string} sql
	 * @param {array} [values]
	 * @param {boolean} [stringifyObjects=false]
	 * @param {string} [timeZone=local]
	 * @public
	 */
	exports.format = function format(sql, values, stringifyObjects, timeZone) {
	  var SqlString = loadClass('SqlString');

	  return SqlString.format(sql, values, stringifyObjects, timeZone);
	};

	/**
	 * The type constants.
	 * @public
	 */
	Object.defineProperty(exports, 'Types', {
	  get: loadClass.bind(null, 'Types')
	});

	/**
	 * Load the given class.
	 * @private
	 */
	function loadClass(className) {
	  var Class = Classes[className];

	  if (Class !== undefined) {
	    return Class;
	  }

	  // This uses a switch for static require analysis
	  switch (className) {
	    case 'Connection':
	      Class = __webpack_require__(59);
	      break;
	    case 'ConnectionConfig':
	      Class = __webpack_require__(75);
	      break;
	    case 'Pool':
	      Class = __webpack_require__(131);
	      break;
	    case 'PoolCluster':
	      Class = __webpack_require__(133);
	      break;
	    case 'PoolConfig':
	      Class = __webpack_require__(134);
	      break;
	    case 'SqlString':
	      Class = __webpack_require__(130);
	      break;
	    case 'Types':
	      Class = __webpack_require__(97);
	      break;
	    default:
	      throw new Error('Cannot find class \'' + className + '\'');
	  }

	  // Store to prevent invoking require()
	  Classes[className] = Class;

	  return Class;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Crypto = __webpack_require__(60);
	var Net = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var tls = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"tls\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ConnectionConfig = __webpack_require__(75);
	var Protocol = __webpack_require__(79);
	var SqlString = __webpack_require__(130);
	var Query = __webpack_require__(112);
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var Util = __webpack_require__(38);

	module.exports = Connection;
	Util.inherits(Connection, EventEmitter);
	function Connection(options) {
	  EventEmitter.call(this);

	  this.config = options.config;

	  this._socket = options.socket;
	  this._protocol = new Protocol({ config: this.config, connection: this });
	  this._connectCalled = false;
	  this.state = "disconnected";
	  this.threadId = null;
	}

	function bindToCurrentDomain(callback) {
	  if (!callback) return;

	  var domain = process.domain;

	  return domain ? domain.bind(callback) : callback;
	}

	Connection.createQuery = function createQuery(sql, values, callback) {
	  if (sql instanceof Query) {
	    return sql;
	  }

	  var cb = bindToCurrentDomain(callback);
	  var options = {};

	  if (typeof sql === 'function') {
	    cb = bindToCurrentDomain(sql);
	    return new Query(options, cb);
	  }

	  if (typeof sql === 'object') {
	    for (var prop in sql) {
	      options[prop] = sql[prop];
	    }

	    if (typeof values === 'function') {
	      cb = bindToCurrentDomain(values);
	    } else if (values !== undefined) {
	      options.values = values;
	    }

	    return new Query(options, cb);
	  }

	  options.sql = sql;
	  options.values = values;

	  if (typeof values === 'function') {
	    cb = bindToCurrentDomain(values);
	    options.values = undefined;
	  }

	  if (cb === undefined && callback !== undefined) {
	    throw new TypeError('argument callback must be a function when provided');
	  }

	  return new Query(options, cb);
	};

	Connection.prototype.connect = function connect(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  if (!this._connectCalled) {
	    this._connectCalled = true;

	    // Connect either via a UNIX domain socket or a TCP socket.
	    this._socket = this.config.socketPath ? Net.createConnection(this.config.socketPath) : Net.createConnection(this.config.port, this.config.host);

	    var connection = this;
	    this._protocol.on('data', function (data) {
	      connection._socket.write(data);
	    });
	    this._socket.on('data', function (data) {
	      connection._protocol.write(data);
	    });
	    this._protocol.on('end', function () {
	      connection._socket.end();
	    });
	    this._socket.on('end', function (err) {
	      connection._protocol.end();
	    });

	    this._socket.on('error', this._handleNetworkError.bind(this));
	    this._socket.on('connect', this._handleProtocolConnect.bind(this));
	    this._protocol.on('handshake', this._handleProtocolHandshake.bind(this));
	    this._protocol.on('unhandledError', this._handleProtocolError.bind(this));
	    this._protocol.on('drain', this._handleProtocolDrain.bind(this));
	    this._protocol.on('end', this._handleProtocolEnd.bind(this));
	    this._protocol.on('enqueue', this._handleProtocolEnqueue.bind(this));

	    if (this.config.connectTimeout) {
	      var handleConnectTimeout = this._handleConnectTimeout.bind(this);

	      this._socket.setTimeout(this.config.connectTimeout, handleConnectTimeout);
	      this._socket.once('connect', function () {
	        this.setTimeout(0, handleConnectTimeout);
	      });
	    }
	  }

	  this._protocol.handshake(options, bindToCurrentDomain(callback));
	};

	Connection.prototype.changeUser = function changeUser(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  this._implyConnect();

	  var charsetNumber = options.charset ? ConnectionConfig.getCharsetNumber(options.charset) : this.config.charsetNumber;

	  return this._protocol.changeUser({
	    user: options.user || this.config.user,
	    password: options.password || this.config.password,
	    database: options.database || this.config.database,
	    timeout: options.timeout,
	    charsetNumber: charsetNumber,
	    currentConfig: this.config
	  }, bindToCurrentDomain(callback));
	};

	Connection.prototype.beginTransaction = function beginTransaction(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  options = options || {};
	  options.sql = 'START TRANSACTION';
	  options.values = null;

	  return this.query(options, callback);
	};

	Connection.prototype.commit = function commit(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  options = options || {};
	  options.sql = 'COMMIT';
	  options.values = null;

	  return this.query(options, callback);
	};

	Connection.prototype.rollback = function rollback(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  options = options || {};
	  options.sql = 'ROLLBACK';
	  options.values = null;

	  return this.query(options, callback);
	};

	Connection.prototype.query = function query(sql, values, cb) {
	  var query = Connection.createQuery(sql, values, cb);
	  query._connection = this;

	  if (!(typeof sql == 'object' && 'typeCast' in sql)) {
	    query.typeCast = this.config.typeCast;
	  }

	  if (query.sql) {
	    query.sql = this.format(query.sql, query.values);
	  }

	  this._implyConnect();

	  return this._protocol._enqueue(query);
	};

	Connection.prototype.ping = function ping(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  this._implyConnect();
	  this._protocol.ping(options, bindToCurrentDomain(callback));
	};

	Connection.prototype.statistics = function statistics(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  this._implyConnect();
	  this._protocol.stats(options, bindToCurrentDomain(callback));
	};

	Connection.prototype.end = function end(options, callback) {
	  var cb = callback;
	  var opts = options;

	  if (!callback && typeof options === 'function') {
	    cb = options;
	    opts = null;
	  }

	  // create custom options reference
	  opts = Object.create(opts || null);

	  if (opts.timeout === undefined) {
	    // default timeout of 30 seconds
	    opts.timeout = 30000;
	  }

	  this._implyConnect();
	  this._protocol.quit(opts, bindToCurrentDomain(cb));
	};

	Connection.prototype.destroy = function () {
	  this.state = "disconnected";
	  this._implyConnect();
	  this._socket.destroy();
	  this._protocol.destroy();
	};

	Connection.prototype.pause = function () {
	  this._socket.pause();
	  this._protocol.pause();
	};

	Connection.prototype.resume = function () {
	  this._socket.resume();
	  this._protocol.resume();
	};

	Connection.prototype.escape = function (value) {
	  return SqlString.escape(value, false, this.config.timezone);
	};

	Connection.prototype.escapeId = function escapeId(value) {
	  return SqlString.escapeId(value, false);
	};

	Connection.prototype.format = function (sql, values) {
	  if (typeof this.config.queryFormat == "function") {
	    return this.config.queryFormat.call(this, sql, values, this.config.timezone);
	  }
	  return SqlString.format(sql, values, this.config.stringifyObjects, this.config.timezone);
	};

	if (tls.TLSSocket) {
	  // 0.11+ environment
	  Connection.prototype._startTLS = function _startTLS(onSecure) {
	    var secureContext = tls.createSecureContext({
	      ca: this.config.ssl.ca,
	      cert: this.config.ssl.cert,
	      ciphers: this.config.ssl.ciphers,
	      key: this.config.ssl.key,
	      passphrase: this.config.ssl.passphrase
	    });

	    // "unpipe"
	    this._socket.removeAllListeners('data');
	    this._protocol.removeAllListeners('data');

	    // socket <-> encrypted
	    var rejectUnauthorized = this.config.ssl.rejectUnauthorized;
	    var secureSocket = new tls.TLSSocket(this._socket, {
	      rejectUnauthorized: rejectUnauthorized,
	      requestCert: true,
	      secureContext: secureContext,
	      isServer: false
	    });

	    // cleartext <-> protocol
	    secureSocket.pipe(this._protocol);
	    this._protocol.on('data', function (data) {
	      secureSocket.write(data);
	    });

	    secureSocket.on('secure', function () {
	      onSecure(rejectUnauthorized ? this.ssl.verifyError() : null);
	    });

	    // start TLS communications
	    secureSocket._start();
	  };
	} else {
	  // pre-0.11 environment
	  Connection.prototype._startTLS = function _startTLS(onSecure) {
	    // before TLS:
	    //  _socket <-> _protocol
	    // after:
	    //  _socket <-> securePair.encrypted <-> securePair.cleartext <-> _protocol

	    var credentials = Crypto.createCredentials({
	      ca: this.config.ssl.ca,
	      cert: this.config.ssl.cert,
	      ciphers: this.config.ssl.ciphers,
	      key: this.config.ssl.key,
	      passphrase: this.config.ssl.passphrase
	    });

	    var rejectUnauthorized = this.config.ssl.rejectUnauthorized;
	    var securePair = tls.createSecurePair(credentials, false, true, rejectUnauthorized);

	    // "unpipe"
	    this._socket.removeAllListeners('data');
	    this._protocol.removeAllListeners('data');

	    // socket <-> encrypted
	    securePair.encrypted.pipe(this._socket);
	    this._socket.on('data', function (data) {
	      securePair.encrypted.write(data);
	    });

	    // cleartext <-> protocol
	    securePair.cleartext.pipe(this._protocol);
	    this._protocol.on('data', function (data) {
	      securePair.cleartext.write(data);
	    });

	    securePair.on('secure', function () {
	      if (!rejectUnauthorized) {
	        onSecure();
	        return;
	      }

	      var verifyError = this.ssl.verifyError();
	      var err = verifyError;

	      // node.js 0.6 support
	      if (typeof err === 'string') {
	        err = new Error(verifyError);
	        err.code = verifyError;
	      }

	      onSecure(err);
	    });
	  };
	}

	Connection.prototype._handleConnectTimeout = function () {
	  if (this._socket) {
	    this._socket.setTimeout(0);
	    this._socket.destroy();
	  }

	  var err = new Error('connect ETIMEDOUT');
	  err.errorno = 'ETIMEDOUT';
	  err.code = 'ETIMEDOUT';
	  err.syscall = 'connect';

	  this._handleNetworkError(err);
	};

	Connection.prototype._handleNetworkError = function (err) {
	  this._protocol.handleNetworkError(err);
	};

	Connection.prototype._handleProtocolError = function (err) {
	  this.state = "protocol_error";
	  this.emit('error', err);
	};

	Connection.prototype._handleProtocolDrain = function () {
	  this.emit('drain');
	};

	Connection.prototype._handleProtocolConnect = function () {
	  this.state = "connected";
	  this.emit('connect');
	};

	Connection.prototype._handleProtocolHandshake = function _handleProtocolHandshake(packet) {
	  this.state = "authenticated";
	  this.threadId = packet.threadId;
	};

	Connection.prototype._handleProtocolEnd = function (err) {
	  this.state = "disconnected";
	  this.emit('end', err);
	};

	Connection.prototype._handleProtocolEnqueue = function _handleProtocolEnqueue(sequence) {
	  this.emit('enqueue', sequence);
	};

	Connection.prototype._implyConnect = function () {
	  if (!this._connectCalled) {
	    this.connect();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(61);

	function error() {
	  var m = [].slice.call(arguments).join(' ');
	  throw new Error([m, 'we accept pull requests', 'http://github.com/dominictarr/crypto-browserify'].join('\n'));
	}

	exports.createHash = __webpack_require__(63);

	exports.createHmac = __webpack_require__(72);

	exports.randomBytes = function (size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)));
	    } catch (err) {
	      callback(err);
	    }
	  } else {
	    return new Buffer(rng(size));
	  }
	};

	function each(a, f) {
	  for (var i in a) f(a[i], i);
	}

	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160'];
	};

	var p = __webpack_require__(73)(exports);
	exports.pbkdf2 = p.pbkdf2;
	exports.pbkdf2Sync = p.pbkdf2Sync;

	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials', 'createCipher', 'createCipheriv', 'createDecipher', 'createDecipheriv', 'createSign', 'createVerify', 'createDiffieHellman'], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet');
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function () {
	  var g = ('undefined' === typeof window ? global : window) || {};
	  _crypto = g.crypto || g.msCrypto || __webpack_require__(62);
	  module.exports = function (size) {
	    // Modern Browsers
	    if (_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */

	      _crypto.getRandomValues(bytes);
	      return bytes;
	    } else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size);
	    } else throw new Error('secure random number generation not supported by this browser\n' + 'use chrome, FireFox or Internet Explorer 11');
	  };
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(21).Buffer))

/***/ },
/* 62 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(64);

	var md5 = toConstructor(__webpack_require__(69));
	var rmd160 = toConstructor(__webpack_require__(71));

	function toConstructor(fn) {
	  return function () {
	    var buffers = [];
	    var m = {
	      update: function (data, enc) {
	        if (!Buffer.isBuffer(data)) data = new Buffer(data, enc);
	        buffers.push(data);
	        return this;
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers);
	        var r = fn(buf);
	        buffers = null;
	        return enc ? r.toString(enc) : r;
	      }
	    };
	    return m;
	  };
	}

	module.exports = function (alg) {
	  if ('md5' === alg) return new md5();
	  if ('rmd160' === alg) return new rmd160();
	  return createHash(alg);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg];
	  if (!Alg) throw new Error(alg + ' is not supported (we accept pull requests)');
	  return new Alg();
	};

	var Buffer = __webpack_require__(21).Buffer;
	var Hash = __webpack_require__(65)(Buffer);

	exports.sha1 = __webpack_require__(66)(Buffer, Hash);
	exports.sha256 = __webpack_require__(67)(Buffer, Hash);
	exports.sha512 = __webpack_require__(68)(Buffer, Hash);

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {

	  //prototype class for hash functions
	  function Hash(blockSize, finalSize) {
	    this._block = new Buffer(blockSize); //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize;
	    this._blockSize = blockSize;
	    this._len = 0;
	    this._s = 0;
	  }

	  Hash.prototype.init = function () {
	    this._s = 0;
	    this._len = 0;
	  };

	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8";
	      data = new Buffer(data, enc);
	    }

	    var l = this._len += data.length;
	    var s = this._s = this._s || 0;
	    var f = 0;
	    var buffer = this._block;

	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - s % this._blockSize);
	      var ch = t - f;

	      for (var i = 0; i < ch; i++) {
	        buffer[s % this._blockSize + i] = data[i + f];
	      }

	      s += ch;
	      f += ch;

	      if (s % this._blockSize === 0) {
	        this._update(buffer);
	      }
	    }
	    this._s = s;

	    return this;
	  };

	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8;

	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80;

	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1);

	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block);
	      this._block.fill(0);
	    }

	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4);

	    var hash = this._update(this._block) || this._hash();

	    return enc ? hash.toString(enc) : hash;
	  };

	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass');
	  };

	  return Hash;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */

	var inherits = __webpack_require__(38).inherits;

	module.exports = function (Buffer, Hash) {

	  var A = 0 | 0;
	  var B = 4 | 0;
	  var C = 8 | 0;
	  var D = 12 | 0;
	  var E = 16 | 0;

	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80);

	  var POOL = [];

	  function Sha1() {
	    if (POOL.length) return POOL.pop().init();

	    if (!(this instanceof Sha1)) return new Sha1();
	    this._w = W;
	    Hash.call(this, 16 * 4, 14 * 4);

	    this._h = null;
	    this.init();
	  }

	  inherits(Sha1, Hash);

	  Sha1.prototype.init = function () {
	    this._a = 0x67452301;
	    this._b = 0xefcdab89;
	    this._c = 0x98badcfe;
	    this._d = 0x10325476;
	    this._e = 0xc3d2e1f0;

	    Hash.prototype.init.call(this);
	    return this;
	  };

	  Sha1.prototype._POOL = POOL;
	  Sha1.prototype._update = function (X) {

	    var a, b, c, d, e, _a, _b, _c, _d, _e;

	    a = _a = this._a;
	    b = _b = this._b;
	    c = _c = this._c;
	    d = _d = this._d;
	    e = _e = this._e;

	    var w = this._w;

	    for (var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j * 4) : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

	      var t = add(add(rol(a, 5), sha1_ft(j, b, c, d)), add(add(e, W), sha1_kt(j)));

	      e = d;
	      d = c;
	      c = rol(b, 30);
	      b = a;
	      a = t;
	    }

	    this._a = add(a, _a);
	    this._b = add(b, _b);
	    this._c = add(c, _c);
	    this._d = add(d, _d);
	    this._e = add(e, _e);
	  };

	  Sha1.prototype._hash = function () {
	    if (POOL.length < 100) POOL.push(this);
	    var H = new Buffer(20);
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a | 0, A);
	    H.writeInt32BE(this._b | 0, B);
	    H.writeInt32BE(this._c | 0, C);
	    H.writeInt32BE(this._d | 0, D);
	    H.writeInt32BE(this._e | 0, E);
	    return H;
	  };

	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if (t < 20) return b & c | ~b & d;
	    if (t < 40) return b ^ c ^ d;
	    if (t < 60) return b & c | b & d | c & d;
	    return b ^ c ^ d;
	  }

	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
	  }

	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return x + y | 0;
	    //lets see how this goes on testling.
	    //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    //  return (msw << 16) | (lsw & 0xFFFF);
	  }

	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return num << cnt | num >>> 32 - cnt;
	  }

	  return Sha1;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */

	var inherits = __webpack_require__(38).inherits;

	module.exports = function (Buffer, Hash) {

	  var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

	  var W = new Array(64);

	  function Sha256() {
	    this.init();

	    this._w = W; //new Array(64)

	    Hash.call(this, 16 * 4, 14 * 4);
	  }

	  inherits(Sha256, Hash);

	  Sha256.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, n) {
	    return X >>> n | X << 32 - n;
	  }

	  function R(X, n) {
	    return X >>> n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  function Sigma0256(x) {
	    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
	  }

	  function Sigma1256(x) {
	    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
	  }

	  function Gamma0256(x) {
	    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
	  }

	  function Gamma1256(x) {
	    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
	  }

	  Sha256.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var T1, T2;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16 ? M.readInt32BE(j * 4) : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16];

	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w;

	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g;g = f;f = e;e = d + T1;d = c;c = b;b = a;a = T1 + T2;
	    }

	    this._a = a + this._a | 0;
	    this._b = b + this._b | 0;
	    this._c = c + this._c | 0;
	    this._d = d + this._d | 0;
	    this._e = e + this._e | 0;
	    this._f = f + this._f | 0;
	    this._g = g + this._g | 0;
	    this._h = h + this._h | 0;
	  };

	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32);

	    H.writeInt32BE(this._a, 0);
	    H.writeInt32BE(this._b, 4);
	    H.writeInt32BE(this._c, 8);
	    H.writeInt32BE(this._d, 12);
	    H.writeInt32BE(this._e, 16);
	    H.writeInt32BE(this._f, 20);
	    H.writeInt32BE(this._g, 24);
	    H.writeInt32BE(this._h, 28);

	    return H;
	  };

	  return Sha256;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(38).inherits;

	module.exports = function (Buffer, Hash) {
	  var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];

	  var W = new Array(160);

	  function Sha512() {
	    this.init();
	    this._w = W;

	    Hash.call(this, 128, 112);
	  }

	  inherits(Sha512, Hash);

	  Sha512.prototype.init = function () {

	    this._a = 0x6a09e667 | 0;
	    this._b = 0xbb67ae85 | 0;
	    this._c = 0x3c6ef372 | 0;
	    this._d = 0xa54ff53a | 0;
	    this._e = 0x510e527f | 0;
	    this._f = 0x9b05688c | 0;
	    this._g = 0x1f83d9ab | 0;
	    this._h = 0x5be0cd19 | 0;

	    this._al = 0xf3bcc908 | 0;
	    this._bl = 0x84caa73b | 0;
	    this._cl = 0xfe94f82b | 0;
	    this._dl = 0x5f1d36f1 | 0;
	    this._el = 0xade682d1 | 0;
	    this._fl = 0x2b3e6c1f | 0;
	    this._gl = 0xfb41bd6b | 0;
	    this._hl = 0x137e2179 | 0;

	    this._len = this._s = 0;

	    return this;
	  };

	  function S(X, Xl, n) {
	    return X >>> n | Xl << 32 - n;
	  }

	  function Ch(x, y, z) {
	    return x & y ^ ~x & z;
	  }

	  function Maj(x, y, z) {
	    return x & y ^ x & z ^ y & z;
	  }

	  Sha512.prototype._update = function (M) {

	    var W = this._w;
	    var a, b, c, d, e, f, g, h;
	    var al, bl, cl, dl, el, fl, gl, hl;

	    a = this._a | 0;
	    b = this._b | 0;
	    c = this._c | 0;
	    d = this._d | 0;
	    e = this._e | 0;
	    f = this._f | 0;
	    g = this._g | 0;
	    h = this._h | 0;

	    al = this._al | 0;
	    bl = this._bl | 0;
	    cl = this._cl | 0;
	    dl = this._dl | 0;
	    el = this._el | 0;
	    fl = this._fl | 0;
	    gl = this._gl | 0;
	    hl = this._hl | 0;

	    for (var i = 0; i < 80; i++) {
	      var j = i * 2;

	      var Wi, Wil;

	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4);
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4);
	      } else {
	        var x = W[j - 15 * 2];
	        var xl = W[j - 15 * 2 + 1];
	        var gamma0 = S(x, xl, 1) ^ S(x, xl, 8) ^ x >>> 7;
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7);

	        x = W[j - 2 * 2];
	        xl = W[j - 2 * 2 + 1];
	        var gamma1 = S(x, xl, 19) ^ S(xl, x, 29) ^ x >>> 6;
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6);

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7 = W[j - 7 * 2];
	        var Wi7l = W[j - 7 * 2 + 1];

	        var Wi16 = W[j - 16 * 2];
	        var Wi16l = W[j - 16 * 2 + 1];

	        Wil = gamma0l + Wi7l;
	        Wi = gamma0 + Wi7 + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
	        Wil = Wil + gamma1l;
	        Wi = Wi + gamma1 + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
	        Wil = Wil + Wi16l;
	        Wi = Wi + Wi16 + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);

	        W[j] = Wi;
	        W[j + 1] = Wil;
	      }

	      var maj = Maj(a, b, c);
	      var majl = Maj(al, bl, cl);

	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7);
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7);
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9);
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9);

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j];
	      var Kil = K[j + 1];

	      var ch = Ch(e, f, g);
	      var chl = Ch(el, fl, gl);

	      var t1l = hl + sigma1l;
	      var t1 = h + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
	      t1l = t1l + chl;
	      t1 = t1 + ch + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
	      t1l = t1l + Kil;
	      t1 = t1 + Ki + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
	      t1l = t1l + Wil;
	      t1 = t1 + Wi + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2 = sigma0h + maj + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

	      h = g;
	      hl = gl;
	      g = f;
	      gl = fl;
	      f = e;
	      fl = el;
	      el = dl + t1l | 0;
	      e = d + t1 + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	      d = c;
	      dl = cl;
	      c = b;
	      cl = bl;
	      b = a;
	      bl = al;
	      al = t1l + t2l | 0;
	      a = t1 + t2 + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
	    }

	    this._al = this._al + al | 0;
	    this._bl = this._bl + bl | 0;
	    this._cl = this._cl + cl | 0;
	    this._dl = this._dl + dl | 0;
	    this._el = this._el + el | 0;
	    this._fl = this._fl + fl | 0;
	    this._gl = this._gl + gl | 0;
	    this._hl = this._hl + hl | 0;

	    this._a = this._a + a + (this._al >>> 0 < al >>> 0 ? 1 : 0) | 0;
	    this._b = this._b + b + (this._bl >>> 0 < bl >>> 0 ? 1 : 0) | 0;
	    this._c = this._c + c + (this._cl >>> 0 < cl >>> 0 ? 1 : 0) | 0;
	    this._d = this._d + d + (this._dl >>> 0 < dl >>> 0 ? 1 : 0) | 0;
	    this._e = this._e + e + (this._el >>> 0 < el >>> 0 ? 1 : 0) | 0;
	    this._f = this._f + f + (this._fl >>> 0 < fl >>> 0 ? 1 : 0) | 0;
	    this._g = this._g + g + (this._gl >>> 0 < gl >>> 0 ? 1 : 0) | 0;
	    this._h = this._h + h + (this._hl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
	  };

	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64);

	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset);
	      H.writeInt32BE(l, offset + 4);
	    }

	    writeInt64BE(this._a, this._al, 0);
	    writeInt64BE(this._b, this._bl, 8);
	    writeInt64BE(this._c, this._cl, 16);
	    writeInt64BE(this._d, this._dl, 24);
	    writeInt64BE(this._e, this._el, 32);
	    writeInt64BE(this._f, this._fl, 40);
	    writeInt64BE(this._g, this._gl, 48);
	    writeInt64BE(this._h, this._hl, 56);

	    return H;
	  };

	  return Sha512;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */

	var helpers = __webpack_require__(70);

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
	  /* append padding */
	  x[len >> 5] |= 0x80 << len % 32;
	  x[(len + 64 >>> 9 << 4) + 14] = len;

	  var a = 1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d = 271733878;

	  for (var i = 0; i < x.length; i += 16) {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;

	    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
	    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
	    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}
	function md5_ff(a, b, c, d, x, s, t) {
	  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t) {
	  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t) {
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t) {
	  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return msw << 16 | lsw & 0xFFFF;
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
	  return num << cnt | num >>> 32 - cnt;
	}

	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize);zeroBuffer.fill(0);
	var chrsz = 8;

	function toArray(buf, bigEndian) {
	  if (buf.length % intSize !== 0) {
	    var len = buf.length + (intSize - buf.length % intSize);
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }

	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}

	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}

	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}

	module.exports = { hash: hash };
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160;

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	// Constants table
	var zl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
	var zr = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
	var sl = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
	var sr = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];

	var hl = [0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr = [0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];

	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << 24 - b % 32;
	  }
	  return words;
	};

	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
	  }
	  return bytes;
	};

	var processBlock = function (H, M, offset) {

	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];

	    // Swap
	    M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
	  }

	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;

	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = al + M[offset + zl[i]] | 0;
	    if (i < 16) {
	      t += f1(bl, cl, dl) + hl[0];
	    } else if (i < 32) {
	      t += f2(bl, cl, dl) + hl[1];
	    } else if (i < 48) {
	      t += f3(bl, cl, dl) + hl[2];
	    } else if (i < 64) {
	      t += f4(bl, cl, dl) + hl[3];
	    } else {
	      // if (i<80) {
	      t += f5(bl, cl, dl) + hl[4];
	    }
	    t = t | 0;
	    t = rotl(t, sl[i]);
	    t = t + el | 0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;

	    t = ar + M[offset + zr[i]] | 0;
	    if (i < 16) {
	      t += f5(br, cr, dr) + hr[0];
	    } else if (i < 32) {
	      t += f4(br, cr, dr) + hr[1];
	    } else if (i < 48) {
	      t += f3(br, cr, dr) + hr[2];
	    } else if (i < 64) {
	      t += f2(br, cr, dr) + hr[3];
	    } else {
	      // if (i<80) {
	      t += f1(br, cr, dr) + hr[4];
	    }
	    t = t | 0;
	    t = rotl(t, sr[i]);
	    t = t + er | 0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t = H[1] + cl + dr | 0;
	  H[1] = H[2] + dl + er | 0;
	  H[2] = H[3] + el + ar | 0;
	  H[3] = H[4] + al + br | 0;
	  H[4] = H[0] + bl + cr | 0;
	  H[0] = t;
	};

	function f1(x, y, z) {
	  return x ^ y ^ z;
	}

	function f2(x, y, z) {
	  return x & y | ~x & z;
	}

	function f3(x, y, z) {
	  return (x | ~y) ^ z;
	}

	function f4(x, y, z) {
	  return x & z | y & ~z;
	}

	function f5(x, y, z) {
	  return x ^ (y | ~z);
	}

	function rotl(x, n) {
	  return x << n | x >>> 32 - n;
	}

	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];

	  if (typeof message == 'string') message = new Buffer(message, 'utf8');

	  var m = bytesToWords(message);

	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;

	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
	  m[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;

	  for (var i = 0; i < m.length; i += 16) {
	    processBlock(H, m, i);
	  }

	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	    // Shortcut
	    var H_i = H[i];

	    // Swap
	    H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
	  }

	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(63);

	var zeroBuffer = new Buffer(128);
	zeroBuffer.fill(0);

	module.exports = Hmac;

	function Hmac(alg, key) {
	  if (!(this instanceof Hmac)) return new Hmac(alg, key);
	  this._opad = opad;
	  this._alg = alg;

	  var blocksize = alg === 'sha512' ? 128 : 64;

	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key;

	  if (key.length > blocksize) {
	    key = createHash(alg).update(key).digest();
	  } else if (key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize);
	  }

	  var ipad = this._ipad = new Buffer(blocksize);
	  var opad = this._opad = new Buffer(blocksize);

	  for (var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36;
	    opad[i] = key[i] ^ 0x5C;
	  }

	  this._hash = createHash(alg).update(ipad);
	}

	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc);
	  return this;
	};

	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest();
	  return createHash(this._alg).update(this._opad).update(h).digest(enc);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(74);

	module.exports = function (crypto, exports) {
	  exports = exports || {};

	  var exported = pbkdf2Export(crypto);

	  exports.pbkdf2 = exported.pbkdf2;
	  exports.pbkdf2Sync = exported.pbkdf2Sync;

	  return exports;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function (crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest;
	      digest = undefined;
	    }

	    if ('function' !== typeof callback) throw new Error('No callback provided to pbkdf2');

	    setTimeout(function () {
	      var result;

	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest);
	      } catch (e) {
	        return callback(e);
	      }

	      callback(undefined, result);
	    });
	  }

	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations) throw new TypeError('Iterations not a number');

	    if (iterations < 0) throw new TypeError('Bad iterations');

	    if ('number' !== typeof keylen) throw new TypeError('Key length not a number');

	    if (keylen < 0) throw new TypeError('Bad key length');

	    digest = digest || 'sha1';

	    if (!Buffer.isBuffer(password)) password = new Buffer(password);
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt);

	    var hLen,
	        l = 1,
	        r,
	        T;
	    var DK = new Buffer(keylen);
	    var block1 = new Buffer(salt.length + 4);
	    salt.copy(block1, 0, 0, salt.length);

	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length);

	      var U = crypto.createHmac(digest, password).update(block1).digest();

	      if (!hLen) {
	        hLen = U.length;
	        T = new Buffer(hLen);
	        l = Math.ceil(keylen / hLen);
	        r = keylen - (l - 1) * hLen;

	        if (keylen > (Math.pow(2, 32) - 1) * hLen) throw new TypeError('keylen exceeds maximum length');
	      }

	      U.copy(T, 0, 0, hLen);

	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest();

	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k];
	        }
	      }

	      var destPos = (i - 1) * hLen;
	      var len = i == l ? r : hLen;
	      T.copy(DK, destPos, 0, len);
	    }

	    return DK;
	  }

	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var urlParse = __webpack_require__(43).parse;
	var ClientConstants = __webpack_require__(76);
	var Charsets = __webpack_require__(77);
	var SSLProfiles = null;

	module.exports = ConnectionConfig;
	function ConnectionConfig(options) {
	  if (typeof options === 'string') {
	    options = ConnectionConfig.parseUrl(options);
	  }

	  this.host = options.host || 'localhost';
	  this.port = options.port || 3306;
	  this.localAddress = options.localAddress;
	  this.socketPath = options.socketPath;
	  this.user = options.user || undefined;
	  this.password = options.password || undefined;
	  this.database = options.database;
	  this.connectTimeout = options.connectTimeout === undefined ? 10 * 1000 : options.connectTimeout;
	  this.insecureAuth = options.insecureAuth || false;
	  this.supportBigNumbers = options.supportBigNumbers || false;
	  this.bigNumberStrings = options.bigNumberStrings || false;
	  this.dateStrings = options.dateStrings || false;
	  this.debug = options.debug;
	  this.trace = options.trace !== false;
	  this.stringifyObjects = options.stringifyObjects || false;
	  this.timezone = options.timezone || 'local';
	  this.flags = options.flags || '';
	  this.queryFormat = options.queryFormat;
	  this.pool = options.pool || undefined;
	  this.ssl = typeof options.ssl === 'string' ? ConnectionConfig.getSSLProfile(options.ssl) : options.ssl || false;
	  this.multipleStatements = options.multipleStatements || false;
	  this.typeCast = options.typeCast === undefined ? true : options.typeCast;

	  if (this.timezone[0] == " ") {
	    // "+" is a url encoded char for space so it
	    // gets translated to space when giving a
	    // connection string..
	    this.timezone = "+" + this.timezone.substr(1);
	  }

	  if (this.ssl) {
	    // Default rejectUnauthorized to true
	    this.ssl.rejectUnauthorized = this.ssl.rejectUnauthorized !== false;
	  }

	  this.maxPacketSize = 0;
	  this.charsetNumber = options.charset ? ConnectionConfig.getCharsetNumber(options.charset) : options.charsetNumber || Charsets.UTF8_GENERAL_CI;

	  // Set the client flags
	  var defaultFlags = ConnectionConfig.getDefaultFlags(options);
	  this.clientFlags = ConnectionConfig.mergeFlags(defaultFlags, options.flags);
	}

	ConnectionConfig.mergeFlags = function mergeFlags(defaultFlags, userFlags) {
	  var allFlags = ConnectionConfig.parseFlagList(defaultFlags);
	  var newFlags = ConnectionConfig.parseFlagList(userFlags);

	  // Merge the new flags
	  for (var flag in newFlags) {
	    if (allFlags[flag] !== false) {
	      allFlags[flag] = newFlags[flag];
	    }
	  }

	  // Build flags
	  var flags = 0x0;
	  for (var flag in allFlags) {
	    if (allFlags[flag]) {
	      // TODO: Throw here on some future release
	      flags |= ClientConstants['CLIENT_' + flag] || 0x0;
	    }
	  }

	  return flags;
	};

	ConnectionConfig.getCharsetNumber = function getCharsetNumber(charset) {
	  var num = Charsets[charset.toUpperCase()];

	  if (num === undefined) {
	    throw new TypeError('Unknown charset \'' + charset + '\'');
	  }

	  return num;
	};

	ConnectionConfig.getDefaultFlags = function getDefaultFlags(options) {
	  var defaultFlags = ['-COMPRESS', // Compression protocol *NOT* supported
	  '-CONNECT_ATTRS', // Does *NOT* send connection attributes in Protocol::HandshakeResponse41
	  '+CONNECT_WITH_DB', // One can specify db on connect in Handshake Response Packet
	  '+FOUND_ROWS', // Send found rows instead of affected rows
	  '+IGNORE_SIGPIPE', // Don't issue SIGPIPE if network failures
	  '+IGNORE_SPACE', // Let the parser ignore spaces before '('
	  '+LOCAL_FILES', // Can use LOAD DATA LOCAL
	  '+LONG_FLAG', // Longer flags in Protocol::ColumnDefinition320
	  '+LONG_PASSWORD', // Use the improved version of Old Password Authentication
	  '+MULTI_RESULTS', // Can handle multiple resultsets for COM_QUERY
	  '+ODBC', // Special handling of ODBC behaviour
	  '-PLUGIN_AUTH', // Does *NOT* support auth plugins
	  '+PROTOCOL_41', // Uses the 4.1 protocol
	  '+PS_MULTI_RESULTS', // Can handle multiple resultsets for COM_STMT_EXECUTE
	  '+RESERVED', // Unused
	  '+SECURE_CONNECTION', // Supports Authentication::Native41
	  '+TRANSACTIONS' // Expects status flags
	  ];

	  if (options && options.multipleStatements) {
	    // May send multiple statements per COM_QUERY and COM_STMT_PREPARE
	    defaultFlags.push('+MULTI_STATEMENTS');
	  }

	  return defaultFlags;
	};

	ConnectionConfig.getSSLProfile = function getSSLProfile(name) {
	  if (!SSLProfiles) {
	    SSLProfiles = __webpack_require__(78);
	  }

	  var ssl = SSLProfiles[name];

	  if (ssl === undefined) {
	    throw new TypeError('Unknown SSL profile \'' + name + '\'');
	  }

	  return ssl;
	};

	ConnectionConfig.parseFlagList = function parseFlagList(flagList) {
	  var allFlags = Object.create(null);

	  if (!flagList) {
	    return allFlags;
	  }

	  var flags = !Array.isArray(flagList) ? String(flagList || '').toUpperCase().split(/\s*,+\s*/) : flagList;

	  for (var i = 0; i < flags.length; i++) {
	    var flag = flags[i];
	    var offset = 1;
	    var state = flag[0];

	    if (state === undefined) {
	      // TODO: throw here on some future release
	      continue;
	    }

	    if (state !== '-' && state !== '+') {
	      offset = 0;
	      state = '+';
	    }

	    allFlags[flag.substr(offset)] = state === '+';
	  }

	  return allFlags;
	};

	ConnectionConfig.parseUrl = function (url) {
	  url = urlParse(url, true);

	  var options = {
	    host: url.hostname,
	    port: url.port,
	    database: url.pathname.substr(1)
	  };

	  if (url.auth) {
	    var auth = url.auth.split(':');
	    options.user = auth[0];
	    options.password = auth[1];
	  }

	  if (url.query) {
	    for (var key in url.query) {
	      var value = url.query[key];

	      try {
	        // Try to parse this as a JSON expression first
	        options[key] = JSON.parse(value);
	      } catch (err) {
	        // Otherwise assume it is a plain string
	        options[key] = value;
	      }
	    }
	  }

	  return options;
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	// Manually extracted from mysql-5.5.23/include/mysql_com.h
	exports.CLIENT_LONG_PASSWORD = 1; /* new more secure passwords */
	exports.CLIENT_FOUND_ROWS = 2; /* Found instead of affected rows */
	exports.CLIENT_LONG_FLAG = 4; /* Get all column flags */
	exports.CLIENT_CONNECT_WITH_DB = 8; /* One can specify db on connect */
	exports.CLIENT_NO_SCHEMA = 16; /* Don't allow database.table.column */
	exports.CLIENT_COMPRESS = 32; /* Can use compression protocol */
	exports.CLIENT_ODBC = 64; /* Odbc client */
	exports.CLIENT_LOCAL_FILES = 128; /* Can use LOAD DATA LOCAL */
	exports.CLIENT_IGNORE_SPACE = 256; /* Ignore spaces before '(' */
	exports.CLIENT_PROTOCOL_41 = 512; /* New 4.1 protocol */
	exports.CLIENT_INTERACTIVE = 1024; /* This is an interactive client */
	exports.CLIENT_SSL = 2048; /* Switch to SSL after handshake */
	exports.CLIENT_IGNORE_SIGPIPE = 4096; /* IGNORE sigpipes */
	exports.CLIENT_TRANSACTIONS = 8192; /* Client knows about transactions */
	exports.CLIENT_RESERVED = 16384; /* Old flag for 4.1 protocol  */
	exports.CLIENT_SECURE_CONNECTION = 32768; /* New 4.1 authentication */

	exports.CLIENT_MULTI_STATEMENTS = 65536; /* Enable/disable multi-stmt support */
	exports.CLIENT_MULTI_RESULTS = 131072; /* Enable/disable multi-results */
	exports.CLIENT_PS_MULTI_RESULTS = 262144; /* Multi-results in PS-protocol */

	exports.CLIENT_PLUGIN_AUTH = 524288; /* Client supports plugin authentication */

	exports.CLIENT_SSL_VERIFY_SERVER_CERT = 1073741824;
	exports.CLIENT_REMEMBER_OPTIONS = 2147483648;

/***/ },
/* 77 */
/***/ function(module, exports) {

	exports.BIG5_CHINESE_CI = 1;
	exports.LATIN2_CZECH_CS = 2;
	exports.DEC8_SWEDISH_CI = 3;
	exports.CP850_GENERAL_CI = 4;
	exports.LATIN1_GERMAN1_CI = 5;
	exports.HP8_ENGLISH_CI = 6;
	exports.KOI8R_GENERAL_CI = 7;
	exports.LATIN1_SWEDISH_CI = 8;
	exports.LATIN2_GENERAL_CI = 9;
	exports.SWE7_SWEDISH_CI = 10;
	exports.ASCII_GENERAL_CI = 11;
	exports.UJIS_JAPANESE_CI = 12;
	exports.SJIS_JAPANESE_CI = 13;
	exports.CP1251_BULGARIAN_CI = 14;
	exports.LATIN1_DANISH_CI = 15;
	exports.HEBREW_GENERAL_CI = 16;
	exports.TIS620_THAI_CI = 18;
	exports.EUCKR_KOREAN_CI = 19;
	exports.LATIN7_ESTONIAN_CS = 20;
	exports.LATIN2_HUNGARIAN_CI = 21;
	exports.KOI8U_GENERAL_CI = 22;
	exports.CP1251_UKRAINIAN_CI = 23;
	exports.GB2312_CHINESE_CI = 24;
	exports.GREEK_GENERAL_CI = 25;
	exports.CP1250_GENERAL_CI = 26;
	exports.LATIN2_CROATIAN_CI = 27;
	exports.GBK_CHINESE_CI = 28;
	exports.CP1257_LITHUANIAN_CI = 29;
	exports.LATIN5_TURKISH_CI = 30;
	exports.LATIN1_GERMAN2_CI = 31;
	exports.ARMSCII8_GENERAL_CI = 32;
	exports.UTF8_GENERAL_CI = 33;
	exports.CP1250_CZECH_CS = 34;
	exports.UCS2_GENERAL_CI = 35;
	exports.CP866_GENERAL_CI = 36;
	exports.KEYBCS2_GENERAL_CI = 37;
	exports.MACCE_GENERAL_CI = 38;
	exports.MACROMAN_GENERAL_CI = 39;
	exports.CP852_GENERAL_CI = 40;
	exports.LATIN7_GENERAL_CI = 41;
	exports.LATIN7_GENERAL_CS = 42;
	exports.MACCE_BIN = 43;
	exports.CP1250_CROATIAN_CI = 44;
	exports.UTF8MB4_GENERAL_CI = 45;
	exports.UTF8MB4_BIN = 46;
	exports.LATIN1_BIN = 47;
	exports.LATIN1_GENERAL_CI = 48;
	exports.LATIN1_GENERAL_CS = 49;
	exports.CP1251_BIN = 50;
	exports.CP1251_GENERAL_CI = 51;
	exports.CP1251_GENERAL_CS = 52;
	exports.MACROMAN_BIN = 53;
	exports.UTF16_GENERAL_CI = 54;
	exports.UTF16_BIN = 55;
	exports.UTF16LE_GENERAL_CI = 56;
	exports.CP1256_GENERAL_CI = 57;
	exports.CP1257_BIN = 58;
	exports.CP1257_GENERAL_CI = 59;
	exports.UTF32_GENERAL_CI = 60;
	exports.UTF32_BIN = 61;
	exports.UTF16LE_BIN = 62;
	exports.BINARY = 63;
	exports.ARMSCII8_BIN = 64;
	exports.ASCII_BIN = 65;
	exports.CP1250_BIN = 66;
	exports.CP1256_BIN = 67;
	exports.CP866_BIN = 68;
	exports.DEC8_BIN = 69;
	exports.GREEK_BIN = 70;
	exports.HEBREW_BIN = 71;
	exports.HP8_BIN = 72;
	exports.KEYBCS2_BIN = 73;
	exports.KOI8R_BIN = 74;
	exports.KOI8U_BIN = 75;
	exports.LATIN2_BIN = 77;
	exports.LATIN5_BIN = 78;
	exports.LATIN7_BIN = 79;
	exports.CP850_BIN = 80;
	exports.CP852_BIN = 81;
	exports.SWE7_BIN = 82;
	exports.UTF8_BIN = 83;
	exports.BIG5_BIN = 84;
	exports.EUCKR_BIN = 85;
	exports.GB2312_BIN = 86;
	exports.GBK_BIN = 87;
	exports.SJIS_BIN = 88;
	exports.TIS620_BIN = 89;
	exports.UCS2_BIN = 90;
	exports.UJIS_BIN = 91;
	exports.GEOSTD8_GENERAL_CI = 92;
	exports.GEOSTD8_BIN = 93;
	exports.LATIN1_SPANISH_CI = 94;
	exports.CP932_JAPANESE_CI = 95;
	exports.CP932_BIN = 96;
	exports.EUCJPMS_JAPANESE_CI = 97;
	exports.EUCJPMS_BIN = 98;
	exports.CP1250_POLISH_CI = 99;
	exports.UTF16_UNICODE_CI = 101;
	exports.UTF16_ICELANDIC_CI = 102;
	exports.UTF16_LATVIAN_CI = 103;
	exports.UTF16_ROMANIAN_CI = 104;
	exports.UTF16_SLOVENIAN_CI = 105;
	exports.UTF16_POLISH_CI = 106;
	exports.UTF16_ESTONIAN_CI = 107;
	exports.UTF16_SPANISH_CI = 108;
	exports.UTF16_SWEDISH_CI = 109;
	exports.UTF16_TURKISH_CI = 110;
	exports.UTF16_CZECH_CI = 111;
	exports.UTF16_DANISH_CI = 112;
	exports.UTF16_LITHUANIAN_CI = 113;
	exports.UTF16_SLOVAK_CI = 114;
	exports.UTF16_SPANISH2_CI = 115;
	exports.UTF16_ROMAN_CI = 116;
	exports.UTF16_PERSIAN_CI = 117;
	exports.UTF16_ESPERANTO_CI = 118;
	exports.UTF16_HUNGARIAN_CI = 119;
	exports.UTF16_SINHALA_CI = 120;
	exports.UTF16_GERMAN2_CI = 121;
	exports.UTF16_CROATIAN_MYSQL561_CI = 122;
	exports.UTF16_UNICODE_520_CI = 123;
	exports.UTF16_VIETNAMESE_CI = 124;
	exports.UCS2_UNICODE_CI = 128;
	exports.UCS2_ICELANDIC_CI = 129;
	exports.UCS2_LATVIAN_CI = 130;
	exports.UCS2_ROMANIAN_CI = 131;
	exports.UCS2_SLOVENIAN_CI = 132;
	exports.UCS2_POLISH_CI = 133;
	exports.UCS2_ESTONIAN_CI = 134;
	exports.UCS2_SPANISH_CI = 135;
	exports.UCS2_SWEDISH_CI = 136;
	exports.UCS2_TURKISH_CI = 137;
	exports.UCS2_CZECH_CI = 138;
	exports.UCS2_DANISH_CI = 139;
	exports.UCS2_LITHUANIAN_CI = 140;
	exports.UCS2_SLOVAK_CI = 141;
	exports.UCS2_SPANISH2_CI = 142;
	exports.UCS2_ROMAN_CI = 143;
	exports.UCS2_PERSIAN_CI = 144;
	exports.UCS2_ESPERANTO_CI = 145;
	exports.UCS2_HUNGARIAN_CI = 146;
	exports.UCS2_SINHALA_CI = 147;
	exports.UCS2_GERMAN2_CI = 148;
	exports.UCS2_CROATIAN_MYSQL561_CI = 149;
	exports.UCS2_UNICODE_520_CI = 150;
	exports.UCS2_VIETNAMESE_CI = 151;
	exports.UCS2_GENERAL_MYSQL500_CI = 159;
	exports.UTF32_UNICODE_CI = 160;
	exports.UTF32_ICELANDIC_CI = 161;
	exports.UTF32_LATVIAN_CI = 162;
	exports.UTF32_ROMANIAN_CI = 163;
	exports.UTF32_SLOVENIAN_CI = 164;
	exports.UTF32_POLISH_CI = 165;
	exports.UTF32_ESTONIAN_CI = 166;
	exports.UTF32_SPANISH_CI = 167;
	exports.UTF32_SWEDISH_CI = 168;
	exports.UTF32_TURKISH_CI = 169;
	exports.UTF32_CZECH_CI = 170;
	exports.UTF32_DANISH_CI = 171;
	exports.UTF32_LITHUANIAN_CI = 172;
	exports.UTF32_SLOVAK_CI = 173;
	exports.UTF32_SPANISH2_CI = 174;
	exports.UTF32_ROMAN_CI = 175;
	exports.UTF32_PERSIAN_CI = 176;
	exports.UTF32_ESPERANTO_CI = 177;
	exports.UTF32_HUNGARIAN_CI = 178;
	exports.UTF32_SINHALA_CI = 179;
	exports.UTF32_GERMAN2_CI = 180;
	exports.UTF32_CROATIAN_MYSQL561_CI = 181;
	exports.UTF32_UNICODE_520_CI = 182;
	exports.UTF32_VIETNAMESE_CI = 183;
	exports.UTF8_UNICODE_CI = 192;
	exports.UTF8_ICELANDIC_CI = 193;
	exports.UTF8_LATVIAN_CI = 194;
	exports.UTF8_ROMANIAN_CI = 195;
	exports.UTF8_SLOVENIAN_CI = 196;
	exports.UTF8_POLISH_CI = 197;
	exports.UTF8_ESTONIAN_CI = 198;
	exports.UTF8_SPANISH_CI = 199;
	exports.UTF8_SWEDISH_CI = 200;
	exports.UTF8_TURKISH_CI = 201;
	exports.UTF8_CZECH_CI = 202;
	exports.UTF8_DANISH_CI = 203;
	exports.UTF8_LITHUANIAN_CI = 204;
	exports.UTF8_SLOVAK_CI = 205;
	exports.UTF8_SPANISH2_CI = 206;
	exports.UTF8_ROMAN_CI = 207;
	exports.UTF8_PERSIAN_CI = 208;
	exports.UTF8_ESPERANTO_CI = 209;
	exports.UTF8_HUNGARIAN_CI = 210;
	exports.UTF8_SINHALA_CI = 211;
	exports.UTF8_GERMAN2_CI = 212;
	exports.UTF8_CROATIAN_MYSQL561_CI = 213;
	exports.UTF8_UNICODE_520_CI = 214;
	exports.UTF8_VIETNAMESE_CI = 215;
	exports.UTF8_GENERAL_MYSQL500_CI = 223;
	exports.UTF8MB4_UNICODE_CI = 224;
	exports.UTF8MB4_ICELANDIC_CI = 225;
	exports.UTF8MB4_LATVIAN_CI = 226;
	exports.UTF8MB4_ROMANIAN_CI = 227;
	exports.UTF8MB4_SLOVENIAN_CI = 228;
	exports.UTF8MB4_POLISH_CI = 229;
	exports.UTF8MB4_ESTONIAN_CI = 230;
	exports.UTF8MB4_SPANISH_CI = 231;
	exports.UTF8MB4_SWEDISH_CI = 232;
	exports.UTF8MB4_TURKISH_CI = 233;
	exports.UTF8MB4_CZECH_CI = 234;
	exports.UTF8MB4_DANISH_CI = 235;
	exports.UTF8MB4_LITHUANIAN_CI = 236;
	exports.UTF8MB4_SLOVAK_CI = 237;
	exports.UTF8MB4_SPANISH2_CI = 238;
	exports.UTF8MB4_ROMAN_CI = 239;
	exports.UTF8MB4_PERSIAN_CI = 240;
	exports.UTF8MB4_ESPERANTO_CI = 241;
	exports.UTF8MB4_HUNGARIAN_CI = 242;
	exports.UTF8MB4_SINHALA_CI = 243;
	exports.UTF8MB4_GERMAN2_CI = 244;
	exports.UTF8MB4_CROATIAN_MYSQL561_CI = 245;
	exports.UTF8MB4_UNICODE_520_CI = 246;
	exports.UTF8MB4_VIETNAMESE_CI = 247;
	exports.UTF8_GENERAL50_CI = 253;

	// short aliases
	exports.ARMSCII8 = exports.ARMSCII8_GENERAL_CI;
	exports.ASCII = exports.ASCII_GENERAL_CI;
	exports.BIG5 = exports.BIG5_CHINESE_CI;
	exports.BINARY = exports.BINARY;
	exports.CP1250 = exports.CP1250_GENERAL_CI;
	exports.CP1251 = exports.CP1251_GENERAL_CI;
	exports.CP1256 = exports.CP1256_GENERAL_CI;
	exports.CP1257 = exports.CP1257_GENERAL_CI;
	exports.CP866 = exports.CP866_GENERAL_CI;
	exports.CP850 = exports.CP850_GENERAL_CI;
	exports.CP852 = exports.CP852_GENERAL_CI;
	exports.CP932 = exports.CP932_JAPANESE_CI;
	exports.DEC8 = exports.DEC8_SWEDISH_CI;
	exports.EUCJPMS = exports.EUCJPMS_JAPANESE_CI;
	exports.EUCKR = exports.EUCKR_KOREAN_CI;
	exports.GB2312 = exports.GB2312_CHINESE_CI;
	exports.GBK = exports.GBK_CHINESE_CI;
	exports.GEOSTD8 = exports.GEOSTD8_GENERAL_CI;
	exports.GREEK = exports.GREEK_GENERAL_CI;
	exports.HEBREW = exports.HEBREW_GENERAL_CI;
	exports.HP8 = exports.HP8_ENGLISH_CI;
	exports.KEYBCS2 = exports.KEYBCS2_GENERAL_CI;
	exports.KOI8R = exports.KOI8R_GENERAL_CI;
	exports.KOI8U = exports.KOI8U_GENERAL_CI;
	exports.LATIN1 = exports.LATIN1_SWEDISH_CI;
	exports.LATIN2 = exports.LATIN2_GENERAL_CI;
	exports.LATIN5 = exports.LATIN5_TURKISH_CI;
	exports.LATIN7 = exports.LATIN7_GENERAL_CI;
	exports.MACCE = exports.MACCE_GENERAL_CI;
	exports.MACROMAN = exports.MACROMAN_GENERAL_CI;
	exports.SJIS = exports.SJIS_JAPANESE_CI;
	exports.SWE7 = exports.SWE7_SWEDISH_CI;
	exports.TIS620 = exports.TIS620_THAI_CI;
	exports.UCS2 = exports.UCS2_GENERAL_CI;
	exports.UJIS = exports.UJIS_JAPANESE_CI;
	exports.UTF16 = exports.UTF16_GENERAL_CI;
	exports.UTF16LE = exports.UTF16LE_GENERAL_CI;
	exports.UTF8 = exports.UTF8_GENERAL_CI;
	exports.UTF8MB4 = exports.UTF8MB4_GENERAL_CI;
	exports.UTF32 = exports.UTF32_GENERAL_CI;

/***/ },
/* 78 */
/***/ function(module, exports) {

	// Certificates for Amazon RDS
	exports['Amazon RDS'] = {
	  ca: [
	  /**
	   * Amazon RDS global certificate 2010 to 2015
	   *
	   *   CN = aws.amazon.com/rds/
	   *   OU = RDS
	   *   O = Amazon.com
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2010-04-05T22:44:31Z/2015-04-04T22:41:31Z
	   *   F = 7F:09:8D:A5:7D:BB:A6:EF:7C:70:D8:CA:4E:49:11:55:7E:89:A7:D3
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIIDQzCCAqygAwIBAgIJAOd1tlfiGoEoMA0GCSqGSIb3DQEBBQUAMHUxCzAJBgNV\n' + 'BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdTZWF0dGxlMRMw\n' + 'EQYDVQQKEwpBbWF6b24uY29tMQwwCgYDVQQLEwNSRFMxHDAaBgNVBAMTE2F3cy5h\n' + 'bWF6b24uY29tL3Jkcy8wHhcNMTAwNDA1MjI0NDMxWhcNMTUwNDA0MjI0NDMxWjB1\n' + 'MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHU2Vh\n' + 'dHRsZTETMBEGA1UEChMKQW1hem9uLmNvbTEMMAoGA1UECxMDUkRTMRwwGgYDVQQD\n' + 'ExNhd3MuYW1hem9uLmNvbS9yZHMvMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKB\n' + 'gQDKhXGU7tizxUR5WaFoMTFcxNxa05PEjZaIOEN5ctkWrqYSRov0/nOMoZjqk8bC\n' + 'med9vPFoQGD0OTakPs0jVe3wwmR735hyVwmKIPPsGlaBYj1O6llIpZeQVyupNx56\n' + 'UzqtiLaDzh1KcmfqP3qP2dInzBfJQKjiRudo1FWnpPt33QIDAQABo4HaMIHXMB0G\n' + 'A1UdDgQWBBT/H3x+cqSkR/ePSIinPtc4yWKe3DCBpwYDVR0jBIGfMIGcgBT/H3x+\n' + 'cqSkR/ePSIinPtc4yWKe3KF5pHcwdTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh\n' + 'c2hpbmd0b24xEDAOBgNVBAcTB1NlYXR0bGUxEzARBgNVBAoTCkFtYXpvbi5jb20x\n' + 'DDAKBgNVBAsTA1JEUzEcMBoGA1UEAxMTYXdzLmFtYXpvbi5jb20vcmRzL4IJAOd1\n' + 'tlfiGoEoMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAvguZy/BDT66x\n' + 'GfgnJlyQwnFSeVLQm9u/FIvz4huGjbq9dqnD6h/Gm56QPFdyMEyDiZWaqY6V08lY\n' + 'LTBNb4kcIc9/6pc0/ojKciP5QJRm6OiZ4vgG05nF4fYjhU7WClUx7cxq1fKjNc2J\n' + 'UCmmYqgiVkAGWRETVo+byOSDZ4swb10=\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS global root CA 2015 to 2020
	   *
	   *   CN = Amazon RDS Root CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T09:11:31Z/2020-03-05T09:11:31Z
	   *   F = E8:11:88:56:E7:A7:CE:3E:5E:DC:9A:31:25:1B:93:AC:DC:43:CE:B0
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID9DCCAtygAwIBAgIBQjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUwOTExMzFaFw0y\n' + 'MDAzMDUwOTExMzFaMIGKMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEbMBkGA1UEAwwSQW1hem9uIFJE\n' + 'UyBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuD8nrZ8V\n' + 'u+VA8yVlUipCZIKPTDcOILYpUe8Tct0YeQQr0uyl018StdBsa3CjBgvwpDRq1HgF\n' + 'Ji2N3+39+shCNspQeE6aYU+BHXhKhIIStt3r7gl/4NqYiDDMWKHxHq0nsGDFfArf\n' + 'AOcjZdJagOMqb3fF46flc8k2E7THTm9Sz4L7RY1WdABMuurpICLFE3oHcGdapOb9\n' + 'T53pQR+xpHW9atkcf3pf7gbO0rlKVSIoUenBlZipUlp1VZl/OD/E+TtRhDDNdI2J\n' + 'P/DSMM3aEsq6ZQkfbz/Ilml+Lx3tJYXUDmp+ZjzMPLk/+3beT8EhrwtcG3VPpvwp\n' + 'BIOqsqVVTvw/CwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUw\n' + 'AwEB/zAdBgNVHQ4EFgQUTgLurD72FchM7Sz1BcGPnIQISYMwHwYDVR0jBBgwFoAU\n' + 'TgLurD72FchM7Sz1BcGPnIQISYMwDQYJKoZIhvcNAQEFBQADggEBAHZcgIio8pAm\n' + 'MjHD5cl6wKjXxScXKtXygWH2BoDMYBJF9yfyKO2jEFxYKbHePpnXB1R04zJSWAw5\n' + '2EUuDI1pSBh9BA82/5PkuNlNeSTB3dXDD2PEPdzVWbSKvUB8ZdooV+2vngL0Zm4r\n' + '47QPyd18yPHrRIbtBtHR/6CwKevLZ394zgExqhnekYKIqqEX41xsUV0Gm6x4vpjf\n' + '2u6O/+YE2U+qyyxHE5Wd5oqde0oo9UUpFETJPVb6Q2cEeQib8PBAyi0i6KnF+kIV\n' + 'A9dY7IHSubtCK/i8wxMVqfd5GtbA8mmpeJFwnDvm9rBEsHybl08qlax9syEwsUYr\n' + '/40NawZfTUU=\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS ap-northeast-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS ap-northeast-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:06Z/2020-03-05T22:03:06Z
	   *   F = 4B:2D:8A:E0:C1:A3:A9:AF:A7:BB:65:0C:5A:16:8A:39:3C:03:F2:C5
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIIEATCCAumgAwIBAgIBRDANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMDZaFw0y\n' + 'MDAzMDUyMjAzMDZaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n' + 'UyBhcC1ub3J0aGVhc3QtMSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n' + 'ggEBAMmM2B4PfTXCZjbZMWiDPyxvk/eeNwIRJAhfzesiGUiLozX6CRy3rwC1ZOPV\n' + 'AcQf0LB+O8wY88C/cV+d4Q2nBDmnk+Vx7o2MyMh343r5rR3Na+4izd89tkQVt0WW\n' + 'vO21KRH5i8EuBjinboOwAwu6IJ+HyiQiM0VjgjrmEr/YzFPL8MgHD/YUHehqjACn\n' + 'C0+B7/gu7W4qJzBL2DOf7ub2qszGtwPE+qQzkCRDwE1A4AJmVE++/FLH2Zx78Egg\n' + 'fV1sUxPtYgjGH76VyyO6GNKM6rAUMD/q5mnPASQVIXgKbupr618bnH+SWHFjBqZq\n' + 'HvDGPMtiiWII41EmGUypyt5AbysCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n' + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFIiKM0Q6n1K4EmLxs3ZXxINbwEwR\n' + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n' + 'A4IBAQBezGbE9Rw/k2e25iGjj5n8r+M3dlye8ORfCE/dijHtxqAKasXHgKX8I9Tw\n' + 'JkBiGWiuzqn7gO5MJ0nMMro1+gq29qjZnYX1pDHPgsRjUX8R+juRhgJ3JSHijRbf\n' + '4qNJrnwga7pj94MhcLq9u0f6dxH6dXbyMv21T4TZMTmcFduf1KgaiVx1PEyJjC6r\n' + 'M+Ru+A0eM+jJ7uCjUoZKcpX8xkj4nmSnz9NMPog3wdOSB9cAW7XIc5mHa656wr7I\n' + 'WJxVcYNHTXIjCcng2zMKd1aCcl2KSFfy56sRfT7J5Wp69QSr+jq8KM55gw8uqAwi\n' + 'VPrXn2899T1rcTtFYFP16WXjGuc0\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS ap-southeast-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS ap-southeast-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:19Z/2020-03-05T22:03:19Z
	   *   F = 0E:EC:5D:BD:F9:80:EE:A9:A0:8D:81:AC:37:D9:8D:34:1C:CD:27:D1
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIIEATCCAumgAwIBAgIBRTANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMTlaFw0y\n' + 'MDAzMDUyMjAzMTlaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n' + 'UyBhcC1zb3V0aGVhc3QtMSBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n' + 'ggEBANaXElmSEYt/UtxHFsARFhSUahTf1KNJzR0Dmay6hqOXQuRVbKRwPd19u5vx\n' + 'DdF1sLT7D69IK3VDnUiQScaCv2Dpu9foZt+rLx+cpx1qiQd1UHrvqq8xPzQOqCdC\n' + 'RFStq6yVYZ69yfpfoI67AjclMOjl2Vph3ftVnqP0IgVKZdzeC7fd+umGgR9xY0Qr\n' + 'Ubhd/lWdsbNvzK3f1TPWcfIKQnpvSt85PIEDJir6/nuJUKMtmJRwTymJf0i+JZ4x\n' + '7dJa341p2kHKcHMgOPW7nJQklGBA70ytjUV6/qebS3yIugr/28mwReflg3TJzVDl\n' + 'EOvi6pqbqNbkMuEwGDCmEQIVqgkCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n' + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFAu93/4k5xbWOsgdCdn+/KdiRuit\n' + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n' + 'A4IBAQBlcjSyscpPjf5+MgzMuAsCxByqUt+WFspwcMCpwdaBeHOPSQrXNqX2Sk6P\n' + 'kth6oCivA64trWo8tFMvPYlUA1FYVD5WpN0kCK+P5pD4KHlaDsXhuhClJzp/OP8t\n' + 'pOyUr5109RHLxqoKB5J5m1XA7rgcFjnMxwBSWFe3/4uMk/+4T53YfCVXuc6QV3i7\n' + 'I/2LAJwFf//pTtt6fZenYfCsahnr2nvrNRNyAxcfvGZ/4Opn/mJtR6R/AjvQZHiR\n' + 'bkRNKF2GW0ueK5W4FkZVZVhhX9xh1Aj2Ollb+lbOqADaVj+AT3PoJPZ3MPQHKCXm\n' + 'xwG0LOLlRr/TfD6li1AfOVTAJXv9\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS ap-southeast-2 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS ap-southeast-2 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:24Z/2020-03-05T22:03:24Z
	   *   F = 20:D9:A8:82:23:AB:B9:E5:C5:24:10:D3:4D:0F:3D:B1:31:DF:E5:14
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIIEATCCAumgAwIBAgIBRjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMjRaFw0y\n' + 'MDAzMDUyMjAzMjRaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzElMCMGA1UEAwwcQW1hem9uIFJE\n' + 'UyBhcC1zb3V0aGVhc3QtMiBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n' + 'ggEBAJqBAJutz69hFOh3BtLHZTbwE8eejGGKayn9hu98YMDPzWzGXWCmW+ZYWELA\n' + 'cY3cNWNF8K4FqKXFr2ssorBYim1UtYFX8yhydT2hMD5zgQ2sCGUpuidijuPA6zaq\n' + 'Z3tdhVR94f0q8mpwpv2zqR9PcqaGDx2VR1x773FupRPRo7mEW1vC3IptHCQlP/zE\n' + '7jQiLl28bDIH2567xg7e7E9WnZToRnhlYdTaDaJsHTzi5mwILi4cihSok7Shv/ME\n' + 'hnukvxeSPUpaVtFaBhfBqq055ePq9I+Ns4KGreTKMhU0O9fkkaBaBmPaFgmeX/XO\n' + 'n2AX7gMouo3mtv34iDTZ0h6YCGkCAwEAAaNmMGQwDgYDVR0PAQH/BAQDAgEGMBIG\n' + 'A1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFIlQnY0KHYWn1jYumSdJYfwj/Nfw\n' + 'MB8GA1UdIwQYMBaAFE4C7qw+9hXITO0s9QXBj5yECEmDMA0GCSqGSIb3DQEBBQUA\n' + 'A4IBAQA0wVU6/l41cTzHc4azc4CDYY2Wd90DFWiH9C/mw0SgToYfCJ/5Cfi0NT/Y\n' + 'PRnk3GchychCJgoPA/k9d0//IhYEAIiIDjyFVgjbTkKV3sh4RbdldKVOUB9kumz/\n' + 'ZpShplsGt3z4QQiVnKfrAgqxWDjR0I0pQKkxXa6Sjkicos9LQxVtJ0XA4ieG1E7z\n' + 'zJr+6t80wmzxvkInSaWP3xNJK9azVRTrgQZQlvkbpDbExl4mNTG66VD3bAp6t3Wa\n' + 'B49//uDdfZmPkqqbX+hsxp160OH0rxJppwO3Bh869PkDnaPEd/Pxw7PawC+li0gi\n' + 'NRV8iCEx85aFxcyOhqn0WZOasxee\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS eu-central-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS eu-central-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:31Z/2020-03-05T22:03:31Z
	   *   F = 94:B4:DF:B9:6D:7E:F7:C3:B7:BF:51:E9:A6:B7:44:A0:D0:82:11:84
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/zCCAuegAwIBAgIBRzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMzFaFw0y\n' + 'MDAzMDUyMjAzMzFaMIGSMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEjMCEGA1UEAwwaQW1hem9uIFJE\n' + 'UyBldS1jZW50cmFsLTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB\n' + 'AQDFtP2dhSLuaPOI4ZrrPWsK4OY9ocQBp3yApH1KJYmI9wpQKZG/KCH2E6Oo7JAw\n' + 'QORU519r033T+FO2Z7pFPlmz1yrxGXyHpJs8ySx3Yo5S8ncDCdZJCLmtPiq/hahg\n' + '5/0ffexMFUCQaYicFZsrJ/cStdxUV+tSw2JQLD7UxS9J97LQWUPyyG+ZrjYVTVq+\n' + 'zudnFmNSe4QoecXMhAFTGJFQXxP7nhSL9Ao5FGgdXy7/JWeWdQIAj8ku6cBDKPa6\n' + 'Y6kP+ak+In+Lye8z9qsCD/afUozfWjPR2aA4JoIZVF8dNRShIMo8l0XfgfM2q0+n\n' + 'ApZWZ+BjhIO5XuoUgHS3D2YFAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNV\n' + 'HRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQWBBRm4GsWIA/M6q+tK8WGHWDGh2gcyTAf\n' + 'BgNVHSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOC\n' + 'AQEAHpMmeVQNqcxgfQdbDIi5UIy+E7zZykmtAygN1XQrvga9nXTis4kOTN6g5/+g\n' + 'HCx7jIXeNJzAbvg8XFqBN84Quqgpl/tQkbpco9Jh1HDs558D5NnZQxNqH5qXQ3Mm\n' + 'uPgCw0pYcPOa7bhs07i+MdVwPBsX27CFDtsgAIru8HvKxY1oTZrWnyIRo93tt/pk\n' + 'WuItVMVHjaQZVfTCow0aDUbte6Vlw82KjUFq+n2NMSCJDiDKsDDHT6BJc4AJHIq3\n' + '/4Z52MSC9KMr0yAaaoWfW/yMEj9LliQauAgwVjArF4q78rxpfKTG9Rfd8U1BZANP\n' + '7FrFMN0ThjfA1IvmOYcgskY5bQ==\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS eu-west-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS eu-west-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:35Z/2020-03-05T22:03:35Z
	   *   F = 1A:95:F0:43:82:D2:5D:A6:AD:F5:13:27:0B:40:8A:72:D9:92:F3:E0
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/DCCAuSgAwIBAgIBSDANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzMzVaFw0y\n' + 'MDAzMDUyMjAzMzVaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n' + 'UyBldS13ZXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCx\n' + 'PdbqQ0HKRj79Pmocxvjc+P6i4Ux24kgFIl+ckiir1vzkmesc3a58gjrMlCksEObt\n' + 'Yihs5IhzEq1ePT0gbfS9GYFp34Uj/MtPwlrfCBWG4d2TcrsKRHr1/EXUYhWqmdrb\n' + 'RhX8XqoRhVkbF/auzFSBhTzcGGvZpQ2KIaxRcQfcXlMVhj/pxxAjh8U4F350Fb0h\n' + 'nX1jw4/KvEreBL0Xb2lnlGTkwVxaKGSgXEnOgIyOFdOQc61vdome0+eeZsP4jqeR\n' + 'TGYJA9izJsRbe2YJxHuazD+548hsPlM3vFzKKEVURCha466rAaYAHy3rKur3HYQx\n' + 'Yt+SoKcEz9PXuSGj96ejAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n' + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBTebg//h2oeXbZjQ4uuoiuLYzuiPDAfBgNV\n' + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n' + 'TikPaGeZasTPw+4RBemlsyPAjtFFQLo7ddaFdORLgdEysVf8aBqndvbA6MT/v4lj\n' + 'GtEtUdF59ZcbWOrVm+fBZ2h/jYJ59dYF/xzb09nyRbdMSzB9+mkSsnOMqluq5y8o\n' + 'DY/PfP2vGhEg/2ZncRC7nlQU1Dm8F4lFWEiQ2fi7O1cW852Vmbq61RIfcYsH/9Ma\n' + 'kpgk10VZ75b8m3UhmpZ/2uRY+JEHImH5WpcTJ7wNiPNJsciZMznGtrgOnPzYco8L\n' + 'cDleOASIZifNMQi9PKOJKvi0ITz0B/imr8KBsW0YjZVJ54HMa7W1lwugSM7aMAs+\n' + 'E3Sd5lS+SHwWaOCHwhOEVA==\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS sa-east-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS sa-east-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:40Z/2020-03-05T22:03:40Z
	   *   F = 32:10:3D:FA:6D:42:F5:35:98:40:15:F4:4C:74:74:27:CB:CE:D4:B5
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/DCCAuSgAwIBAgIBSTANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNDBaFw0y\n' + 'MDAzMDUyMjAzNDBaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n' + 'UyBzYS1lYXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCU\n' + 'X4OBnQ5xA6TLJAiFEI6l7bUWjoVJBa/VbMdCCSs2i2dOKmqUaXu2ix2zcPILj3lZ\n' + 'GMk3d/2zvTK/cKhcFrewHUBamTeVHdEmynhMQamqNmkM4ptYzFcvEUw1TGxHT4pV\n' + 'Q6gSN7+/AJewQvyHexHo8D0+LDN0/Wa9mRm4ixCYH2CyYYJNKaZt9+EZfNu+PPS4\n' + '8iB0TWH0DgQkbWMBfCRgolLLitAZklZ4dvdlEBS7evN1/7ttBxUK6SvkeeSx3zBl\n' + 'ww3BlXqc3bvTQL0A+RRysaVyFbvtp9domFaDKZCpMmDFAN/ntx215xmQdrSt+K3F\n' + 'cXdGQYHx5q410CAclGnbAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n' + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBT6iVWnm/uakS+tEX2mzIfw+8JL0zAfBgNV\n' + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n' + 'FmDD+QuDklXn2EgShwQxV13+txPRuVdOSrutHhoCgMwFWCMtPPtBAKs6KPY7Guvw\n' + 'DpJoZSehDiOfsgMirjOWjvfkeWSNvKfjWTVneX7pZD9W5WPnsDBvTbCGezm+v87z\n' + 'b+ZM2ZMo98m/wkMcIEAgdSKilR2fuw8rLkAjhYFfs0A7tDgZ9noKwgHvoE4dsrI0\n' + 'KZYco6DlP/brASfHTPa2puBLN9McK3v+h0JaSqqm5Ro2Bh56tZkQh8AWy/miuDuK\n' + '3+hNEVdxosxlkM1TPa1DGj0EzzK0yoeerXuH2HX7LlCrrxf6/wdKnjR12PMrLQ4A\n' + 'pCqkcWw894z6bV9MAvKe6A==\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS us-east-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS us-east-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T21:54:04Z/2020-03-05T21:54:04Z
	   *   F = 34:47:8A:90:8A:83:AE:45:DC:B6:16:76:D2:35:EC:E9:75:C6:2C:63
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/DCCAuSgAwIBAgIBQzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMTU0MDRaFw0y\n' + 'MDAzMDUyMTU0MDRaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n' + 'UyB1cy1lYXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDI\n' + 'UIuwh8NusKHk1SqPXcP7OqxY3S/M2ZyQWD3w7Bfihpyyy/fc1w0/suIpX3kbMhAV\n' + '2ESwged2/2zSx4pVnjp/493r4luhSqQYzru78TuPt9bhJIJ51WXunZW2SWkisSaf\n' + 'USYUzVN9ezR/bjXTumSUQaLIouJt3OHLX49s+3NAbUyOI8EdvgBQWD68H1epsC0n\n' + 'CI5s+pIktyOZ59c4DCDLQcXErQ+tNbDC++oct1ANd/q8p9URonYwGCGOBy7sbCYq\n' + '9eVHh1Iy2M+SNXddVOGw5EuruvHoCIQyOz5Lz4zSuZA9dRbrfztNOpezCNYu6NKM\n' + 'n+hzcvdiyxv77uNm8EaxAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n' + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBQSQG3TmMe6Sa3KufaPBa72v4QFDzAfBgNV\n' + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n' + 'L/mOZfB3187xTmjOHMqN2G2oSKHBKiQLM9uv8+97qT+XR+TVsBT6b3yoPpMAGhHA\n' + 'Pc7nxAF5gPpuzatx0OTLPcmYucFmfqT/1qA5WlgCnMNtczyNMH97lKFTNV7Njtek\n' + 'jWEzAEQSyEWrkNpNlC4j6kMYyPzVXQeXUeZTgJ9FNnVZqmvfjip2N22tawMjrCn5\n' + '7KN/zN65EwY2oO9XsaTwwWmBu3NrDdMbzJnbxoWcFWj4RBwanR1XjQOVNhDwmCOl\n' + '/1Et13b8CPyj69PC8BOVU6cfTSx8WUVy0qvYOKHNY9Bqa5BDnIL3IVmUkeTlM1mt\n' + 'enRpyBj+Bk9rh/ICdiRKmA==\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS us-west-1 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS us-west-1 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:45Z/2020-03-05T22:03:45Z
	   *   F = EF:94:2F:E3:58:0E:09:D6:79:C2:16:97:91:FB:37:EA:D7:70:A8:4B
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/DCCAuSgAwIBAgIBSjANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNDVaFw0y\n' + 'MDAzMDUyMjAzNDVaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n' + 'UyB1cy13ZXN0LTEgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDE\n' + 'Dhw+uw/ycaiIhhyu2pXFRimq0DlB8cNtIe8hdqndH8TV/TFrljNgR8QdzOgZtZ9C\n' + 'zzQ2GRpInN/qJF6slEd6wO+6TaDBQkPY+07TXNt52POFUhdVkhJXHpE2BS7Xn6J7\n' + '7RFAOeG1IZmc2DDt+sR1BgXzUqHslQGfFYNS0/MBO4P+ya6W7IhruB1qfa4HiYQS\n' + 'dbe4MvGWnv0UzwAqdR7OF8+8/5c58YXZIXCO9riYF2ql6KNSL5cyDPcYK5VK0+Q9\n' + 'VI6vuJHSMYcF7wLePw8jtBktqAFE/wbdZiIHhZvNyiNWPPNTGUmQbaJ+TzQEHDs5\n' + '8en+/W7JKnPyBOkxxENbAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n' + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBS0nw/tFR9bCjgqWTPJkyy4oOD8bzAfBgNV\n' + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n' + 'CXGAY3feAak6lHdqj6+YWjy6yyUnLK37bRxZDsyDVXrPRQaXRzPTzx79jvDwEb/H\n' + 'Q/bdQ7zQRWqJcbivQlwhuPJ4kWPUZgSt3JUUuqkMsDzsvj/bwIjlrEFDOdHGh0mi\n' + 'eVIngFEjUXjMh+5aHPEF9BlQnB8LfVtKj18e15UDTXFa+xJPFxUR7wDzCfo4WI1m\n' + 'sUMG4q1FkGAZgsoyFPZfF8IVvgCuGdR8z30VWKklFxttlK0eGLlPAyIO0CQxPQlo\n' + 'saNJrHf4tLOgZIWk+LpDhNd9Et5EzvJ3aURUsKY4pISPPF5WdvM9OE59bERwUErd\n' + 'nuOuQWQeeadMceZnauRzJQ==\n' + '-----END CERTIFICATE-----\n',

	  /**
	   * Amazon RDS us-west-2 certificate CA 2015 to 2020
	   *
	   *   CN = Amazon RDS us-west-2 CA
	   *   OU = Amazon RDS
	   *   O = Amazon Web Services, Inc.
	   *   L = Seattle
	   *   ST = Washington
	   *   C = US
	   *   P = 2015-02-05T22:03:50Z/2020-03-05T22:03:50Z
	   *   F = 94:2C:A8:B0:23:48:17:F0:CD:2F:19:7F:C1:E0:21:7C:65:79:13:3A
	   */
	  '-----BEGIN CERTIFICATE-----\n' + 'MIID/DCCAuSgAwIBAgIBSzANBgkqhkiG9w0BAQUFADCBijELMAkGA1UEBhMCVVMx\n' + 'EzARBgNVBAgMCldhc2hpbmd0b24xEDAOBgNVBAcMB1NlYXR0bGUxIjAgBgNVBAoM\n' + 'GUFtYXpvbiBXZWIgU2VydmljZXMsIEluYy4xEzARBgNVBAsMCkFtYXpvbiBSRFMx\n' + 'GzAZBgNVBAMMEkFtYXpvbiBSRFMgUm9vdCBDQTAeFw0xNTAyMDUyMjAzNTBaFw0y\n' + 'MDAzMDUyMjAzNTBaMIGPMQswCQYDVQQGEwJVUzETMBEGA1UECAwKV2FzaGluZ3Rv\n' + 'bjEQMA4GA1UEBwwHU2VhdHRsZTEiMCAGA1UECgwZQW1hem9uIFdlYiBTZXJ2aWNl\n' + 'cywgSW5jLjETMBEGA1UECwwKQW1hem9uIFJEUzEgMB4GA1UEAwwXQW1hem9uIFJE\n' + 'UyB1cy13ZXN0LTIgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDM\n' + 'H58SR48U6jyERC1vYTnub34smf5EQVXyzaTmspWGWGzT31NLNZGSDFaa7yef9kdO\n' + 'mzJsgebR5tXq6LdwlIoWkKYQ7ycUaadtVKVYdI40QcI3cHn0qLFlg2iBXmWp/B+i\n' + 'Z34VuVlCh31Uj5WmhaBoz8t/GRqh1V/aCsf3Wc6jCezH3QfuCjBpzxdOOHN6Ie2v\n' + 'xX09O5qmZTvMoRBAvPkxdaPg/Mi7fxueWTbEVk78kuFbF1jHYw8U1BLILIAhcqlq\n' + 'x4u8nl73t3O3l/soNUcIwUDK0/S+Kfqhwn9yQyPlhb4Wy3pfnZLJdkyHldktnQav\n' + '9TB9u7KH5Lk0aAYslMLxAgMBAAGjZjBkMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMB\n' + 'Af8ECDAGAQH/AgEAMB0GA1UdDgQWBBT8roM4lRnlFHWMPWRz0zkwFZog1jAfBgNV\n' + 'HSMEGDAWgBROAu6sPvYVyEztLPUFwY+chAhJgzANBgkqhkiG9w0BAQUFAAOCAQEA\n' + 'JwrxwgwmPtcdaU7O7WDdYa4hprpOMamI49NDzmE0s10oGrqmLwZygcWU0jT+fJ+Y\n' + 'pJe1w0CVfKaeLYNsOBVW3X4ZPmffYfWBheZiaiEflq/P6t7/Eg81gaKYnZ/x1Dfa\n' + 'sUYkzPvCkXe9wEz5zdUTOCptDt89rBR9CstL9vE7WYUgiVVmBJffWbHQLtfjv6OF\n' + 'NMb0QME981kGRzc2WhgP71YS2hHd1kXtsoYP1yTu4vThSKsoN4bkiHsaC1cRkLoy\n' + '0fFA4wpB3WloMEvCDaUvvH1LZlBXTNlwi9KtcwD4tDxkkBt4tQczKLGpQ/nF/W9n\n' + '8YDWk3IIc1sd0bkZqoau2Q==\n' + '-----END CERTIFICATE-----\n']
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Parser = __webpack_require__(80);
	var Sequences = __webpack_require__(83);
	var Packets = __webpack_require__(86);
	var Timers = __webpack_require__(128);
	var Stream = __webpack_require__(16).Stream;
	var Util = __webpack_require__(38);
	var PacketWriter = __webpack_require__(129);

	module.exports = Protocol;
	Util.inherits(Protocol, Stream);
	function Protocol(options) {
	  Stream.call(this);

	  options = options || {};

	  this.readable = true;
	  this.writable = true;

	  this._config = options.config || {};
	  this._connection = options.connection;
	  this._callback = null;
	  this._fatalError = null;
	  this._quitSequence = null;
	  this._handshakeSequence = null;
	  this._handshaked = false;
	  this._ended = false;
	  this._destroyed = false;
	  this._queue = [];
	  this._handshakeInitializationPacket = null;

	  this._parser = new Parser({
	    onError: this.handleParserError.bind(this),
	    onPacket: this._parsePacket.bind(this),
	    config: this._config
	  });
	}

	Protocol.prototype.write = function (buffer) {
	  this._parser.write(buffer);
	  return true;
	};

	Protocol.prototype.handshake = function handshake(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  options = options || {};
	  options.config = this._config;

	  return this._handshakeSequence = this._enqueue(new Sequences.Handshake(options, callback));
	};

	Protocol.prototype.query = function query(options, callback) {
	  return this._enqueue(new Sequences.Query(options, callback));
	};

	Protocol.prototype.changeUser = function changeUser(options, callback) {
	  return this._enqueue(new Sequences.ChangeUser(options, callback));
	};

	Protocol.prototype.ping = function ping(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  return this._enqueue(new Sequences.Ping(options, callback));
	};

	Protocol.prototype.stats = function stats(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  return this._enqueue(new Sequences.Statistics(options, callback));
	};

	Protocol.prototype.quit = function quit(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  return this._quitSequence = this._enqueue(new Sequences.Quit(options, callback));
	};

	Protocol.prototype.end = function () {
	  if (this._ended) {
	    return;
	  }
	  this._ended = true;

	  var expected = this._quitSequence && this._queue[0] === this._quitSequence;
	  if (expected) {
	    this._quitSequence.end();
	    this.emit('end');
	    return;
	  }

	  var err = new Error('Connection lost: The server closed the connection.');
	  err.fatal = true;
	  err.code = 'PROTOCOL_CONNECTION_LOST';

	  this._delegateError(err);
	};

	Protocol.prototype.pause = function () {
	  this._parser.pause();
	  // Since there is a file stream in query, we must transmit pause/resume event to current sequence.
	  var seq = this._queue[0];
	  if (seq && seq.emit) {
	    seq.emit('pause');
	  }
	};

	Protocol.prototype.resume = function () {
	  this._parser.resume();
	  // Since there is a file stream in query, we must transmit pause/resume event to current sequence.
	  var seq = this._queue[0];
	  if (seq && seq.emit) {
	    seq.emit('resume');
	  }
	};

	Protocol.prototype._enqueue = function (sequence) {
	  if (!this._validateEnqueue(sequence)) {
	    return sequence;
	  }

	  if (this._config.trace) {
	    // Long stack trace support
	    sequence._callSite = sequence._callSite || new Error();
	  }

	  this._queue.push(sequence);
	  this.emit('enqueue', sequence);

	  var self = this;
	  sequence.on('error', function (err) {
	    self._delegateError(err, sequence);
	  }).on('packet', function (packet) {
	    Timers.active(sequence);
	    self._emitPacket(packet);
	  }).on('end', function () {
	    self._dequeue(sequence);
	  }).on('timeout', function () {
	    var err = new Error(sequence.constructor.name + ' inactivity timeout');

	    err.code = 'PROTOCOL_SEQUENCE_TIMEOUT';
	    err.fatal = true;
	    err.timeout = sequence._timeout;

	    self._delegateError(err, sequence);
	  }).on('start-tls', function () {
	    Timers.active(sequence);
	    self._connection._startTLS(function (err) {
	      if (err) {
	        // SSL negotiation error are fatal
	        err.code = 'HANDSHAKE_SSL_ERROR';
	        err.fatal = true;
	        sequence.end(err);
	        return;
	      }

	      Timers.active(sequence);
	      sequence._tlsUpgradeCompleteHandler();
	    });
	  });

	  if (this._queue.length === 1) {
	    this._parser.resetPacketNumber();
	    this._startSequence(sequence);
	  }

	  return sequence;
	};

	Protocol.prototype._validateEnqueue = function _validateEnqueue(sequence) {
	  var err;
	  var prefix = 'Cannot enqueue ' + sequence.constructor.name;
	  var prefixBefore = prefix + ' before ';
	  var prefixAfter = prefix + ' after ';

	  if (this._fatalError) {
	    err = new Error(prefixAfter + 'fatal error.');
	    err.code = 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR';
	  } else if (this._quitSequence) {
	    err = new Error(prefixAfter + 'invoking quit.');
	    err.code = 'PROTOCOL_ENQUEUE_AFTER_QUIT';
	  } else if (this._destroyed) {
	    err = new Error(prefixAfter + 'being destroyed.');
	    err.code = 'PROTOCOL_ENQUEUE_AFTER_DESTROY';
	  } else if (this._handshakeSequence && sequence.constructor === Sequences.Handshake) {
	    err = new Error(prefixAfter + 'already enqueuing a Handshake.');
	    err.code = 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE';
	  } else if (!this._handshakeSequence && sequence.constructor === Sequences.ChangeUser) {
	    err = new Error(prefixBefore + 'a Handshake.');
	    err.code = 'PROTOCOL_ENQUEUE_BEFORE_HANDSHAKE';
	  } else {
	    return true;
	  }

	  var self = this;
	  err.fatal = false;

	  // add error handler
	  sequence.on('error', function (err) {
	    self._delegateError(err, sequence);
	  });

	  process.nextTick(function () {
	    sequence.end(err);
	  });

	  return false;
	};

	Protocol.prototype._parsePacket = function () {
	  var sequence = this._queue[0];

	  if (!sequence) {
	    var err = new Error('Received packet with no active sequence.');
	    err.code = 'PROTOCOL_STRAY_PACKET';
	    err.fatal = true;

	    this._delegateError(err);
	    return;
	  }

	  var Packet = this._determinePacket(sequence);
	  var packet = new Packet({ protocol41: this._config.protocol41 });
	  var packetName = Packet.name;

	  // Special case: Faster dispatch, and parsing done inside sequence
	  if (Packet === Packets.RowDataPacket) {
	    sequence.RowDataPacket(packet, this._parser, this._connection);

	    if (this._config.debug) {
	      this._debugPacket(true, packet);
	    }

	    return;
	  }

	  if (this._config.debug) {
	    this._parsePacketDebug(packet);
	  } else {
	    packet.parse(this._parser);
	  }

	  if (Packet === Packets.HandshakeInitializationPacket) {
	    this._handshakeInitializationPacket = packet;
	  }

	  Timers.active(sequence);

	  if (!sequence[packetName]) {
	    var err = new Error('Received packet in the wrong sequence.');
	    err.code = 'PROTOCOL_INCORRECT_PACKET_SEQUENCE';
	    err.fatal = true;

	    this._delegateError(err);
	    return;
	  }

	  sequence[packetName](packet);
	};

	Protocol.prototype._parsePacketDebug = function _parsePacketDebug(packet) {
	  try {
	    packet.parse(this._parser);
	  } finally {
	    this._debugPacket(true, packet);
	  }
	};

	Protocol.prototype._emitPacket = function (packet) {
	  var packetWriter = new PacketWriter();
	  packet.write(packetWriter);
	  this.emit('data', packetWriter.toBuffer(this._parser));

	  if (this._config.debug) {
	    this._debugPacket(false, packet);
	  }
	};

	Protocol.prototype._determinePacket = function (sequence) {
	  var firstByte = this._parser.peak();

	  if (sequence.determinePacket) {
	    var Packet = sequence.determinePacket(firstByte, this._parser);
	    if (Packet) {
	      return Packet;
	    }
	  }

	  switch (firstByte) {
	    case 0x00:
	      if (!this._handshaked) {
	        this._handshaked = true;
	        this.emit('handshake', this._handshakeInitializationPacket);
	      }
	      return Packets.OkPacket;
	    case 0xfe:
	      return Packets.EofPacket;
	    case 0xff:
	      return Packets.ErrorPacket;
	  }

	  throw new Error('Could not determine packet, firstByte = ' + firstByte);
	};

	Protocol.prototype._dequeue = function (sequence) {
	  Timers.unenroll(sequence);

	  // No point in advancing the queue, we are dead
	  if (this._fatalError) {
	    return;
	  }

	  this._queue.shift();

	  var sequence = this._queue[0];
	  if (!sequence) {
	    this.emit('drain');
	    return;
	  }

	  this._parser.resetPacketNumber();

	  this._startSequence(sequence);
	};

	Protocol.prototype._startSequence = function (sequence) {
	  if (sequence._timeout > 0 && isFinite(sequence._timeout)) {
	    Timers.enroll(sequence, sequence._timeout);
	    Timers.active(sequence);
	  }

	  if (sequence.constructor === Sequences.ChangeUser) {
	    sequence.start(this._handshakeInitializationPacket);
	  } else {
	    sequence.start();
	  }
	};

	Protocol.prototype.handleNetworkError = function (err) {
	  err.fatal = true;

	  var sequence = this._queue[0];
	  if (sequence) {
	    sequence.end(err);
	  } else {
	    this._delegateError(err);
	  }
	};

	Protocol.prototype.handleParserError = function handleParserError(err) {
	  var sequence = this._queue[0];
	  if (sequence) {
	    sequence.end(err);
	  } else {
	    this._delegateError(err);
	  }
	};

	Protocol.prototype._delegateError = function (err, sequence) {
	  // Stop delegating errors after the first fatal error
	  if (this._fatalError) {
	    return;
	  }

	  if (err.fatal) {
	    this._fatalError = err;
	  }

	  if (this._shouldErrorBubbleUp(err, sequence)) {
	    // Can't use regular 'error' event here as that always destroys the pipe
	    // between socket and protocol which is not what we want (unless the
	    // exception was fatal).
	    this.emit('unhandledError', err);
	  } else if (err.fatal) {
	    // Send fatal error to all sequences in the queue
	    var queue = this._queue;
	    process.nextTick(function () {
	      queue.forEach(function (sequence) {
	        sequence.end(err);
	      });
	      queue.length = 0;
	    });
	  }

	  // Make sure the stream we are piping to is getting closed
	  if (err.fatal) {
	    this.emit('end', err);
	  }
	};

	Protocol.prototype._shouldErrorBubbleUp = function (err, sequence) {
	  if (sequence) {
	    if (sequence.hasErrorHandler()) {
	      return false;
	    } else if (!err.fatal) {
	      return true;
	    }
	  }

	  return err.fatal && !this._hasPendingErrorHandlers();
	};

	Protocol.prototype._hasPendingErrorHandlers = function () {
	  return this._queue.some(function (sequence) {
	    return sequence.hasErrorHandler();
	  });
	};

	Protocol.prototype.destroy = function () {
	  this._destroyed = true;
	  this._parser.pause();

	  if (this._connection.state !== "disconnected") {
	    if (!this._ended) {
	      this.end();
	    }
	  }
	};

	Protocol.prototype._debugPacket = function (incoming, packet) {
	  var headline = incoming ? '<-- ' : '--> ';

	  headline = headline + packet.constructor.name;

	  // check for debug packet restriction
	  if (Array.isArray(this._config.debug) && this._config.debug.indexOf(packet.constructor.name) === -1) {
	    return;
	  }

	  console.log(headline);
	  console.log(packet);
	  console.log('');
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, process) {var MAX_PACKET_LENGTH = Math.pow(2, 24) - 1;
	var MUL_32BIT = Math.pow(2, 32);
	var PacketHeader = __webpack_require__(81);
	var BigNumber = __webpack_require__(82);

	module.exports = Parser;
	function Parser(options) {
	  options = options || {};

	  this._supportBigNumbers = options.config && options.config.supportBigNumbers;
	  this._buffer = new Buffer(0);
	  this._longPacketBuffers = [];
	  this._offset = 0;
	  this._packetEnd = null;
	  this._packetHeader = null;
	  this._packetOffset = null;
	  this._onError = options.onError || function (err) {
	    throw err;
	  };
	  this._onPacket = options.onPacket || function () {};
	  this._nextPacketNumber = 0;
	  this._encoding = 'utf-8';
	  this._paused = false;
	}

	Parser.prototype.write = function (buffer) {
	  this.append(buffer);

	  while (true) {
	    if (this._paused) {
	      return;
	    }

	    if (!this._packetHeader) {
	      if (this._bytesRemaining() < 4) {
	        break;
	      }

	      this._packetHeader = new PacketHeader(this.parseUnsignedNumber(3), this.parseUnsignedNumber(1));

	      if (this._packetHeader.number !== this._nextPacketNumber) {
	        var err = new Error('Packets out of order. Got: ' + this._packetHeader.number + ' ' + 'Expected: ' + this._nextPacketNumber);

	        err.code = 'PROTOCOL_PACKETS_OUT_OF_ORDER';
	        err.fatal = true;

	        this._onError(err);
	      }

	      this.incrementPacketNumber();
	    }

	    if (this._bytesRemaining() < this._packetHeader.length) {
	      break;
	    }

	    this._packetEnd = this._offset + this._packetHeader.length;
	    this._packetOffset = this._offset;

	    if (this._packetHeader.length === MAX_PACKET_LENGTH) {
	      this._longPacketBuffers.push(this._buffer.slice(this._packetOffset, this._packetEnd));

	      this._advanceToNextPacket();
	      continue;
	    }

	    this._combineLongPacketBuffers();

	    // Try...finally to ensure exception safety. Unfortunately this is costing
	    // us up to ~10% performance in some benchmarks.
	    var hadException = true;
	    try {
	      this._onPacket(this._packetHeader);
	      hadException = false;
	    } catch (err) {
	      if (!err || typeof err.code !== 'string' || err.code.substr(0, 7) !== 'PARSER_') {
	        // Rethrow unknown errors
	        throw err;
	      }

	      // Pass down parser errors
	      this._onError(err);
	      hadException = false;
	    } finally {
	      this._advanceToNextPacket();

	      // If we had an exception, the parser while loop will be broken out
	      // of after the finally block. So we need to make sure to re-enter it
	      // to continue parsing any bytes that may already have been received.
	      if (hadException) {
	        process.nextTick(this.write.bind(this));
	      }
	    }
	  }
	};

	Parser.prototype.append = function append(chunk) {
	  if (!chunk || chunk.length === 0) {
	    return;
	  }

	  var buffer = chunk;
	  var sliceEnd = this._buffer.length;
	  var sliceStart = this._packetOffset === null ? this._offset : this._packetOffset;
	  var sliceLength = sliceEnd - sliceStart;

	  if (sliceLength !== 0) {
	    // Create a new Buffer
	    buffer = new Buffer(sliceLength + chunk.length);

	    // Copy data
	    this._buffer.copy(buffer, 0, sliceStart, sliceEnd);
	    chunk.copy(buffer, sliceLength);
	  }

	  // Adjust data-tracking pointers
	  this._buffer = buffer;
	  this._offset = this._offset - sliceStart;
	  this._packetEnd = this._packetEnd !== null ? this._packetEnd - sliceStart : null;
	  this._packetOffset = this._packetOffset !== null ? this._packetOffset - sliceStart : null;
	};

	Parser.prototype.pause = function () {
	  this._paused = true;
	};

	Parser.prototype.resume = function () {
	  this._paused = false;

	  // nextTick() to avoid entering write() multiple times within the same stack
	  // which would cause problems as write manipulates the state of the object.
	  process.nextTick(this.write.bind(this));
	};

	Parser.prototype.peak = function () {
	  return this._buffer[this._offset];
	};

	Parser.prototype.parseUnsignedNumber = function (bytes) {
	  if (bytes === 1) {
	    return this._buffer[this._offset++];
	  }

	  var buffer = this._buffer;
	  var offset = this._offset + bytes - 1;
	  var value = 0;

	  if (bytes > 4) {
	    var err = new Error('parseUnsignedNumber: Supports only up to 4 bytes');
	    err.offset = this._offset - this._packetOffset - 1;
	    err.code = 'PARSER_UNSIGNED_TOO_LONG';
	    throw err;
	  }

	  while (offset >= this._offset) {
	    value = (value << 8 | buffer[offset]) >>> 0;
	    offset--;
	  }

	  this._offset += bytes;

	  return value;
	};

	Parser.prototype.parseLengthCodedString = function () {
	  var length = this.parseLengthCodedNumber();

	  if (length === null) {
	    return null;
	  }

	  return this.parseString(length);
	};

	Parser.prototype.parseLengthCodedBuffer = function () {
	  var length = this.parseLengthCodedNumber();

	  if (length === null) {
	    return null;
	  }

	  return this.parseBuffer(length);
	};

	Parser.prototype.parseLengthCodedNumber = function parseLengthCodedNumber() {
	  if (this._offset >= this._buffer.length) {
	    var err = new Error('Parser: read past end');
	    err.offset = this._offset - this._packetOffset;
	    err.code = 'PARSER_READ_PAST_END';
	    throw err;
	  }

	  var bits = this._buffer[this._offset++];

	  if (bits <= 250) {
	    return bits;
	  }

	  switch (bits) {
	    case 251:
	      return null;
	    case 252:
	      return this.parseUnsignedNumber(2);
	    case 253:
	      return this.parseUnsignedNumber(3);
	    case 254:
	      break;
	    default:
	      var err = new Error('Unexpected first byte' + (bits ? ': 0x' + bits.toString(16) : ''));
	      err.offset = this._offset - this._packetOffset - 1;
	      err.code = 'PARSER_BAD_LENGTH_BYTE';
	      throw err;
	  }

	  var low = this.parseUnsignedNumber(4);
	  var high = this.parseUnsignedNumber(4);
	  var value;

	  if (high >>> 21) {
	    value = new BigNumber(low).plus(new BigNumber(MUL_32BIT).times(high)).toString();

	    if (this._supportBigNumbers) {
	      return value;
	    }

	    var err = new Error('parseLengthCodedNumber: JS precision range exceeded, ' + 'number is >= 53 bit: "' + value + '"');
	    err.offset = this._offset - this._packetOffset - 8;
	    err.code = 'PARSER_JS_PRECISION_RANGE_EXCEEDED';
	    throw err;
	  }

	  value = low + MUL_32BIT * high;

	  return value;
	};

	Parser.prototype.parseFiller = function (length) {
	  return this.parseBuffer(length);
	};

	Parser.prototype.parseNullTerminatedBuffer = function () {
	  var end = this._nullByteOffset();
	  var value = this._buffer.slice(this._offset, end);
	  this._offset = end + 1;

	  return value;
	};

	Parser.prototype.parseNullTerminatedString = function () {
	  var end = this._nullByteOffset();
	  var value = this._buffer.toString(this._encoding, this._offset, end);
	  this._offset = end + 1;

	  return value;
	};

	Parser.prototype._nullByteOffset = function () {
	  var offset = this._offset;

	  while (this._buffer[offset] !== 0x00) {
	    offset++;

	    if (offset >= this._buffer.length) {
	      var err = new Error('Offset of null terminated string not found.');
	      err.offset = this._offset - this._packetOffset;
	      err.code = 'PARSER_MISSING_NULL_BYTE';
	      throw err;
	    }
	  }

	  return offset;
	};

	Parser.prototype.parsePacketTerminatedString = function () {
	  var length = this._packetEnd - this._offset;
	  return this.parseString(length);
	};

	Parser.prototype.parseBuffer = function (length) {
	  var response = new Buffer(length);
	  this._buffer.copy(response, 0, this._offset, this._offset + length);

	  this._offset += length;
	  return response;
	};

	Parser.prototype.parseString = function (length) {
	  var offset = this._offset;
	  var end = offset + length;
	  var value = this._buffer.toString(this._encoding, offset, end);

	  this._offset = end;
	  return value;
	};

	Parser.prototype.parseGeometryValue = function () {
	  var buffer = this.parseLengthCodedBuffer();
	  var offset = 4;

	  if (buffer === null || !buffer.length) {
	    return null;
	  }

	  function parseGeometry() {
	    var result = null;
	    var byteOrder = buffer.readUInt8(offset);offset += 1;
	    var wkbType = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);offset += 4;
	    switch (wkbType) {
	      case 1:
	        // WKBPoint
	        var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	        var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	        result = { x: x, y: y };
	        break;
	      case 2:
	        // WKBLineString
	        var numPoints = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);offset += 4;
	        result = [];
	        for (var i = numPoints; i > 0; i--) {
	          var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	          var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	          result.push({ x: x, y: y });
	        }
	        break;
	      case 3:
	        // WKBPolygon
	        var numRings = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);offset += 4;
	        result = [];
	        for (var i = numRings; i > 0; i--) {
	          var numPoints = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);offset += 4;
	          var line = [];
	          for (var j = numPoints; j > 0; j--) {
	            var x = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	            var y = byteOrder ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset);offset += 8;
	            line.push({ x: x, y: y });
	          }
	          result.push(line);
	        }
	        break;
	      case 4: // WKBMultiPoint
	      case 5: // WKBMultiLineString
	      case 6: // WKBMultiPolygon
	      case 7:
	        // WKBGeometryCollection
	        var num = byteOrder ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);offset += 4;
	        var result = [];
	        for (var i = num; i > 0; i--) {
	          result.push(parseGeometry());
	        }
	        break;
	    }
	    return result;
	  }
	  return parseGeometry();
	};

	Parser.prototype.reachedPacketEnd = function () {
	  return this._offset === this._packetEnd;
	};

	Parser.prototype._bytesRemaining = function () {
	  return this._buffer.length - this._offset;
	};

	Parser.prototype.incrementPacketNumber = function () {
	  var currentPacketNumber = this._nextPacketNumber;
	  this._nextPacketNumber = (this._nextPacketNumber + 1) % 256;

	  return currentPacketNumber;
	};

	Parser.prototype.resetPacketNumber = function () {
	  this._nextPacketNumber = 0;
	};

	Parser.prototype.packetLength = function () {
	  return this._longPacketBuffers.reduce(function (length, buffer) {
	    return length + buffer.length;
	  }, this._packetHeader.length);
	};

	Parser.prototype._combineLongPacketBuffers = function () {
	  if (!this._longPacketBuffers.length) {
	    return;
	  }

	  var trailingPacketBytes = this._buffer.length - this._packetEnd;

	  var length = this._longPacketBuffers.reduce(function (length, buffer) {
	    return length + buffer.length;
	  }, this._bytesRemaining());

	  var combinedBuffer = new Buffer(length);

	  var offset = this._longPacketBuffers.reduce(function (offset, buffer) {
	    buffer.copy(combinedBuffer, offset);
	    return offset + buffer.length;
	  }, 0);

	  this._buffer.copy(combinedBuffer, offset, this._offset);

	  this._buffer = combinedBuffer;
	  this._longPacketBuffers = [];
	  this._offset = 0;
	  this._packetEnd = this._buffer.length - trailingPacketBytes;
	  this._packetOffset = 0;
	};

	Parser.prototype._advanceToNextPacket = function () {
	  this._offset = this._packetEnd;
	  this._packetHeader = null;
	  this._packetEnd = null;
	  this._packetOffset = null;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer, __webpack_require__(8)))

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = PacketHeader;
	function PacketHeader(length, number) {
	  this.length = length;
	  this.number = number;
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v2.0.7 https://github.com/MikeMcl/bignumber.js/LICENCE */

	;(function (global) {
	    'use strict';

	    /*
	      bignumber.js v2.0.7
	      A JavaScript library for arbitrary-precision arithmetic.
	      https://github.com/MikeMcl/bignumber.js
	      Copyright (c) 2015 Michael Mclaughlin <M8ch88l@gmail.com>
	      MIT Expat Licence
	    */

	    var BigNumber,
	        crypto,
	        parseNumeric,
	        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
	        mathceil = Math.ceil,
	        mathfloor = Math.floor,
	        notBool = ' not a boolean or binary digit',
	        roundingMode = 'rounding mode',
	        tooManyDigits = 'number type has more than 15 significant digits',
	        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
	        BASE = 1e14,
	        LOG_BASE = 14,
	        MAX_SAFE_INTEGER = 0x1fffffffffffff,
	        // 2^53 - 1
	    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	        SQRT_BASE = 1e7,

	    /*
	     * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	     * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
	     * exception is thrown (if ERRORS is true).
	     */
	    MAX = 1E9; // 0 to MAX_INT32

	    /*
	     * Create and return a BigNumber constructor.
	     */
	    function another(configObj) {
	        var div,

	        // id tracks the caller function, so its name can be included in error messages.
	        id = 0,
	            P = BigNumber.prototype,
	            ONE = new BigNumber(1),

	        /********************************* EDITABLE DEFAULTS **********************************/

	        /*
	         * The default values below must be integers within the inclusive ranges stated.
	         * The values can also be changed at run-time using BigNumber.config.
	         */

	        // The maximum number of decimal places for operations involving division.
	        DECIMAL_PLACES = 20,
	            // 0 to MAX

	        /*
	         * The rounding mode used when rounding to the above decimal places, and when using
	         * toExponential, toFixed, toFormat and toPrecision, and round (default value).
	         * UP         0 Away from zero.
	         * DOWN       1 Towards zero.
	         * CEIL       2 Towards +Infinity.
	         * FLOOR      3 Towards -Infinity.
	         * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	         * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	         * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	         * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	         * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	         */
	        ROUNDING_MODE = 4,
	            // 0 to 8

	        // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	        // The exponent value at and beneath which toString returns exponential notation.
	        // Number type: -7
	        TO_EXP_NEG = -7,
	            // 0 to -MAX

	        // The exponent value at and above which toString returns exponential notation.
	        // Number type: 21
	        TO_EXP_POS = 21,
	            // 0 to MAX

	        // RANGE : [MIN_EXP, MAX_EXP]

	        // The minimum exponent value, beneath which underflow to zero occurs.
	        // Number type: -324  (5e-324)
	        MIN_EXP = -1e7,
	            // -1 to -MAX

	        // The maximum exponent value, above which overflow to Infinity occurs.
	        // Number type:  308  (1.7976931348623157e+308)
	        // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	        MAX_EXP = 1e7,
	            // 1 to MAX

	        // Whether BigNumber Errors are ever thrown.
	        ERRORS = true,
	            // true or false

	        // Change to intValidatorNoErrors if ERRORS is false.
	        isValidInt = intValidatorWithErrors,
	            // intValidatorWithErrors/intValidatorNoErrors

	        // Whether to use cryptographically-secure random number generation, if available.
	        CRYPTO = false,
	            // true or false

	        /*
	         * The modulo mode used when calculating the modulus: a mod n.
	         * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	         * The remainder (r) is calculated as: r = a - n * q.
	         *
	         * UP        0 The remainder is positive if the dividend is negative, else is negative.
	         * DOWN      1 The remainder has the same sign as the dividend.
	         *             This modulo mode is commonly known as 'truncated division' and is
	         *             equivalent to (a % n) in JavaScript.
	         * FLOOR     3 The remainder has the same sign as the divisor (Python %).
	         * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	         * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	         *             The remainder is always positive.
	         *
	         * The truncated division, floored division, Euclidian division and IEEE 754 remainder
	         * modes are commonly used for the modulus operation.
	         * Although the other rounding modes can also be used, they may not give useful results.
	         */
	        MODULO_MODE = 1,
	            // 0 to 9

	        // The maximum number of significant digits of the result of the toPower operation.
	        // If POW_PRECISION is 0, there will be unlimited significant digits.
	        POW_PRECISION = 100,
	            // 0 to MAX

	        // The format specification used by the BigNumber.prototype.toFormat method.
	        FORMAT = {
	            decimalSeparator: '.',
	            groupSeparator: ',',
	            groupSize: 3,
	            secondaryGroupSize: 0,
	            fractionGroupSeparator: '\xA0', // non-breaking space
	            fractionGroupSize: 0
	        };

	        /******************************************************************************************/

	        // CONSTRUCTOR

	        /*
	         * The BigNumber constructor and exported function.
	         * Create and return a new instance of a BigNumber object.
	         *
	         * n {number|string|BigNumber} A numeric value.
	         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
	         */
	        function BigNumber(n, b) {
	            var c,
	                e,
	                i,
	                num,
	                len,
	                str,
	                x = this;

	            // Enable constructor usage without new.
	            if (!(x instanceof BigNumber)) {

	                // 'BigNumber() constructor call without new: {n}'
	                if (ERRORS) raise(26, 'constructor call without new', n);
	                return new BigNumber(n, b);
	            }

	            // 'new BigNumber() base not an integer: {b}'
	            // 'new BigNumber() base out of range: {b}'
	            if (b == null || !isValidInt(b, 2, 64, id, 'base')) {

	                // Duplicate.
	                if (n instanceof BigNumber) {
	                    x.s = n.s;
	                    x.e = n.e;
	                    x.c = (n = n.c) ? n.slice() : n;
	                    id = 0;
	                    return;
	                }

	                if ((num = typeof n == 'number') && n * 0 == 0) {
	                    x.s = 1 / n < 0 ? (n = -n, -1) : 1;

	                    // Fast path for integers.
	                    if (n === ~ ~n) {
	                        for (e = 0, i = n; i >= 10; i /= 10, e++);
	                        x.e = e;
	                        x.c = [n];
	                        id = 0;
	                        return;
	                    }

	                    str = n + '';
	                } else {
	                    if (!isNumeric.test(str = n + '')) return parseNumeric(x, str, num);
	                    x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
	                }
	            } else {
	                b = b | 0;
	                str = n + '';

	                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
	                // Allow exponential notation to be used with base 10 argument.
	                if (b == 10) {
	                    x = new BigNumber(n instanceof BigNumber ? n : str);
	                    return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
	                }

	                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	                // Any number in exponential form will fail due to the [Ee][+-].
	                if ((num = typeof n == 'number') && n * 0 != 0 || !new RegExp('^-?' + (c = '[' + ALPHABET.slice(0, b) + ']+') + '(?:\\.' + c + ')?$', b < 37 ? 'i' : '').test(str)) {
	                    return parseNumeric(x, str, num, b);
	                }

	                if (num) {
	                    x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1;

	                    if (ERRORS && str.replace(/^0\.0*|\./, '').length > 15) {

	                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                        raise(id, tooManyDigits, n);
	                    }

	                    // Prevent later check for length on converted number.
	                    num = false;
	                } else {
	                    x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
	                }

	                str = convertBase(str, 10, b, x.s);
	            }

	            // Decimal point?
	            if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	            // Exponential form?
	            if ((i = str.search(/e/i)) > 0) {

	                // Determine exponent.
	                if (e < 0) e = i;
	                e += +str.slice(i + 1);
	                str = str.substring(0, i);
	            } else if (e < 0) {

	                // Integer.
	                e = str.length;
	            }

	            // Determine leading zeros.
	            for (i = 0; str.charCodeAt(i) === 48; i++);

	            // Determine trailing zeros.
	            for (len = str.length; str.charCodeAt(--len) === 48;);
	            str = str.slice(i, len + 1);

	            if (str) {
	                len = str.length;

	                // Disallow numbers with over 15 significant digits if number type.
	                // 'new BigNumber() number type has more than 15 significant digits: {n}'
	                if (num && ERRORS && len > 15) raise(id, tooManyDigits, x.s * n);

	                e = e - i - 1;

	                // Overflow?
	                if (e > MAX_EXP) {

	                    // Infinity.
	                    x.c = x.e = null;

	                    // Underflow?
	                } else if (e < MIN_EXP) {

	                        // Zero.
	                        x.c = [x.e = 0];
	                    } else {
	                        x.e = e;
	                        x.c = [];

	                        // Transform base

	                        // e is the base 10 exponent.
	                        // i is where to slice str to get the first element of the coefficient array.
	                        i = (e + 1) % LOG_BASE;
	                        if (e < 0) i += LOG_BASE;

	                        if (i < len) {
	                            if (i) x.c.push(+str.slice(0, i));

	                            for (len -= LOG_BASE; i < len;) {
	                                x.c.push(+str.slice(i, i += LOG_BASE));
	                            }

	                            str = str.slice(i);
	                            i = LOG_BASE - str.length;
	                        } else {
	                            i -= len;
	                        }

	                        for (; i--; str += '0');
	                        x.c.push(+str);
	                    }
	            } else {

	                // Zero.
	                x.c = [x.e = 0];
	            }

	            id = 0;
	        }

	        // CONSTRUCTOR PROPERTIES

	        BigNumber.another = another;

	        BigNumber.ROUND_UP = 0;
	        BigNumber.ROUND_DOWN = 1;
	        BigNumber.ROUND_CEIL = 2;
	        BigNumber.ROUND_FLOOR = 3;
	        BigNumber.ROUND_HALF_UP = 4;
	        BigNumber.ROUND_HALF_DOWN = 5;
	        BigNumber.ROUND_HALF_EVEN = 6;
	        BigNumber.ROUND_HALF_CEIL = 7;
	        BigNumber.ROUND_HALF_FLOOR = 8;
	        BigNumber.EUCLID = 9;

	        /*
	         * Configure infrequently-changing library-wide settings.
	         *
	         * Accept an object or an argument list, with one or many of the following properties or
	         * parameters respectively:
	         *
	         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
	         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
	         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
	         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
	         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
	         *   ERRORS          {boolean|number}   true, false, 1 or 0
	         *   CRYPTO          {boolean|number}   true, false, 1 or 0
	         *   MODULO_MODE     {number}           0 to 9 inclusive
	         *   POW_PRECISION   {number}           0 to MAX inclusive
	         *   FORMAT          {object}           See BigNumber.prototype.toFormat
	         *      decimalSeparator       {string}
	         *      groupSeparator         {string}
	         *      groupSize              {number}
	         *      secondaryGroupSize     {number}
	         *      fractionGroupSeparator {string}
	         *      fractionGroupSize      {number}
	         *
	         * (The values assigned to the above FORMAT object properties are not checked for validity.)
	         *
	         * E.g.
	         * BigNumber.config(20, 4) is equivalent to
	         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	         *
	         * Ignore properties/parameters set to null or undefined.
	         * Return an object with the properties current values.
	         */
	        BigNumber.config = function () {
	            var v,
	                p,
	                i = 0,
	                r = {},
	                a = arguments,
	                o = a[0],
	                has = o && typeof o == 'object' ? function () {
	                if (o.hasOwnProperty(p)) return (v = o[p]) != null;
	            } : function () {
	                if (a.length > i) return (v = a[i++]) != null;
	            };

	            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	            // 'config() DECIMAL_PLACES not an integer: {v}'
	            // 'config() DECIMAL_PLACES out of range: {v}'
	            if (has(p = 'DECIMAL_PLACES') && isValidInt(v, 0, MAX, 2, p)) {
	                DECIMAL_PLACES = v | 0;
	            }
	            r[p] = DECIMAL_PLACES;

	            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	            // 'config() ROUNDING_MODE not an integer: {v}'
	            // 'config() ROUNDING_MODE out of range: {v}'
	            if (has(p = 'ROUNDING_MODE') && isValidInt(v, 0, 8, 2, p)) {
	                ROUNDING_MODE = v | 0;
	            }
	            r[p] = ROUNDING_MODE;

	            // EXPONENTIAL_AT {number|number[]}
	            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	            // 'config() EXPONENTIAL_AT not an integer: {v}'
	            // 'config() EXPONENTIAL_AT out of range: {v}'
	            if (has(p = 'EXPONENTIAL_AT')) {

	                if (isArray(v)) {
	                    if (isValidInt(v[0], -MAX, 0, 2, p) && isValidInt(v[1], 0, MAX, 2, p)) {
	                        TO_EXP_NEG = v[0] | 0;
	                        TO_EXP_POS = v[1] | 0;
	                    }
	                } else if (isValidInt(v, -MAX, MAX, 2, p)) {
	                    TO_EXP_NEG = -(TO_EXP_POS = (v < 0 ? -v : v) | 0);
	                }
	            }
	            r[p] = [TO_EXP_NEG, TO_EXP_POS];

	            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	            // 'config() RANGE not an integer: {v}'
	            // 'config() RANGE cannot be zero: {v}'
	            // 'config() RANGE out of range: {v}'
	            if (has(p = 'RANGE')) {

	                if (isArray(v)) {
	                    if (isValidInt(v[0], -MAX, -1, 2, p) && isValidInt(v[1], 1, MAX, 2, p)) {
	                        MIN_EXP = v[0] | 0;
	                        MAX_EXP = v[1] | 0;
	                    }
	                } else if (isValidInt(v, -MAX, MAX, 2, p)) {
	                    if (v | 0) MIN_EXP = -(MAX_EXP = (v < 0 ? -v : v) | 0);else if (ERRORS) raise(2, p + ' cannot be zero', v);
	                }
	            }
	            r[p] = [MIN_EXP, MAX_EXP];

	            // ERRORS {boolean|number} true, false, 1 or 0.
	            // 'config() ERRORS not a boolean or binary digit: {v}'
	            if (has(p = 'ERRORS')) {

	                if (v === !!v || v === 1 || v === 0) {
	                    id = 0;
	                    isValidInt = (ERRORS = !!v) ? intValidatorWithErrors : intValidatorNoErrors;
	                } else if (ERRORS) {
	                    raise(2, p + notBool, v);
	                }
	            }
	            r[p] = ERRORS;

	            // CRYPTO {boolean|number} true, false, 1 or 0.
	            // 'config() CRYPTO not a boolean or binary digit: {v}'
	            // 'config() crypto unavailable: {crypto}'
	            if (has(p = 'CRYPTO')) {

	                if (v === !!v || v === 1 || v === 0) {
	                    CRYPTO = !!(v && crypto && typeof crypto == 'object');
	                    if (v && !CRYPTO && ERRORS) raise(2, 'crypto unavailable', crypto);
	                } else if (ERRORS) {
	                    raise(2, p + notBool, v);
	                }
	            }
	            r[p] = CRYPTO;

	            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	            // 'config() MODULO_MODE not an integer: {v}'
	            // 'config() MODULO_MODE out of range: {v}'
	            if (has(p = 'MODULO_MODE') && isValidInt(v, 0, 9, 2, p)) {
	                MODULO_MODE = v | 0;
	            }
	            r[p] = MODULO_MODE;

	            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	            // 'config() POW_PRECISION not an integer: {v}'
	            // 'config() POW_PRECISION out of range: {v}'
	            if (has(p = 'POW_PRECISION') && isValidInt(v, 0, MAX, 2, p)) {
	                POW_PRECISION = v | 0;
	            }
	            r[p] = POW_PRECISION;

	            // FORMAT {object}
	            // 'config() FORMAT not an object: {v}'
	            if (has(p = 'FORMAT')) {

	                if (typeof v == 'object') {
	                    FORMAT = v;
	                } else if (ERRORS) {
	                    raise(2, p + ' not an object', v);
	                }
	            }
	            r[p] = FORMAT;

	            return r;
	        };

	        /*
	         * Return a new BigNumber whose value is the maximum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.max = function () {
	            return maxOrMin(arguments, P.lt);
	        };

	        /*
	         * Return a new BigNumber whose value is the minimum of the arguments.
	         *
	         * arguments {number|string|BigNumber}
	         */
	        BigNumber.min = function () {
	            return maxOrMin(arguments, P.gt);
	        };

	        /*
	         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	         * zeros are produced).
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         *
	         * 'random() decimal places not an integer: {dp}'
	         * 'random() decimal places out of range: {dp}'
	         * 'random() crypto unavailable: {crypto}'
	         */
	        BigNumber.random = function () {
	            var pow2_53 = 0x20000000000000;

	            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	            // Check if Math.random() produces more than 32 bits of randomness.
	            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	            var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function () {
	                return mathfloor(Math.random() * pow2_53);
	            } : function () {
	                return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
	            };

	            return function (dp) {
	                var a,
	                    b,
	                    e,
	                    k,
	                    v,
	                    i = 0,
	                    c = [],
	                    rand = new BigNumber(ONE);

	                dp = dp == null || !isValidInt(dp, 0, MAX, 14) ? DECIMAL_PLACES : dp | 0;
	                k = mathceil(dp / LOG_BASE);

	                if (CRYPTO) {

	                    // Browsers supporting crypto.getRandomValues.
	                    if (crypto && crypto.getRandomValues) {

	                        a = crypto.getRandomValues(new Uint32Array(k *= 2));

	                        for (; i < k;) {

	                            // 53 bits:
	                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	                            //                                     11111 11111111 11111111
	                            // 0x20000 is 2^21.
	                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

	                            // Rejection sampling:
	                            // 0 <= v < 9007199254740992
	                            // Probability that v >= 9e15, is
	                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	                            if (v >= 9e15) {
	                                b = crypto.getRandomValues(new Uint32Array(2));
	                                a[i] = b[0];
	                                a[i + 1] = b[1];
	                            } else {

	                                // 0 <= v <= 8999999999999999
	                                // 0 <= (v % 1e14) <= 99999999999999
	                                c.push(v % 1e14);
	                                i += 2;
	                            }
	                        }
	                        i = k / 2;

	                        // Node.js supporting crypto.randomBytes.
	                    } else if (crypto && crypto.randomBytes) {

	                            // buffer
	                            a = crypto.randomBytes(k *= 7);

	                            for (; i < k;) {

	                                // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	                                // 0x100000000 is 2^32, 0x1000000 is 2^24
	                                // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	                                // 0 <= v < 9007199254740992
	                                v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

	                                if (v >= 9e15) {
	                                    crypto.randomBytes(7).copy(a, i);
	                                } else {

	                                    // 0 <= (v % 1e14) <= 99999999999999
	                                    c.push(v % 1e14);
	                                    i += 7;
	                                }
	                            }
	                            i = k / 7;
	                        } else if (ERRORS) {
	                            raise(14, 'crypto unavailable', crypto);
	                        }
	                }

	                // Use Math.random: CRYPTO is false or crypto is unavailable and ERRORS is false.
	                if (!i) {

	                    for (; i < k;) {
	                        v = random53bitInt();
	                        if (v < 9e15) c[i++] = v % 1e14;
	                    }
	                }

	                k = c[--i];
	                dp %= LOG_BASE;

	                // Convert trailing digits to zeros according to dp.
	                if (k && dp) {
	                    v = POWS_TEN[LOG_BASE - dp];
	                    c[i] = mathfloor(k / v) * v;
	                }

	                // Remove trailing elements which are zero.
	                for (; c[i] === 0; c.pop(), i--);

	                // Zero?
	                if (i < 0) {
	                    c = [e = 0];
	                } else {

	                    // Remove leading elements which are zero and adjust exponent accordingly.
	                    for (e = -1; c[0] === 0; c.shift(), e -= LOG_BASE);

	                    // Count the digits of the first element of c to determine leading zeros, and...
	                    for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

	                    // adjust the exponent accordingly.
	                    if (i < LOG_BASE) e -= LOG_BASE - i;
	                }

	                rand.e = e;
	                rand.c = c;
	                return rand;
	            };
	        }();

	        // PRIVATE FUNCTIONS

	        // Convert a numeric string of baseIn to a numeric string of baseOut.
	        function convertBase(str, baseOut, baseIn, sign) {
	            var d,
	                e,
	                k,
	                r,
	                x,
	                xc,
	                y,
	                i = str.indexOf('.'),
	                dp = DECIMAL_PLACES,
	                rm = ROUNDING_MODE;

	            if (baseIn < 37) str = str.toLowerCase();

	            // Non-integer.
	            if (i >= 0) {
	                k = POW_PRECISION;

	                // Unlimited precision.
	                POW_PRECISION = 0;
	                str = str.replace('.', '');
	                y = new BigNumber(baseIn);
	                x = y.pow(str.length - i);
	                POW_PRECISION = k;

	                // Convert str as if an integer, then restore the fraction part by dividing the
	                // result by its base raised to a power.
	                y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e), 10, baseOut);
	                y.e = y.c.length;
	            }

	            // Convert the number as integer.
	            xc = toBaseOut(str, baseIn, baseOut);
	            e = k = xc.length;

	            // Remove trailing zeros.
	            for (; xc[--k] == 0; xc.pop());
	            if (!xc[0]) return '0';

	            if (i < 0) {
	                --e;
	            } else {
	                x.c = xc;
	                x.e = e;

	                // sign is needed for correct rounding.
	                x.s = sign;
	                x = div(x, y, dp, rm, baseOut);
	                xc = x.c;
	                r = x.r;
	                e = x.e;
	            }

	            d = e + dp + 1;

	            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
	            i = xc[d];
	            k = baseOut / 2;
	            r = r || d < 0 || xc[d + 1] != null;

	            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));

	            if (d < 1 || !xc[0]) {

	                // 1^-dp or 0.
	                str = r ? toFixedPoint('1', -dp) : '0';
	            } else {
	                xc.length = d;

	                if (r) {

	                    // Rounding up may mean the previous digit has to be rounded up and so on.
	                    for (--baseOut; ++xc[--d] > baseOut;) {
	                        xc[d] = 0;

	                        if (!d) {
	                            ++e;
	                            xc.unshift(1);
	                        }
	                    }
	                }

	                // Determine trailing zeros.
	                for (k = xc.length; !xc[--k];);

	                // E.g. [4, 11, 15] becomes 4bf.
	                for (i = 0, str = ''; i <= k; str += ALPHABET.charAt(xc[i++]));
	                str = toFixedPoint(str, e);
	            }

	            // The caller will add the sign.
	            return str;
	        }

	        // Perform division in the specified base. Called by div and convertBase.
	        div = function () {

	            // Assume non-zero x and k.
	            function multiply(x, k, base) {
	                var m,
	                    temp,
	                    xlo,
	                    xhi,
	                    carry = 0,
	                    i = x.length,
	                    klo = k % SQRT_BASE,
	                    khi = k / SQRT_BASE | 0;

	                for (x = x.slice(); i--;) {
	                    xlo = x[i] % SQRT_BASE;
	                    xhi = x[i] / SQRT_BASE | 0;
	                    m = khi * xlo + xhi * klo;
	                    temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
	                    carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
	                    x[i] = temp % base;
	                }

	                if (carry) x.unshift(carry);

	                return x;
	            }

	            function compare(a, b, aL, bL) {
	                var i, cmp;

	                if (aL != bL) {
	                    cmp = aL > bL ? 1 : -1;
	                } else {

	                    for (i = cmp = 0; i < aL; i++) {

	                        if (a[i] != b[i]) {
	                            cmp = a[i] > b[i] ? 1 : -1;
	                            break;
	                        }
	                    }
	                }
	                return cmp;
	            }

	            function subtract(a, b, aL, base) {
	                var i = 0;

	                // Subtract b from a.
	                for (; aL--;) {
	                    a[aL] -= i;
	                    i = a[aL] < b[aL] ? 1 : 0;
	                    a[aL] = i * base + a[aL] - b[aL];
	                }

	                // Remove leading zeros.
	                for (; !a[0] && a.length > 1; a.shift());
	            }

	            // x: dividend, y: divisor.
	            return function (x, y, dp, rm, base) {
	                var cmp,
	                    e,
	                    i,
	                    more,
	                    n,
	                    prod,
	                    prodL,
	                    q,
	                    qc,
	                    rem,
	                    remL,
	                    rem0,
	                    xi,
	                    xL,
	                    yc0,
	                    yL,
	                    yz,
	                    s = x.s == y.s ? 1 : -1,
	                    xc = x.c,
	                    yc = y.c;

	                // Either NaN, Infinity or 0?
	                if (!xc || !xc[0] || !yc || !yc[0]) {

	                    return new BigNumber(

	                    // Return NaN if either NaN, or both Infinity or 0.
	                    !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

	                    // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	                    xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
	                }

	                q = new BigNumber(s);
	                qc = q.c = [];
	                e = x.e - y.e;
	                s = dp + e + 1;

	                if (!base) {
	                    base = BASE;
	                    e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
	                    s = s / LOG_BASE | 0;
	                }

	                // Result exponent may be one less then the current value of e.
	                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	                for (i = 0; yc[i] == (xc[i] || 0); i++);
	                if (yc[i] > (xc[i] || 0)) e--;

	                if (s < 0) {
	                    qc.push(1);
	                    more = true;
	                } else {
	                    xL = xc.length;
	                    yL = yc.length;
	                    i = 0;
	                    s += 2;

	                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

	                    n = mathfloor(base / (yc[0] + 1));

	                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
	                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
	                    if (n > 1) {
	                        yc = multiply(yc, n, base);
	                        xc = multiply(xc, n, base);
	                        yL = yc.length;
	                        xL = xc.length;
	                    }

	                    xi = yL;
	                    rem = xc.slice(0, yL);
	                    remL = rem.length;

	                    // Add zeros to make remainder as long as divisor.
	                    for (; remL < yL; rem[remL++] = 0);
	                    yz = yc.slice();
	                    yz.unshift(0);
	                    yc0 = yc[0];
	                    if (yc[1] >= base / 2) yc0++;
	                    // Not necessary, but to prevent trial digit n > base, when using base 3.
	                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

	                    do {
	                        n = 0;

	                        // Compare divisor and remainder.
	                        cmp = compare(yc, rem, yL, remL);

	                        // If divisor < remainder.
	                        if (cmp < 0) {

	                            // Calculate trial digit, n.

	                            rem0 = rem[0];
	                            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	                            // n is how many times the divisor goes into the current remainder.
	                            n = mathfloor(rem0 / yc0);

	                            //  Algorithm:
	                            //  1. product = divisor * trial digit (n)
	                            //  2. if product > remainder: product -= divisor, n--
	                            //  3. remainder -= product
	                            //  4. if product was < remainder at 2:
	                            //    5. compare new remainder and divisor
	                            //    6. If remainder > divisor: remainder -= divisor, n++

	                            if (n > 1) {

	                                // n may be > base only when base is 3.
	                                if (n >= base) n = base - 1;

	                                // product = divisor * trial digit.
	                                prod = multiply(yc, n, base);
	                                prodL = prod.length;
	                                remL = rem.length;

	                                // Compare product and remainder.
	                                // If product > remainder.
	                                // Trial digit n too high.
	                                // n is 1 too high about 5% of the time, and is not known to have
	                                // ever been more than 1 too high.
	                                while (compare(prod, rem, prodL, remL) == 1) {
	                                    n--;

	                                    // Subtract divisor from product.
	                                    subtract(prod, yL < prodL ? yz : yc, prodL, base);
	                                    prodL = prod.length;
	                                    cmp = 1;
	                                }
	                            } else {

	                                // n is 0 or 1, cmp is -1.
	                                // If n is 0, there is no need to compare yc and rem again below,
	                                // so change cmp to 1 to avoid it.
	                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                                if (n == 0) {

	                                    // divisor < remainder, so n must be at least 1.
	                                    cmp = n = 1;
	                                }

	                                // product = divisor
	                                prod = yc.slice();
	                                prodL = prod.length;
	                            }

	                            if (prodL < remL) prod.unshift(0);

	                            // Subtract product from remainder.
	                            subtract(rem, prod, remL, base);
	                            remL = rem.length;

	                            // If product was < remainder.
	                            if (cmp == -1) {

	                                // Compare divisor and new remainder.
	                                // If divisor < new remainder, subtract divisor from remainder.
	                                // Trial digit n too low.
	                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                                while (compare(yc, rem, yL, remL) < 1) {
	                                    n++;

	                                    // Subtract divisor from remainder.
	                                    subtract(rem, yL < remL ? yz : yc, remL, base);
	                                    remL = rem.length;
	                                }
	                            }
	                        } else if (cmp === 0) {
	                            n++;
	                            rem = [0];
	                        } // else cmp === 1 and n will be 0

	                        // Add the next digit, n, to the result array.
	                        qc[i++] = n;

	                        // Update the remainder.
	                        if (rem[0]) {
	                            rem[remL++] = xc[xi] || 0;
	                        } else {
	                            rem = [xc[xi]];
	                            remL = 1;
	                        }
	                    } while ((xi++ < xL || rem[0] != null) && s--);

	                    more = rem[0] != null;

	                    // Leading zero?
	                    if (!qc[0]) qc.shift();
	                }

	                if (base == BASE) {

	                    // To calculate q.e, first get the number of digits of qc[0].
	                    for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);
	                    round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

	                    // Caller is convertBase.
	                } else {
	                        q.e = e;
	                        q.r = +more;
	                    }

	                return q;
	            };
	        }();

	        /*
	         * Return a string representing the value of BigNumber n in fixed-point or exponential
	         * notation rounded to the specified decimal places or significant digits.
	         *
	         * n is a BigNumber.
	         * i is the index of the last digit required (i.e. the digit that may be rounded up).
	         * rm is the rounding mode.
	         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
	         */
	        function format(n, i, rm, caller) {
	            var c0, e, ne, len, str;

	            rm = rm != null && isValidInt(rm, 0, 8, caller, roundingMode) ? rm | 0 : ROUNDING_MODE;

	            if (!n.c) return n.toString();
	            c0 = n.c[0];
	            ne = n.e;

	            if (i == null) {
	                str = coeffToString(n.c);
	                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG ? toExponential(str, ne) : toFixedPoint(str, ne);
	            } else {
	                n = round(new BigNumber(n), i, rm);

	                // n.e may have changed if the value was rounded up.
	                e = n.e;

	                str = coeffToString(n.c);
	                len = str.length;

	                // toPrecision returns exponential notation if the number of significant digits
	                // specified is less than the number of digits necessary to represent the integer
	                // part of the value in fixed-point notation.

	                // Exponential notation.
	                if (caller == 19 || caller == 24 && (i <= e || e <= TO_EXP_NEG)) {

	                    // Append zeros?
	                    for (; len < i; str += '0', len++);
	                    str = toExponential(str, e);

	                    // Fixed-point notation.
	                } else {
	                        i -= ne;
	                        str = toFixedPoint(str, e);

	                        // Append zeros?
	                        if (e + 1 > len) {
	                            if (--i > 0) for (str += '.'; i--; str += '0');
	                        } else {
	                            i += e - len;
	                            if (i > 0) {
	                                if (e + 1 == len) str += '.';
	                                for (; i--; str += '0');
	                            }
	                        }
	                    }
	            }

	            return n.s < 0 && c0 ? '-' + str : str;
	        }

	        // Handle BigNumber.max and BigNumber.min.
	        function maxOrMin(args, method) {
	            var m,
	                n,
	                i = 0;

	            if (isArray(args[0])) args = args[0];
	            m = new BigNumber(args[0]);

	            for (; ++i < args.length;) {
	                n = new BigNumber(args[i]);

	                // If any number is NaN, return NaN.
	                if (!n.s) {
	                    m = n;
	                    break;
	                } else if (method.call(m, n)) {
	                    m = n;
	                }
	            }

	            return m;
	        }

	        /*
	         * Return true if n is an integer in range, otherwise throw.
	         * Use for argument validation when ERRORS is true.
	         */
	        function intValidatorWithErrors(n, min, max, caller, name) {
	            if (n < min || n > max || n != truncate(n)) {
	                raise(caller, (name || 'decimal places') + (n < min || n > max ? ' out of range' : ' not an integer'), n);
	            }

	            return true;
	        }

	        /*
	         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	         * Called by minus, plus and times.
	         */
	        function normalise(n, c, e) {
	            var i = 1,
	                j = c.length;

	            // Remove trailing zeros.
	            for (; !c[--j]; c.pop());

	            // Calculate the base 10 exponent. First get the number of digits of c[0].
	            for (j = c[0]; j >= 10; j /= 10, i++);

	            // Overflow?
	            if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

	                // Infinity.
	                n.c = n.e = null;

	                // Underflow?
	            } else if (e < MIN_EXP) {

	                    // Zero.
	                    n.c = [n.e = 0];
	                } else {
	                    n.e = e;
	                    n.c = c;
	                }

	            return n;
	        }

	        // Handle values that fail the validity test in BigNumber.
	        parseNumeric = function () {
	            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	                dotAfter = /^([^.]+)\.$/,
	                dotBefore = /^\.([^.]+)$/,
	                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

	            return function (x, str, num, b) {
	                var base,
	                    s = num ? str : str.replace(whitespaceOrPlus, '');

	                // No exception on ±Infinity or NaN.
	                if (isInfinityOrNaN.test(s)) {
	                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	                } else {
	                    if (!num) {

	                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	                        s = s.replace(basePrefix, function (m, p1, p2) {
	                            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	                            return !b || b == base ? p1 : m;
	                        });

	                        if (b) {
	                            base = b;

	                            // E.g. '1.' to '1', '.1' to '0.1'
	                            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
	                        }

	                        if (str != s) return new BigNumber(s, base);
	                    }

	                    // 'new BigNumber() not a number: {n}'
	                    // 'new BigNumber() not a base {b} number: {n}'
	                    if (ERRORS) raise(id, 'not a' + (b ? ' base ' + b : '') + ' number', str);
	                    x.s = null;
	                }

	                x.c = x.e = null;
	                id = 0;
	            };
	        }();

	        // Throw a BigNumber Error.
	        function raise(caller, msg, val) {
	            var error = new Error(['new BigNumber', // 0
	            'cmp', // 1
	            'config', // 2
	            'div', // 3
	            'divToInt', // 4
	            'eq', // 5
	            'gt', // 6
	            'gte', // 7
	            'lt', // 8
	            'lte', // 9
	            'minus', // 10
	            'mod', // 11
	            'plus', // 12
	            'precision', // 13
	            'random', // 14
	            'round', // 15
	            'shift', // 16
	            'times', // 17
	            'toDigits', // 18
	            'toExponential', // 19
	            'toFixed', // 20
	            'toFormat', // 21
	            'toFraction', // 22
	            'pow', // 23
	            'toPrecision', // 24
	            'toString', // 25
	            'BigNumber' // 26
	            ][caller] + '() ' + msg + ': ' + val);

	            error.name = 'BigNumber Error';
	            id = 0;
	            throw error;
	        }

	        /*
	         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	         * If r is truthy, it is known that there are more digits after the rounding digit.
	         */
	        function round(x, sd, rm, r) {
	            var d,
	                i,
	                j,
	                k,
	                n,
	                ni,
	                rd,
	                xc = x.c,
	                pows10 = POWS_TEN;

	            // if x is not Infinity or NaN...
	            if (xc) {

	                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	                // n is a base 1e14 number, the value of the element of array x.c containing rd.
	                // ni is the index of n within x.c.
	                // d is the number of digits of n.
	                // i is the index of rd within n including leading zeros.
	                // j is the actual index of rd within n (if < 0, rd is a leading zero).
	                out: {

	                    // Get the number of digits of the first element of xc.
	                    for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
	                    i = sd - d;

	                    // If the rounding digit is in the first element of xc...
	                    if (i < 0) {
	                        i += LOG_BASE;
	                        j = sd;
	                        n = xc[ni = 0];

	                        // Get the rounding digit at index j of n.
	                        rd = n / pows10[d - j - 1] % 10 | 0;
	                    } else {
	                        ni = mathceil((i + 1) / LOG_BASE);

	                        if (ni >= xc.length) {

	                            if (r) {

	                                // Needed by sqrt.
	                                for (; xc.length <= ni; xc.push(0));
	                                n = rd = 0;
	                                d = 1;
	                                i %= LOG_BASE;
	                                j = i - LOG_BASE + 1;
	                            } else {
	                                break out;
	                            }
	                        } else {
	                            n = k = xc[ni];

	                            // Get the number of digits of n.
	                            for (d = 1; k >= 10; k /= 10, d++);

	                            // Get the index of rd within n.
	                            i %= LOG_BASE;

	                            // Get the index of rd within n, adjusted for leading zeros.
	                            // The number of leading zeros of n is given by LOG_BASE - d.
	                            j = i - LOG_BASE + d;

	                            // Get the rounding digit at index j of n.
	                            rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
	                        }
	                    }

	                    r = r || sd < 0 ||

	                    // Are there any non-zero digits after the rounding digit?
	                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
	                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	                    xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

	                    r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

	                    // Check whether the digit to the left of the rounding digit is odd.
	                    (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));

	                    if (sd < 1 || !xc[0]) {
	                        xc.length = 0;

	                        if (r) {

	                            // Convert sd to decimal places.
	                            sd -= x.e + 1;

	                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	                            xc[0] = pows10[sd % LOG_BASE];
	                            x.e = -sd || 0;
	                        } else {

	                            // Zero.
	                            xc[0] = x.e = 0;
	                        }

	                        return x;
	                    }

	                    // Remove excess digits.
	                    if (i == 0) {
	                        xc.length = ni;
	                        k = 1;
	                        ni--;
	                    } else {
	                        xc.length = ni + 1;
	                        k = pows10[LOG_BASE - i];

	                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	                        // j > 0 means i > number of leading zeros of n.
	                        xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
	                    }

	                    // Round up?
	                    if (r) {

	                        for (;;) {

	                            // If the digit to be rounded up is in the first element of xc...
	                            if (ni == 0) {

	                                // i will be the length of xc[0] before k is added.
	                                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
	                                j = xc[0] += k;
	                                for (k = 1; j >= 10; j /= 10, k++);

	                                // if i != k the length has increased.
	                                if (i != k) {
	                                    x.e++;
	                                    if (xc[0] == BASE) xc[0] = 1;
	                                }

	                                break;
	                            } else {
	                                xc[ni] += k;
	                                if (xc[ni] != BASE) break;
	                                xc[ni--] = 0;
	                                k = 1;
	                            }
	                        }
	                    }

	                    // Remove trailing zeros.
	                    for (i = xc.length; xc[--i] === 0; xc.pop());
	                }

	                // Overflow? Infinity.
	                if (x.e > MAX_EXP) {
	                    x.c = x.e = null;

	                    // Underflow? Zero.
	                } else if (x.e < MIN_EXP) {
	                        x.c = [x.e = 0];
	                    }
	            }

	            return x;
	        }

	        // PROTOTYPE/INSTANCE METHODS

	        /*
	         * Return a new BigNumber whose value is the absolute value of this BigNumber.
	         */
	        P.absoluteValue = P.abs = function () {
	            var x = new BigNumber(this);
	            if (x.s < 0) x.s = 1;
	            return x;
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of Infinity.
	         */
	        P.ceil = function () {
	            return round(new BigNumber(this), this.e + 1, 2);
	        };

	        /*
	         * Return
	         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * 0 if they have the same value,
	         * or null if the value of either is NaN.
	         */
	        P.comparedTo = P.cmp = function (y, b) {
	            id = 1;
	            return compare(this, new BigNumber(y, b));
	        };

	        /*
	         * Return the number of decimal places of the value of this BigNumber, or null if the value
	         * of this BigNumber is ±Infinity or NaN.
	         */
	        P.decimalPlaces = P.dp = function () {
	            var n,
	                v,
	                c = this.c;

	            if (!c) return null;
	            n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

	            // Subtract the number of trailing zeros of the last number.
	            if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
	            if (n < 0) n = 0;

	            return n;
	        };

	        /*
	         *  n / 0 = I
	         *  n / N = N
	         *  n / I = 0
	         *  0 / n = 0
	         *  0 / 0 = N
	         *  0 / N = N
	         *  0 / I = 0
	         *  N / n = N
	         *  N / 0 = N
	         *  N / N = N
	         *  N / I = N
	         *  I / n = I
	         *  I / 0 = I
	         *  I / N = N
	         *  I / I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.dividedBy = P.div = function (y, b) {
	            id = 3;
	            return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
	        };

	        /*
	         * Return a new BigNumber whose value is the integer part of dividing the value of this
	         * BigNumber by the value of BigNumber(y, b).
	         */
	        P.dividedToIntegerBy = P.divToInt = function (y, b) {
	            id = 4;
	            return div(this, new BigNumber(y, b), 0, 1);
	        };

	        /*
	         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.equals = P.eq = function (y, b) {
	            id = 5;
	            return compare(this, new BigNumber(y, b)) === 0;
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
	         * number in the direction of -Infinity.
	         */
	        P.floor = function () {
	            return round(new BigNumber(this), this.e + 1, 3);
	        };

	        /*
	         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.greaterThan = P.gt = function (y, b) {
	            id = 6;
	            return compare(this, new BigNumber(y, b)) > 0;
	        };

	        /*
	         * Return true if the value of this BigNumber is greater than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.greaterThanOrEqualTo = P.gte = function (y, b) {
	            id = 7;
	            return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
	        };

	        /*
	         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
	         */
	        P.isFinite = function () {
	            return !!this.c;
	        };

	        /*
	         * Return true if the value of this BigNumber is an integer, otherwise return false.
	         */
	        P.isInteger = P.isInt = function () {
	            return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
	        };

	        /*
	         * Return true if the value of this BigNumber is NaN, otherwise returns false.
	         */
	        P.isNaN = function () {
	            return !this.s;
	        };

	        /*
	         * Return true if the value of this BigNumber is negative, otherwise returns false.
	         */
	        P.isNegative = P.isNeg = function () {
	            return this.s < 0;
	        };

	        /*
	         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
	         */
	        P.isZero = function () {
	            return !!this.c && this.c[0] == 0;
	        };

	        /*
	         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	         * otherwise returns false.
	         */
	        P.lessThan = P.lt = function (y, b) {
	            id = 8;
	            return compare(this, new BigNumber(y, b)) < 0;
	        };

	        /*
	         * Return true if the value of this BigNumber is less than or equal to the value of
	         * BigNumber(y, b), otherwise returns false.
	         */
	        P.lessThanOrEqualTo = P.lte = function (y, b) {
	            id = 9;
	            return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
	        };

	        /*
	         *  n - 0 = n
	         *  n - N = N
	         *  n - I = -I
	         *  0 - n = -n
	         *  0 - 0 = 0
	         *  0 - N = N
	         *  0 - I = -I
	         *  N - n = N
	         *  N - 0 = N
	         *  N - N = N
	         *  N - I = N
	         *  I - n = I
	         *  I - 0 = I
	         *  I - N = N
	         *  I - I = N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	         * BigNumber(y, b).
	         */
	        P.minus = P.sub = function (y, b) {
	            var i,
	                j,
	                t,
	                xLTy,
	                x = this,
	                a = x.s;

	            id = 10;
	            y = new BigNumber(y, b);
	            b = y.s;

	            // Either NaN?
	            if (!a || !b) return new BigNumber(NaN);

	            // Signs differ?
	            if (a != b) {
	                y.s = -b;
	                return x.plus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if (!xe || !ye) {

	                // Either Infinity?
	                if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

	                // Either zero?
	                if (!xc[0] || !yc[0]) {

	                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                    return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

	                    // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	                    ROUNDING_MODE == 3 ? -0 : 0);
	                }
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Determine which is the bigger number.
	            if (a = xe - ye) {

	                if (xLTy = a < 0) {
	                    a = -a;
	                    t = xc;
	                } else {
	                    ye = xe;
	                    t = yc;
	                }

	                t.reverse();

	                // Prepend zeros to equalise exponents.
	                for (b = a; b--; t.push(0));
	                t.reverse();
	            } else {

	                // Exponents equal. Check digit by digit.
	                j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

	                for (a = b = 0; b < j; b++) {

	                    if (xc[b] != yc[b]) {
	                        xLTy = xc[b] < yc[b];
	                        break;
	                    }
	                }
	            }

	            // x < y? Point xc to the array of the bigger number.
	            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

	            b = (j = yc.length) - (i = xc.length);

	            // Append zeros to xc if shorter.
	            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	            if (b > 0) for (; b--; xc[i++] = 0);
	            b = BASE - 1;

	            // Subtract yc from xc.
	            for (; j > a;) {

	                if (xc[--j] < yc[j]) {
	                    for (i = j; i && !xc[--i]; xc[i] = b);
	                    --xc[i];
	                    xc[j] += BASE;
	                }

	                xc[j] -= yc[j];
	            }

	            // Remove leading zeros and adjust exponent accordingly.
	            for (; xc[0] == 0; xc.shift(), --ye);

	            // Zero?
	            if (!xc[0]) {

	                // Following IEEE 754 (2008) 6.3,
	                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	                y.s = ROUNDING_MODE == 3 ? -1 : 1;
	                y.c = [y.e = 0];
	                return y;
	            }

	            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	            // for finite x and y.
	            return normalise(y, xc, ye);
	        };

	        /*
	         *   n % 0 =  N
	         *   n % N =  N
	         *   n % I =  n
	         *   0 % n =  0
	         *  -0 % n = -0
	         *   0 % 0 =  N
	         *   0 % N =  N
	         *   0 % I =  0
	         *   N % n =  N
	         *   N % 0 =  N
	         *   N % N =  N
	         *   N % I =  N
	         *   I % n =  N
	         *   I % 0 =  N
	         *   I % N =  N
	         *   I % I =  N
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	         */
	        P.modulo = P.mod = function (y, b) {
	            var q,
	                s,
	                x = this;

	            id = 11;
	            y = new BigNumber(y, b);

	            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	            if (!x.c || !y.s || y.c && !y.c[0]) {
	                return new BigNumber(NaN);

	                // Return x if y is Infinity or x is zero.
	            } else if (!y.c || x.c && !x.c[0]) {
	                    return new BigNumber(x);
	                }

	            if (MODULO_MODE == 9) {

	                // Euclidian division: q = sign(y) * floor(x / abs(y))
	                // r = x - qy    where  0 <= r < abs(y)
	                s = y.s;
	                y.s = 1;
	                q = div(x, y, 0, 3);
	                y.s = s;
	                q.s *= s;
	            } else {
	                q = div(x, y, 0, MODULO_MODE);
	            }

	            return x.minus(q.times(y));
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber negated,
	         * i.e. multiplied by -1.
	         */
	        P.negated = P.neg = function () {
	            var x = new BigNumber(this);
	            x.s = -x.s || null;
	            return x;
	        };

	        /*
	         *  n + 0 = n
	         *  n + N = N
	         *  n + I = I
	         *  0 + n = n
	         *  0 + 0 = 0
	         *  0 + N = N
	         *  0 + I = I
	         *  N + n = N
	         *  N + 0 = N
	         *  N + N = N
	         *  N + I = N
	         *  I + n = I
	         *  I + 0 = I
	         *  I + N = N
	         *  I + I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	         * BigNumber(y, b).
	         */
	        P.plus = P.add = function (y, b) {
	            var t,
	                x = this,
	                a = x.s;

	            id = 12;
	            y = new BigNumber(y, b);
	            b = y.s;

	            // Either NaN?
	            if (!a || !b) return new BigNumber(NaN);

	            // Signs differ?
	            if (a != b) {
	                y.s = -b;
	                return x.minus(y);
	            }

	            var xe = x.e / LOG_BASE,
	                ye = y.e / LOG_BASE,
	                xc = x.c,
	                yc = y.c;

	            if (!xe || !ye) {

	                // Return ±Infinity if either ±Infinity.
	                if (!xc || !yc) return new BigNumber(a / 0);

	                // Either zero?
	                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	                if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
	            }

	            xe = bitFloor(xe);
	            ye = bitFloor(ye);
	            xc = xc.slice();

	            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	            if (a = xe - ye) {
	                if (a > 0) {
	                    ye = xe;
	                    t = yc;
	                } else {
	                    a = -a;
	                    t = xc;
	                }

	                t.reverse();
	                for (; a--; t.push(0));
	                t.reverse();
	            }

	            a = xc.length;
	            b = yc.length;

	            // Point xc to the longer array, and b to the shorter length.
	            if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

	            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	            for (a = 0; b;) {
	                a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
	                xc[b] %= BASE;
	            }

	            if (a) {
	                xc.unshift(a);
	                ++ye;
	            }

	            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	            // ye = MAX_EXP + 1 possible
	            return normalise(y, xc, ye);
	        };

	        /*
	         * Return the number of significant digits of the value of this BigNumber.
	         *
	         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	         */
	        P.precision = P.sd = function (z) {
	            var n,
	                v,
	                x = this,
	                c = x.c;

	            // 'precision() argument not a boolean or binary digit: {z}'
	            if (z != null && z !== !!z && z !== 1 && z !== 0) {
	                if (ERRORS) raise(13, 'argument' + notBool, z);
	                if (z != !!z) z = null;
	            }

	            if (!c) return null;
	            v = c.length - 1;
	            n = v * LOG_BASE + 1;

	            if (v = c[v]) {

	                // Subtract the number of trailing zeros of the last element.
	                for (; v % 10 == 0; v /= 10, n--);

	                // Add the number of digits of the first element.
	                for (v = c[0]; v >= 10; v /= 10, n++);
	            }

	            if (z && x.e + 1 > n) n = x.e + 1;

	            return n;
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
	         * omitted.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'round() decimal places out of range: {dp}'
	         * 'round() decimal places not an integer: {dp}'
	         * 'round() rounding mode not an integer: {rm}'
	         * 'round() rounding mode out of range: {rm}'
	         */
	        P.round = function (dp, rm) {
	            var n = new BigNumber(this);

	            if (dp == null || isValidInt(dp, 0, MAX, 15)) {
	                round(n, ~ ~dp + this.e + 1, rm == null || !isValidInt(rm, 0, 8, 15, roundingMode) ? ROUNDING_MODE : rm | 0);
	            }

	            return n;
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	         *
	         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	         *
	         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
	         * otherwise.
	         *
	         * 'shift() argument not an integer: {k}'
	         * 'shift() argument out of range: {k}'
	         */
	        P.shift = function (k) {
	            var n = this;
	            return isValidInt(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument')

	            // k < 1e+21, or truncate(k) will produce exponential notation.
	            ? n.times('1e' + truncate(k)) : new BigNumber(n.c && n.c[0] && (k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER) ? n.s * (k < 0 ? 0 : 1 / 0) : n);
	        };

	        /*
	         *  sqrt(-n) =  N
	         *  sqrt( N) =  N
	         *  sqrt(-I) =  N
	         *  sqrt( I) =  I
	         *  sqrt( 0) =  0
	         *  sqrt(-0) = -0
	         *
	         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	         */
	        P.squareRoot = P.sqrt = function () {
	            var m,
	                n,
	                r,
	                rep,
	                t,
	                x = this,
	                c = x.c,
	                s = x.s,
	                e = x.e,
	                dp = DECIMAL_PLACES + 4,
	                half = new BigNumber('0.5');

	            // Negative/NaN/Infinity/zero?
	            if (s !== 1 || !c || !c[0]) {
	                return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
	            }

	            // Initial estimate.
	            s = Math.sqrt(+x);

	            // Math.sqrt underflow/overflow?
	            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	            if (s == 0 || s == 1 / 0) {
	                n = coeffToString(c);
	                if ((n.length + e) % 2 == 0) n += '0';
	                s = Math.sqrt(n);
	                e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

	                if (s == 1 / 0) {
	                    n = '1e' + e;
	                } else {
	                    n = s.toExponential();
	                    n = n.slice(0, n.indexOf('e') + 1) + e;
	                }

	                r = new BigNumber(n);
	            } else {
	                r = new BigNumber(s + '');
	            }

	            // Check for zero.
	            // r could be zero if MIN_EXP is changed after the this value was created.
	            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	            // coeffToString to throw.
	            if (r.c[0]) {
	                e = r.e;
	                s = e + dp;
	                if (s < 3) s = 0;

	                // Newton-Raphson iteration.
	                for (;;) {
	                    t = r;
	                    r = half.times(t.plus(div(x, t, dp, 1)));

	                    if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

	                        // The exponent of r may here be one less than the final result exponent,
	                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	                        // are indexed correctly.
	                        if (r.e < e) --s;
	                        n = n.slice(s - 3, s + 1);

	                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	                        // iteration.
	                        if (n == '9999' || !rep && n == '4999') {

	                            // On the first iteration only, check to see if rounding up gives the
	                            // exact result as the nines may infinitely repeat.
	                            if (!rep) {
	                                round(t, t.e + DECIMAL_PLACES + 2, 0);

	                                if (t.times(t).eq(x)) {
	                                    r = t;
	                                    break;
	                                }
	                            }

	                            dp += 4;
	                            s += 4;
	                            rep = 1;
	                        } else {

	                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	                            // result. If not, then there are further digits and m will be truthy.
	                            if (! +n || ! +n.slice(1) && n.charAt(0) == '5') {

	                                // Truncate to the first rounding digit.
	                                round(r, r.e + DECIMAL_PLACES + 2, 1);
	                                m = !r.times(r).eq(x);
	                            }

	                            break;
	                        }
	                    }
	                }
	            }

	            return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
	        };

	        /*
	         *  n * 0 = 0
	         *  n * N = N
	         *  n * I = I
	         *  0 * n = 0
	         *  0 * 0 = 0
	         *  0 * N = N
	         *  0 * I = N
	         *  N * n = N
	         *  N * 0 = N
	         *  N * N = N
	         *  N * I = N
	         *  I * n = I
	         *  I * 0 = N
	         *  I * N = N
	         *  I * I = I
	         *
	         * Return a new BigNumber whose value is the value of this BigNumber times the value of
	         * BigNumber(y, b).
	         */
	        P.times = P.mul = function (y, b) {
	            var c,
	                e,
	                i,
	                j,
	                k,
	                m,
	                xcL,
	                xlo,
	                xhi,
	                ycL,
	                ylo,
	                yhi,
	                zc,
	                base,
	                sqrtBase,
	                x = this,
	                xc = x.c,
	                yc = (id = 17, y = new BigNumber(y, b)).c;

	            // Either NaN, ±Infinity or ±0?
	            if (!xc || !yc || !xc[0] || !yc[0]) {

	                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	                if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
	                    y.c = y.e = y.s = null;
	                } else {
	                    y.s *= x.s;

	                    // Return ±Infinity if either is ±Infinity.
	                    if (!xc || !yc) {
	                        y.c = y.e = null;

	                        // Return ±0 if either is ±0.
	                    } else {
	                            y.c = [0];
	                            y.e = 0;
	                        }
	                }

	                return y;
	            }

	            e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
	            y.s *= x.s;
	            xcL = xc.length;
	            ycL = yc.length;

	            // Ensure xc points to longer array and xcL to its length.
	            if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

	            // Initialise the result array with zeros.
	            for (i = xcL + ycL, zc = []; i--; zc.push(0));

	            base = BASE;
	            sqrtBase = SQRT_BASE;

	            for (i = ycL; --i >= 0;) {
	                c = 0;
	                ylo = yc[i] % sqrtBase;
	                yhi = yc[i] / sqrtBase | 0;

	                for (k = xcL, j = i + k; j > i;) {
	                    xlo = xc[--k] % sqrtBase;
	                    xhi = xc[k] / sqrtBase | 0;
	                    m = yhi * xlo + xhi * ylo;
	                    xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
	                    c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
	                    zc[j--] = xlo % base;
	                }

	                zc[j] = c;
	            }

	            if (c) {
	                ++e;
	            } else {
	                zc.shift();
	            }

	            return normalise(y, zc, e);
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
	         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toDigits() precision out of range: {sd}'
	         * 'toDigits() precision not an integer: {sd}'
	         * 'toDigits() rounding mode not an integer: {rm}'
	         * 'toDigits() rounding mode out of range: {rm}'
	         */
	        P.toDigits = function (sd, rm) {
	            var n = new BigNumber(this);
	            sd = sd == null || !isValidInt(sd, 1, MAX, 18, 'precision') ? null : sd | 0;
	            rm = rm == null || !isValidInt(rm, 0, 8, 18, roundingMode) ? ROUNDING_MODE : rm | 0;
	            return sd ? round(n, sd, rm) : n;
	        };

	        /*
	         * Return a string representing the value of this BigNumber in exponential notation and
	         * rounded using ROUNDING_MODE to dp fixed decimal places.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toExponential() decimal places not an integer: {dp}'
	         * 'toExponential() decimal places out of range: {dp}'
	         * 'toExponential() rounding mode not an integer: {rm}'
	         * 'toExponential() rounding mode out of range: {rm}'
	         */
	        P.toExponential = function (dp, rm) {
	            return format(this, dp != null && isValidInt(dp, 0, MAX, 19) ? ~ ~dp + 1 : null, rm, 19);
	        };

	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounding
	         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	         *
	         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	         * but e.g. (-0.00001).toFixed(0) is '-0'.
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFixed() decimal places not an integer: {dp}'
	         * 'toFixed() decimal places out of range: {dp}'
	         * 'toFixed() rounding mode not an integer: {rm}'
	         * 'toFixed() rounding mode out of range: {rm}'
	         */
	        P.toFixed = function (dp, rm) {
	            return format(this, dp != null && isValidInt(dp, 0, MAX, 20) ? ~ ~dp + this.e + 1 : null, rm, 20);
	        };

	        /*
	         * Return a string representing the value of this BigNumber in fixed-point notation rounded
	         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	         * of the FORMAT object (see BigNumber.config).
	         *
	         * FORMAT = {
	         *      decimalSeparator : '.',
	         *      groupSeparator : ',',
	         *      groupSize : 3,
	         *      secondaryGroupSize : 0,
	         *      fractionGroupSeparator : '\xA0',    // non-breaking space
	         *      fractionGroupSize : 0
	         * };
	         *
	         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toFormat() decimal places not an integer: {dp}'
	         * 'toFormat() decimal places out of range: {dp}'
	         * 'toFormat() rounding mode not an integer: {rm}'
	         * 'toFormat() rounding mode out of range: {rm}'
	         */
	        P.toFormat = function (dp, rm) {
	            var str = format(this, dp != null && isValidInt(dp, 0, MAX, 21) ? ~ ~dp + this.e + 1 : null, rm, 21);

	            if (this.c) {
	                var i,
	                    arr = str.split('.'),
	                    g1 = +FORMAT.groupSize,
	                    g2 = +FORMAT.secondaryGroupSize,
	                    groupSeparator = FORMAT.groupSeparator,
	                    intPart = arr[0],
	                    fractionPart = arr[1],
	                    isNeg = this.s < 0,
	                    intDigits = isNeg ? intPart.slice(1) : intPart,
	                    len = intDigits.length;

	                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

	                if (g1 > 0 && len > 0) {
	                    i = len % g1 || g1;
	                    intPart = intDigits.substr(0, i);

	                    for (; i < len; i += g1) {
	                        intPart += groupSeparator + intDigits.substr(i, g1);
	                    }

	                    if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
	                    if (isNeg) intPart = '-' + intPart;
	                }

	                str = fractionPart ? intPart + FORMAT.decimalSeparator + ((g2 = +FORMAT.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + FORMAT.fractionGroupSeparator) : fractionPart) : intPart;
	            }

	            return str;
	        };

	        /*
	         * Return a string array representing the value of this BigNumber as a simple fraction with
	         * an integer numerator and an integer denominator. The denominator will be a positive
	         * non-zero value less than or equal to the specified maximum denominator. If a maximum
	         * denominator is not specified, the denominator will be the lowest value necessary to
	         * represent the number exactly.
	         *
	         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
	         *
	         * 'toFraction() max denominator not an integer: {md}'
	         * 'toFraction() max denominator out of range: {md}'
	         */
	        P.toFraction = function (md) {
	            var arr,
	                d0,
	                d2,
	                e,
	                exp,
	                n,
	                n0,
	                q,
	                s,
	                k = ERRORS,
	                x = this,
	                xc = x.c,
	                d = new BigNumber(ONE),
	                n1 = d0 = new BigNumber(ONE),
	                d1 = n0 = new BigNumber(ONE);

	            if (md != null) {
	                ERRORS = false;
	                n = new BigNumber(md);
	                ERRORS = k;

	                if (!(k = n.isInt()) || n.lt(ONE)) {

	                    if (ERRORS) {
	                        raise(22, 'max denominator ' + (k ? 'out of range' : 'not an integer'), md);
	                    }

	                    // ERRORS is false:
	                    // If md is a finite non-integer >= 1, round it to an integer and use it.
	                    md = !k && n.c && round(n, n.e + 1, 1).gte(ONE) ? n : null;
	                }
	            }

	            if (!xc) return x.toString();
	            s = coeffToString(xc);

	            // Determine initial denominator.
	            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	            e = d.e = s.length - x.e - 1;
	            d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
	            md = !md || n.cmp(d) > 0 ? e > 0 ? d : n1 : n;

	            exp = MAX_EXP;
	            MAX_EXP = 1 / 0;
	            n = new BigNumber(s);

	            // n0 = d1 = 0
	            n0.c[0] = 0;

	            for (;;) {
	                q = div(n, d, 0, 1);
	                d2 = d0.plus(q.times(d1));
	                if (d2.cmp(md) == 1) break;
	                d0 = d1;
	                d1 = d2;
	                n1 = n0.plus(q.times(d2 = n1));
	                n0 = d2;
	                d = n.minus(q.times(d2 = d));
	                n = d2;
	            }

	            d2 = div(md.minus(d0), d1, 0, 1);
	            n0 = n0.plus(d2.times(n1));
	            d0 = d0.plus(d2.times(d1));
	            n0.s = n1.s = x.s;
	            e *= 2;

	            // Determine which fraction is closer to x, n0/d0 or n1/d1
	            arr = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().cmp(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1.toString(), d1.toString()] : [n0.toString(), d0.toString()];

	            MAX_EXP = exp;
	            return arr;
	        };

	        /*
	         * Return the value of this BigNumber converted to a number primitive.
	         */
	        P.toNumber = function () {
	            var x = this;

	            // Ensure zero has correct sign.
	            return +x || (x.s ? x.s * 0 : NaN);
	        };

	        /*
	         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
	         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	         * If POW_PRECISION is not 0, round to POW_PRECISION using ROUNDING_MODE.
	         *
	         * n {number} Integer, -9007199254740992 to 9007199254740992 inclusive.
	         * (Performs 54 loop iterations for n of 9007199254740992.)
	         *
	         * 'pow() exponent not an integer: {n}'
	         * 'pow() exponent out of range: {n}'
	         */
	        P.toPower = P.pow = function (n) {
	            var k,
	                y,
	                i = mathfloor(n < 0 ? -n : +n),
	                x = this;

	            // Pass ±Infinity to Math.pow if exponent is out of range.
	            if (!isValidInt(n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent') && (!isFinite(n) || i > MAX_SAFE_INTEGER && (n /= 0) || parseFloat(n) != n && !(n = NaN))) {
	                return new BigNumber(Math.pow(+x, n));
	            }

	            // Truncating each coefficient array to a length of k after each multiplication equates
	            // to truncating significant digits to POW_PRECISION + [28, 41], i.e. there will be a
	            // minimum of 28 guard digits retained. (Using + 1.5 would give [9, 21] guard digits.)
	            k = POW_PRECISION ? mathceil(POW_PRECISION / LOG_BASE + 2) : 0;
	            y = new BigNumber(ONE);

	            for (;;) {

	                if (i % 2) {
	                    y = y.times(x);
	                    if (!y.c) break;
	                    if (k && y.c.length > k) y.c.length = k;
	                }

	                i = mathfloor(i / 2);
	                if (!i) break;

	                x = x.times(x);
	                if (k && x.c && x.c.length > k) x.c.length = k;
	            }

	            if (n < 0) y = ONE.div(y);
	            return k ? round(y, POW_PRECISION, ROUNDING_MODE) : y;
	        };

	        /*
	         * Return a string representing the value of this BigNumber rounded to sd significant digits
	         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	         * necessary to represent the integer part of the value in fixed-point notation, then use
	         * exponential notation.
	         *
	         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	         *
	         * 'toPrecision() precision not an integer: {sd}'
	         * 'toPrecision() precision out of range: {sd}'
	         * 'toPrecision() rounding mode not an integer: {rm}'
	         * 'toPrecision() rounding mode out of range: {rm}'
	         */
	        P.toPrecision = function (sd, rm) {
	            return format(this, sd != null && isValidInt(sd, 1, MAX, 24, 'precision') ? sd | 0 : null, rm, 24);
	        };

	        /*
	         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	         * TO_EXP_NEG, return exponential notation.
	         *
	         * [b] {number} Integer, 2 to 64 inclusive.
	         *
	         * 'toString() base not an integer: {b}'
	         * 'toString() base out of range: {b}'
	         */
	        P.toString = function (b) {
	            var str,
	                n = this,
	                s = n.s,
	                e = n.e;

	            // Infinity or NaN?
	            if (e === null) {

	                if (s) {
	                    str = 'Infinity';
	                    if (s < 0) str = '-' + str;
	                } else {
	                    str = 'NaN';
	                }
	            } else {
	                str = coeffToString(n.c);

	                if (b == null || !isValidInt(b, 2, 64, 25, 'base')) {
	                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e);
	                } else {
	                    str = convertBase(toFixedPoint(str, e), b | 0, 10, s);
	                }

	                if (s < 0 && n.c[0]) str = '-' + str;
	            }

	            return str;
	        };

	        /*
	         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
	         * number.
	         */
	        P.truncated = P.trunc = function () {
	            return round(new BigNumber(this), this.e + 1, 1);
	        };

	        /*
	         * Return as toString, but do not accept a base argument.
	         */
	        P.valueOf = P.toJSON = function () {
	            return this.toString();
	        };

	        // Aliases for BigDecimal methods.
	        //P.add = P.plus;         // P.add included above
	        //P.subtract = P.minus;   // P.sub included above
	        //P.multiply = P.times;   // P.mul included above
	        //P.divide = P.div;
	        //P.remainder = P.mod;
	        //P.compareTo = P.cmp;
	        //P.negate = P.neg;

	        if (configObj != null) BigNumber.config(configObj);

	        return BigNumber;
	    }

	    // PRIVATE HELPER FUNCTIONS

	    function bitFloor(n) {
	        var i = n | 0;
	        return n > 0 || n === i ? i : i - 1;
	    }

	    // Return a coefficient array as a string of base 10 digits.
	    function coeffToString(a) {
	        var s,
	            z,
	            i = 1,
	            j = a.length,
	            r = a[0] + '';

	        for (; i < j;) {
	            s = a[i++] + '';
	            z = LOG_BASE - s.length;
	            for (; z--; s = '0' + s);
	            r += s;
	        }

	        // Determine trailing zeros.
	        for (j = r.length; r.charCodeAt(--j) === 48;);
	        return r.slice(0, j + 1 || 1);
	    }

	    // Compare the value of BigNumbers x and y.
	    function compare(x, y) {
	        var a,
	            b,
	            xc = x.c,
	            yc = y.c,
	            i = x.s,
	            j = y.s,
	            k = x.e,
	            l = y.e;

	        // Either NaN?
	        if (!i || !j) return null;

	        a = xc && !xc[0];
	        b = yc && !yc[0];

	        // Either zero?
	        if (a || b) return a ? b ? 0 : -j : i;

	        // Signs differ?
	        if (i != j) return i;

	        a = i < 0;
	        b = k == l;

	        // Either Infinity?
	        if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

	        // Compare exponents.
	        if (!b) return k > l ^ a ? 1 : -1;

	        j = (k = xc.length) < (l = yc.length) ? k : l;

	        // Compare digit by digit.
	        for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

	        // Compare lengths.
	        return k == l ? 0 : k > l ^ a ? 1 : -1;
	    }

	    /*
	     * Return true if n is a valid number in range, otherwise false.
	     * Use for argument validation when ERRORS is false.
	     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
	     */
	    function intValidatorNoErrors(n, min, max) {
	        return (n = truncate(n)) >= min && n <= max;
	    }

	    function isArray(obj) {
	        return Object.prototype.toString.call(obj) == '[object Array]';
	    }

	    /*
	     * Convert string of baseIn to an array of numbers of baseOut.
	     * Eg. convertBase('255', 10, 16) returns [15, 15].
	     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	     */
	    function toBaseOut(str, baseIn, baseOut) {
	        var j,
	            arr = [0],
	            arrL,
	            i = 0,
	            len = str.length;

	        for (; i < len;) {
	            for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);
	            arr[j = 0] += ALPHABET.indexOf(str.charAt(i++));

	            for (; j < arr.length; j++) {

	                if (arr[j] > baseOut - 1) {
	                    if (arr[j + 1] == null) arr[j + 1] = 0;
	                    arr[j + 1] += arr[j] / baseOut | 0;
	                    arr[j] %= baseOut;
	                }
	            }
	        }

	        return arr.reverse();
	    }

	    function toExponential(str, e) {
	        return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
	    }

	    function toFixedPoint(str, e) {
	        var len, z;

	        // Negative exponent?
	        if (e < 0) {

	            // Prepend zeros.
	            for (z = '0.'; ++e; z += '0');
	            str = z + str;

	            // Positive exponent
	        } else {
	                len = str.length;

	                // Append zeros.
	                if (++e > len) {
	                    for (z = '0', e -= len; --e; z += '0');
	                    str += z;
	                } else if (e < len) {
	                    str = str.slice(0, e) + '.' + str.slice(e);
	                }
	            }

	        return str;
	    }

	    function truncate(n) {
	        n = parseFloat(n);
	        return n < 0 ? mathceil(n) : mathfloor(n);
	    }

	    // EXPORT

	    BigNumber = another();

	    // AMD.
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return BigNumber;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	        // Node and other environments that support module.exports.
	    } else if (typeof module != 'undefined' && module.exports) {
	            module.exports = BigNumber;
	            if (!crypto) try {
	                crypto = require('crypto');
	            } catch (e) {}

	            // Browser.
	        } else {
	                global.BigNumber = BigNumber;
	            }
	})(this);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	exports.ChangeUser = __webpack_require__(84);
	exports.Handshake = __webpack_require__(110);
	exports.Ping = __webpack_require__(111);
	exports.Query = __webpack_require__(112);
	exports.Quit = __webpack_require__(126);
	exports.Sequence = __webpack_require__(85);
	exports.Statistics = __webpack_require__(127);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);
	var Auth = __webpack_require__(109);

	module.exports = ChangeUser;
	Util.inherits(ChangeUser, Sequence);
	function ChangeUser(options, callback) {
	  Sequence.call(this, options, callback);

	  this._user = options.user;
	  this._password = options.password;
	  this._database = options.database;
	  this._charsetNumber = options.charsetNumber;
	  this._currentConfig = options.currentConfig;
	}

	ChangeUser.prototype.start = function (handshakeInitializationPacket) {
	  var scrambleBuff = handshakeInitializationPacket.scrambleBuff();
	  scrambleBuff = Auth.token(this._password, scrambleBuff);

	  var packet = new Packets.ComChangeUserPacket({
	    user: this._user,
	    scrambleBuff: scrambleBuff,
	    database: this._database,
	    charsetNumber: this._charsetNumber
	  });

	  this._currentConfig.user = this._user;
	  this._currentConfig.password = this._password;
	  this._currentConfig.database = this._database;
	  this._currentConfig.charsetNumber = this._charsetNumber;

	  this.emit('packet', packet);
	};

	ChangeUser.prototype['ErrorPacket'] = function (packet) {
	  var err = this._packetToError(packet);
	  err.fatal = true;
	  this.end(err);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(38);
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var Packets = __webpack_require__(86);
	var ErrorConstants = __webpack_require__(108);

	var listenerCount = EventEmitter.listenerCount || function (emitter, type) {
	  return emitter.listeners(type).length;
	};

	module.exports = Sequence;
	Util.inherits(Sequence, EventEmitter);
	function Sequence(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  EventEmitter.call(this);

	  options = options || {};

	  this._callback = callback;
	  this._callSite = null;
	  this._ended = false;
	  this._timeout = options.timeout;

	  // For Timers
	  this._idleNext = null;
	  this._idlePrev = null;
	  this._idleStart = null;
	  this._idleTimeout = undefined;
	  this._repeat = null;
	}

	Sequence.determinePacket = function (byte) {
	  switch (byte) {
	    case 0x00:
	      return Packets.OkPacket;
	    case 0xfe:
	      return Packets.EofPacket;
	    case 0xff:
	      return Packets.ErrorPacket;
	  }
	};

	Sequence.prototype.hasErrorHandler = function () {
	  return Boolean(this._callback) || listenerCount(this, 'error') > 1;
	};

	Sequence.prototype._packetToError = function (packet) {
	  var code = ErrorConstants[packet.errno] || 'UNKNOWN_CODE_PLEASE_REPORT';
	  var err = new Error(code + ': ' + packet.message);
	  err.code = code;
	  err.errno = packet.errno;
	  err.sqlState = packet.sqlState;

	  return err;
	};

	Sequence.prototype._addLongStackTrace = function (err) {
	  if (!this._callSite) {
	    return;
	  }

	  var delimiter = '\n    --------------------\n';

	  if (err.stack.indexOf(delimiter) > -1) {
	    return;
	  }

	  err.stack += delimiter + this._callSite.stack.replace(/.+\n/, '');
	};

	Sequence.prototype.end = function (err) {
	  if (this._ended) {
	    return;
	  }

	  this._ended = true;

	  if (err) {
	    this._addLongStackTrace(err);
	  }

	  // Without this we are leaking memory. This problem was introduced in
	  // 8189925374e7ce3819bbe88b64c7b15abac96b16. I suspect that the error object
	  // causes a cyclic reference that the GC does not detect properly, but I was
	  // unable to produce a standalone version of this leak. This would be a great
	  // challenge for somebody interested in difficult problems : )!
	  this._callSite = null;

	  // try...finally for exception safety
	  try {
	    if (err) {
	      this.emit('error', err);
	    }
	  } finally {
	    try {
	      if (this._callback) {
	        this._callback.apply(this, arguments);
	      }
	    } finally {
	      this.emit('end');
	    }
	  }
	};

	Sequence.prototype['OkPacket'] = function (packet) {
	  this.end(null, packet);
	};

	Sequence.prototype['ErrorPacket'] = function (packet) {
	  this.end(this._packetToError(packet));
	};

	// Implemented by child classes
	Sequence.prototype.start = function () {};

	Sequence.prototype._onTimeout = function _onTimeout() {
	  this.emit('timeout');
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports.ClientAuthenticationPacket = __webpack_require__(87);
	exports.ComChangeUserPacket = __webpack_require__(88);
	exports.ComPingPacket = __webpack_require__(89);
	exports.ComQueryPacket = __webpack_require__(90);
	exports.ComQuitPacket = __webpack_require__(91);
	exports.ComStatisticsPacket = __webpack_require__(92);
	exports.EmptyPacket = __webpack_require__(93);
	exports.EofPacket = __webpack_require__(94);
	exports.ErrorPacket = __webpack_require__(95);
	exports.Field = __webpack_require__(96);
	exports.FieldPacket = __webpack_require__(98);
	exports.HandshakeInitializationPacket = __webpack_require__(99);
	exports.LocalDataFilePacket = __webpack_require__(100);
	exports.OkPacket = __webpack_require__(101);
	exports.OldPasswordPacket = __webpack_require__(102);
	exports.ResultSetHeaderPacket = __webpack_require__(103);
	exports.RowDataPacket = __webpack_require__(104);
	exports.SSLRequestPacket = __webpack_require__(105);
	exports.StatisticsPacket = __webpack_require__(106);
	exports.UseOldPasswordPacket = __webpack_require__(107);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = ClientAuthenticationPacket;
	function ClientAuthenticationPacket(options) {
	  options = options || {};

	  this.clientFlags = options.clientFlags;
	  this.maxPacketSize = options.maxPacketSize;
	  this.charsetNumber = options.charsetNumber;
	  this.filler = undefined;
	  this.user = options.user;
	  this.scrambleBuff = options.scrambleBuff;
	  this.database = options.database;
	  this.protocol41 = options.protocol41;
	}

	ClientAuthenticationPacket.prototype.parse = function (parser) {
	  if (this.protocol41) {
	    this.clientFlags = parser.parseUnsignedNumber(4);
	    this.maxPacketSize = parser.parseUnsignedNumber(4);
	    this.charsetNumber = parser.parseUnsignedNumber(1);
	    this.filler = parser.parseFiller(23);
	    this.user = parser.parseNullTerminatedString();
	    this.scrambleBuff = parser.parseLengthCodedBuffer();
	    this.database = parser.parseNullTerminatedString();
	  } else {
	    this.clientFlags = parser.parseUnsignedNumber(2);
	    this.maxPacketSize = parser.parseUnsignedNumber(3);
	    this.user = parser.parseNullTerminatedString();
	    this.scrambleBuff = parser.parseBuffer(8);
	    this.database = parser.parseLengthCodedBuffer();
	  }
	};

	ClientAuthenticationPacket.prototype.write = function (writer) {
	  if (this.protocol41) {
	    writer.writeUnsignedNumber(4, this.clientFlags);
	    writer.writeUnsignedNumber(4, this.maxPacketSize);
	    writer.writeUnsignedNumber(1, this.charsetNumber);
	    writer.writeFiller(23);
	    writer.writeNullTerminatedString(this.user);
	    writer.writeLengthCodedBuffer(this.scrambleBuff);
	    writer.writeNullTerminatedString(this.database);
	  } else {
	    writer.writeUnsignedNumber(2, this.clientFlags);
	    writer.writeUnsignedNumber(3, this.maxPacketSize);
	    writer.writeNullTerminatedString(this.user);
	    writer.writeBuffer(this.scrambleBuff);
	    if (this.database && this.database.length) {
	      writer.writeFiller(1);
	      writer.writeBuffer(new Buffer(this.database));
	    }
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = ComChangeUserPacket;
	function ComChangeUserPacket(options) {
	  options = options || {};

	  this.command = 0x11;
	  this.user = options.user;
	  this.scrambleBuff = options.scrambleBuff;
	  this.database = options.database;
	  this.charsetNumber = options.charsetNumber;
	}

	ComChangeUserPacket.prototype.parse = function (parser) {
	  this.command = parser.parseUnsignedNumber(1);
	  this.user = parser.parseNullTerminatedString();
	  this.scrambleBuff = parser.parseLengthCodedBuffer();
	  this.database = parser.parseNullTerminatedString();
	  this.charsetNumber = parser.parseUnsignedNumber(1);
	};

	ComChangeUserPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.command);
	  writer.writeNullTerminatedString(this.user);
	  writer.writeLengthCodedBuffer(this.scrambleBuff);
	  writer.writeNullTerminatedString(this.database);
	  writer.writeUnsignedNumber(2, this.charsetNumber);
	};

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = ComPingPacket;
	function ComPingPacket(sql) {
	  this.command = 0x0e;
	}

	ComPingPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.command);
	};

	ComPingPacket.prototype.parse = function (parser) {
	  this.command = parser.parseUnsignedNumber(1);
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = ComQueryPacket;
	function ComQueryPacket(sql) {
	  this.command = 0x03;
	  this.sql = sql;
	}

	ComQueryPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.command);
	  writer.writeString(this.sql);
	};

	ComQueryPacket.prototype.parse = function (parser) {
	  this.command = parser.parseUnsignedNumber(1);
	  this.sql = parser.parsePacketTerminatedString();
	};

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = ComQuitPacket;
	function ComQuitPacket(sql) {
	  this.command = 0x01;
	}

	ComQuitPacket.prototype.parse = function parse(parser) {
	  this.command = parser.parseUnsignedNumber(1);
	};

	ComQuitPacket.prototype.write = function write(writer) {
	  writer.writeUnsignedNumber(1, this.command);
	};

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = ComStatisticsPacket;
	function ComStatisticsPacket(sql) {
	  this.command = 0x09;
	}

	ComStatisticsPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.command);
	};

	ComStatisticsPacket.prototype.parse = function (parser) {
	  this.command = parser.parseUnsignedNumber(1);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = EmptyPacket;
	function EmptyPacket() {}

	EmptyPacket.prototype.write = function (writer) {};

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = EofPacket;
	function EofPacket(options) {
	  options = options || {};

	  this.fieldCount = undefined;
	  this.warningCount = options.warningCount;
	  this.serverStatus = options.serverStatus;
	  this.protocol41 = options.protocol41;
	}

	EofPacket.prototype.parse = function (parser) {
	  this.fieldCount = parser.parseUnsignedNumber(1);
	  if (this.protocol41) {
	    this.warningCount = parser.parseUnsignedNumber(2);
	    this.serverStatus = parser.parseUnsignedNumber(2);
	  }
	};

	EofPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, 0xfe);
	  if (this.protocol41) {
	    writer.writeUnsignedNumber(2, this.warningCount);
	    writer.writeUnsignedNumber(2, this.serverStatus);
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = ErrorPacket;
	function ErrorPacket(options) {
	  options = options || {};

	  this.fieldCount = options.fieldCount;
	  this.errno = options.errno;
	  this.sqlStateMarker = options.sqlStateMarker;
	  this.sqlState = options.sqlState;
	  this.message = options.message;
	}

	ErrorPacket.prototype.parse = function (parser) {
	  this.fieldCount = parser.parseUnsignedNumber(1);
	  this.errno = parser.parseUnsignedNumber(2);

	  // sqlStateMarker ('#' = 0x23) indicates error packet format
	  if (parser.peak() === 0x23) {
	    this.sqlStateMarker = parser.parseString(1);
	    this.sqlState = parser.parseString(5);
	  }

	  this.message = parser.parsePacketTerminatedString();
	};

	ErrorPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, 0xff);
	  writer.writeUnsignedNumber(2, this.errno);

	  if (this.sqlStateMarker) {
	    writer.writeString(this.sqlStateMarker);
	    writer.writeString(this.sqlState);
	  }

	  writer.writeString(this.message);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Types = __webpack_require__(97);

	module.exports = Field;
	function Field(options) {
	  options = options || {};

	  this.parser = options.parser;
	  this.packet = options.packet;
	  this.db = options.packet.db;
	  this.table = options.packet.table;
	  this.name = options.packet.name;
	  this.type = typeToString(options.packet.type);
	  this.length = options.packet.length;
	}

	Field.prototype.string = function () {
	  return this.parser.parseLengthCodedString();
	};

	Field.prototype.buffer = function () {
	  return this.parser.parseLengthCodedBuffer();
	};

	Field.prototype.geometry = function () {
	  return this.parser.parseGeometryValue();
	};

	function typeToString(t) {
	  for (var k in Types) {
	    if (Types[k] == t) return k;
	  }
	}

/***/ },
/* 97 */
/***/ function(module, exports) {

	// Manually extracted from mysql-5.5.23/include/mysql_com.h
	// some more info here: http://dev.mysql.com/doc/refman/5.5/en/c-api-prepared-statement-type-codes.html
	exports.DECIMAL = 0x00; // aka DECIMAL (http://dev.mysql.com/doc/refman/5.0/en/precision-math-decimal-changes.html)
	exports.TINY = 0x01; // aka TINYINT, 1 byte
	exports.SHORT = 0x02; // aka SMALLINT, 2 bytes
	exports.LONG = 0x03; // aka INT, 4 bytes
	exports.FLOAT = 0x04; // aka FLOAT, 4-8 bytes
	exports.DOUBLE = 0x05; // aka DOUBLE, 8 bytes
	exports.NULL = 0x06; // NULL (used for prepared statements, I think)
	exports.TIMESTAMP = 0x07; // aka TIMESTAMP
	exports.LONGLONG = 0x08; // aka BIGINT, 8 bytes
	exports.INT24 = 0x09; // aka MEDIUMINT, 3 bytes
	exports.DATE = 0x0a; // aka DATE
	exports.TIME = 0x0b; // aka TIME
	exports.DATETIME = 0x0c; // aka DATETIME
	exports.YEAR = 0x0d; // aka YEAR, 1 byte (don't ask)
	exports.NEWDATE = 0x0e; // aka ?
	exports.VARCHAR = 0x0f; // aka VARCHAR (?)
	exports.BIT = 0x10; // aka BIT, 1-8 byte
	exports.NEWDECIMAL = 0xf6; // aka DECIMAL
	exports.ENUM = 0xf7; // aka ENUM
	exports.SET = 0xf8; // aka SET
	exports.TINY_BLOB = 0xf9; // aka TINYBLOB, TINYTEXT
	exports.MEDIUM_BLOB = 0xfa; // aka MEDIUMBLOB, MEDIUMTEXT
	exports.LONG_BLOB = 0xfb; // aka LONGBLOG, LONGTEXT
	exports.BLOB = 0xfc; // aka BLOB, TEXT
	exports.VAR_STRING = 0xfd; // aka VARCHAR, VARBINARY
	exports.STRING = 0xfe; // aka CHAR, BINARY
	exports.GEOMETRY = 0xff; // aka GEOMETRY

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = FieldPacket;
	function FieldPacket(options) {
	  options = options || {};

	  this.catalog = options.catalog;
	  this.db = options.db;
	  this.table = options.table;
	  this.orgTable = options.orgTable;
	  this.name = options.name;
	  this.orgName = options.orgName;
	  this.charsetNr = options.charsetNr;
	  this.length = options.length;
	  this.type = options.type;
	  this.flags = options.flags;
	  this.decimals = options.decimals;
	  this.default = options.default;
	  this.zeroFill = options.zeroFill;
	  this.protocol41 = options.protocol41;
	}

	FieldPacket.prototype.parse = function (parser) {
	  if (this.protocol41) {
	    this.catalog = parser.parseLengthCodedString();
	    this.db = parser.parseLengthCodedString();
	    this.table = parser.parseLengthCodedString();
	    this.orgTable = parser.parseLengthCodedString();
	    this.name = parser.parseLengthCodedString();
	    this.orgName = parser.parseLengthCodedString();

	    if (parser.parseLengthCodedNumber() !== 0x0c) {
	      var err = new TypeError('Received invalid field length');
	      err.code = 'PARSER_INVALID_FIELD_LENGTH';
	      throw err;
	    }

	    this.charsetNr = parser.parseUnsignedNumber(2);
	    this.length = parser.parseUnsignedNumber(4);
	    this.type = parser.parseUnsignedNumber(1);
	    this.flags = parser.parseUnsignedNumber(2);
	    this.decimals = parser.parseUnsignedNumber(1);

	    var filler = parser.parseBuffer(2);
	    if (filler[0] !== 0x0 || filler[1] !== 0x0) {
	      var err = new TypeError('Received invalid filler');
	      err.code = 'PARSER_INVALID_FILLER';
	      throw err;
	    }

	    // parsed flags
	    this.zeroFill = this.flags & 0x0040 ? true : false;

	    if (parser.reachedPacketEnd()) {
	      return;
	    }

	    this.default = parser.parseLengthCodedString();
	  } else {
	    this.table = parser.parseLengthCodedString();
	    this.name = parser.parseLengthCodedString();
	    this.length = parser.parseUnsignedNumber(parser.parseUnsignedNumber(1));
	    this.type = parser.parseUnsignedNumber(parser.parseUnsignedNumber(1));
	  }
	};

	FieldPacket.prototype.write = function (writer) {
	  if (this.protocol41) {
	    writer.writeLengthCodedString(this.catalog);
	    writer.writeLengthCodedString(this.db);
	    writer.writeLengthCodedString(this.table);
	    writer.writeLengthCodedString(this.orgTable);
	    writer.writeLengthCodedString(this.name);
	    writer.writeLengthCodedString(this.orgName);

	    writer.writeLengthCodedNumber(0x0c);
	    writer.writeUnsignedNumber(2, this.charsetNr || 0);
	    writer.writeUnsignedNumber(4, this.length || 0);
	    writer.writeUnsignedNumber(1, this.type || 0);
	    writer.writeUnsignedNumber(2, this.flags || 0);
	    writer.writeUnsignedNumber(1, this.decimals || 0);
	    writer.writeFiller(2);

	    if (this.default !== undefined) {
	      writer.writeLengthCodedString(this.default);
	    }
	  } else {
	    writer.writeLengthCodedString(this.table);
	    writer.writeLengthCodedString(this.name);
	    writer.writeUnsignedNumber(1, 0x01);
	    writer.writeUnsignedNumber(1, this.length);
	    writer.writeUnsignedNumber(1, 0x01);
	    writer.writeUnsignedNumber(1, this.type);
	  }
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Client = __webpack_require__(76);

	module.exports = HandshakeInitializationPacket;
	function HandshakeInitializationPacket(options) {
	  options = options || {};

	  this.protocolVersion = options.protocolVersion;
	  this.serverVersion = options.serverVersion;
	  this.threadId = options.threadId;
	  this.scrambleBuff1 = options.scrambleBuff1;
	  this.filler1 = options.filler1;
	  this.serverCapabilities1 = options.serverCapabilities1;
	  this.serverLanguage = options.serverLanguage;
	  this.serverStatus = options.serverStatus;
	  this.serverCapabilities2 = options.serverCapabilities2;
	  this.scrambleLength = options.scrambleLength;
	  this.filler2 = options.filler2;
	  this.scrambleBuff2 = options.scrambleBuff2;
	  this.filler3 = options.filler3;
	  this.pluginData = options.pluginData;
	  this.protocol41 = options.protocol41;

	  if (this.protocol41) {
	    // force set the bit in serverCapabilities1
	    this.serverCapabilities1 |= Client.CLIENT_PROTOCOL_41;
	  }
	}

	HandshakeInitializationPacket.prototype.parse = function (parser) {
	  this.protocolVersion = parser.parseUnsignedNumber(1);
	  this.serverVersion = parser.parseNullTerminatedString();
	  this.threadId = parser.parseUnsignedNumber(4);
	  this.scrambleBuff1 = parser.parseBuffer(8);
	  this.filler1 = parser.parseFiller(1);
	  this.serverCapabilities1 = parser.parseUnsignedNumber(2);
	  this.serverLanguage = parser.parseUnsignedNumber(1);
	  this.serverStatus = parser.parseUnsignedNumber(2);

	  this.protocol41 = (this.serverCapabilities1 & 1 << 9) > 0;

	  if (this.protocol41) {
	    this.serverCapabilities2 = parser.parseUnsignedNumber(2);
	    this.scrambleLength = parser.parseUnsignedNumber(1);
	    this.filler2 = parser.parseFiller(10);
	    // scrambleBuff2 should be 0x00 terminated, but sphinx does not do this
	    // so we assume scrambleBuff2 to be 12 byte and treat the next byte as a
	    // filler byte.
	    this.scrambleBuff2 = parser.parseBuffer(12);
	    this.filler3 = parser.parseFiller(1);
	  } else {
	    this.filler2 = parser.parseFiller(13);
	  }

	  if (parser.reachedPacketEnd()) {
	    return;
	  }

	  // According to the docs this should be 0x00 terminated, but MariaDB does
	  // not do this, so we assume this string to be packet terminated.
	  this.pluginData = parser.parsePacketTerminatedString();

	  // However, if there is a trailing '\0', strip it
	  var lastChar = this.pluginData.length - 1;
	  if (this.pluginData[lastChar] === '\0') {
	    this.pluginData = this.pluginData.substr(0, lastChar);
	  }
	};

	HandshakeInitializationPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.protocolVersion);
	  writer.writeNullTerminatedString(this.serverVersion);
	  writer.writeUnsignedNumber(4, this.threadId);
	  writer.writeBuffer(this.scrambleBuff1);
	  writer.writeFiller(1);
	  writer.writeUnsignedNumber(2, this.serverCapabilities1);
	  writer.writeUnsignedNumber(1, this.serverLanguage);
	  writer.writeUnsignedNumber(2, this.serverStatus);
	  if (this.protocol41) {
	    writer.writeUnsignedNumber(2, this.serverCapabilities2);
	    writer.writeUnsignedNumber(1, this.scrambleLength);
	    writer.writeFiller(10);
	  }
	  writer.writeNullTerminatedBuffer(this.scrambleBuff2);

	  if (this.pluginData !== undefined) {
	    writer.writeNullTerminatedString(this.pluginData);
	  }
	};

	HandshakeInitializationPacket.prototype.scrambleBuff = function () {
	  var buffer = new Buffer(this.scrambleBuff1.length + (typeof this.scrambleBuff2 != "undefined" ? this.scrambleBuff2.length : 0));

	  this.scrambleBuff1.copy(buffer);
	  if (typeof this.scrambleBuff2 != "undefined") {
	    this.scrambleBuff2.copy(buffer, this.scrambleBuff1.length);
	  }

	  return buffer;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = LocalDataFilePacket;
	/**
	 * @param {Buffer} data
	 */
	function LocalDataFilePacket(data) {
	  this.data = data;
	}

	LocalDataFilePacket.prototype.write = function (writer) {
	  writer.writeBuffer(this.data);
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = OkPacket;
	function OkPacket(options) {
	  options = options || {};

	  this.fieldCount = undefined;
	  this.affectedRows = undefined;
	  this.insertId = undefined;
	  this.serverStatus = undefined;
	  this.warningCount = undefined;
	  this.message = undefined;
	  this.protocol41 = options.protocol41;
	}

	OkPacket.prototype.parse = function (parser) {
	  this.fieldCount = parser.parseUnsignedNumber(1);
	  this.affectedRows = parser.parseLengthCodedNumber();
	  this.insertId = parser.parseLengthCodedNumber();
	  if (this.protocol41) {
	    this.serverStatus = parser.parseUnsignedNumber(2);
	    this.warningCount = parser.parseUnsignedNumber(2);
	  }
	  this.message = parser.parsePacketTerminatedString();
	  this.changedRows = 0;

	  var m = this.message.match(/\schanged:\s*(\d+)/i);

	  if (m !== null) {
	    this.changedRows = parseInt(m[1], 10);
	  }
	};

	OkPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, 0x00);
	  writer.writeLengthCodedNumber(this.affectedRows || 0);
	  writer.writeLengthCodedNumber(this.insertId || 0);
	  if (this.protocol41) {
	    writer.writeUnsignedNumber(2, this.serverStatus || 0);
	    writer.writeUnsignedNumber(2, this.warningCount || 0);
	  }
	  writer.writeString(this.message);
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = OldPasswordPacket;
	function OldPasswordPacket(options) {
	  options = options || {};

	  this.scrambleBuff = options.scrambleBuff;
	}

	OldPasswordPacket.prototype.parse = function (parser) {
	  this.scrambleBuff = parser.parseNullTerminatedBuffer();
	};

	OldPasswordPacket.prototype.write = function (writer) {
	  writer.writeBuffer(this.scrambleBuff);
	  writer.writeFiller(1);
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = ResultSetHeaderPacket;
	function ResultSetHeaderPacket(options) {
	  options = options || {};

	  this.fieldCount = options.fieldCount;
	  this.extra = options.extra;
	}

	ResultSetHeaderPacket.prototype.parse = function (parser) {
	  this.fieldCount = parser.parseLengthCodedNumber();

	  if (parser.reachedPacketEnd()) return;

	  this.extra = this.fieldCount === null ? parser.parsePacketTerminatedString() : parser.parseLengthCodedNumber();
	};

	ResultSetHeaderPacket.prototype.write = function (writer) {
	  writer.writeLengthCodedNumber(this.fieldCount);

	  if (this.extra !== undefined) {
	    writer.writeLengthCodedNumber(this.extra);
	  }
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Types = __webpack_require__(97);
	var Charsets = __webpack_require__(77);
	var Field = __webpack_require__(96);
	var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);

	module.exports = RowDataPacket;
	function RowDataPacket() {}

	Object.defineProperty(RowDataPacket.prototype, 'parse', {
	  configurable: true,
	  enumerable: false,
	  value: parse
	});

	Object.defineProperty(RowDataPacket.prototype, '_typeCast', {
	  configurable: true,
	  enumerable: false,
	  value: typeCast
	});

	function parse(parser, fieldPackets, typeCast, nestTables, connection) {
	  var self = this;
	  var next = function () {
	    return self._typeCast(fieldPacket, parser, connection.config.timezone, connection.config.supportBigNumbers, connection.config.bigNumberStrings, connection.config.dateStrings);
	  };

	  for (var i = 0; i < fieldPackets.length; i++) {
	    var fieldPacket = fieldPackets[i];
	    var value;

	    if (typeof typeCast == "function") {
	      value = typeCast.apply(connection, [new Field({ packet: fieldPacket, parser: parser }), next]);
	    } else {
	      value = typeCast ? this._typeCast(fieldPacket, parser, connection.config.timezone, connection.config.supportBigNumbers, connection.config.bigNumberStrings, connection.config.dateStrings) : fieldPacket.charsetNr === Charsets.BINARY ? parser.parseLengthCodedBuffer() : parser.parseLengthCodedString();
	    }

	    if (typeof nestTables == "string" && nestTables.length) {
	      this[fieldPacket.table + nestTables + fieldPacket.name] = value;
	    } else if (nestTables) {
	      this[fieldPacket.table] = this[fieldPacket.table] || {};
	      this[fieldPacket.table][fieldPacket.name] = value;
	    } else {
	      this[fieldPacket.name] = value;
	    }
	  }
	}

	function typeCast(field, parser, timeZone, supportBigNumbers, bigNumberStrings, dateStrings) {
	  var numberString;

	  switch (field.type) {
	    case Types.TIMESTAMP:
	    case Types.DATE:
	    case Types.DATETIME:
	    case Types.NEWDATE:
	      var dateString = parser.parseLengthCodedString();
	      if (dateStrings) {
	        return dateString;
	      }
	      var dt;

	      if (dateString === null) {
	        return null;
	      }

	      var originalString = dateString;
	      if (field.type === Types.DATE) {
	        dateString += ' 00:00:00';
	      }

	      if (timeZone !== 'local') {
	        dateString += ' ' + timeZone;
	      }

	      dt = new Date(dateString);
	      if (isNaN(dt.getTime())) {
	        return originalString;
	      }

	      return dt;
	    case Types.TINY:
	    case Types.SHORT:
	    case Types.LONG:
	    case Types.INT24:
	    case Types.YEAR:
	    case Types.FLOAT:
	    case Types.DOUBLE:
	      numberString = parser.parseLengthCodedString();
	      return numberString === null || field.zeroFill && numberString[0] == "0" ? numberString : Number(numberString);
	    case Types.NEWDECIMAL:
	    case Types.LONGLONG:
	      numberString = parser.parseLengthCodedString();
	      return numberString === null || field.zeroFill && numberString[0] == "0" ? numberString : supportBigNumbers && (bigNumberStrings || Number(numberString) > IEEE_754_BINARY_64_PRECISION) ? numberString : Number(numberString);
	    case Types.BIT:
	      return parser.parseLengthCodedBuffer();
	    case Types.STRING:
	    case Types.VAR_STRING:
	    case Types.TINY_BLOB:
	    case Types.MEDIUM_BLOB:
	    case Types.LONG_BLOB:
	    case Types.BLOB:
	      return field.charsetNr === Charsets.BINARY ? parser.parseLengthCodedBuffer() : parser.parseLengthCodedString();
	    case Types.GEOMETRY:
	      return parser.parseGeometryValue();
	    default:
	      return parser.parseLengthCodedString();
	  }
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// http://dev.mysql.com/doc/internals/en/ssl.html
	// http://dev.mysql.com/doc/internals/en/connection-phase-packets.html#packet-Protocol::SSLRequest

	var ClientConstants = __webpack_require__(76);

	module.exports = SSLRequestPacket;

	function SSLRequestPacket(options) {
	  options = options || {};
	  this.clientFlags = options.clientFlags | ClientConstants.CLIENT_SSL;
	  this.maxPacketSize = options.maxPacketSize;
	  this.charsetNumber = options.charsetNumber;
	}

	SSLRequestPacket.prototype.parse = function (parser) {
	  // TODO: check SSLRequest packet v41 vs pre v41
	  this.clientFlags = parser.parseUnsignedNumber(4);
	  this.maxPacketSize = parser.parseUnsignedNumber(4);
	  this.charsetNumber = parser.parseUnsignedNumber(1);
	};

	SSLRequestPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(4, this.clientFlags);
	  writer.writeUnsignedNumber(4, this.maxPacketSize);
	  writer.writeUnsignedNumber(1, this.charsetNumber);
	  writer.writeFiller(23);
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = StatisticsPacket;
	function StatisticsPacket() {
	  this.message = undefined;
	}

	StatisticsPacket.prototype.parse = function (parser) {
	  this.message = parser.parsePacketTerminatedString();

	  var items = this.message.split(/\s\s/);
	  for (var i = 0; i < items.length; i++) {
	    var m = items[i].match(/^(.+)\:\s+(.+)$/);
	    if (m !== null) {
	      this[m[1].toLowerCase().replace(/\s/g, '_')] = Number(m[2]);
	    }
	  }
	};

	StatisticsPacket.prototype.write = function (writer) {
	  writer.writeString(this.message);
	};

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = UseOldPasswordPacket;
	function UseOldPasswordPacket(options) {
	  options = options || {};

	  this.firstByte = options.firstByte || 0xfe;
	}

	UseOldPasswordPacket.prototype.parse = function (parser) {
	  this.firstByte = parser.parseUnsignedNumber(1);
	};

	UseOldPasswordPacket.prototype.write = function (writer) {
	  writer.writeUnsignedNumber(1, this.firstByte);
	};

/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * MySQL error constants
	 *
	 * !! Generated by generate-error-constants.js, do not modify by hand !!
	 */exports.EE_CANTCREATEFILE=1;exports.EE_READ=2;exports.EE_WRITE=3;exports.EE_BADCLOSE=4;exports.EE_OUTOFMEMORY=5;exports.EE_DELETE=6;exports.EE_LINK=7;exports.EE_EOFERR=9;exports.EE_CANTLOCK=10;exports.EE_CANTUNLOCK=11;exports.EE_DIR=12;exports.EE_STAT=13;exports.EE_CANT_CHSIZE=14;exports.EE_CANT_OPEN_STREAM=15;exports.EE_GETWD=16;exports.EE_SETWD=17;exports.EE_LINK_WARNING=18;exports.EE_OPEN_WARNING=19;exports.EE_DISK_FULL=20;exports.EE_CANT_MKDIR=21;exports.EE_UNKNOWN_CHARSET=22;exports.EE_OUT_OF_FILERESOURCES=23;exports.EE_CANT_READLINK=24;exports.EE_CANT_SYMLINK=25;exports.EE_REALPATH=26;exports.EE_SYNC=27;exports.EE_UNKNOWN_COLLATION=28;exports.EE_FILENOTFOUND=29;exports.EE_FILE_NOT_CLOSED=30;exports.EE_CHANGE_OWNERSHIP=31;exports.EE_CHANGE_PERMISSIONS=32;exports.EE_CANT_SEEK=33;exports.HA_ERR_KEY_NOT_FOUND=120;exports.HA_ERR_FOUND_DUPP_KEY=121;exports.HA_ERR_INTERNAL_ERROR=122;exports.HA_ERR_RECORD_CHANGED=123;exports.HA_ERR_WRONG_INDEX=124;exports.HA_ERR_CRASHED=126;exports.HA_ERR_WRONG_IN_RECORD=127;exports.HA_ERR_OUT_OF_MEM=128;exports.HA_ERR_NOT_A_TABLE=130;exports.HA_ERR_WRONG_COMMAND=131;exports.HA_ERR_OLD_FILE=132;exports.HA_ERR_NO_ACTIVE_RECORD=133;exports.HA_ERR_RECORD_DELETED=134;exports.HA_ERR_RECORD_FILE_FULL=135;exports.HA_ERR_INDEX_FILE_FULL=136;exports.HA_ERR_END_OF_FILE=137;exports.HA_ERR_UNSUPPORTED=138;exports.HA_ERR_TO_BIG_ROW=139;exports.HA_WRONG_CREATE_OPTION=140;exports.HA_ERR_FOUND_DUPP_UNIQUE=141;exports.HA_ERR_UNKNOWN_CHARSET=142;exports.HA_ERR_WRONG_MRG_TABLE_DEF=143;exports.HA_ERR_CRASHED_ON_REPAIR=144;exports.HA_ERR_CRASHED_ON_USAGE=145;exports.HA_ERR_LOCK_WAIT_TIMEOUT=146;exports.HA_ERR_LOCK_TABLE_FULL=147;exports.HA_ERR_READ_ONLY_TRANSACTION=148;exports.HA_ERR_LOCK_DEADLOCK=149;exports.HA_ERR_CANNOT_ADD_FOREIGN=150;exports.HA_ERR_NO_REFERENCED_ROW=151;exports.HA_ERR_ROW_IS_REFERENCED=152;exports.HA_ERR_NO_SAVEPOINT=153;exports.HA_ERR_NON_UNIQUE_BLOCK_SIZE=154;exports.HA_ERR_NO_SUCH_TABLE=155;exports.HA_ERR_TABLE_EXIST=156;exports.HA_ERR_NO_CONNECTION=157;exports.HA_ERR_NULL_IN_SPATIAL=158;exports.HA_ERR_TABLE_DEF_CHANGED=159;exports.HA_ERR_NO_PARTITION_FOUND=160;exports.HA_ERR_RBR_LOGGING_FAILED=161;exports.HA_ERR_DROP_INDEX_FK=162;exports.HA_ERR_FOREIGN_DUPLICATE_KEY=163;exports.HA_ERR_TABLE_NEEDS_UPGRADE=164;exports.HA_ERR_TABLE_READONLY=165;exports.HA_ERR_AUTOINC_READ_FAILED=166;exports.HA_ERR_AUTOINC_ERANGE=167;exports.HA_ERR_GENERIC=168;exports.HA_ERR_RECORD_IS_THE_SAME=169;exports.HA_ERR_LOGGING_IMPOSSIBLE=170;exports.HA_ERR_CORRUPT_EVENT=171;exports.HA_ERR_NEW_FILE=172;exports.HA_ERR_ROWS_EVENT_APPLY=173;exports.HA_ERR_INITIALIZATION=174;exports.HA_ERR_FILE_TOO_SHORT=175;exports.HA_ERR_WRONG_CRC=176;exports.HA_ERR_TOO_MANY_CONCURRENT_TRXS=177;exports.HA_ERR_NOT_IN_LOCK_PARTITIONS=178;exports.HA_ERR_INDEX_COL_TOO_LONG=179;exports.HA_ERR_INDEX_CORRUPT=180;exports.HA_ERR_UNDO_REC_TOO_BIG=181;exports.HA_FTS_INVALID_DOCID=182;exports.HA_ERR_TABLE_IN_FK_CHECK=183;exports.HA_ERR_TABLESPACE_EXISTS=184;exports.HA_ERR_TOO_MANY_FIELDS=185;exports.HA_ERR_ROW_IN_WRONG_PARTITION=186;exports.HA_ERR_INNODB_READ_ONLY=187;exports.HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT=188;exports.HA_ERR_TEMP_FILE_WRITE_FAILURE=189;exports.HA_ERR_INNODB_FORCED_RECOVERY=190;exports.HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE=191;exports.ER_HASHCHK=1000;exports.ER_NISAMCHK=1001;exports.ER_NO=1002;exports.ER_YES=1003;exports.ER_CANT_CREATE_FILE=1004;exports.ER_CANT_CREATE_TABLE=1005;exports.ER_CANT_CREATE_DB=1006;exports.ER_DB_CREATE_EXISTS=1007;exports.ER_DB_DROP_EXISTS=1008;exports.ER_DB_DROP_DELETE=1009;exports.ER_DB_DROP_RMDIR=1010;exports.ER_CANT_DELETE_FILE=1011;exports.ER_CANT_FIND_SYSTEM_REC=1012;exports.ER_CANT_GET_STAT=1013;exports.ER_CANT_GET_WD=1014;exports.ER_CANT_LOCK=1015;exports.ER_CANT_OPEN_FILE=1016;exports.ER_FILE_NOT_FOUND=1017;exports.ER_CANT_READ_DIR=1018;exports.ER_CANT_SET_WD=1019;exports.ER_CHECKREAD=1020;exports.ER_DISK_FULL=1021;exports.ER_DUP_KEY=1022;exports.ER_ERROR_ON_CLOSE=1023;exports.ER_ERROR_ON_READ=1024;exports.ER_ERROR_ON_RENAME=1025;exports.ER_ERROR_ON_WRITE=1026;exports.ER_FILE_USED=1027;exports.ER_FILSORT_ABORT=1028;exports.ER_FORM_NOT_FOUND=1029;exports.ER_GET_ERRNO=1030;exports.ER_ILLEGAL_HA=1031;exports.ER_KEY_NOT_FOUND=1032;exports.ER_NOT_FORM_FILE=1033;exports.ER_NOT_KEYFILE=1034;exports.ER_OLD_KEYFILE=1035;exports.ER_OPEN_AS_READONLY=1036;exports.ER_OUTOFMEMORY=1037;exports.ER_OUT_OF_SORTMEMORY=1038;exports.ER_UNEXPECTED_EOF=1039;exports.ER_CON_COUNT_ERROR=1040;exports.ER_OUT_OF_RESOURCES=1041;exports.ER_BAD_HOST_ERROR=1042;exports.ER_HANDSHAKE_ERROR=1043;exports.ER_DBACCESS_DENIED_ERROR=1044;exports.ER_ACCESS_DENIED_ERROR=1045;exports.ER_NO_DB_ERROR=1046;exports.ER_UNKNOWN_COM_ERROR=1047;exports.ER_BAD_NULL_ERROR=1048;exports.ER_BAD_DB_ERROR=1049;exports.ER_TABLE_EXISTS_ERROR=1050;exports.ER_BAD_TABLE_ERROR=1051;exports.ER_NON_UNIQ_ERROR=1052;exports.ER_SERVER_SHUTDOWN=1053;exports.ER_BAD_FIELD_ERROR=1054;exports.ER_WRONG_FIELD_WITH_GROUP=1055;exports.ER_WRONG_GROUP_FIELD=1056;exports.ER_WRONG_SUM_SELECT=1057;exports.ER_WRONG_VALUE_COUNT=1058;exports.ER_TOO_LONG_IDENT=1059;exports.ER_DUP_FIELDNAME=1060;exports.ER_DUP_KEYNAME=1061;exports.ER_DUP_ENTRY=1062;exports.ER_WRONG_FIELD_SPEC=1063;exports.ER_PARSE_ERROR=1064;exports.ER_EMPTY_QUERY=1065;exports.ER_NONUNIQ_TABLE=1066;exports.ER_INVALID_DEFAULT=1067;exports.ER_MULTIPLE_PRI_KEY=1068;exports.ER_TOO_MANY_KEYS=1069;exports.ER_TOO_MANY_KEY_PARTS=1070;exports.ER_TOO_LONG_KEY=1071;exports.ER_KEY_COLUMN_DOES_NOT_EXITS=1072;exports.ER_BLOB_USED_AS_KEY=1073;exports.ER_TOO_BIG_FIELDLENGTH=1074;exports.ER_WRONG_AUTO_KEY=1075;exports.ER_READY=1076;exports.ER_NORMAL_SHUTDOWN=1077;exports.ER_GOT_SIGNAL=1078;exports.ER_SHUTDOWN_COMPLETE=1079;exports.ER_FORCING_CLOSE=1080;exports.ER_IPSOCK_ERROR=1081;exports.ER_NO_SUCH_INDEX=1082;exports.ER_WRONG_FIELD_TERMINATORS=1083;exports.ER_BLOBS_AND_NO_TERMINATED=1084;exports.ER_TEXTFILE_NOT_READABLE=1085;exports.ER_FILE_EXISTS_ERROR=1086;exports.ER_LOAD_INFO=1087;exports.ER_ALTER_INFO=1088;exports.ER_WRONG_SUB_KEY=1089;exports.ER_CANT_REMOVE_ALL_FIELDS=1090;exports.ER_CANT_DROP_FIELD_OR_KEY=1091;exports.ER_INSERT_INFO=1092;exports.ER_UPDATE_TABLE_USED=1093;exports.ER_NO_SUCH_THREAD=1094;exports.ER_KILL_DENIED_ERROR=1095;exports.ER_NO_TABLES_USED=1096;exports.ER_TOO_BIG_SET=1097;exports.ER_NO_UNIQUE_LOGFILE=1098;exports.ER_TABLE_NOT_LOCKED_FOR_WRITE=1099;exports.ER_TABLE_NOT_LOCKED=1100;exports.ER_BLOB_CANT_HAVE_DEFAULT=1101;exports.ER_WRONG_DB_NAME=1102;exports.ER_WRONG_TABLE_NAME=1103;exports.ER_TOO_BIG_SELECT=1104;exports.ER_UNKNOWN_ERROR=1105;exports.ER_UNKNOWN_PROCEDURE=1106;exports.ER_WRONG_PARAMCOUNT_TO_PROCEDURE=1107;exports.ER_WRONG_PARAMETERS_TO_PROCEDURE=1108;exports.ER_UNKNOWN_TABLE=1109;exports.ER_FIELD_SPECIFIED_TWICE=1110;exports.ER_INVALID_GROUP_FUNC_USE=1111;exports.ER_UNSUPPORTED_EXTENSION=1112;exports.ER_TABLE_MUST_HAVE_COLUMNS=1113;exports.ER_RECORD_FILE_FULL=1114;exports.ER_UNKNOWN_CHARACTER_SET=1115;exports.ER_TOO_MANY_TABLES=1116;exports.ER_TOO_MANY_FIELDS=1117;exports.ER_TOO_BIG_ROWSIZE=1118;exports.ER_STACK_OVERRUN=1119;exports.ER_WRONG_OUTER_JOIN=1120;exports.ER_NULL_COLUMN_IN_INDEX=1121;exports.ER_CANT_FIND_UDF=1122;exports.ER_CANT_INITIALIZE_UDF=1123;exports.ER_UDF_NO_PATHS=1124;exports.ER_UDF_EXISTS=1125;exports.ER_CANT_OPEN_LIBRARY=1126;exports.ER_CANT_FIND_DL_ENTRY=1127;exports.ER_FUNCTION_NOT_DEFINED=1128;exports.ER_HOST_IS_BLOCKED=1129;exports.ER_HOST_NOT_PRIVILEGED=1130;exports.ER_PASSWORD_ANONYMOUS_USER=1131;exports.ER_PASSWORD_NOT_ALLOWED=1132;exports.ER_PASSWORD_NO_MATCH=1133;exports.ER_UPDATE_INFO=1134;exports.ER_CANT_CREATE_THREAD=1135;exports.ER_WRONG_VALUE_COUNT_ON_ROW=1136;exports.ER_CANT_REOPEN_TABLE=1137;exports.ER_INVALID_USE_OF_NULL=1138;exports.ER_REGEXP_ERROR=1139;exports.ER_MIX_OF_GROUP_FUNC_AND_FIELDS=1140;exports.ER_NONEXISTING_GRANT=1141;exports.ER_TABLEACCESS_DENIED_ERROR=1142;exports.ER_COLUMNACCESS_DENIED_ERROR=1143;exports.ER_ILLEGAL_GRANT_FOR_TABLE=1144;exports.ER_GRANT_WRONG_HOST_OR_USER=1145;exports.ER_NO_SUCH_TABLE=1146;exports.ER_NONEXISTING_TABLE_GRANT=1147;exports.ER_NOT_ALLOWED_COMMAND=1148;exports.ER_SYNTAX_ERROR=1149;exports.ER_DELAYED_CANT_CHANGE_LOCK=1150;exports.ER_TOO_MANY_DELAYED_THREADS=1151;exports.ER_ABORTING_CONNECTION=1152;exports.ER_NET_PACKET_TOO_LARGE=1153;exports.ER_NET_READ_ERROR_FROM_PIPE=1154;exports.ER_NET_FCNTL_ERROR=1155;exports.ER_NET_PACKETS_OUT_OF_ORDER=1156;exports.ER_NET_UNCOMPRESS_ERROR=1157;exports.ER_NET_READ_ERROR=1158;exports.ER_NET_READ_INTERRUPTED=1159;exports.ER_NET_ERROR_ON_WRITE=1160;exports.ER_NET_WRITE_INTERRUPTED=1161;exports.ER_TOO_LONG_STRING=1162;exports.ER_TABLE_CANT_HANDLE_BLOB=1163;exports.ER_TABLE_CANT_HANDLE_AUTO_INCREMENT=1164;exports.ER_DELAYED_INSERT_TABLE_LOCKED=1165;exports.ER_WRONG_COLUMN_NAME=1166;exports.ER_WRONG_KEY_COLUMN=1167;exports.ER_WRONG_MRG_TABLE=1168;exports.ER_DUP_UNIQUE=1169;exports.ER_BLOB_KEY_WITHOUT_LENGTH=1170;exports.ER_PRIMARY_CANT_HAVE_NULL=1171;exports.ER_TOO_MANY_ROWS=1172;exports.ER_REQUIRES_PRIMARY_KEY=1173;exports.ER_NO_RAID_COMPILED=1174;exports.ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE=1175;exports.ER_KEY_DOES_NOT_EXITS=1176;exports.ER_CHECK_NO_SUCH_TABLE=1177;exports.ER_CHECK_NOT_IMPLEMENTED=1178;exports.ER_CANT_DO_THIS_DURING_AN_TRANSACTION=1179;exports.ER_ERROR_DURING_COMMIT=1180;exports.ER_ERROR_DURING_ROLLBACK=1181;exports.ER_ERROR_DURING_FLUSH_LOGS=1182;exports.ER_ERROR_DURING_CHECKPOINT=1183;exports.ER_NEW_ABORTING_CONNECTION=1184;exports.ER_DUMP_NOT_IMPLEMENTED=1185;exports.ER_FLUSH_MASTER_BINLOG_CLOSED=1186;exports.ER_INDEX_REBUILD=1187;exports.ER_MASTER=1188;exports.ER_MASTER_NET_READ=1189;exports.ER_MASTER_NET_WRITE=1190;exports.ER_FT_MATCHING_KEY_NOT_FOUND=1191;exports.ER_LOCK_OR_ACTIVE_TRANSACTION=1192;exports.ER_UNKNOWN_SYSTEM_VARIABLE=1193;exports.ER_CRASHED_ON_USAGE=1194;exports.ER_CRASHED_ON_REPAIR=1195;exports.ER_WARNING_NOT_COMPLETE_ROLLBACK=1196;exports.ER_TRANS_CACHE_FULL=1197;exports.ER_SLAVE_MUST_STOP=1198;exports.ER_SLAVE_NOT_RUNNING=1199;exports.ER_BAD_SLAVE=1200;exports.ER_MASTER_INFO=1201;exports.ER_SLAVE_THREAD=1202;exports.ER_TOO_MANY_USER_CONNECTIONS=1203;exports.ER_SET_CONSTANTS_ONLY=1204;exports.ER_LOCK_WAIT_TIMEOUT=1205;exports.ER_LOCK_TABLE_FULL=1206;exports.ER_READ_ONLY_TRANSACTION=1207;exports.ER_DROP_DB_WITH_READ_LOCK=1208;exports.ER_CREATE_DB_WITH_READ_LOCK=1209;exports.ER_WRONG_ARGUMENTS=1210;exports.ER_NO_PERMISSION_TO_CREATE_USER=1211;exports.ER_UNION_TABLES_IN_DIFFERENT_DIR=1212;exports.ER_LOCK_DEADLOCK=1213;exports.ER_TABLE_CANT_HANDLE_FT=1214;exports.ER_CANNOT_ADD_FOREIGN=1215;exports.ER_NO_REFERENCED_ROW=1216;exports.ER_ROW_IS_REFERENCED=1217;exports.ER_CONNECT_TO_MASTER=1218;exports.ER_QUERY_ON_MASTER=1219;exports.ER_ERROR_WHEN_EXECUTING_COMMAND=1220;exports.ER_WRONG_USAGE=1221;exports.ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT=1222;exports.ER_CANT_UPDATE_WITH_READLOCK=1223;exports.ER_MIXING_NOT_ALLOWED=1224;exports.ER_DUP_ARGUMENT=1225;exports.ER_USER_LIMIT_REACHED=1226;exports.ER_SPECIFIC_ACCESS_DENIED_ERROR=1227;exports.ER_LOCAL_VARIABLE=1228;exports.ER_GLOBAL_VARIABLE=1229;exports.ER_NO_DEFAULT=1230;exports.ER_WRONG_VALUE_FOR_VAR=1231;exports.ER_WRONG_TYPE_FOR_VAR=1232;exports.ER_VAR_CANT_BE_READ=1233;exports.ER_CANT_USE_OPTION_HERE=1234;exports.ER_NOT_SUPPORTED_YET=1235;exports.ER_MASTER_FATAL_ERROR_READING_BINLOG=1236;exports.ER_SLAVE_IGNORED_TABLE=1237;exports.ER_INCORRECT_GLOBAL_LOCAL_VAR=1238;exports.ER_WRONG_FK_DEF=1239;exports.ER_KEY_REF_DO_NOT_MATCH_TABLE_REF=1240;exports.ER_OPERAND_COLUMNS=1241;exports.ER_SUBQUERY_NO_1_ROW=1242;exports.ER_UNKNOWN_STMT_HANDLER=1243;exports.ER_CORRUPT_HELP_DB=1244;exports.ER_CYCLIC_REFERENCE=1245;exports.ER_AUTO_CONVERT=1246;exports.ER_ILLEGAL_REFERENCE=1247;exports.ER_DERIVED_MUST_HAVE_ALIAS=1248;exports.ER_SELECT_REDUCED=1249;exports.ER_TABLENAME_NOT_ALLOWED_HERE=1250;exports.ER_NOT_SUPPORTED_AUTH_MODE=1251;exports.ER_SPATIAL_CANT_HAVE_NULL=1252;exports.ER_COLLATION_CHARSET_MISMATCH=1253;exports.ER_SLAVE_WAS_RUNNING=1254;exports.ER_SLAVE_WAS_NOT_RUNNING=1255;exports.ER_TOO_BIG_FOR_UNCOMPRESS=1256;exports.ER_ZLIB_Z_MEM_ERROR=1257;exports.ER_ZLIB_Z_BUF_ERROR=1258;exports.ER_ZLIB_Z_DATA_ERROR=1259;exports.ER_CUT_VALUE_GROUP_CONCAT=1260;exports.ER_WARN_TOO_FEW_RECORDS=1261;exports.ER_WARN_TOO_MANY_RECORDS=1262;exports.ER_WARN_NULL_TO_NOTNULL=1263;exports.ER_WARN_DATA_OUT_OF_RANGE=1264;exports.WARN_DATA_TRUNCATED=1265;exports.ER_WARN_USING_OTHER_HANDLER=1266;exports.ER_CANT_AGGREGATE_2COLLATIONS=1267;exports.ER_DROP_USER=1268;exports.ER_REVOKE_GRANTS=1269;exports.ER_CANT_AGGREGATE_3COLLATIONS=1270;exports.ER_CANT_AGGREGATE_NCOLLATIONS=1271;exports.ER_VARIABLE_IS_NOT_STRUCT=1272;exports.ER_UNKNOWN_COLLATION=1273;exports.ER_SLAVE_IGNORED_SSL_PARAMS=1274;exports.ER_SERVER_IS_IN_SECURE_AUTH_MODE=1275;exports.ER_WARN_FIELD_RESOLVED=1276;exports.ER_BAD_SLAVE_UNTIL_COND=1277;exports.ER_MISSING_SKIP_SLAVE=1278;exports.ER_UNTIL_COND_IGNORED=1279;exports.ER_WRONG_NAME_FOR_INDEX=1280;exports.ER_WRONG_NAME_FOR_CATALOG=1281;exports.ER_WARN_QC_RESIZE=1282;exports.ER_BAD_FT_COLUMN=1283;exports.ER_UNKNOWN_KEY_CACHE=1284;exports.ER_WARN_HOSTNAME_WONT_WORK=1285;exports.ER_UNKNOWN_STORAGE_ENGINE=1286;exports.ER_WARN_DEPRECATED_SYNTAX=1287;exports.ER_NON_UPDATABLE_TABLE=1288;exports.ER_FEATURE_DISABLED=1289;exports.ER_OPTION_PREVENTS_STATEMENT=1290;exports.ER_DUPLICATED_VALUE_IN_TYPE=1291;exports.ER_TRUNCATED_WRONG_VALUE=1292;exports.ER_TOO_MUCH_AUTO_TIMESTAMP_COLS=1293;exports.ER_INVALID_ON_UPDATE=1294;exports.ER_UNSUPPORTED_PS=1295;exports.ER_GET_ERRMSG=1296;exports.ER_GET_TEMPORARY_ERRMSG=1297;exports.ER_UNKNOWN_TIME_ZONE=1298;exports.ER_WARN_INVALID_TIMESTAMP=1299;exports.ER_INVALID_CHARACTER_STRING=1300;exports.ER_WARN_ALLOWED_PACKET_OVERFLOWED=1301;exports.ER_CONFLICTING_DECLARATIONS=1302;exports.ER_SP_NO_RECURSIVE_CREATE=1303;exports.ER_SP_ALREADY_EXISTS=1304;exports.ER_SP_DOES_NOT_EXIST=1305;exports.ER_SP_DROP_FAILED=1306;exports.ER_SP_STORE_FAILED=1307;exports.ER_SP_LILABEL_MISMATCH=1308;exports.ER_SP_LABEL_REDEFINE=1309;exports.ER_SP_LABEL_MISMATCH=1310;exports.ER_SP_UNINIT_VAR=1311;exports.ER_SP_BADSELECT=1312;exports.ER_SP_BADRETURN=1313;exports.ER_SP_BADSTATEMENT=1314;exports.ER_UPDATE_LOG_DEPRECATED_IGNORED=1315;exports.ER_UPDATE_LOG_DEPRECATED_TRANSLATED=1316;exports.ER_QUERY_INTERRUPTED=1317;exports.ER_SP_WRONG_NO_OF_ARGS=1318;exports.ER_SP_COND_MISMATCH=1319;exports.ER_SP_NORETURN=1320;exports.ER_SP_NORETURNEND=1321;exports.ER_SP_BAD_CURSOR_QUERY=1322;exports.ER_SP_BAD_CURSOR_SELECT=1323;exports.ER_SP_CURSOR_MISMATCH=1324;exports.ER_SP_CURSOR_ALREADY_OPEN=1325;exports.ER_SP_CURSOR_NOT_OPEN=1326;exports.ER_SP_UNDECLARED_VAR=1327;exports.ER_SP_WRONG_NO_OF_FETCH_ARGS=1328;exports.ER_SP_FETCH_NO_DATA=1329;exports.ER_SP_DUP_PARAM=1330;exports.ER_SP_DUP_VAR=1331;exports.ER_SP_DUP_COND=1332;exports.ER_SP_DUP_CURS=1333;exports.ER_SP_CANT_ALTER=1334;exports.ER_SP_SUBSELECT_NYI=1335;exports.ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG=1336;exports.ER_SP_VARCOND_AFTER_CURSHNDLR=1337;exports.ER_SP_CURSOR_AFTER_HANDLER=1338;exports.ER_SP_CASE_NOT_FOUND=1339;exports.ER_FPARSER_TOO_BIG_FILE=1340;exports.ER_FPARSER_BAD_HEADER=1341;exports.ER_FPARSER_EOF_IN_COMMENT=1342;exports.ER_FPARSER_ERROR_IN_PARAMETER=1343;exports.ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER=1344;exports.ER_VIEW_NO_EXPLAIN=1345;exports.ER_FRM_UNKNOWN_TYPE=1346;exports.ER_WRONG_OBJECT=1347;exports.ER_NONUPDATEABLE_COLUMN=1348;exports.ER_VIEW_SELECT_DERIVED=1349;exports.ER_VIEW_SELECT_CLAUSE=1350;exports.ER_VIEW_SELECT_VARIABLE=1351;exports.ER_VIEW_SELECT_TMPTABLE=1352;exports.ER_VIEW_WRONG_LIST=1353;exports.ER_WARN_VIEW_MERGE=1354;exports.ER_WARN_VIEW_WITHOUT_KEY=1355;exports.ER_VIEW_INVALID=1356;exports.ER_SP_NO_DROP_SP=1357;exports.ER_SP_GOTO_IN_HNDLR=1358;exports.ER_TRG_ALREADY_EXISTS=1359;exports.ER_TRG_DOES_NOT_EXIST=1360;exports.ER_TRG_ON_VIEW_OR_TEMP_TABLE=1361;exports.ER_TRG_CANT_CHANGE_ROW=1362;exports.ER_TRG_NO_SUCH_ROW_IN_TRG=1363;exports.ER_NO_DEFAULT_FOR_FIELD=1364;exports.ER_DIVISION_BY_ZERO=1365;exports.ER_TRUNCATED_WRONG_VALUE_FOR_FIELD=1366;exports.ER_ILLEGAL_VALUE_FOR_TYPE=1367;exports.ER_VIEW_NONUPD_CHECK=1368;exports.ER_VIEW_CHECK_FAILED=1369;exports.ER_PROCACCESS_DENIED_ERROR=1370;exports.ER_RELAY_LOG_FAIL=1371;exports.ER_PASSWD_LENGTH=1372;exports.ER_UNKNOWN_TARGET_BINLOG=1373;exports.ER_IO_ERR_LOG_INDEX_READ=1374;exports.ER_BINLOG_PURGE_PROHIBITED=1375;exports.ER_FSEEK_FAIL=1376;exports.ER_BINLOG_PURGE_FATAL_ERR=1377;exports.ER_LOG_IN_USE=1378;exports.ER_LOG_PURGE_UNKNOWN_ERR=1379;exports.ER_RELAY_LOG_INIT=1380;exports.ER_NO_BINARY_LOGGING=1381;exports.ER_RESERVED_SYNTAX=1382;exports.ER_WSAS_FAILED=1383;exports.ER_DIFF_GROUPS_PROC=1384;exports.ER_NO_GROUP_FOR_PROC=1385;exports.ER_ORDER_WITH_PROC=1386;exports.ER_LOGGING_PROHIBIT_CHANGING_OF=1387;exports.ER_NO_FILE_MAPPING=1388;exports.ER_WRONG_MAGIC=1389;exports.ER_PS_MANY_PARAM=1390;exports.ER_KEY_PART_0=1391;exports.ER_VIEW_CHECKSUM=1392;exports.ER_VIEW_MULTIUPDATE=1393;exports.ER_VIEW_NO_INSERT_FIELD_LIST=1394;exports.ER_VIEW_DELETE_MERGE_VIEW=1395;exports.ER_CANNOT_USER=1396;exports.ER_XAER_NOTA=1397;exports.ER_XAER_INVAL=1398;exports.ER_XAER_RMFAIL=1399;exports.ER_XAER_OUTSIDE=1400;exports.ER_XAER_RMERR=1401;exports.ER_XA_RBROLLBACK=1402;exports.ER_NONEXISTING_PROC_GRANT=1403;exports.ER_PROC_AUTO_GRANT_FAIL=1404;exports.ER_PROC_AUTO_REVOKE_FAIL=1405;exports.ER_DATA_TOO_LONG=1406;exports.ER_SP_BAD_SQLSTATE=1407;exports.ER_STARTUP=1408;exports.ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR=1409;exports.ER_CANT_CREATE_USER_WITH_GRANT=1410;exports.ER_WRONG_VALUE_FOR_TYPE=1411;exports.ER_TABLE_DEF_CHANGED=1412;exports.ER_SP_DUP_HANDLER=1413;exports.ER_SP_NOT_VAR_ARG=1414;exports.ER_SP_NO_RETSET=1415;exports.ER_CANT_CREATE_GEOMETRY_OBJECT=1416;exports.ER_FAILED_ROUTINE_BREAK_BINLOG=1417;exports.ER_BINLOG_UNSAFE_ROUTINE=1418;exports.ER_BINLOG_CREATE_ROUTINE_NEED_SUPER=1419;exports.ER_EXEC_STMT_WITH_OPEN_CURSOR=1420;exports.ER_STMT_HAS_NO_OPEN_CURSOR=1421;exports.ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG=1422;exports.ER_NO_DEFAULT_FOR_VIEW_FIELD=1423;exports.ER_SP_NO_RECURSION=1424;exports.ER_TOO_BIG_SCALE=1425;exports.ER_TOO_BIG_PRECISION=1426;exports.ER_M_BIGGER_THAN_D=1427;exports.ER_WRONG_LOCK_OF_SYSTEM_TABLE=1428;exports.ER_CONNECT_TO_FOREIGN_DATA_SOURCE=1429;exports.ER_QUERY_ON_FOREIGN_DATA_SOURCE=1430;exports.ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST=1431;exports.ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE=1432;exports.ER_FOREIGN_DATA_STRING_INVALID=1433;exports.ER_CANT_CREATE_FEDERATED_TABLE=1434;exports.ER_TRG_IN_WRONG_SCHEMA=1435;exports.ER_STACK_OVERRUN_NEED_MORE=1436;exports.ER_TOO_LONG_BODY=1437;exports.ER_WARN_CANT_DROP_DEFAULT_KEYCACHE=1438;exports.ER_TOO_BIG_DISPLAYWIDTH=1439;exports.ER_XAER_DUPID=1440;exports.ER_DATETIME_FUNCTION_OVERFLOW=1441;exports.ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG=1442;exports.ER_VIEW_PREVENT_UPDATE=1443;exports.ER_PS_NO_RECURSION=1444;exports.ER_SP_CANT_SET_AUTOCOMMIT=1445;exports.ER_MALFORMED_DEFINER=1446;exports.ER_VIEW_FRM_NO_USER=1447;exports.ER_VIEW_OTHER_USER=1448;exports.ER_NO_SUCH_USER=1449;exports.ER_FORBID_SCHEMA_CHANGE=1450;exports.ER_ROW_IS_REFERENCED_2=1451;exports.ER_NO_REFERENCED_ROW_2=1452;exports.ER_SP_BAD_VAR_SHADOW=1453;exports.ER_TRG_NO_DEFINER=1454;exports.ER_OLD_FILE_FORMAT=1455;exports.ER_SP_RECURSION_LIMIT=1456;exports.ER_SP_PROC_TABLE_CORRUPT=1457;exports.ER_SP_WRONG_NAME=1458;exports.ER_TABLE_NEEDS_UPGRADE=1459;exports.ER_SP_NO_AGGREGATE=1460;exports.ER_MAX_PREPARED_STMT_COUNT_REACHED=1461;exports.ER_VIEW_RECURSIVE=1462;exports.ER_NON_GROUPING_FIELD_USED=1463;exports.ER_TABLE_CANT_HANDLE_SPKEYS=1464;exports.ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA=1465;exports.ER_REMOVED_SPACES=1466;exports.ER_AUTOINC_READ_FAILED=1467;exports.ER_USERNAME=1468;exports.ER_HOSTNAME=1469;exports.ER_WRONG_STRING_LENGTH=1470;exports.ER_NON_INSERTABLE_TABLE=1471;exports.ER_ADMIN_WRONG_MRG_TABLE=1472;exports.ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT=1473;exports.ER_NAME_BECOMES_EMPTY=1474;exports.ER_AMBIGUOUS_FIELD_TERM=1475;exports.ER_FOREIGN_SERVER_EXISTS=1476;exports.ER_FOREIGN_SERVER_DOESNT_EXIST=1477;exports.ER_ILLEGAL_HA_CREATE_OPTION=1478;exports.ER_PARTITION_REQUIRES_VALUES_ERROR=1479;exports.ER_PARTITION_WRONG_VALUES_ERROR=1480;exports.ER_PARTITION_MAXVALUE_ERROR=1481;exports.ER_PARTITION_SUBPARTITION_ERROR=1482;exports.ER_PARTITION_SUBPART_MIX_ERROR=1483;exports.ER_PARTITION_WRONG_NO_PART_ERROR=1484;exports.ER_PARTITION_WRONG_NO_SUBPART_ERROR=1485;exports.ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR=1486;exports.ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR=1487;exports.ER_FIELD_NOT_FOUND_PART_ERROR=1488;exports.ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR=1489;exports.ER_INCONSISTENT_PARTITION_INFO_ERROR=1490;exports.ER_PARTITION_FUNC_NOT_ALLOWED_ERROR=1491;exports.ER_PARTITIONS_MUST_BE_DEFINED_ERROR=1492;exports.ER_RANGE_NOT_INCREASING_ERROR=1493;exports.ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR=1494;exports.ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR=1495;exports.ER_PARTITION_ENTRY_ERROR=1496;exports.ER_MIX_HANDLER_ERROR=1497;exports.ER_PARTITION_NOT_DEFINED_ERROR=1498;exports.ER_TOO_MANY_PARTITIONS_ERROR=1499;exports.ER_SUBPARTITION_ERROR=1500;exports.ER_CANT_CREATE_HANDLER_FILE=1501;exports.ER_BLOB_FIELD_IN_PART_FUNC_ERROR=1502;exports.ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF=1503;exports.ER_NO_PARTS_ERROR=1504;exports.ER_PARTITION_MGMT_ON_NONPARTITIONED=1505;exports.ER_FOREIGN_KEY_ON_PARTITIONED=1506;exports.ER_DROP_PARTITION_NON_EXISTENT=1507;exports.ER_DROP_LAST_PARTITION=1508;exports.ER_COALESCE_ONLY_ON_HASH_PARTITION=1509;exports.ER_REORG_HASH_ONLY_ON_SAME_NO=1510;exports.ER_REORG_NO_PARAM_ERROR=1511;exports.ER_ONLY_ON_RANGE_LIST_PARTITION=1512;exports.ER_ADD_PARTITION_SUBPART_ERROR=1513;exports.ER_ADD_PARTITION_NO_NEW_PARTITION=1514;exports.ER_COALESCE_PARTITION_NO_PARTITION=1515;exports.ER_REORG_PARTITION_NOT_EXIST=1516;exports.ER_SAME_NAME_PARTITION=1517;exports.ER_NO_BINLOG_ERROR=1518;exports.ER_CONSECUTIVE_REORG_PARTITIONS=1519;exports.ER_REORG_OUTSIDE_RANGE=1520;exports.ER_PARTITION_FUNCTION_FAILURE=1521;exports.ER_PART_STATE_ERROR=1522;exports.ER_LIMITED_PART_RANGE=1523;exports.ER_PLUGIN_IS_NOT_LOADED=1524;exports.ER_WRONG_VALUE=1525;exports.ER_NO_PARTITION_FOR_GIVEN_VALUE=1526;exports.ER_FILEGROUP_OPTION_ONLY_ONCE=1527;exports.ER_CREATE_FILEGROUP_FAILED=1528;exports.ER_DROP_FILEGROUP_FAILED=1529;exports.ER_TABLESPACE_AUTO_EXTEND_ERROR=1530;exports.ER_WRONG_SIZE_NUMBER=1531;exports.ER_SIZE_OVERFLOW_ERROR=1532;exports.ER_ALTER_FILEGROUP_FAILED=1533;exports.ER_BINLOG_ROW_LOGGING_FAILED=1534;exports.ER_BINLOG_ROW_WRONG_TABLE_DEF=1535;exports.ER_BINLOG_ROW_RBR_TO_SBR=1536;exports.ER_EVENT_ALREADY_EXISTS=1537;exports.ER_EVENT_STORE_FAILED=1538;exports.ER_EVENT_DOES_NOT_EXIST=1539;exports.ER_EVENT_CANT_ALTER=1540;exports.ER_EVENT_DROP_FAILED=1541;exports.ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG=1542;exports.ER_EVENT_ENDS_BEFORE_STARTS=1543;exports.ER_EVENT_EXEC_TIME_IN_THE_PAST=1544;exports.ER_EVENT_OPEN_TABLE_FAILED=1545;exports.ER_EVENT_NEITHER_M_EXPR_NOR_M_AT=1546;exports.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED=1547;exports.ER_CANNOT_LOAD_FROM_TABLE=1548;exports.ER_EVENT_CANNOT_DELETE=1549;exports.ER_EVENT_COMPILE_ERROR=1550;exports.ER_EVENT_SAME_NAME=1551;exports.ER_EVENT_DATA_TOO_LONG=1552;exports.ER_DROP_INDEX_FK=1553;exports.ER_WARN_DEPRECATED_SYNTAX_WITH_VER=1554;exports.ER_CANT_WRITE_LOCK_LOG_TABLE=1555;exports.ER_CANT_LOCK_LOG_TABLE=1556;exports.ER_FOREIGN_DUPLICATE_KEY=1557;exports.ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE=1558;exports.ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR=1559;exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT=1560;exports.ER_NDB_CANT_SWITCH_BINLOG_FORMAT=1561;exports.ER_PARTITION_NO_TEMPORARY=1562;exports.ER_PARTITION_CONST_DOMAIN_ERROR=1563;exports.ER_PARTITION_FUNCTION_IS_NOT_ALLOWED=1564;exports.ER_DDL_LOG_ERROR=1565;exports.ER_NULL_IN_VALUES_LESS_THAN=1566;exports.ER_WRONG_PARTITION_NAME=1567;exports.ER_CANT_CHANGE_TX_CHARACTERISTICS=1568;exports.ER_DUP_ENTRY_AUTOINCREMENT_CASE=1569;exports.ER_EVENT_MODIFY_QUEUE_ERROR=1570;exports.ER_EVENT_SET_VAR_ERROR=1571;exports.ER_PARTITION_MERGE_ERROR=1572;exports.ER_CANT_ACTIVATE_LOG=1573;exports.ER_RBR_NOT_AVAILABLE=1574;exports.ER_BASE64_DECODE_ERROR=1575;exports.ER_EVENT_RECURSION_FORBIDDEN=1576;exports.ER_EVENTS_DB_ERROR=1577;exports.ER_ONLY_INTEGERS_ALLOWED=1578;exports.ER_UNSUPORTED_LOG_ENGINE=1579;exports.ER_BAD_LOG_STATEMENT=1580;exports.ER_CANT_RENAME_LOG_TABLE=1581;exports.ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT=1582;exports.ER_WRONG_PARAMETERS_TO_NATIVE_FCT=1583;exports.ER_WRONG_PARAMETERS_TO_STORED_FCT=1584;exports.ER_NATIVE_FCT_NAME_COLLISION=1585;exports.ER_DUP_ENTRY_WITH_KEY_NAME=1586;exports.ER_BINLOG_PURGE_EMFILE=1587;exports.ER_EVENT_CANNOT_CREATE_IN_THE_PAST=1588;exports.ER_EVENT_CANNOT_ALTER_IN_THE_PAST=1589;exports.ER_SLAVE_INCIDENT=1590;exports.ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT=1591;exports.ER_BINLOG_UNSAFE_STATEMENT=1592;exports.ER_SLAVE_FATAL_ERROR=1593;exports.ER_SLAVE_RELAY_LOG_READ_FAILURE=1594;exports.ER_SLAVE_RELAY_LOG_WRITE_FAILURE=1595;exports.ER_SLAVE_CREATE_EVENT_FAILURE=1596;exports.ER_SLAVE_MASTER_COM_FAILURE=1597;exports.ER_BINLOG_LOGGING_IMPOSSIBLE=1598;exports.ER_VIEW_NO_CREATION_CTX=1599;exports.ER_VIEW_INVALID_CREATION_CTX=1600;exports.ER_SR_INVALID_CREATION_CTX=1601;exports.ER_TRG_CORRUPTED_FILE=1602;exports.ER_TRG_NO_CREATION_CTX=1603;exports.ER_TRG_INVALID_CREATION_CTX=1604;exports.ER_EVENT_INVALID_CREATION_CTX=1605;exports.ER_TRG_CANT_OPEN_TABLE=1606;exports.ER_CANT_CREATE_SROUTINE=1607;exports.ER_NEVER_USED=1608;exports.ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT=1609;exports.ER_SLAVE_CORRUPT_EVENT=1610;exports.ER_LOAD_DATA_INVALID_COLUMN=1611;exports.ER_LOG_PURGE_NO_FILE=1612;exports.ER_XA_RBTIMEOUT=1613;exports.ER_XA_RBDEADLOCK=1614;exports.ER_NEED_REPREPARE=1615;exports.ER_DELAYED_NOT_SUPPORTED=1616;exports.WARN_NO_MASTER_INFO=1617;exports.WARN_OPTION_IGNORED=1618;exports.WARN_PLUGIN_DELETE_BUILTIN=1619;exports.WARN_PLUGIN_BUSY=1620;exports.ER_VARIABLE_IS_READONLY=1621;exports.ER_WARN_ENGINE_TRANSACTION_ROLLBACK=1622;exports.ER_SLAVE_HEARTBEAT_FAILURE=1623;exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE=1624;exports.ER_NDB_REPLICATION_SCHEMA_ERROR=1625;exports.ER_CONFLICT_FN_PARSE_ERROR=1626;exports.ER_EXCEPTIONS_WRITE_ERROR=1627;exports.ER_TOO_LONG_TABLE_COMMENT=1628;exports.ER_TOO_LONG_FIELD_COMMENT=1629;exports.ER_FUNC_INEXISTENT_NAME_COLLISION=1630;exports.ER_DATABASE_NAME=1631;exports.ER_TABLE_NAME=1632;exports.ER_PARTITION_NAME=1633;exports.ER_SUBPARTITION_NAME=1634;exports.ER_TEMPORARY_NAME=1635;exports.ER_RENAMED_NAME=1636;exports.ER_TOO_MANY_CONCURRENT_TRXS=1637;exports.WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED=1638;exports.ER_DEBUG_SYNC_TIMEOUT=1639;exports.ER_DEBUG_SYNC_HIT_LIMIT=1640;exports.ER_DUP_SIGNAL_SET=1641;exports.ER_SIGNAL_WARN=1642;exports.ER_SIGNAL_NOT_FOUND=1643;exports.ER_SIGNAL_EXCEPTION=1644;exports.ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER=1645;exports.ER_SIGNAL_BAD_CONDITION_TYPE=1646;exports.WARN_COND_ITEM_TRUNCATED=1647;exports.ER_COND_ITEM_TOO_LONG=1648;exports.ER_UNKNOWN_LOCALE=1649;exports.ER_SLAVE_IGNORE_SERVER_IDS=1650;exports.ER_QUERY_CACHE_DISABLED=1651;exports.ER_SAME_NAME_PARTITION_FIELD=1652;exports.ER_PARTITION_COLUMN_LIST_ERROR=1653;exports.ER_WRONG_TYPE_COLUMN_VALUE_ERROR=1654;exports.ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR=1655;exports.ER_MAXVALUE_IN_VALUES_IN=1656;exports.ER_TOO_MANY_VALUES_ERROR=1657;exports.ER_ROW_SINGLE_PARTITION_FIELD_ERROR=1658;exports.ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD=1659;exports.ER_PARTITION_FIELDS_TOO_LONG=1660;exports.ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE=1661;exports.ER_BINLOG_ROW_MODE_AND_STMT_ENGINE=1662;exports.ER_BINLOG_UNSAFE_AND_STMT_ENGINE=1663;exports.ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE=1664;exports.ER_BINLOG_STMT_MODE_AND_ROW_ENGINE=1665;exports.ER_BINLOG_ROW_INJECTION_AND_STMT_MODE=1666;exports.ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE=1667;exports.ER_BINLOG_UNSAFE_LIMIT=1668;exports.ER_BINLOG_UNSAFE_INSERT_DELAYED=1669;exports.ER_BINLOG_UNSAFE_SYSTEM_TABLE=1670;exports.ER_BINLOG_UNSAFE_AUTOINC_COLUMNS=1671;exports.ER_BINLOG_UNSAFE_UDF=1672;exports.ER_BINLOG_UNSAFE_SYSTEM_VARIABLE=1673;exports.ER_BINLOG_UNSAFE_SYSTEM_FUNCTION=1674;exports.ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS=1675;exports.ER_MESSAGE_AND_STATEMENT=1676;exports.ER_SLAVE_CONVERSION_FAILED=1677;exports.ER_SLAVE_CANT_CREATE_CONVERSION=1678;exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT=1679;exports.ER_PATH_LENGTH=1680;exports.ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT=1681;exports.ER_WRONG_NATIVE_TABLE_STRUCTURE=1682;exports.ER_WRONG_PERFSCHEMA_USAGE=1683;exports.ER_WARN_I_S_SKIPPED_TABLE=1684;exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT=1685;exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT=1686;exports.ER_SPATIAL_MUST_HAVE_GEOM_COL=1687;exports.ER_TOO_LONG_INDEX_COMMENT=1688;exports.ER_LOCK_ABORTED=1689;exports.ER_DATA_OUT_OF_RANGE=1690;exports.ER_WRONG_SPVAR_TYPE_IN_LIMIT=1691;exports.ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE=1692;exports.ER_BINLOG_UNSAFE_MIXED_STATEMENT=1693;exports.ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN=1694;exports.ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN=1695;exports.ER_FAILED_READ_FROM_PAR_FILE=1696;exports.ER_VALUES_IS_NOT_INT_TYPE_ERROR=1697;exports.ER_ACCESS_DENIED_NO_PASSWORD_ERROR=1698;exports.ER_SET_PASSWORD_AUTH_PLUGIN=1699;exports.ER_GRANT_PLUGIN_USER_EXISTS=1700;exports.ER_TRUNCATE_ILLEGAL_FK=1701;exports.ER_PLUGIN_IS_PERMANENT=1702;exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN=1703;exports.ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX=1704;exports.ER_STMT_CACHE_FULL=1705;exports.ER_MULTI_UPDATE_KEY_CONFLICT=1706;exports.ER_TABLE_NEEDS_REBUILD=1707;exports.WARN_OPTION_BELOW_LIMIT=1708;exports.ER_INDEX_COLUMN_TOO_LONG=1709;exports.ER_ERROR_IN_TRIGGER_BODY=1710;exports.ER_ERROR_IN_UNKNOWN_TRIGGER_BODY=1711;exports.ER_INDEX_CORRUPT=1712;exports.ER_UNDO_RECORD_TOO_BIG=1713;exports.ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT=1714;exports.ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE=1715;exports.ER_BINLOG_UNSAFE_REPLACE_SELECT=1716;exports.ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT=1717;exports.ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT=1718;exports.ER_BINLOG_UNSAFE_UPDATE_IGNORE=1719;exports.ER_PLUGIN_NO_UNINSTALL=1720;exports.ER_PLUGIN_NO_INSTALL=1721;exports.ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT=1722;exports.ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC=1723;exports.ER_BINLOG_UNSAFE_INSERT_TWO_KEYS=1724;exports.ER_TABLE_IN_FK_CHECK=1725;exports.ER_UNSUPPORTED_ENGINE=1726;exports.ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST=1727;exports.ER_CANNOT_LOAD_FROM_TABLE_V2=1728;exports.ER_MASTER_DELAY_VALUE_OUT_OF_RANGE=1729;exports.ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT=1730;exports.ER_PARTITION_EXCHANGE_DIFFERENT_OPTION=1731;exports.ER_PARTITION_EXCHANGE_PART_TABLE=1732;exports.ER_PARTITION_EXCHANGE_TEMP_TABLE=1733;exports.ER_PARTITION_INSTEAD_OF_SUBPARTITION=1734;exports.ER_UNKNOWN_PARTITION=1735;exports.ER_TABLES_DIFFERENT_METADATA=1736;exports.ER_ROW_DOES_NOT_MATCH_PARTITION=1737;exports.ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX=1738;exports.ER_WARN_INDEX_NOT_APPLICABLE=1739;exports.ER_PARTITION_EXCHANGE_FOREIGN_KEY=1740;exports.ER_NO_SUCH_KEY_VALUE=1741;exports.ER_RPL_INFO_DATA_TOO_LONG=1742;exports.ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE=1743;exports.ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE=1744;exports.ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX=1745;exports.ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT=1746;exports.ER_PARTITION_CLAUSE_ON_NONPARTITIONED=1747;exports.ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET=1748;exports.ER_NO_SUCH_PARTITION=1749;exports.ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE=1750;exports.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE=1751;exports.ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE=1752;exports.ER_MTS_FEATURE_IS_NOT_SUPPORTED=1753;exports.ER_MTS_UPDATED_DBS_GREATER_MAX=1754;exports.ER_MTS_CANT_PARALLEL=1755;exports.ER_MTS_INCONSISTENT_DATA=1756;exports.ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING=1757;exports.ER_DA_INVALID_CONDITION_NUMBER=1758;exports.ER_INSECURE_PLAIN_TEXT=1759;exports.ER_INSECURE_CHANGE_MASTER=1760;exports.ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO=1761;exports.ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO=1762;exports.ER_SQLTHREAD_WITH_SECURE_SLAVE=1763;exports.ER_TABLE_HAS_NO_FT=1764;exports.ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER=1765;exports.ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION=1766;exports.ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST=1767;exports.ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION_WHEN_GTID_NEXT_LIST_IS_NULL=1768;exports.ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION=1769;exports.ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL=1770;exports.ER_SKIPPING_LOGGED_TRANSACTION=1771;exports.ER_MALFORMED_GTID_SET_SPECIFICATION=1772;exports.ER_MALFORMED_GTID_SET_ENCODING=1773;exports.ER_MALFORMED_GTID_SPECIFICATION=1774;exports.ER_GNO_EXHAUSTED=1775;exports.ER_BAD_SLAVE_AUTO_POSITION=1776;exports.ER_AUTO_POSITION_REQUIRES_GTID_MODE_ON=1777;exports.ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET=1778;exports.ER_GTID_MODE_2_OR_3_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON=1779;exports.ER_GTID_MODE_REQUIRES_BINLOG=1780;exports.ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF=1781;exports.ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON=1782;exports.ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF=1783;exports.ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF=1784;exports.ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE=1785;exports.ER_GTID_UNSAFE_CREATE_SELECT=1786;exports.ER_GTID_UNSAFE_CREATE_DROP_TEMPORARY_TABLE_IN_TRANSACTION=1787;exports.ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME=1788;exports.ER_MASTER_HAS_PURGED_REQUIRED_GTIDS=1789;exports.ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID=1790;exports.ER_UNKNOWN_EXPLAIN_FORMAT=1791;exports.ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION=1792;exports.ER_TOO_LONG_TABLE_PARTITION_COMMENT=1793;exports.ER_SLAVE_CONFIGURATION=1794;exports.ER_INNODB_FT_LIMIT=1795;exports.ER_INNODB_NO_FT_TEMP_TABLE=1796;exports.ER_INNODB_FT_WRONG_DOCID_COLUMN=1797;exports.ER_INNODB_FT_WRONG_DOCID_INDEX=1798;exports.ER_INNODB_ONLINE_LOG_TOO_BIG=1799;exports.ER_UNKNOWN_ALTER_ALGORITHM=1800;exports.ER_UNKNOWN_ALTER_LOCK=1801;exports.ER_MTS_CHANGE_MASTER_CANT_RUN_WITH_GAPS=1802;exports.ER_MTS_RECOVERY_FAILURE=1803;exports.ER_MTS_RESET_WORKERS=1804;exports.ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2=1805;exports.ER_SLAVE_SILENT_RETRY_TRANSACTION=1806;exports.ER_DISCARD_FK_CHECKS_RUNNING=1807;exports.ER_TABLE_SCHEMA_MISMATCH=1808;exports.ER_TABLE_IN_SYSTEM_TABLESPACE=1809;exports.ER_IO_READ_ERROR=1810;exports.ER_IO_WRITE_ERROR=1811;exports.ER_TABLESPACE_MISSING=1812;exports.ER_TABLESPACE_EXISTS=1813;exports.ER_TABLESPACE_DISCARDED=1814;exports.ER_INTERNAL_ERROR=1815;exports.ER_INNODB_IMPORT_ERROR=1816;exports.ER_INNODB_INDEX_CORRUPT=1817;exports.ER_INVALID_YEAR_COLUMN_LENGTH=1818;exports.ER_NOT_VALID_PASSWORD=1819;exports.ER_MUST_CHANGE_PASSWORD=1820;exports.ER_FK_NO_INDEX_CHILD=1821;exports.ER_FK_NO_INDEX_PARENT=1822;exports.ER_FK_FAIL_ADD_SYSTEM=1823;exports.ER_FK_CANNOT_OPEN_PARENT=1824;exports.ER_FK_INCORRECT_OPTION=1825;exports.ER_FK_DUP_NAME=1826;exports.ER_PASSWORD_FORMAT=1827;exports.ER_FK_COLUMN_CANNOT_DROP=1828;exports.ER_FK_COLUMN_CANNOT_DROP_CHILD=1829;exports.ER_FK_COLUMN_NOT_NULL=1830;exports.ER_DUP_INDEX=1831;exports.ER_FK_COLUMN_CANNOT_CHANGE=1832;exports.ER_FK_COLUMN_CANNOT_CHANGE_CHILD=1833;exports.ER_FK_CANNOT_DELETE_PARENT=1834;exports.ER_MALFORMED_PACKET=1835;exports.ER_READ_ONLY_MODE=1836;exports.ER_GTID_NEXT_TYPE_UNDEFINED_GROUP=1837;exports.ER_VARIABLE_NOT_SETTABLE_IN_SP=1838;exports.ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF=1839;exports.ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY=1840;exports.ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY=1841;exports.ER_GTID_PURGED_WAS_CHANGED=1842;exports.ER_GTID_EXECUTED_WAS_CHANGED=1843;exports.ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES=1844;exports.ER_ALTER_OPERATION_NOT_SUPPORTED=1845;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON=1846;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY=1847;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION=1848;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME=1849;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE=1850;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK=1851;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_IGNORE=1852;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK=1853;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC=1854;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS=1855;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS=1856;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS=1857;exports.ER_SQL_SLAVE_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE=1858;exports.ER_DUP_UNKNOWN_IN_INDEX=1859;exports.ER_IDENT_CAUSES_TOO_LONG_PATH=1860;exports.ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL=1861;exports.ER_MUST_CHANGE_PASSWORD_LOGIN=1862;exports.ER_ROW_IN_WRONG_PARTITION=1863;exports.ER_MTS_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX=1864;exports.ER_INNODB_NO_FT_USES_PARSER=1865;exports.ER_BINLOG_LOGICAL_CORRUPTION=1866;exports.ER_WARN_PURGE_LOG_IN_USE=1867;exports.ER_WARN_PURGE_LOG_IS_ACTIVE=1868;exports.ER_AUTO_INCREMENT_CONFLICT=1869;exports.WARN_ON_BLOCKHOLE_IN_RBR=1870;exports.ER_SLAVE_MI_INIT_REPOSITORY=1871;exports.ER_SLAVE_RLI_INIT_REPOSITORY=1872;exports.ER_ACCESS_DENIED_CHANGE_USER_ERROR=1873;exports.ER_INNODB_READ_ONLY=1874;exports.ER_STOP_SLAVE_SQL_THREAD_TIMEOUT=1875;exports.ER_STOP_SLAVE_IO_THREAD_TIMEOUT=1876;exports.ER_TABLE_CORRUPT=1877;exports.ER_TEMP_FILE_WRITE_FAILURE=1878;exports.ER_INNODB_FT_AUX_NOT_HEX_ID=1879;exports.ER_OLD_TEMPORALS_UPGRADED=1880;exports.ER_INNODB_FORCED_RECOVERY=1881;exports.ER_AES_INVALID_IV=1882; // Lookup-by-number table
	exports[1]='EE_CANTCREATEFILE';exports[2]='EE_READ';exports[3]='EE_WRITE';exports[4]='EE_BADCLOSE';exports[5]='EE_OUTOFMEMORY';exports[6]='EE_DELETE';exports[7]='EE_LINK';exports[9]='EE_EOFERR';exports[10]='EE_CANTLOCK';exports[11]='EE_CANTUNLOCK';exports[12]='EE_DIR';exports[13]='EE_STAT';exports[14]='EE_CANT_CHSIZE';exports[15]='EE_CANT_OPEN_STREAM';exports[16]='EE_GETWD';exports[17]='EE_SETWD';exports[18]='EE_LINK_WARNING';exports[19]='EE_OPEN_WARNING';exports[20]='EE_DISK_FULL';exports[21]='EE_CANT_MKDIR';exports[22]='EE_UNKNOWN_CHARSET';exports[23]='EE_OUT_OF_FILERESOURCES';exports[24]='EE_CANT_READLINK';exports[25]='EE_CANT_SYMLINK';exports[26]='EE_REALPATH';exports[27]='EE_SYNC';exports[28]='EE_UNKNOWN_COLLATION';exports[29]='EE_FILENOTFOUND';exports[30]='EE_FILE_NOT_CLOSED';exports[31]='EE_CHANGE_OWNERSHIP';exports[32]='EE_CHANGE_PERMISSIONS';exports[33]='EE_CANT_SEEK';exports[120]='HA_ERR_KEY_NOT_FOUND';exports[121]='HA_ERR_FOUND_DUPP_KEY';exports[122]='HA_ERR_INTERNAL_ERROR';exports[123]='HA_ERR_RECORD_CHANGED';exports[124]='HA_ERR_WRONG_INDEX';exports[126]='HA_ERR_CRASHED';exports[127]='HA_ERR_WRONG_IN_RECORD';exports[128]='HA_ERR_OUT_OF_MEM';exports[130]='HA_ERR_NOT_A_TABLE';exports[131]='HA_ERR_WRONG_COMMAND';exports[132]='HA_ERR_OLD_FILE';exports[133]='HA_ERR_NO_ACTIVE_RECORD';exports[134]='HA_ERR_RECORD_DELETED';exports[135]='HA_ERR_RECORD_FILE_FULL';exports[136]='HA_ERR_INDEX_FILE_FULL';exports[137]='HA_ERR_END_OF_FILE';exports[138]='HA_ERR_UNSUPPORTED';exports[139]='HA_ERR_TO_BIG_ROW';exports[140]='HA_WRONG_CREATE_OPTION';exports[141]='HA_ERR_FOUND_DUPP_UNIQUE';exports[142]='HA_ERR_UNKNOWN_CHARSET';exports[143]='HA_ERR_WRONG_MRG_TABLE_DEF';exports[144]='HA_ERR_CRASHED_ON_REPAIR';exports[145]='HA_ERR_CRASHED_ON_USAGE';exports[146]='HA_ERR_LOCK_WAIT_TIMEOUT';exports[147]='HA_ERR_LOCK_TABLE_FULL';exports[148]='HA_ERR_READ_ONLY_TRANSACTION';exports[149]='HA_ERR_LOCK_DEADLOCK';exports[150]='HA_ERR_CANNOT_ADD_FOREIGN';exports[151]='HA_ERR_NO_REFERENCED_ROW';exports[152]='HA_ERR_ROW_IS_REFERENCED';exports[153]='HA_ERR_NO_SAVEPOINT';exports[154]='HA_ERR_NON_UNIQUE_BLOCK_SIZE';exports[155]='HA_ERR_NO_SUCH_TABLE';exports[156]='HA_ERR_TABLE_EXIST';exports[157]='HA_ERR_NO_CONNECTION';exports[158]='HA_ERR_NULL_IN_SPATIAL';exports[159]='HA_ERR_TABLE_DEF_CHANGED';exports[160]='HA_ERR_NO_PARTITION_FOUND';exports[161]='HA_ERR_RBR_LOGGING_FAILED';exports[162]='HA_ERR_DROP_INDEX_FK';exports[163]='HA_ERR_FOREIGN_DUPLICATE_KEY';exports[164]='HA_ERR_TABLE_NEEDS_UPGRADE';exports[165]='HA_ERR_TABLE_READONLY';exports[166]='HA_ERR_AUTOINC_READ_FAILED';exports[167]='HA_ERR_AUTOINC_ERANGE';exports[168]='HA_ERR_GENERIC';exports[169]='HA_ERR_RECORD_IS_THE_SAME';exports[170]='HA_ERR_LOGGING_IMPOSSIBLE';exports[171]='HA_ERR_CORRUPT_EVENT';exports[172]='HA_ERR_NEW_FILE';exports[173]='HA_ERR_ROWS_EVENT_APPLY';exports[174]='HA_ERR_INITIALIZATION';exports[175]='HA_ERR_FILE_TOO_SHORT';exports[176]='HA_ERR_WRONG_CRC';exports[177]='HA_ERR_TOO_MANY_CONCURRENT_TRXS';exports[178]='HA_ERR_NOT_IN_LOCK_PARTITIONS';exports[179]='HA_ERR_INDEX_COL_TOO_LONG';exports[180]='HA_ERR_INDEX_CORRUPT';exports[181]='HA_ERR_UNDO_REC_TOO_BIG';exports[182]='HA_FTS_INVALID_DOCID';exports[183]='HA_ERR_TABLE_IN_FK_CHECK';exports[184]='HA_ERR_TABLESPACE_EXISTS';exports[185]='HA_ERR_TOO_MANY_FIELDS';exports[186]='HA_ERR_ROW_IN_WRONG_PARTITION';exports[187]='HA_ERR_INNODB_READ_ONLY';exports[188]='HA_ERR_FTS_EXCEED_RESULT_CACHE_LIMIT';exports[189]='HA_ERR_TEMP_FILE_WRITE_FAILURE';exports[190]='HA_ERR_INNODB_FORCED_RECOVERY';exports[191]='HA_ERR_FTS_TOO_MANY_WORDS_IN_PHRASE';exports[1000]='ER_HASHCHK';exports[1001]='ER_NISAMCHK';exports[1002]='ER_NO';exports[1003]='ER_YES';exports[1004]='ER_CANT_CREATE_FILE';exports[1005]='ER_CANT_CREATE_TABLE';exports[1006]='ER_CANT_CREATE_DB';exports[1007]='ER_DB_CREATE_EXISTS';exports[1008]='ER_DB_DROP_EXISTS';exports[1009]='ER_DB_DROP_DELETE';exports[1010]='ER_DB_DROP_RMDIR';exports[1011]='ER_CANT_DELETE_FILE';exports[1012]='ER_CANT_FIND_SYSTEM_REC';exports[1013]='ER_CANT_GET_STAT';exports[1014]='ER_CANT_GET_WD';exports[1015]='ER_CANT_LOCK';exports[1016]='ER_CANT_OPEN_FILE';exports[1017]='ER_FILE_NOT_FOUND';exports[1018]='ER_CANT_READ_DIR';exports[1019]='ER_CANT_SET_WD';exports[1020]='ER_CHECKREAD';exports[1021]='ER_DISK_FULL';exports[1022]='ER_DUP_KEY';exports[1023]='ER_ERROR_ON_CLOSE';exports[1024]='ER_ERROR_ON_READ';exports[1025]='ER_ERROR_ON_RENAME';exports[1026]='ER_ERROR_ON_WRITE';exports[1027]='ER_FILE_USED';exports[1028]='ER_FILSORT_ABORT';exports[1029]='ER_FORM_NOT_FOUND';exports[1030]='ER_GET_ERRNO';exports[1031]='ER_ILLEGAL_HA';exports[1032]='ER_KEY_NOT_FOUND';exports[1033]='ER_NOT_FORM_FILE';exports[1034]='ER_NOT_KEYFILE';exports[1035]='ER_OLD_KEYFILE';exports[1036]='ER_OPEN_AS_READONLY';exports[1037]='ER_OUTOFMEMORY';exports[1038]='ER_OUT_OF_SORTMEMORY';exports[1039]='ER_UNEXPECTED_EOF';exports[1040]='ER_CON_COUNT_ERROR';exports[1041]='ER_OUT_OF_RESOURCES';exports[1042]='ER_BAD_HOST_ERROR';exports[1043]='ER_HANDSHAKE_ERROR';exports[1044]='ER_DBACCESS_DENIED_ERROR';exports[1045]='ER_ACCESS_DENIED_ERROR';exports[1046]='ER_NO_DB_ERROR';exports[1047]='ER_UNKNOWN_COM_ERROR';exports[1048]='ER_BAD_NULL_ERROR';exports[1049]='ER_BAD_DB_ERROR';exports[1050]='ER_TABLE_EXISTS_ERROR';exports[1051]='ER_BAD_TABLE_ERROR';exports[1052]='ER_NON_UNIQ_ERROR';exports[1053]='ER_SERVER_SHUTDOWN';exports[1054]='ER_BAD_FIELD_ERROR';exports[1055]='ER_WRONG_FIELD_WITH_GROUP';exports[1056]='ER_WRONG_GROUP_FIELD';exports[1057]='ER_WRONG_SUM_SELECT';exports[1058]='ER_WRONG_VALUE_COUNT';exports[1059]='ER_TOO_LONG_IDENT';exports[1060]='ER_DUP_FIELDNAME';exports[1061]='ER_DUP_KEYNAME';exports[1062]='ER_DUP_ENTRY';exports[1063]='ER_WRONG_FIELD_SPEC';exports[1064]='ER_PARSE_ERROR';exports[1065]='ER_EMPTY_QUERY';exports[1066]='ER_NONUNIQ_TABLE';exports[1067]='ER_INVALID_DEFAULT';exports[1068]='ER_MULTIPLE_PRI_KEY';exports[1069]='ER_TOO_MANY_KEYS';exports[1070]='ER_TOO_MANY_KEY_PARTS';exports[1071]='ER_TOO_LONG_KEY';exports[1072]='ER_KEY_COLUMN_DOES_NOT_EXITS';exports[1073]='ER_BLOB_USED_AS_KEY';exports[1074]='ER_TOO_BIG_FIELDLENGTH';exports[1075]='ER_WRONG_AUTO_KEY';exports[1076]='ER_READY';exports[1077]='ER_NORMAL_SHUTDOWN';exports[1078]='ER_GOT_SIGNAL';exports[1079]='ER_SHUTDOWN_COMPLETE';exports[1080]='ER_FORCING_CLOSE';exports[1081]='ER_IPSOCK_ERROR';exports[1082]='ER_NO_SUCH_INDEX';exports[1083]='ER_WRONG_FIELD_TERMINATORS';exports[1084]='ER_BLOBS_AND_NO_TERMINATED';exports[1085]='ER_TEXTFILE_NOT_READABLE';exports[1086]='ER_FILE_EXISTS_ERROR';exports[1087]='ER_LOAD_INFO';exports[1088]='ER_ALTER_INFO';exports[1089]='ER_WRONG_SUB_KEY';exports[1090]='ER_CANT_REMOVE_ALL_FIELDS';exports[1091]='ER_CANT_DROP_FIELD_OR_KEY';exports[1092]='ER_INSERT_INFO';exports[1093]='ER_UPDATE_TABLE_USED';exports[1094]='ER_NO_SUCH_THREAD';exports[1095]='ER_KILL_DENIED_ERROR';exports[1096]='ER_NO_TABLES_USED';exports[1097]='ER_TOO_BIG_SET';exports[1098]='ER_NO_UNIQUE_LOGFILE';exports[1099]='ER_TABLE_NOT_LOCKED_FOR_WRITE';exports[1100]='ER_TABLE_NOT_LOCKED';exports[1101]='ER_BLOB_CANT_HAVE_DEFAULT';exports[1102]='ER_WRONG_DB_NAME';exports[1103]='ER_WRONG_TABLE_NAME';exports[1104]='ER_TOO_BIG_SELECT';exports[1105]='ER_UNKNOWN_ERROR';exports[1106]='ER_UNKNOWN_PROCEDURE';exports[1107]='ER_WRONG_PARAMCOUNT_TO_PROCEDURE';exports[1108]='ER_WRONG_PARAMETERS_TO_PROCEDURE';exports[1109]='ER_UNKNOWN_TABLE';exports[1110]='ER_FIELD_SPECIFIED_TWICE';exports[1111]='ER_INVALID_GROUP_FUNC_USE';exports[1112]='ER_UNSUPPORTED_EXTENSION';exports[1113]='ER_TABLE_MUST_HAVE_COLUMNS';exports[1114]='ER_RECORD_FILE_FULL';exports[1115]='ER_UNKNOWN_CHARACTER_SET';exports[1116]='ER_TOO_MANY_TABLES';exports[1117]='ER_TOO_MANY_FIELDS';exports[1118]='ER_TOO_BIG_ROWSIZE';exports[1119]='ER_STACK_OVERRUN';exports[1120]='ER_WRONG_OUTER_JOIN';exports[1121]='ER_NULL_COLUMN_IN_INDEX';exports[1122]='ER_CANT_FIND_UDF';exports[1123]='ER_CANT_INITIALIZE_UDF';exports[1124]='ER_UDF_NO_PATHS';exports[1125]='ER_UDF_EXISTS';exports[1126]='ER_CANT_OPEN_LIBRARY';exports[1127]='ER_CANT_FIND_DL_ENTRY';exports[1128]='ER_FUNCTION_NOT_DEFINED';exports[1129]='ER_HOST_IS_BLOCKED';exports[1130]='ER_HOST_NOT_PRIVILEGED';exports[1131]='ER_PASSWORD_ANONYMOUS_USER';exports[1132]='ER_PASSWORD_NOT_ALLOWED';exports[1133]='ER_PASSWORD_NO_MATCH';exports[1134]='ER_UPDATE_INFO';exports[1135]='ER_CANT_CREATE_THREAD';exports[1136]='ER_WRONG_VALUE_COUNT_ON_ROW';exports[1137]='ER_CANT_REOPEN_TABLE';exports[1138]='ER_INVALID_USE_OF_NULL';exports[1139]='ER_REGEXP_ERROR';exports[1140]='ER_MIX_OF_GROUP_FUNC_AND_FIELDS';exports[1141]='ER_NONEXISTING_GRANT';exports[1142]='ER_TABLEACCESS_DENIED_ERROR';exports[1143]='ER_COLUMNACCESS_DENIED_ERROR';exports[1144]='ER_ILLEGAL_GRANT_FOR_TABLE';exports[1145]='ER_GRANT_WRONG_HOST_OR_USER';exports[1146]='ER_NO_SUCH_TABLE';exports[1147]='ER_NONEXISTING_TABLE_GRANT';exports[1148]='ER_NOT_ALLOWED_COMMAND';exports[1149]='ER_SYNTAX_ERROR';exports[1150]='ER_DELAYED_CANT_CHANGE_LOCK';exports[1151]='ER_TOO_MANY_DELAYED_THREADS';exports[1152]='ER_ABORTING_CONNECTION';exports[1153]='ER_NET_PACKET_TOO_LARGE';exports[1154]='ER_NET_READ_ERROR_FROM_PIPE';exports[1155]='ER_NET_FCNTL_ERROR';exports[1156]='ER_NET_PACKETS_OUT_OF_ORDER';exports[1157]='ER_NET_UNCOMPRESS_ERROR';exports[1158]='ER_NET_READ_ERROR';exports[1159]='ER_NET_READ_INTERRUPTED';exports[1160]='ER_NET_ERROR_ON_WRITE';exports[1161]='ER_NET_WRITE_INTERRUPTED';exports[1162]='ER_TOO_LONG_STRING';exports[1163]='ER_TABLE_CANT_HANDLE_BLOB';exports[1164]='ER_TABLE_CANT_HANDLE_AUTO_INCREMENT';exports[1165]='ER_DELAYED_INSERT_TABLE_LOCKED';exports[1166]='ER_WRONG_COLUMN_NAME';exports[1167]='ER_WRONG_KEY_COLUMN';exports[1168]='ER_WRONG_MRG_TABLE';exports[1169]='ER_DUP_UNIQUE';exports[1170]='ER_BLOB_KEY_WITHOUT_LENGTH';exports[1171]='ER_PRIMARY_CANT_HAVE_NULL';exports[1172]='ER_TOO_MANY_ROWS';exports[1173]='ER_REQUIRES_PRIMARY_KEY';exports[1174]='ER_NO_RAID_COMPILED';exports[1175]='ER_UPDATE_WITHOUT_KEY_IN_SAFE_MODE';exports[1176]='ER_KEY_DOES_NOT_EXITS';exports[1177]='ER_CHECK_NO_SUCH_TABLE';exports[1178]='ER_CHECK_NOT_IMPLEMENTED';exports[1179]='ER_CANT_DO_THIS_DURING_AN_TRANSACTION';exports[1180]='ER_ERROR_DURING_COMMIT';exports[1181]='ER_ERROR_DURING_ROLLBACK';exports[1182]='ER_ERROR_DURING_FLUSH_LOGS';exports[1183]='ER_ERROR_DURING_CHECKPOINT';exports[1184]='ER_NEW_ABORTING_CONNECTION';exports[1185]='ER_DUMP_NOT_IMPLEMENTED';exports[1186]='ER_FLUSH_MASTER_BINLOG_CLOSED';exports[1187]='ER_INDEX_REBUILD';exports[1188]='ER_MASTER';exports[1189]='ER_MASTER_NET_READ';exports[1190]='ER_MASTER_NET_WRITE';exports[1191]='ER_FT_MATCHING_KEY_NOT_FOUND';exports[1192]='ER_LOCK_OR_ACTIVE_TRANSACTION';exports[1193]='ER_UNKNOWN_SYSTEM_VARIABLE';exports[1194]='ER_CRASHED_ON_USAGE';exports[1195]='ER_CRASHED_ON_REPAIR';exports[1196]='ER_WARNING_NOT_COMPLETE_ROLLBACK';exports[1197]='ER_TRANS_CACHE_FULL';exports[1198]='ER_SLAVE_MUST_STOP';exports[1199]='ER_SLAVE_NOT_RUNNING';exports[1200]='ER_BAD_SLAVE';exports[1201]='ER_MASTER_INFO';exports[1202]='ER_SLAVE_THREAD';exports[1203]='ER_TOO_MANY_USER_CONNECTIONS';exports[1204]='ER_SET_CONSTANTS_ONLY';exports[1205]='ER_LOCK_WAIT_TIMEOUT';exports[1206]='ER_LOCK_TABLE_FULL';exports[1207]='ER_READ_ONLY_TRANSACTION';exports[1208]='ER_DROP_DB_WITH_READ_LOCK';exports[1209]='ER_CREATE_DB_WITH_READ_LOCK';exports[1210]='ER_WRONG_ARGUMENTS';exports[1211]='ER_NO_PERMISSION_TO_CREATE_USER';exports[1212]='ER_UNION_TABLES_IN_DIFFERENT_DIR';exports[1213]='ER_LOCK_DEADLOCK';exports[1214]='ER_TABLE_CANT_HANDLE_FT';exports[1215]='ER_CANNOT_ADD_FOREIGN';exports[1216]='ER_NO_REFERENCED_ROW';exports[1217]='ER_ROW_IS_REFERENCED';exports[1218]='ER_CONNECT_TO_MASTER';exports[1219]='ER_QUERY_ON_MASTER';exports[1220]='ER_ERROR_WHEN_EXECUTING_COMMAND';exports[1221]='ER_WRONG_USAGE';exports[1222]='ER_WRONG_NUMBER_OF_COLUMNS_IN_SELECT';exports[1223]='ER_CANT_UPDATE_WITH_READLOCK';exports[1224]='ER_MIXING_NOT_ALLOWED';exports[1225]='ER_DUP_ARGUMENT';exports[1226]='ER_USER_LIMIT_REACHED';exports[1227]='ER_SPECIFIC_ACCESS_DENIED_ERROR';exports[1228]='ER_LOCAL_VARIABLE';exports[1229]='ER_GLOBAL_VARIABLE';exports[1230]='ER_NO_DEFAULT';exports[1231]='ER_WRONG_VALUE_FOR_VAR';exports[1232]='ER_WRONG_TYPE_FOR_VAR';exports[1233]='ER_VAR_CANT_BE_READ';exports[1234]='ER_CANT_USE_OPTION_HERE';exports[1235]='ER_NOT_SUPPORTED_YET';exports[1236]='ER_MASTER_FATAL_ERROR_READING_BINLOG';exports[1237]='ER_SLAVE_IGNORED_TABLE';exports[1238]='ER_INCORRECT_GLOBAL_LOCAL_VAR';exports[1239]='ER_WRONG_FK_DEF';exports[1240]='ER_KEY_REF_DO_NOT_MATCH_TABLE_REF';exports[1241]='ER_OPERAND_COLUMNS';exports[1242]='ER_SUBQUERY_NO_1_ROW';exports[1243]='ER_UNKNOWN_STMT_HANDLER';exports[1244]='ER_CORRUPT_HELP_DB';exports[1245]='ER_CYCLIC_REFERENCE';exports[1246]='ER_AUTO_CONVERT';exports[1247]='ER_ILLEGAL_REFERENCE';exports[1248]='ER_DERIVED_MUST_HAVE_ALIAS';exports[1249]='ER_SELECT_REDUCED';exports[1250]='ER_TABLENAME_NOT_ALLOWED_HERE';exports[1251]='ER_NOT_SUPPORTED_AUTH_MODE';exports[1252]='ER_SPATIAL_CANT_HAVE_NULL';exports[1253]='ER_COLLATION_CHARSET_MISMATCH';exports[1254]='ER_SLAVE_WAS_RUNNING';exports[1255]='ER_SLAVE_WAS_NOT_RUNNING';exports[1256]='ER_TOO_BIG_FOR_UNCOMPRESS';exports[1257]='ER_ZLIB_Z_MEM_ERROR';exports[1258]='ER_ZLIB_Z_BUF_ERROR';exports[1259]='ER_ZLIB_Z_DATA_ERROR';exports[1260]='ER_CUT_VALUE_GROUP_CONCAT';exports[1261]='ER_WARN_TOO_FEW_RECORDS';exports[1262]='ER_WARN_TOO_MANY_RECORDS';exports[1263]='ER_WARN_NULL_TO_NOTNULL';exports[1264]='ER_WARN_DATA_OUT_OF_RANGE';exports[1265]='WARN_DATA_TRUNCATED';exports[1266]='ER_WARN_USING_OTHER_HANDLER';exports[1267]='ER_CANT_AGGREGATE_2COLLATIONS';exports[1268]='ER_DROP_USER';exports[1269]='ER_REVOKE_GRANTS';exports[1270]='ER_CANT_AGGREGATE_3COLLATIONS';exports[1271]='ER_CANT_AGGREGATE_NCOLLATIONS';exports[1272]='ER_VARIABLE_IS_NOT_STRUCT';exports[1273]='ER_UNKNOWN_COLLATION';exports[1274]='ER_SLAVE_IGNORED_SSL_PARAMS';exports[1275]='ER_SERVER_IS_IN_SECURE_AUTH_MODE';exports[1276]='ER_WARN_FIELD_RESOLVED';exports[1277]='ER_BAD_SLAVE_UNTIL_COND';exports[1278]='ER_MISSING_SKIP_SLAVE';exports[1279]='ER_UNTIL_COND_IGNORED';exports[1280]='ER_WRONG_NAME_FOR_INDEX';exports[1281]='ER_WRONG_NAME_FOR_CATALOG';exports[1282]='ER_WARN_QC_RESIZE';exports[1283]='ER_BAD_FT_COLUMN';exports[1284]='ER_UNKNOWN_KEY_CACHE';exports[1285]='ER_WARN_HOSTNAME_WONT_WORK';exports[1286]='ER_UNKNOWN_STORAGE_ENGINE';exports[1287]='ER_WARN_DEPRECATED_SYNTAX';exports[1288]='ER_NON_UPDATABLE_TABLE';exports[1289]='ER_FEATURE_DISABLED';exports[1290]='ER_OPTION_PREVENTS_STATEMENT';exports[1291]='ER_DUPLICATED_VALUE_IN_TYPE';exports[1292]='ER_TRUNCATED_WRONG_VALUE';exports[1293]='ER_TOO_MUCH_AUTO_TIMESTAMP_COLS';exports[1294]='ER_INVALID_ON_UPDATE';exports[1295]='ER_UNSUPPORTED_PS';exports[1296]='ER_GET_ERRMSG';exports[1297]='ER_GET_TEMPORARY_ERRMSG';exports[1298]='ER_UNKNOWN_TIME_ZONE';exports[1299]='ER_WARN_INVALID_TIMESTAMP';exports[1300]='ER_INVALID_CHARACTER_STRING';exports[1301]='ER_WARN_ALLOWED_PACKET_OVERFLOWED';exports[1302]='ER_CONFLICTING_DECLARATIONS';exports[1303]='ER_SP_NO_RECURSIVE_CREATE';exports[1304]='ER_SP_ALREADY_EXISTS';exports[1305]='ER_SP_DOES_NOT_EXIST';exports[1306]='ER_SP_DROP_FAILED';exports[1307]='ER_SP_STORE_FAILED';exports[1308]='ER_SP_LILABEL_MISMATCH';exports[1309]='ER_SP_LABEL_REDEFINE';exports[1310]='ER_SP_LABEL_MISMATCH';exports[1311]='ER_SP_UNINIT_VAR';exports[1312]='ER_SP_BADSELECT';exports[1313]='ER_SP_BADRETURN';exports[1314]='ER_SP_BADSTATEMENT';exports[1315]='ER_UPDATE_LOG_DEPRECATED_IGNORED';exports[1316]='ER_UPDATE_LOG_DEPRECATED_TRANSLATED';exports[1317]='ER_QUERY_INTERRUPTED';exports[1318]='ER_SP_WRONG_NO_OF_ARGS';exports[1319]='ER_SP_COND_MISMATCH';exports[1320]='ER_SP_NORETURN';exports[1321]='ER_SP_NORETURNEND';exports[1322]='ER_SP_BAD_CURSOR_QUERY';exports[1323]='ER_SP_BAD_CURSOR_SELECT';exports[1324]='ER_SP_CURSOR_MISMATCH';exports[1325]='ER_SP_CURSOR_ALREADY_OPEN';exports[1326]='ER_SP_CURSOR_NOT_OPEN';exports[1327]='ER_SP_UNDECLARED_VAR';exports[1328]='ER_SP_WRONG_NO_OF_FETCH_ARGS';exports[1329]='ER_SP_FETCH_NO_DATA';exports[1330]='ER_SP_DUP_PARAM';exports[1331]='ER_SP_DUP_VAR';exports[1332]='ER_SP_DUP_COND';exports[1333]='ER_SP_DUP_CURS';exports[1334]='ER_SP_CANT_ALTER';exports[1335]='ER_SP_SUBSELECT_NYI';exports[1336]='ER_STMT_NOT_ALLOWED_IN_SF_OR_TRG';exports[1337]='ER_SP_VARCOND_AFTER_CURSHNDLR';exports[1338]='ER_SP_CURSOR_AFTER_HANDLER';exports[1339]='ER_SP_CASE_NOT_FOUND';exports[1340]='ER_FPARSER_TOO_BIG_FILE';exports[1341]='ER_FPARSER_BAD_HEADER';exports[1342]='ER_FPARSER_EOF_IN_COMMENT';exports[1343]='ER_FPARSER_ERROR_IN_PARAMETER';exports[1344]='ER_FPARSER_EOF_IN_UNKNOWN_PARAMETER';exports[1345]='ER_VIEW_NO_EXPLAIN';exports[1346]='ER_FRM_UNKNOWN_TYPE';exports[1347]='ER_WRONG_OBJECT';exports[1348]='ER_NONUPDATEABLE_COLUMN';exports[1349]='ER_VIEW_SELECT_DERIVED';exports[1350]='ER_VIEW_SELECT_CLAUSE';exports[1351]='ER_VIEW_SELECT_VARIABLE';exports[1352]='ER_VIEW_SELECT_TMPTABLE';exports[1353]='ER_VIEW_WRONG_LIST';exports[1354]='ER_WARN_VIEW_MERGE';exports[1355]='ER_WARN_VIEW_WITHOUT_KEY';exports[1356]='ER_VIEW_INVALID';exports[1357]='ER_SP_NO_DROP_SP';exports[1358]='ER_SP_GOTO_IN_HNDLR';exports[1359]='ER_TRG_ALREADY_EXISTS';exports[1360]='ER_TRG_DOES_NOT_EXIST';exports[1361]='ER_TRG_ON_VIEW_OR_TEMP_TABLE';exports[1362]='ER_TRG_CANT_CHANGE_ROW';exports[1363]='ER_TRG_NO_SUCH_ROW_IN_TRG';exports[1364]='ER_NO_DEFAULT_FOR_FIELD';exports[1365]='ER_DIVISION_BY_ZERO';exports[1366]='ER_TRUNCATED_WRONG_VALUE_FOR_FIELD';exports[1367]='ER_ILLEGAL_VALUE_FOR_TYPE';exports[1368]='ER_VIEW_NONUPD_CHECK';exports[1369]='ER_VIEW_CHECK_FAILED';exports[1370]='ER_PROCACCESS_DENIED_ERROR';exports[1371]='ER_RELAY_LOG_FAIL';exports[1372]='ER_PASSWD_LENGTH';exports[1373]='ER_UNKNOWN_TARGET_BINLOG';exports[1374]='ER_IO_ERR_LOG_INDEX_READ';exports[1375]='ER_BINLOG_PURGE_PROHIBITED';exports[1376]='ER_FSEEK_FAIL';exports[1377]='ER_BINLOG_PURGE_FATAL_ERR';exports[1378]='ER_LOG_IN_USE';exports[1379]='ER_LOG_PURGE_UNKNOWN_ERR';exports[1380]='ER_RELAY_LOG_INIT';exports[1381]='ER_NO_BINARY_LOGGING';exports[1382]='ER_RESERVED_SYNTAX';exports[1383]='ER_WSAS_FAILED';exports[1384]='ER_DIFF_GROUPS_PROC';exports[1385]='ER_NO_GROUP_FOR_PROC';exports[1386]='ER_ORDER_WITH_PROC';exports[1387]='ER_LOGGING_PROHIBIT_CHANGING_OF';exports[1388]='ER_NO_FILE_MAPPING';exports[1389]='ER_WRONG_MAGIC';exports[1390]='ER_PS_MANY_PARAM';exports[1391]='ER_KEY_PART_0';exports[1392]='ER_VIEW_CHECKSUM';exports[1393]='ER_VIEW_MULTIUPDATE';exports[1394]='ER_VIEW_NO_INSERT_FIELD_LIST';exports[1395]='ER_VIEW_DELETE_MERGE_VIEW';exports[1396]='ER_CANNOT_USER';exports[1397]='ER_XAER_NOTA';exports[1398]='ER_XAER_INVAL';exports[1399]='ER_XAER_RMFAIL';exports[1400]='ER_XAER_OUTSIDE';exports[1401]='ER_XAER_RMERR';exports[1402]='ER_XA_RBROLLBACK';exports[1403]='ER_NONEXISTING_PROC_GRANT';exports[1404]='ER_PROC_AUTO_GRANT_FAIL';exports[1405]='ER_PROC_AUTO_REVOKE_FAIL';exports[1406]='ER_DATA_TOO_LONG';exports[1407]='ER_SP_BAD_SQLSTATE';exports[1408]='ER_STARTUP';exports[1409]='ER_LOAD_FROM_FIXED_SIZE_ROWS_TO_VAR';exports[1410]='ER_CANT_CREATE_USER_WITH_GRANT';exports[1411]='ER_WRONG_VALUE_FOR_TYPE';exports[1412]='ER_TABLE_DEF_CHANGED';exports[1413]='ER_SP_DUP_HANDLER';exports[1414]='ER_SP_NOT_VAR_ARG';exports[1415]='ER_SP_NO_RETSET';exports[1416]='ER_CANT_CREATE_GEOMETRY_OBJECT';exports[1417]='ER_FAILED_ROUTINE_BREAK_BINLOG';exports[1418]='ER_BINLOG_UNSAFE_ROUTINE';exports[1419]='ER_BINLOG_CREATE_ROUTINE_NEED_SUPER';exports[1420]='ER_EXEC_STMT_WITH_OPEN_CURSOR';exports[1421]='ER_STMT_HAS_NO_OPEN_CURSOR';exports[1422]='ER_COMMIT_NOT_ALLOWED_IN_SF_OR_TRG';exports[1423]='ER_NO_DEFAULT_FOR_VIEW_FIELD';exports[1424]='ER_SP_NO_RECURSION';exports[1425]='ER_TOO_BIG_SCALE';exports[1426]='ER_TOO_BIG_PRECISION';exports[1427]='ER_M_BIGGER_THAN_D';exports[1428]='ER_WRONG_LOCK_OF_SYSTEM_TABLE';exports[1429]='ER_CONNECT_TO_FOREIGN_DATA_SOURCE';exports[1430]='ER_QUERY_ON_FOREIGN_DATA_SOURCE';exports[1431]='ER_FOREIGN_DATA_SOURCE_DOESNT_EXIST';exports[1432]='ER_FOREIGN_DATA_STRING_INVALID_CANT_CREATE';exports[1433]='ER_FOREIGN_DATA_STRING_INVALID';exports[1434]='ER_CANT_CREATE_FEDERATED_TABLE';exports[1435]='ER_TRG_IN_WRONG_SCHEMA';exports[1436]='ER_STACK_OVERRUN_NEED_MORE';exports[1437]='ER_TOO_LONG_BODY';exports[1438]='ER_WARN_CANT_DROP_DEFAULT_KEYCACHE';exports[1439]='ER_TOO_BIG_DISPLAYWIDTH';exports[1440]='ER_XAER_DUPID';exports[1441]='ER_DATETIME_FUNCTION_OVERFLOW';exports[1442]='ER_CANT_UPDATE_USED_TABLE_IN_SF_OR_TRG';exports[1443]='ER_VIEW_PREVENT_UPDATE';exports[1444]='ER_PS_NO_RECURSION';exports[1445]='ER_SP_CANT_SET_AUTOCOMMIT';exports[1446]='ER_MALFORMED_DEFINER';exports[1447]='ER_VIEW_FRM_NO_USER';exports[1448]='ER_VIEW_OTHER_USER';exports[1449]='ER_NO_SUCH_USER';exports[1450]='ER_FORBID_SCHEMA_CHANGE';exports[1451]='ER_ROW_IS_REFERENCED_2';exports[1452]='ER_NO_REFERENCED_ROW_2';exports[1453]='ER_SP_BAD_VAR_SHADOW';exports[1454]='ER_TRG_NO_DEFINER';exports[1455]='ER_OLD_FILE_FORMAT';exports[1456]='ER_SP_RECURSION_LIMIT';exports[1457]='ER_SP_PROC_TABLE_CORRUPT';exports[1458]='ER_SP_WRONG_NAME';exports[1459]='ER_TABLE_NEEDS_UPGRADE';exports[1460]='ER_SP_NO_AGGREGATE';exports[1461]='ER_MAX_PREPARED_STMT_COUNT_REACHED';exports[1462]='ER_VIEW_RECURSIVE';exports[1463]='ER_NON_GROUPING_FIELD_USED';exports[1464]='ER_TABLE_CANT_HANDLE_SPKEYS';exports[1465]='ER_NO_TRIGGERS_ON_SYSTEM_SCHEMA';exports[1466]='ER_REMOVED_SPACES';exports[1467]='ER_AUTOINC_READ_FAILED';exports[1468]='ER_USERNAME';exports[1469]='ER_HOSTNAME';exports[1470]='ER_WRONG_STRING_LENGTH';exports[1471]='ER_NON_INSERTABLE_TABLE';exports[1472]='ER_ADMIN_WRONG_MRG_TABLE';exports[1473]='ER_TOO_HIGH_LEVEL_OF_NESTING_FOR_SELECT';exports[1474]='ER_NAME_BECOMES_EMPTY';exports[1475]='ER_AMBIGUOUS_FIELD_TERM';exports[1476]='ER_FOREIGN_SERVER_EXISTS';exports[1477]='ER_FOREIGN_SERVER_DOESNT_EXIST';exports[1478]='ER_ILLEGAL_HA_CREATE_OPTION';exports[1479]='ER_PARTITION_REQUIRES_VALUES_ERROR';exports[1480]='ER_PARTITION_WRONG_VALUES_ERROR';exports[1481]='ER_PARTITION_MAXVALUE_ERROR';exports[1482]='ER_PARTITION_SUBPARTITION_ERROR';exports[1483]='ER_PARTITION_SUBPART_MIX_ERROR';exports[1484]='ER_PARTITION_WRONG_NO_PART_ERROR';exports[1485]='ER_PARTITION_WRONG_NO_SUBPART_ERROR';exports[1486]='ER_WRONG_EXPR_IN_PARTITION_FUNC_ERROR';exports[1487]='ER_NO_CONST_EXPR_IN_RANGE_OR_LIST_ERROR';exports[1488]='ER_FIELD_NOT_FOUND_PART_ERROR';exports[1489]='ER_LIST_OF_FIELDS_ONLY_IN_HASH_ERROR';exports[1490]='ER_INCONSISTENT_PARTITION_INFO_ERROR';exports[1491]='ER_PARTITION_FUNC_NOT_ALLOWED_ERROR';exports[1492]='ER_PARTITIONS_MUST_BE_DEFINED_ERROR';exports[1493]='ER_RANGE_NOT_INCREASING_ERROR';exports[1494]='ER_INCONSISTENT_TYPE_OF_FUNCTIONS_ERROR';exports[1495]='ER_MULTIPLE_DEF_CONST_IN_LIST_PART_ERROR';exports[1496]='ER_PARTITION_ENTRY_ERROR';exports[1497]='ER_MIX_HANDLER_ERROR';exports[1498]='ER_PARTITION_NOT_DEFINED_ERROR';exports[1499]='ER_TOO_MANY_PARTITIONS_ERROR';exports[1500]='ER_SUBPARTITION_ERROR';exports[1501]='ER_CANT_CREATE_HANDLER_FILE';exports[1502]='ER_BLOB_FIELD_IN_PART_FUNC_ERROR';exports[1503]='ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF';exports[1504]='ER_NO_PARTS_ERROR';exports[1505]='ER_PARTITION_MGMT_ON_NONPARTITIONED';exports[1506]='ER_FOREIGN_KEY_ON_PARTITIONED';exports[1507]='ER_DROP_PARTITION_NON_EXISTENT';exports[1508]='ER_DROP_LAST_PARTITION';exports[1509]='ER_COALESCE_ONLY_ON_HASH_PARTITION';exports[1510]='ER_REORG_HASH_ONLY_ON_SAME_NO';exports[1511]='ER_REORG_NO_PARAM_ERROR';exports[1512]='ER_ONLY_ON_RANGE_LIST_PARTITION';exports[1513]='ER_ADD_PARTITION_SUBPART_ERROR';exports[1514]='ER_ADD_PARTITION_NO_NEW_PARTITION';exports[1515]='ER_COALESCE_PARTITION_NO_PARTITION';exports[1516]='ER_REORG_PARTITION_NOT_EXIST';exports[1517]='ER_SAME_NAME_PARTITION';exports[1518]='ER_NO_BINLOG_ERROR';exports[1519]='ER_CONSECUTIVE_REORG_PARTITIONS';exports[1520]='ER_REORG_OUTSIDE_RANGE';exports[1521]='ER_PARTITION_FUNCTION_FAILURE';exports[1522]='ER_PART_STATE_ERROR';exports[1523]='ER_LIMITED_PART_RANGE';exports[1524]='ER_PLUGIN_IS_NOT_LOADED';exports[1525]='ER_WRONG_VALUE';exports[1526]='ER_NO_PARTITION_FOR_GIVEN_VALUE';exports[1527]='ER_FILEGROUP_OPTION_ONLY_ONCE';exports[1528]='ER_CREATE_FILEGROUP_FAILED';exports[1529]='ER_DROP_FILEGROUP_FAILED';exports[1530]='ER_TABLESPACE_AUTO_EXTEND_ERROR';exports[1531]='ER_WRONG_SIZE_NUMBER';exports[1532]='ER_SIZE_OVERFLOW_ERROR';exports[1533]='ER_ALTER_FILEGROUP_FAILED';exports[1534]='ER_BINLOG_ROW_LOGGING_FAILED';exports[1535]='ER_BINLOG_ROW_WRONG_TABLE_DEF';exports[1536]='ER_BINLOG_ROW_RBR_TO_SBR';exports[1537]='ER_EVENT_ALREADY_EXISTS';exports[1538]='ER_EVENT_STORE_FAILED';exports[1539]='ER_EVENT_DOES_NOT_EXIST';exports[1540]='ER_EVENT_CANT_ALTER';exports[1541]='ER_EVENT_DROP_FAILED';exports[1542]='ER_EVENT_INTERVAL_NOT_POSITIVE_OR_TOO_BIG';exports[1543]='ER_EVENT_ENDS_BEFORE_STARTS';exports[1544]='ER_EVENT_EXEC_TIME_IN_THE_PAST';exports[1545]='ER_EVENT_OPEN_TABLE_FAILED';exports[1546]='ER_EVENT_NEITHER_M_EXPR_NOR_M_AT';exports[1547]='ER_COL_COUNT_DOESNT_MATCH_CORRUPTED';exports[1548]='ER_CANNOT_LOAD_FROM_TABLE';exports[1549]='ER_EVENT_CANNOT_DELETE';exports[1550]='ER_EVENT_COMPILE_ERROR';exports[1551]='ER_EVENT_SAME_NAME';exports[1552]='ER_EVENT_DATA_TOO_LONG';exports[1553]='ER_DROP_INDEX_FK';exports[1554]='ER_WARN_DEPRECATED_SYNTAX_WITH_VER';exports[1555]='ER_CANT_WRITE_LOCK_LOG_TABLE';exports[1556]='ER_CANT_LOCK_LOG_TABLE';exports[1557]='ER_FOREIGN_DUPLICATE_KEY';exports[1558]='ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE';exports[1559]='ER_TEMP_TABLE_PREVENTS_SWITCH_OUT_OF_RBR';exports[1560]='ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_FORMAT';exports[1561]='ER_NDB_CANT_SWITCH_BINLOG_FORMAT';exports[1562]='ER_PARTITION_NO_TEMPORARY';exports[1563]='ER_PARTITION_CONST_DOMAIN_ERROR';exports[1564]='ER_PARTITION_FUNCTION_IS_NOT_ALLOWED';exports[1565]='ER_DDL_LOG_ERROR';exports[1566]='ER_NULL_IN_VALUES_LESS_THAN';exports[1567]='ER_WRONG_PARTITION_NAME';exports[1568]='ER_CANT_CHANGE_TX_CHARACTERISTICS';exports[1569]='ER_DUP_ENTRY_AUTOINCREMENT_CASE';exports[1570]='ER_EVENT_MODIFY_QUEUE_ERROR';exports[1571]='ER_EVENT_SET_VAR_ERROR';exports[1572]='ER_PARTITION_MERGE_ERROR';exports[1573]='ER_CANT_ACTIVATE_LOG';exports[1574]='ER_RBR_NOT_AVAILABLE';exports[1575]='ER_BASE64_DECODE_ERROR';exports[1576]='ER_EVENT_RECURSION_FORBIDDEN';exports[1577]='ER_EVENTS_DB_ERROR';exports[1578]='ER_ONLY_INTEGERS_ALLOWED';exports[1579]='ER_UNSUPORTED_LOG_ENGINE';exports[1580]='ER_BAD_LOG_STATEMENT';exports[1581]='ER_CANT_RENAME_LOG_TABLE';exports[1582]='ER_WRONG_PARAMCOUNT_TO_NATIVE_FCT';exports[1583]='ER_WRONG_PARAMETERS_TO_NATIVE_FCT';exports[1584]='ER_WRONG_PARAMETERS_TO_STORED_FCT';exports[1585]='ER_NATIVE_FCT_NAME_COLLISION';exports[1586]='ER_DUP_ENTRY_WITH_KEY_NAME';exports[1587]='ER_BINLOG_PURGE_EMFILE';exports[1588]='ER_EVENT_CANNOT_CREATE_IN_THE_PAST';exports[1589]='ER_EVENT_CANNOT_ALTER_IN_THE_PAST';exports[1590]='ER_SLAVE_INCIDENT';exports[1591]='ER_NO_PARTITION_FOR_GIVEN_VALUE_SILENT';exports[1592]='ER_BINLOG_UNSAFE_STATEMENT';exports[1593]='ER_SLAVE_FATAL_ERROR';exports[1594]='ER_SLAVE_RELAY_LOG_READ_FAILURE';exports[1595]='ER_SLAVE_RELAY_LOG_WRITE_FAILURE';exports[1596]='ER_SLAVE_CREATE_EVENT_FAILURE';exports[1597]='ER_SLAVE_MASTER_COM_FAILURE';exports[1598]='ER_BINLOG_LOGGING_IMPOSSIBLE';exports[1599]='ER_VIEW_NO_CREATION_CTX';exports[1600]='ER_VIEW_INVALID_CREATION_CTX';exports[1601]='ER_SR_INVALID_CREATION_CTX';exports[1602]='ER_TRG_CORRUPTED_FILE';exports[1603]='ER_TRG_NO_CREATION_CTX';exports[1604]='ER_TRG_INVALID_CREATION_CTX';exports[1605]='ER_EVENT_INVALID_CREATION_CTX';exports[1606]='ER_TRG_CANT_OPEN_TABLE';exports[1607]='ER_CANT_CREATE_SROUTINE';exports[1608]='ER_NEVER_USED';exports[1609]='ER_NO_FORMAT_DESCRIPTION_EVENT_BEFORE_BINLOG_STATEMENT';exports[1610]='ER_SLAVE_CORRUPT_EVENT';exports[1611]='ER_LOAD_DATA_INVALID_COLUMN';exports[1612]='ER_LOG_PURGE_NO_FILE';exports[1613]='ER_XA_RBTIMEOUT';exports[1614]='ER_XA_RBDEADLOCK';exports[1615]='ER_NEED_REPREPARE';exports[1616]='ER_DELAYED_NOT_SUPPORTED';exports[1617]='WARN_NO_MASTER_INFO';exports[1618]='WARN_OPTION_IGNORED';exports[1619]='WARN_PLUGIN_DELETE_BUILTIN';exports[1620]='WARN_PLUGIN_BUSY';exports[1621]='ER_VARIABLE_IS_READONLY';exports[1622]='ER_WARN_ENGINE_TRANSACTION_ROLLBACK';exports[1623]='ER_SLAVE_HEARTBEAT_FAILURE';exports[1624]='ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE';exports[1625]='ER_NDB_REPLICATION_SCHEMA_ERROR';exports[1626]='ER_CONFLICT_FN_PARSE_ERROR';exports[1627]='ER_EXCEPTIONS_WRITE_ERROR';exports[1628]='ER_TOO_LONG_TABLE_COMMENT';exports[1629]='ER_TOO_LONG_FIELD_COMMENT';exports[1630]='ER_FUNC_INEXISTENT_NAME_COLLISION';exports[1631]='ER_DATABASE_NAME';exports[1632]='ER_TABLE_NAME';exports[1633]='ER_PARTITION_NAME';exports[1634]='ER_SUBPARTITION_NAME';exports[1635]='ER_TEMPORARY_NAME';exports[1636]='ER_RENAMED_NAME';exports[1637]='ER_TOO_MANY_CONCURRENT_TRXS';exports[1638]='WARN_NON_ASCII_SEPARATOR_NOT_IMPLEMENTED';exports[1639]='ER_DEBUG_SYNC_TIMEOUT';exports[1640]='ER_DEBUG_SYNC_HIT_LIMIT';exports[1641]='ER_DUP_SIGNAL_SET';exports[1642]='ER_SIGNAL_WARN';exports[1643]='ER_SIGNAL_NOT_FOUND';exports[1644]='ER_SIGNAL_EXCEPTION';exports[1645]='ER_RESIGNAL_WITHOUT_ACTIVE_HANDLER';exports[1646]='ER_SIGNAL_BAD_CONDITION_TYPE';exports[1647]='WARN_COND_ITEM_TRUNCATED';exports[1648]='ER_COND_ITEM_TOO_LONG';exports[1649]='ER_UNKNOWN_LOCALE';exports[1650]='ER_SLAVE_IGNORE_SERVER_IDS';exports[1651]='ER_QUERY_CACHE_DISABLED';exports[1652]='ER_SAME_NAME_PARTITION_FIELD';exports[1653]='ER_PARTITION_COLUMN_LIST_ERROR';exports[1654]='ER_WRONG_TYPE_COLUMN_VALUE_ERROR';exports[1655]='ER_TOO_MANY_PARTITION_FUNC_FIELDS_ERROR';exports[1656]='ER_MAXVALUE_IN_VALUES_IN';exports[1657]='ER_TOO_MANY_VALUES_ERROR';exports[1658]='ER_ROW_SINGLE_PARTITION_FIELD_ERROR';exports[1659]='ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD';exports[1660]='ER_PARTITION_FIELDS_TOO_LONG';exports[1661]='ER_BINLOG_ROW_ENGINE_AND_STMT_ENGINE';exports[1662]='ER_BINLOG_ROW_MODE_AND_STMT_ENGINE';exports[1663]='ER_BINLOG_UNSAFE_AND_STMT_ENGINE';exports[1664]='ER_BINLOG_ROW_INJECTION_AND_STMT_ENGINE';exports[1665]='ER_BINLOG_STMT_MODE_AND_ROW_ENGINE';exports[1666]='ER_BINLOG_ROW_INJECTION_AND_STMT_MODE';exports[1667]='ER_BINLOG_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE';exports[1668]='ER_BINLOG_UNSAFE_LIMIT';exports[1669]='ER_BINLOG_UNSAFE_INSERT_DELAYED';exports[1670]='ER_BINLOG_UNSAFE_SYSTEM_TABLE';exports[1671]='ER_BINLOG_UNSAFE_AUTOINC_COLUMNS';exports[1672]='ER_BINLOG_UNSAFE_UDF';exports[1673]='ER_BINLOG_UNSAFE_SYSTEM_VARIABLE';exports[1674]='ER_BINLOG_UNSAFE_SYSTEM_FUNCTION';exports[1675]='ER_BINLOG_UNSAFE_NONTRANS_AFTER_TRANS';exports[1676]='ER_MESSAGE_AND_STATEMENT';exports[1677]='ER_SLAVE_CONVERSION_FAILED';exports[1678]='ER_SLAVE_CANT_CREATE_CONVERSION';exports[1679]='ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_FORMAT';exports[1680]='ER_PATH_LENGTH';exports[1681]='ER_WARN_DEPRECATED_SYNTAX_NO_REPLACEMENT';exports[1682]='ER_WRONG_NATIVE_TABLE_STRUCTURE';exports[1683]='ER_WRONG_PERFSCHEMA_USAGE';exports[1684]='ER_WARN_I_S_SKIPPED_TABLE';exports[1685]='ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_BINLOG_DIRECT';exports[1686]='ER_STORED_FUNCTION_PREVENTS_SWITCH_BINLOG_DIRECT';exports[1687]='ER_SPATIAL_MUST_HAVE_GEOM_COL';exports[1688]='ER_TOO_LONG_INDEX_COMMENT';exports[1689]='ER_LOCK_ABORTED';exports[1690]='ER_DATA_OUT_OF_RANGE';exports[1691]='ER_WRONG_SPVAR_TYPE_IN_LIMIT';exports[1692]='ER_BINLOG_UNSAFE_MULTIPLE_ENGINES_AND_SELF_LOGGING_ENGINE';exports[1693]='ER_BINLOG_UNSAFE_MIXED_STATEMENT';exports[1694]='ER_INSIDE_TRANSACTION_PREVENTS_SWITCH_SQL_LOG_BIN';exports[1695]='ER_STORED_FUNCTION_PREVENTS_SWITCH_SQL_LOG_BIN';exports[1696]='ER_FAILED_READ_FROM_PAR_FILE';exports[1697]='ER_VALUES_IS_NOT_INT_TYPE_ERROR';exports[1698]='ER_ACCESS_DENIED_NO_PASSWORD_ERROR';exports[1699]='ER_SET_PASSWORD_AUTH_PLUGIN';exports[1700]='ER_GRANT_PLUGIN_USER_EXISTS';exports[1701]='ER_TRUNCATE_ILLEGAL_FK';exports[1702]='ER_PLUGIN_IS_PERMANENT';exports[1703]='ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MIN';exports[1704]='ER_SLAVE_HEARTBEAT_VALUE_OUT_OF_RANGE_MAX';exports[1705]='ER_STMT_CACHE_FULL';exports[1706]='ER_MULTI_UPDATE_KEY_CONFLICT';exports[1707]='ER_TABLE_NEEDS_REBUILD';exports[1708]='WARN_OPTION_BELOW_LIMIT';exports[1709]='ER_INDEX_COLUMN_TOO_LONG';exports[1710]='ER_ERROR_IN_TRIGGER_BODY';exports[1711]='ER_ERROR_IN_UNKNOWN_TRIGGER_BODY';exports[1712]='ER_INDEX_CORRUPT';exports[1713]='ER_UNDO_RECORD_TOO_BIG';exports[1714]='ER_BINLOG_UNSAFE_INSERT_IGNORE_SELECT';exports[1715]='ER_BINLOG_UNSAFE_INSERT_SELECT_UPDATE';exports[1716]='ER_BINLOG_UNSAFE_REPLACE_SELECT';exports[1717]='ER_BINLOG_UNSAFE_CREATE_IGNORE_SELECT';exports[1718]='ER_BINLOG_UNSAFE_CREATE_REPLACE_SELECT';exports[1719]='ER_BINLOG_UNSAFE_UPDATE_IGNORE';exports[1720]='ER_PLUGIN_NO_UNINSTALL';exports[1721]='ER_PLUGIN_NO_INSTALL';exports[1722]='ER_BINLOG_UNSAFE_WRITE_AUTOINC_SELECT';exports[1723]='ER_BINLOG_UNSAFE_CREATE_SELECT_AUTOINC';exports[1724]='ER_BINLOG_UNSAFE_INSERT_TWO_KEYS';exports[1725]='ER_TABLE_IN_FK_CHECK';exports[1726]='ER_UNSUPPORTED_ENGINE';exports[1727]='ER_BINLOG_UNSAFE_AUTOINC_NOT_FIRST';exports[1728]='ER_CANNOT_LOAD_FROM_TABLE_V2';exports[1729]='ER_MASTER_DELAY_VALUE_OUT_OF_RANGE';exports[1730]='ER_ONLY_FD_AND_RBR_EVENTS_ALLOWED_IN_BINLOG_STATEMENT';exports[1731]='ER_PARTITION_EXCHANGE_DIFFERENT_OPTION';exports[1732]='ER_PARTITION_EXCHANGE_PART_TABLE';exports[1733]='ER_PARTITION_EXCHANGE_TEMP_TABLE';exports[1734]='ER_PARTITION_INSTEAD_OF_SUBPARTITION';exports[1735]='ER_UNKNOWN_PARTITION';exports[1736]='ER_TABLES_DIFFERENT_METADATA';exports[1737]='ER_ROW_DOES_NOT_MATCH_PARTITION';exports[1738]='ER_BINLOG_CACHE_SIZE_GREATER_THAN_MAX';exports[1739]='ER_WARN_INDEX_NOT_APPLICABLE';exports[1740]='ER_PARTITION_EXCHANGE_FOREIGN_KEY';exports[1741]='ER_NO_SUCH_KEY_VALUE';exports[1742]='ER_RPL_INFO_DATA_TOO_LONG';exports[1743]='ER_NETWORK_READ_EVENT_CHECKSUM_FAILURE';exports[1744]='ER_BINLOG_READ_EVENT_CHECKSUM_FAILURE';exports[1745]='ER_BINLOG_STMT_CACHE_SIZE_GREATER_THAN_MAX';exports[1746]='ER_CANT_UPDATE_TABLE_IN_CREATE_TABLE_SELECT';exports[1747]='ER_PARTITION_CLAUSE_ON_NONPARTITIONED';exports[1748]='ER_ROW_DOES_NOT_MATCH_GIVEN_PARTITION_SET';exports[1749]='ER_NO_SUCH_PARTITION';exports[1750]='ER_CHANGE_RPL_INFO_REPOSITORY_FAILURE';exports[1751]='ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_CREATED_TEMP_TABLE';exports[1752]='ER_WARNING_NOT_COMPLETE_ROLLBACK_WITH_DROPPED_TEMP_TABLE';exports[1753]='ER_MTS_FEATURE_IS_NOT_SUPPORTED';exports[1754]='ER_MTS_UPDATED_DBS_GREATER_MAX';exports[1755]='ER_MTS_CANT_PARALLEL';exports[1756]='ER_MTS_INCONSISTENT_DATA';exports[1757]='ER_FULLTEXT_NOT_SUPPORTED_WITH_PARTITIONING';exports[1758]='ER_DA_INVALID_CONDITION_NUMBER';exports[1759]='ER_INSECURE_PLAIN_TEXT';exports[1760]='ER_INSECURE_CHANGE_MASTER';exports[1761]='ER_FOREIGN_DUPLICATE_KEY_WITH_CHILD_INFO';exports[1762]='ER_FOREIGN_DUPLICATE_KEY_WITHOUT_CHILD_INFO';exports[1763]='ER_SQLTHREAD_WITH_SECURE_SLAVE';exports[1764]='ER_TABLE_HAS_NO_FT';exports[1765]='ER_VARIABLE_NOT_SETTABLE_IN_SF_OR_TRIGGER';exports[1766]='ER_VARIABLE_NOT_SETTABLE_IN_TRANSACTION';exports[1767]='ER_GTID_NEXT_IS_NOT_IN_GTID_NEXT_LIST';exports[1768]='ER_CANT_CHANGE_GTID_NEXT_IN_TRANSACTION_WHEN_GTID_NEXT_LIST_IS_NULL';exports[1769]='ER_SET_STATEMENT_CANNOT_INVOKE_FUNCTION';exports[1770]='ER_GTID_NEXT_CANT_BE_AUTOMATIC_IF_GTID_NEXT_LIST_IS_NON_NULL';exports[1771]='ER_SKIPPING_LOGGED_TRANSACTION';exports[1772]='ER_MALFORMED_GTID_SET_SPECIFICATION';exports[1773]='ER_MALFORMED_GTID_SET_ENCODING';exports[1774]='ER_MALFORMED_GTID_SPECIFICATION';exports[1775]='ER_GNO_EXHAUSTED';exports[1776]='ER_BAD_SLAVE_AUTO_POSITION';exports[1777]='ER_AUTO_POSITION_REQUIRES_GTID_MODE_ON';exports[1778]='ER_CANT_DO_IMPLICIT_COMMIT_IN_TRX_WHEN_GTID_NEXT_IS_SET';exports[1779]='ER_GTID_MODE_2_OR_3_REQUIRES_ENFORCE_GTID_CONSISTENCY_ON';exports[1780]='ER_GTID_MODE_REQUIRES_BINLOG';exports[1781]='ER_CANT_SET_GTID_NEXT_TO_GTID_WHEN_GTID_MODE_IS_OFF';exports[1782]='ER_CANT_SET_GTID_NEXT_TO_ANONYMOUS_WHEN_GTID_MODE_IS_ON';exports[1783]='ER_CANT_SET_GTID_NEXT_LIST_TO_NON_NULL_WHEN_GTID_MODE_IS_OFF';exports[1784]='ER_FOUND_GTID_EVENT_WHEN_GTID_MODE_IS_OFF';exports[1785]='ER_GTID_UNSAFE_NON_TRANSACTIONAL_TABLE';exports[1786]='ER_GTID_UNSAFE_CREATE_SELECT';exports[1787]='ER_GTID_UNSAFE_CREATE_DROP_TEMPORARY_TABLE_IN_TRANSACTION';exports[1788]='ER_GTID_MODE_CAN_ONLY_CHANGE_ONE_STEP_AT_A_TIME';exports[1789]='ER_MASTER_HAS_PURGED_REQUIRED_GTIDS';exports[1790]='ER_CANT_SET_GTID_NEXT_WHEN_OWNING_GTID';exports[1791]='ER_UNKNOWN_EXPLAIN_FORMAT';exports[1792]='ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION';exports[1793]='ER_TOO_LONG_TABLE_PARTITION_COMMENT';exports[1794]='ER_SLAVE_CONFIGURATION';exports[1795]='ER_INNODB_FT_LIMIT';exports[1796]='ER_INNODB_NO_FT_TEMP_TABLE';exports[1797]='ER_INNODB_FT_WRONG_DOCID_COLUMN';exports[1798]='ER_INNODB_FT_WRONG_DOCID_INDEX';exports[1799]='ER_INNODB_ONLINE_LOG_TOO_BIG';exports[1800]='ER_UNKNOWN_ALTER_ALGORITHM';exports[1801]='ER_UNKNOWN_ALTER_LOCK';exports[1802]='ER_MTS_CHANGE_MASTER_CANT_RUN_WITH_GAPS';exports[1803]='ER_MTS_RECOVERY_FAILURE';exports[1804]='ER_MTS_RESET_WORKERS';exports[1805]='ER_COL_COUNT_DOESNT_MATCH_CORRUPTED_V2';exports[1806]='ER_SLAVE_SILENT_RETRY_TRANSACTION';exports[1807]='ER_DISCARD_FK_CHECKS_RUNNING';exports[1808]='ER_TABLE_SCHEMA_MISMATCH';exports[1809]='ER_TABLE_IN_SYSTEM_TABLESPACE';exports[1810]='ER_IO_READ_ERROR';exports[1811]='ER_IO_WRITE_ERROR';exports[1812]='ER_TABLESPACE_MISSING';exports[1813]='ER_TABLESPACE_EXISTS';exports[1814]='ER_TABLESPACE_DISCARDED';exports[1815]='ER_INTERNAL_ERROR';exports[1816]='ER_INNODB_IMPORT_ERROR';exports[1817]='ER_INNODB_INDEX_CORRUPT';exports[1818]='ER_INVALID_YEAR_COLUMN_LENGTH';exports[1819]='ER_NOT_VALID_PASSWORD';exports[1820]='ER_MUST_CHANGE_PASSWORD';exports[1821]='ER_FK_NO_INDEX_CHILD';exports[1822]='ER_FK_NO_INDEX_PARENT';exports[1823]='ER_FK_FAIL_ADD_SYSTEM';exports[1824]='ER_FK_CANNOT_OPEN_PARENT';exports[1825]='ER_FK_INCORRECT_OPTION';exports[1826]='ER_FK_DUP_NAME';exports[1827]='ER_PASSWORD_FORMAT';exports[1828]='ER_FK_COLUMN_CANNOT_DROP';exports[1829]='ER_FK_COLUMN_CANNOT_DROP_CHILD';exports[1830]='ER_FK_COLUMN_NOT_NULL';exports[1831]='ER_DUP_INDEX';exports[1832]='ER_FK_COLUMN_CANNOT_CHANGE';exports[1833]='ER_FK_COLUMN_CANNOT_CHANGE_CHILD';exports[1834]='ER_FK_CANNOT_DELETE_PARENT';exports[1835]='ER_MALFORMED_PACKET';exports[1836]='ER_READ_ONLY_MODE';exports[1837]='ER_GTID_NEXT_TYPE_UNDEFINED_GROUP';exports[1838]='ER_VARIABLE_NOT_SETTABLE_IN_SP';exports[1839]='ER_CANT_SET_GTID_PURGED_WHEN_GTID_MODE_IS_OFF';exports[1840]='ER_CANT_SET_GTID_PURGED_WHEN_GTID_EXECUTED_IS_NOT_EMPTY';exports[1841]='ER_CANT_SET_GTID_PURGED_WHEN_OWNED_GTIDS_IS_NOT_EMPTY';exports[1842]='ER_GTID_PURGED_WAS_CHANGED';exports[1843]='ER_GTID_EXECUTED_WAS_CHANGED';exports[1844]='ER_BINLOG_STMT_MODE_AND_NO_REPL_TABLES';exports[1845]='ER_ALTER_OPERATION_NOT_SUPPORTED';exports[1846]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON';exports[1847]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COPY';exports[1848]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_PARTITION';exports[1849]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_RENAME';exports[1850]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_COLUMN_TYPE';exports[1851]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FK_CHECK';exports[1852]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_IGNORE';exports[1853]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOPK';exports[1854]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_AUTOINC';exports[1855]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_HIDDEN_FTS';exports[1856]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_CHANGE_FTS';exports[1857]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_FTS';exports[1858]='ER_SQL_SLAVE_SKIP_COUNTER_NOT_SETTABLE_IN_GTID_MODE';exports[1859]='ER_DUP_UNKNOWN_IN_INDEX';exports[1860]='ER_IDENT_CAUSES_TOO_LONG_PATH';exports[1861]='ER_ALTER_OPERATION_NOT_SUPPORTED_REASON_NOT_NULL';exports[1862]='ER_MUST_CHANGE_PASSWORD_LOGIN';exports[1863]='ER_ROW_IN_WRONG_PARTITION';exports[1864]='ER_MTS_EVENT_BIGGER_PENDING_JOBS_SIZE_MAX';exports[1865]='ER_INNODB_NO_FT_USES_PARSER';exports[1866]='ER_BINLOG_LOGICAL_CORRUPTION';exports[1867]='ER_WARN_PURGE_LOG_IN_USE';exports[1868]='ER_WARN_PURGE_LOG_IS_ACTIVE';exports[1869]='ER_AUTO_INCREMENT_CONFLICT';exports[1870]='WARN_ON_BLOCKHOLE_IN_RBR';exports[1871]='ER_SLAVE_MI_INIT_REPOSITORY';exports[1872]='ER_SLAVE_RLI_INIT_REPOSITORY';exports[1873]='ER_ACCESS_DENIED_CHANGE_USER_ERROR';exports[1874]='ER_INNODB_READ_ONLY';exports[1875]='ER_STOP_SLAVE_SQL_THREAD_TIMEOUT';exports[1876]='ER_STOP_SLAVE_IO_THREAD_TIMEOUT';exports[1877]='ER_TABLE_CORRUPT';exports[1878]='ER_TEMP_FILE_WRITE_FAILURE';exports[1879]='ER_INNODB_FT_AUX_NOT_HEX_ID';exports[1880]='ER_OLD_TEMPORALS_UPGRADED';exports[1881]='ER_INNODB_FORCED_RECOVERY';exports[1882]='ER_AES_INVALID_IV';

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var Buffer = __webpack_require__(21).Buffer;
	var Crypto = __webpack_require__(60);
	var Auth = exports;

	function sha1(msg) {
	  var hash = Crypto.createHash('sha1');
	  hash.update(msg, 'binary');
	  return hash.digest('binary');
	}
	Auth.sha1 = sha1;

	function xor(a, b) {
	  a = new Buffer(a, 'binary');
	  b = new Buffer(b, 'binary');
	  var result = new Buffer(a.length);
	  for (var i = 0; i < a.length; i++) {
	    result[i] = a[i] ^ b[i];
	  }
	  return result;
	};
	Auth.xor = xor;

	Auth.token = function (password, scramble) {
	  if (!password) {
	    return new Buffer(0);
	  }

	  // password must be in binary format, not utf8
	  var stage1 = sha1(new Buffer(password, "utf8").toString("binary"));
	  var stage2 = sha1(stage1);
	  var stage3 = sha1(scramble.toString('binary') + stage2);
	  return xor(stage3, stage1);
	};

	// This is a port of sql/password.c:hash_password which needs to be used for
	// pre-4.1 passwords.
	Auth.hashPassword = function (password) {
	  var nr = [0x5030, 0x5735],
	      add = 7,
	      nr2 = [0x1234, 0x5671],
	      result = new Buffer(8);

	  if (typeof password == 'string') {
	    password = new Buffer(password);
	  }

	  for (var i = 0; i < password.length; i++) {
	    var c = password[i];
	    if (c == 32 || c == 9) {
	      // skip space in password
	      continue;
	    }

	    // nr^= (((nr & 63)+add)*c)+ (nr << 8);
	    // nr = xor(nr, add(mul(add(and(nr, 63), add), c), shl(nr, 8)))
	    nr = this.xor32(nr, this.add32(this.mul32(this.add32(this.and32(nr, [0, 63]), [0, add]), [0, c]), this.shl32(nr, 8)));

	    // nr2+=(nr2 << 8) ^ nr;
	    // nr2 = add(nr2, xor(shl(nr2, 8), nr))
	    nr2 = this.add32(nr2, this.xor32(this.shl32(nr2, 8), nr));

	    // add+=tmp;
	    add += c;
	  }

	  this.int31Write(result, nr, 0);
	  this.int31Write(result, nr2, 4);

	  return result;
	};

	Auth.randomInit = function (seed1, seed2) {
	  return {
	    max_value: 0x3FFFFFFF,
	    max_value_dbl: 0x3FFFFFFF,
	    seed1: seed1 % 0x3FFFFFFF,
	    seed2: seed2 % 0x3FFFFFFF
	  };
	};

	Auth.myRnd = function (r) {
	  r.seed1 = (r.seed1 * 3 + r.seed2) % r.max_value;
	  r.seed2 = (r.seed1 + r.seed2 + 33) % r.max_value;

	  return r.seed1 / r.max_value_dbl;
	};

	Auth.scramble323 = function (message, password) {
	  var to = new Buffer(8),
	      hashPass = this.hashPassword(password),
	      hashMessage = this.hashPassword(message.slice(0, 8)),
	      seed1 = this.int32Read(hashPass, 0) ^ this.int32Read(hashMessage, 0),
	      seed2 = this.int32Read(hashPass, 4) ^ this.int32Read(hashMessage, 4),
	      r = this.randomInit(seed1, seed2);

	  for (var i = 0; i < 8; i++) {
	    to[i] = Math.floor(this.myRnd(r) * 31) + 64;
	  }
	  var extra = Math.floor(this.myRnd(r) * 31);

	  for (var i = 0; i < 8; i++) {
	    to[i] ^= extra;
	  }

	  return to;
	};

	Auth.fmt32 = function (x) {
	  var a = x[0].toString(16),
	      b = x[1].toString(16);

	  if (a.length == 1) a = '000' + a;
	  if (a.length == 2) a = '00' + a;
	  if (a.length == 3) a = '0' + a;
	  if (b.length == 1) b = '000' + b;
	  if (b.length == 2) b = '00' + b;
	  if (b.length == 3) b = '0' + b;
	  return '' + a + '/' + b;
	};

	Auth.xor32 = function (a, b) {
	  return [a[0] ^ b[0], a[1] ^ b[1]];
	};

	Auth.add32 = function (a, b) {
	  var w1 = a[1] + b[1],
	      w2 = a[0] + b[0] + ((w1 & 0xFFFF0000) >> 16);

	  return [w2 & 0xFFFF, w1 & 0xFFFF];
	};

	Auth.mul32 = function (a, b) {
	  // based on this example of multiplying 32b ints using 16b
	  // http://www.dsprelated.com/showmessage/89790/1.php
	  var w1 = a[1] * b[1],
	      w2 = (a[1] * b[1] >> 16 & 0xFFFF) + (a[0] * b[1] & 0xFFFF) + (a[1] * b[0] & 0xFFFF);

	  return [w2 & 0xFFFF, w1 & 0xFFFF];
	};

	Auth.and32 = function (a, b) {
	  return [a[0] & b[0], a[1] & b[1]];
	};

	Auth.shl32 = function (a, b) {
	  // assume b is 16 or less
	  var w1 = a[1] << b,
	      w2 = a[0] << b | (w1 & 0xFFFF0000) >> 16;

	  return [w2 & 0xFFFF, w1 & 0xFFFF];
	};

	Auth.int31Write = function (buffer, number, offset) {
	  buffer[offset] = number[0] >> 8 & 0x7F;
	  buffer[offset + 1] = number[0] & 0xFF;
	  buffer[offset + 2] = number[1] >> 8 & 0xFF;
	  buffer[offset + 3] = number[1] & 0xFF;
	};

	Auth.int32Read = function (buffer, offset) {
	  return (buffer[offset] << 24) + (buffer[offset + 1] << 16) + (buffer[offset + 2] << 8) + buffer[offset + 3];
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);
	var Auth = __webpack_require__(109);
	var ClientConstants = __webpack_require__(76);

	module.exports = Handshake;
	Util.inherits(Handshake, Sequence);
	function Handshake(options, callback) {
	  Sequence.call(this, options, callback);

	  options = options || {};

	  this._config = options.config;
	  this._handshakeInitializationPacket = null;
	}

	Handshake.prototype.determinePacket = function (firstByte) {
	  if (firstByte === 0xff) {
	    return Packets.ErrorPacket;
	  }

	  if (!this._handshakeInitializationPacket) {
	    return Packets.HandshakeInitializationPacket;
	  }

	  if (firstByte === 0xfe) {
	    return Packets.UseOldPasswordPacket;
	  }
	};

	Handshake.prototype['HandshakeInitializationPacket'] = function (packet) {
	  this._handshakeInitializationPacket = packet;

	  this._config.protocol41 = packet.protocol41;

	  var serverSSLSupport = packet.serverCapabilities1 & ClientConstants.CLIENT_SSL;

	  if (this._config.ssl) {
	    if (!serverSSLSupport) {
	      var err = new Error('Server does not support secure connnection');

	      err.code = 'HANDSHAKE_NO_SSL_SUPPORT';
	      err.fatal = true;

	      this.end(err);
	      return;
	    }

	    this._config.clientFlags |= ClientConstants.CLIENT_SSL;
	    this.emit('packet', new Packets.SSLRequestPacket({
	      clientFlags: this._config.clientFlags,
	      maxPacketSize: this._config.maxPacketSize,
	      charsetNumber: this._config.charsetNumber
	    }));
	    this.emit('start-tls');
	  } else {
	    this._sendCredentials();
	  }
	};

	Handshake.prototype._tlsUpgradeCompleteHandler = function () {
	  this._sendCredentials();
	};

	Handshake.prototype._sendCredentials = function (serverHello) {
	  var packet = this._handshakeInitializationPacket;
	  this.emit('packet', new Packets.ClientAuthenticationPacket({
	    clientFlags: this._config.clientFlags,
	    maxPacketSize: this._config.maxPacketSize,
	    charsetNumber: this._config.charsetNumber,
	    user: this._config.user,
	    scrambleBuff: packet.protocol41 ? Auth.token(this._config.password, packet.scrambleBuff()) : Auth.scramble323(packet.scrambleBuff(), this._config.password),
	    database: this._config.database,
	    protocol41: packet.protocol41
	  }));
	};

	Handshake.prototype['UseOldPasswordPacket'] = function (packet) {
	  if (!this._config.insecureAuth) {
	    var err = new Error('MySQL server is requesting the old and insecure pre-4.1 auth mechanism.' + 'Upgrade the user password or use the {insecureAuth: true} option.');

	    err.code = 'HANDSHAKE_INSECURE_AUTH';
	    err.fatal = true;

	    this.end(err);
	    return;
	  }

	  this.emit('packet', new Packets.OldPasswordPacket({
	    scrambleBuff: Auth.scramble323(this._handshakeInitializationPacket.scrambleBuff(), this._config.password)
	  }));
	};

	Handshake.prototype['ErrorPacket'] = function (packet) {
	  var err = this._packetToError(packet, true);
	  err.fatal = true;
	  this.end(err);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);

	module.exports = Ping;
	Util.inherits(Ping, Sequence);

	function Ping(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  Sequence.call(this, options, callback);
	}

	Ping.prototype.start = function () {
	  this.emit('packet', new Packets.ComPingPacket());
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);
	var ResultSet = __webpack_require__(113);
	var ServerStatus = __webpack_require__(114);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Readable = __webpack_require__(115);

	module.exports = Query;
	Util.inherits(Query, Sequence);
	function Query(options, callback) {
	  Sequence.call(this, options, callback);

	  this.sql = options.sql;
	  this.values = options.values;
	  this.typeCast = options.typeCast === undefined ? true : options.typeCast;
	  this.nestTables = options.nestTables || false;

	  this._resultSet = null;
	  this._results = [];
	  this._fields = [];
	  this._index = 0;
	  this._loadError = null;
	}

	Query.prototype.start = function () {
	  this.emit('packet', new Packets.ComQueryPacket(this.sql));
	};

	Query.prototype.determinePacket = function (firstByte, parser) {
	  if (firstByte === 0) {
	    // If we have a resultSet and got one eofPacket
	    if (this._resultSet && this._resultSet.eofPackets.length === 1) {
	      // Then this is a RowDataPacket with an empty string in the first column.
	      // See: https://github.com/felixge/node-mysql/issues/222
	    } else if (this._resultSet && this._resultSet.resultSetHeaderPacket && this._resultSet.resultSetHeaderPacket.fieldCount !== null) {
	        return Packets.FieldPacket;
	      } else {
	        return;
	      }
	  }

	  if (firstByte === 255) {
	    return;
	  }

	  // EofPacket's are 5 bytes in mysql >= 4.1
	  // This is the only / best way to differentiate their firstByte from a 9
	  // byte length coded binary.
	  if (firstByte === 0xfe && parser.packetLength() < 9) {
	    return Packets.EofPacket;
	  }

	  if (!this._resultSet) {
	    return Packets.ResultSetHeaderPacket;
	  }

	  return this._resultSet.eofPackets.length === 0 ? Packets.FieldPacket : Packets.RowDataPacket;
	};

	Query.prototype['OkPacket'] = function (packet) {
	  // try...finally for exception safety
	  try {
	    if (!this._callback) {
	      this.emit('result', packet, this._index);
	    } else {
	      this._results.push(packet);
	      this._fields.push(undefined);
	    }
	  } finally {
	    this._index++;
	    this._resultSet = null;
	    this._handleFinalResultPacket(packet);
	  }
	};

	Query.prototype['ErrorPacket'] = function (packet) {
	  var err = this._packetToError(packet);

	  var results = this._results.length > 0 ? this._results : undefined;

	  var fields = this._fields.length > 0 ? this._fields : undefined;

	  err.index = this._index;
	  this.end(err, results, fields);
	};

	Query.prototype['ResultSetHeaderPacket'] = function (packet) {
	  this._resultSet = new ResultSet(packet);

	  // used by LOAD DATA LOCAL INFILE queries
	  if (packet.fieldCount === null) {
	    this._sendLocalDataFile(packet.extra);
	  }
	};

	Query.prototype['FieldPacket'] = function (packet) {
	  this._resultSet.fieldPackets.push(packet);
	};

	Query.prototype['EofPacket'] = function (packet) {
	  this._resultSet.eofPackets.push(packet);

	  if (this._resultSet.eofPackets.length === 1 && !this._callback) {
	    this.emit('fields', this._resultSet.fieldPackets, this._index);
	  }

	  if (this._resultSet.eofPackets.length !== 2) {
	    return;
	  }

	  if (this._callback) {
	    this._results.push(this._resultSet.rows);
	    this._fields.push(this._resultSet.fieldPackets);
	  }

	  this._index++;
	  this._resultSet = null;
	  this._handleFinalResultPacket(packet);
	};

	Query.prototype._handleFinalResultPacket = function (packet) {
	  if (packet.serverStatus & ServerStatus.SERVER_MORE_RESULTS_EXISTS) {
	    return;
	  }

	  var results = this._results.length > 1 ? this._results : this._results[0];

	  var fields = this._fields.length > 1 ? this._fields : this._fields[0];

	  this.end(this._loadError, results, fields);
	};

	Query.prototype['RowDataPacket'] = function (packet, parser, connection) {
	  packet.parse(parser, this._resultSet.fieldPackets, this.typeCast, this.nestTables, connection);

	  if (this._callback) {
	    this._resultSet.rows.push(packet);
	  } else {
	    this.emit('result', packet, this._index);
	  }
	};

	Query.prototype._sendLocalDataFile = function (path) {
	  var self = this;
	  var localStream = fs.createReadStream(path, {
	    'flag': 'r',
	    'encoding': null,
	    'autoClose': true
	  });

	  this.on('pause', function () {
	    localStream.pause();
	  });

	  this.on('resume', function () {
	    localStream.resume();
	  });

	  localStream.on('data', function (data) {
	    self.emit('packet', new Packets.LocalDataFilePacket(data));
	  });

	  localStream.on('error', function (err) {
	    self._loadError = err;
	    localStream.emit('end');
	  });

	  localStream.on('end', function () {
	    self.emit('packet', new Packets.EmptyPacket());
	  });
	};

	Query.prototype.stream = function (options) {
	  var self = this,
	      stream;

	  options = options || {};
	  options.objectMode = true;
	  stream = new Readable(options);

	  stream._read = function () {
	    self._connection && self._connection.resume();
	  };

	  this.on('result', function (row, i) {
	    if (!stream.push(row)) self._connection.pause();
	    stream.emit('result', row, i); // replicate old emitter
	  });

	  this.on('error', function (err) {
	    stream.emit('error', err); // Pass on any errors
	  });

	  this.on('end', function () {
	    stream.emit('close'); // notify readers that query has completed
	    stream.push(null); // pushing null, indicating EOF
	  });

	  this.on('fields', function (fields, i) {
	    stream.emit('fields', fields, i); // replicate old emitter
	  });

	  return stream;
	};

/***/ },
/* 113 */
/***/ function(module, exports) {

	module.exports = ResultSet;
	function ResultSet(resultSetHeaderPacket) {
	  this.resultSetHeaderPacket = resultSetHeaderPacket;
	  this.fieldPackets = [];
	  this.eofPackets = [];
	  this.rows = [];
	}

/***/ },
/* 114 */
/***/ function(module, exports) {

	// Manually extracted from mysql-5.5.23/include/mysql_com.h

	/**
	  Is raised when a multi-statement transaction
	  has been started, either explicitly, by means
	  of BEGIN or COMMIT AND CHAIN, or
	  implicitly, by the first transactional
	  statement, when autocommit=off.
	*/
	exports.SERVER_STATUS_IN_TRANS = 1;
	exports.SERVER_STATUS_AUTOCOMMIT = 2; /* Server in auto_commit mode */
	exports.SERVER_MORE_RESULTS_EXISTS = 8; /* Multi query - next query exists */
	exports.SERVER_QUERY_NO_GOOD_INDEX_USED = 16;
	exports.SERVER_QUERY_NO_INDEX_USED = 32;
	/**
	  The server was able to fulfill the clients request and opened a
	  read-only non-scrollable cursor for a query. This flag comes
	  in reply to COM_STMT_EXECUTE and COM_STMT_FETCH commands.
	*/
	exports.SERVER_STATUS_CURSOR_EXISTS = 64;
	/**
	  This flag is sent when a read-only cursor is exhausted, in reply to
	  COM_STMT_FETCH command.
	*/
	exports.SERVER_STATUS_LAST_ROW_SENT = 128;
	exports.SERVER_STATUS_DB_DROPPED = 256; /* A database was dropped */
	exports.SERVER_STATUS_NO_BACKSLASH_ESCAPES = 512;
	/**
	  Sent to the client if after a prepared statement reprepare
	  we discovered that the new statement returns a different 
	  number of result set columns.
	*/
	exports.SERVER_STATUS_METADATA_CHANGED = 1024;
	exports.SERVER_QUERY_WAS_SLOW = 2048;

	/**
	  To mark ResultSet containing output parameter values.
	*/
	exports.SERVER_PS_OUT_PARAMS = 4096;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(116);
	exports.Stream = __webpack_require__(16);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(122);
	exports.Duplex = __webpack_require__(121);
	exports.Transform = __webpack_require__(124);
	exports.PassThrough = __webpack_require__(125);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(117);
	/*</replacement>*/

	/*<replacement>*/
	var Buffer = __webpack_require__(21).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(10).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(16);

	/*<replacement>*/
	var util = __webpack_require__(118);
	util.inherits = __webpack_require__(119);
	/*</replacement>*/

	var StringDecoder;

	/*<replacement>*/
	var debug = __webpack_require__(120);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/

	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(121);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(123).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(121);

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended) onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding) chunk = state.decoder.write(chunk);

	      if (!addToFront) state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	        if (state.needReadable) emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(123).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended) return 0;

	  if (state.objectMode) return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length) return state.buffer[0].length;else return state.length;
	  }

	  if (n <= 0) return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark) state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading) n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended) state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0) endReadable(this);

	  if (!util.isNull(ret)) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) process.nextTick(function () {
	      emitReadable_(stream);
	    });else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function () {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause', src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error) dest.on('error', onerror);else if (isArray(dest._events.error)) dest._events.error.unshift(onerror);else dest._events.error = [onerror, dest._events.error];

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function () {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function () {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0) return null;

	  if (length === 0) ret = null;else if (objectMode) ret = list.shift();else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode) ret = list.join('');else ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode) ret = '';else ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode) ret += buf.slice(0, cpy);else buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length) list[0] = buf.slice(cpy);else list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function () {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return objectToString(e) === '[object Error]' || e instanceof Error;
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 119 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 120 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	};
	/*</replacement>*/

	/*<replacement>*/
	var util = __webpack_require__(118);
	util.inherits = __webpack_require__(119);
	/*</replacement>*/

	var Readable = __webpack_require__(116);
	var Writable = __webpack_require__(122);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function (method) {
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(21).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;

	/*<replacement>*/
	var util = __webpack_require__(118);
	util.inherits = __webpack_require__(119);
	/*</replacement>*/

	var Stream = __webpack_require__(16);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(121);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(121);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};

	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function () {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function () {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (!util.isFunction(cb)) cb = function () {};

	  if (state.ended) writeAfterEnd(this, state, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length) clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) state.buffer.push(new WriteReq(chunk, encoding, cb));else doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync) process.nextTick(function () {
	    state.pendingcb--;
	    cb(er);
	  });else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function () {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++) cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function (err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length) state.buffer = state.buffer.slice(c);else state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk)) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(stream, state) {
	  return state.ending && state.length === 0 && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(21).Buffer;

	var isBufferEncoding = Buffer.isEncoding || function (encoding) {
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function (encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function (buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function (buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = buffer.length >= 3 ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function (buffer) {
	  var res = '';
	  if (buffer && buffer.length) res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(121);

	/*<replacement>*/
	var util = __webpack_require__(118);
	util.inherits = __webpack_require__(119);
	/*</replacement>*/

	util.inherits(Transform, Duplex);

	function TransformState(options, stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data)) stream.push(data);

	  if (cb) cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function () {
	    if (util.isFunction(this._flush)) this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(124);

	/*<replacement>*/
	var util = __webpack_require__(118);
	util.inherits = __webpack_require__(119);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);

	module.exports = Quit;
	Util.inherits(Quit, Sequence);
	function Quit(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  Sequence.call(this, options, callback);
	}

	Quit.prototype.start = function () {
	  this.emit('packet', new Packets.ComQuitPacket());
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var Sequence = __webpack_require__(85);
	var Util = __webpack_require__(38);
	var Packets = __webpack_require__(86);

	module.exports = Statistics;
	Util.inherits(Statistics, Sequence);
	function Statistics(options, callback) {
	  if (!callback && typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  Sequence.call(this, options, callback);
	}

	Statistics.prototype.start = function () {
	  this.emit('packet', new Packets.ComStatisticsPacket());
	};

	Statistics.prototype['StatisticsPacket'] = function (packet) {
	  this.end(null, packet);
	};

	Statistics.prototype.determinePacket = function (firstByte, parser) {
	  if (firstByte === 0x55) {
	    return Packets.StatisticsPacket;
	  }
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(8).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128).setImmediate, __webpack_require__(128).clearImmediate))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var BIT_16 = Math.pow(2, 16);
	var BIT_24 = Math.pow(2, 24);
	// The maximum precision JS Numbers can hold precisely
	// Don't panic: Good enough to represent byte values up to 8192 TB
	var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);
	var MAX_PACKET_LENGTH = Math.pow(2, 24) - 1;

	module.exports = PacketWriter;
	function PacketWriter() {
	  this._buffer = new Buffer(0);
	  this._offset = 0;
	}

	PacketWriter.prototype.toBuffer = function (parser) {
	  var packets = Math.floor(this._buffer.length / MAX_PACKET_LENGTH) + 1;
	  var buffer = this._buffer;
	  this._buffer = new Buffer(this._buffer.length + packets * 4);

	  for (var packet = 0; packet < packets; packet++) {
	    this._offset = packet * (MAX_PACKET_LENGTH + 4);

	    var isLast = packet + 1 === packets;
	    var packetLength = isLast ? buffer.length % MAX_PACKET_LENGTH : MAX_PACKET_LENGTH;

	    var packetNumber = parser.incrementPacketNumber();

	    this.writeUnsignedNumber(3, packetLength);
	    this.writeUnsignedNumber(1, packetNumber);

	    var start = packet * MAX_PACKET_LENGTH;
	    var end = start + packetLength;

	    this.writeBuffer(buffer.slice(start, end));
	  }

	  return this._buffer;
	};

	PacketWriter.prototype.writeUnsignedNumber = function (bytes, value) {
	  this._allocate(bytes);

	  for (var i = 0; i < bytes; i++) {
	    this._buffer[this._offset++] = value >> i * 8 & 0xff;
	  }
	};

	PacketWriter.prototype.writeFiller = function (bytes) {
	  this._allocate(bytes);

	  for (var i = 0; i < bytes; i++) {
	    this._buffer[this._offset++] = 0x00;
	  }
	};

	PacketWriter.prototype.writeNullTerminatedString = function (value, encoding) {
	  // Typecast undefined into '' and numbers into strings
	  value = value || '';
	  value = value + '';

	  var bytes = Buffer.byteLength(value, encoding || 'utf-8') + 1;
	  this._allocate(bytes);

	  this._buffer.write(value, this._offset, encoding);
	  this._buffer[this._offset + bytes - 1] = 0x00;

	  this._offset += bytes;
	};

	PacketWriter.prototype.writeString = function (value) {
	  // Typecast undefined into '' and numbers into strings
	  value = value || '';
	  value = value + '';

	  var bytes = Buffer.byteLength(value, 'utf-8');
	  this._allocate(bytes);

	  this._buffer.write(value, this._offset, 'utf-8');

	  this._offset += bytes;
	};

	PacketWriter.prototype.writeBuffer = function (value) {
	  var bytes = value.length;

	  this._allocate(bytes);
	  value.copy(this._buffer, this._offset);
	  this._offset += bytes;
	};

	PacketWriter.prototype.writeLengthCodedNumber = function (value) {
	  if (value === null) {
	    this._allocate(1);
	    this._buffer[this._offset++] = 251;
	    return;
	  }

	  if (value <= 250) {
	    this._allocate(1);
	    this._buffer[this._offset++] = value;
	    return;
	  }

	  if (value > IEEE_754_BINARY_64_PRECISION) {
	    throw new Error('writeLengthCodedNumber: JS precision range exceeded, your ' + 'number is > 53 bit: "' + value + '"');
	  }

	  if (value <= BIT_16) {
	    this._allocate(3);
	    this._buffer[this._offset++] = 252;
	  } else if (value <= BIT_24) {
	    this._allocate(4);
	    this._buffer[this._offset++] = 253;
	  } else {
	    this._allocate(9);
	    this._buffer[this._offset++] = 254;
	  }

	  // 16 Bit
	  this._buffer[this._offset++] = value & 0xff;
	  this._buffer[this._offset++] = value >> 8 & 0xff;

	  if (value <= BIT_16) return;

	  // 24 Bit
	  this._buffer[this._offset++] = value >> 16 & 0xff;

	  if (value <= BIT_24) return;

	  this._buffer[this._offset++] = value >> 24 & 0xff;

	  // Hack: Get the most significant 32 bit (JS bitwise operators are 32 bit)
	  value = value.toString(2);
	  value = value.substr(0, value.length - 32);
	  value = parseInt(value, 2);

	  this._buffer[this._offset++] = value & 0xff;
	  this._buffer[this._offset++] = value >> 8 & 0xff;
	  this._buffer[this._offset++] = value >> 16 & 0xff;

	  // Set last byte to 0, as we can only support 53 bits in JS (see above)
	  this._buffer[this._offset++] = 0;
	};

	PacketWriter.prototype.writeLengthCodedBuffer = function (value) {
	  var bytes = value.length;
	  this.writeLengthCodedNumber(bytes);
	  this.writeBuffer(value);
	};

	PacketWriter.prototype.writeNullTerminatedBuffer = function (value) {
	  this.writeBuffer(value);
	  this.writeFiller(1); // 0x00 terminator
	};

	PacketWriter.prototype.writeLengthCodedString = function (value) {
	  if (value === null) {
	    this.writeLengthCodedNumber(null);
	    return;
	  }

	  value = value === undefined ? '' : String(value);

	  var bytes = Buffer.byteLength(value, 'utf-8');
	  this.writeLengthCodedNumber(bytes);

	  if (!bytes) {
	    return;
	  }

	  this._allocate(bytes);
	  this._buffer.write(value, this._offset, 'utf-8');
	  this._offset += bytes;
	};

	PacketWriter.prototype._allocate = function (bytes) {
	  if (!this._buffer) {
	    this._buffer = new Buffer(bytes);
	    return;
	  }

	  var bytesRemaining = this._buffer.length - this._offset;
	  if (bytesRemaining >= bytes) {
	    return;
	  }

	  var oldBuffer = this._buffer;

	  this._buffer = new Buffer(oldBuffer.length + bytes);
	  oldBuffer.copy(this._buffer);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var SqlString = exports;

	SqlString.escapeId = function (val, forbidQualified) {
	  if (Array.isArray(val)) {
	    return val.map(function (v) {
	      return SqlString.escapeId(v, forbidQualified);
	    }).join(', ');
	  }

	  if (forbidQualified) {
	    return '`' + val.replace(/`/g, '``') + '`';
	  }
	  return '`' + val.replace(/`/g, '``').replace(/\./g, '`.`') + '`';
	};

	SqlString.escape = function (val, stringifyObjects, timeZone) {
	  if (val === undefined || val === null) {
	    return 'NULL';
	  }

	  switch (typeof val) {
	    case 'boolean':
	      return val ? 'true' : 'false';
	    case 'number':
	      return val + '';
	  }

	  if (val instanceof Date) {
	    val = SqlString.dateToString(val, timeZone || 'local');
	  }

	  if (Buffer.isBuffer(val)) {
	    return SqlString.bufferToString(val);
	  }

	  if (Array.isArray(val)) {
	    return SqlString.arrayToList(val, timeZone);
	  }

	  if (typeof val === 'object') {
	    if (stringifyObjects) {
	      val = val.toString();
	    } else {
	      return SqlString.objectToValues(val, timeZone);
	    }
	  }

	  val = val.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function (s) {
	    switch (s) {
	      case "\0":
	        return "\\0";
	      case "\n":
	        return "\\n";
	      case "\r":
	        return "\\r";
	      case "\b":
	        return "\\b";
	      case "\t":
	        return "\\t";
	      case "\x1a":
	        return "\\Z";
	      default:
	        return "\\" + s;
	    }
	  });
	  return "'" + val + "'";
	};

	SqlString.arrayToList = function (array, timeZone) {
	  return array.map(function (v) {
	    if (Array.isArray(v)) return '(' + SqlString.arrayToList(v, timeZone) + ')';
	    return SqlString.escape(v, true, timeZone);
	  }).join(', ');
	};

	SqlString.format = function (sql, values, stringifyObjects, timeZone) {
	  values = values == null ? [] : [].concat(values);

	  var index = 0;
	  return sql.replace(/\?\??/g, function (match) {
	    if (index === values.length) {
	      return match;
	    }

	    var value = values[index++];

	    return match === '??' ? SqlString.escapeId(value) : SqlString.escape(value, stringifyObjects, timeZone);
	  });
	};

	SqlString.dateToString = function dateToString(date, timeZone) {
	  var dt = new Date(date);

	  var year;
	  var month;
	  var day;
	  var hour;
	  var minute;
	  var second;
	  var millisecond;

	  if (timeZone === 'local') {
	    year = dt.getFullYear();
	    month = dt.getMonth() + 1;
	    day = dt.getDate();
	    hour = dt.getHours();
	    minute = dt.getMinutes();
	    second = dt.getSeconds();
	    millisecond = dt.getMilliseconds();
	  } else {
	    var tz = convertTimezone(timeZone);
	    if (tz !== false) {
	      dt.setTime(dt.getTime() + tz * 60000);
	    }

	    year = dt.getUTCFullYear();
	    month = dt.getUTCMonth() + 1;
	    day = dt.getUTCDate();
	    hour = dt.getUTCHours();
	    minute = dt.getUTCMinutes();
	    second = dt.getUTCSeconds();
	    millisecond = dt.getUTCMilliseconds();
	  }

	  // YYYY-MM-DD HH:mm:ss.mmm
	  return zeroPad(year, 4) + '-' + zeroPad(month, 2) + '-' + zeroPad(day, 2) + ' ' + zeroPad(hour, 2) + ':' + zeroPad(minute, 2) + ':' + zeroPad(second, 2) + '.' + zeroPad(millisecond, 3);
	};

	SqlString.bufferToString = function bufferToString(buffer) {
	  return "X'" + buffer.toString('hex') + "'";
	};

	SqlString.objectToValues = function (object, timeZone) {
	  var values = [];
	  for (var key in object) {
	    var value = object[key];
	    if (typeof value === 'function') {
	      continue;
	    }

	    values.push(this.escapeId(key) + ' = ' + SqlString.escape(value, true, timeZone));
	  }

	  return values.join(', ');
	};

	function zeroPad(number, length) {
	  number = number.toString();
	  while (number.length < length) {
	    number = '0' + number;
	  }

	  return number;
	}

	function convertTimezone(tz) {
	  if (tz == "Z") return 0;

	  var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
	  if (m) {
	    return (m[1] == '-' ? -1 : 1) * (parseInt(m[2], 10) + (m[3] ? parseInt(m[3], 10) : 0) / 60) * 60;
	  }
	  return false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).Buffer))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var mysql = __webpack_require__(58);
	var Connection = __webpack_require__(59);
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var Util = __webpack_require__(38);
	var PoolConnection = __webpack_require__(132);

	module.exports = Pool;

	Util.inherits(Pool, EventEmitter);
	function Pool(options) {
	  EventEmitter.call(this);
	  this.config = options.config;
	  this.config.connectionConfig.pool = this;

	  this._acquiringConnections = [];
	  this._allConnections = [];
	  this._freeConnections = [];
	  this._connectionQueue = [];
	  this._closed = false;
	}

	Pool.prototype.getConnection = function (cb) {

	  if (this._closed) {
	    return process.nextTick(function () {
	      return cb(new Error('Pool is closed.'));
	    });
	  }

	  var connection;
	  var pool = this;

	  if (this._freeConnections.length > 0) {
	    connection = this._freeConnections.shift();

	    return this.acquireConnection(connection, cb);
	  }

	  if (this.config.connectionLimit === 0 || this._allConnections.length < this.config.connectionLimit) {
	    connection = new PoolConnection(this, { config: this.config.newConnectionConfig() });

	    this._acquiringConnections.push(connection);
	    this._allConnections.push(connection);

	    return connection.connect({ timeout: this.config.acquireTimeout }, function onConnect(err) {
	      spliceConnection(pool._acquiringConnections, connection);

	      if (pool._closed) {
	        err = new Error('Pool is closed.');
	      }

	      if (err) {
	        pool._purgeConnection(connection);
	        cb(err);
	        return;
	      }

	      pool.emit('connection', connection);
	      cb(null, connection);
	    });
	  }

	  if (!this.config.waitForConnections) {
	    return process.nextTick(function () {
	      return cb(new Error('No connections available.'));
	    });
	  }

	  this._enqueueCallback(cb);
	};

	Pool.prototype.acquireConnection = function acquireConnection(connection, cb) {
	  if (connection._pool !== this) {
	    throw new Error('Connection acquired from wrong pool.');
	  }

	  var changeUser = this._needsChangeUser(connection);
	  var pool = this;

	  this._acquiringConnections.push(connection);

	  function onOperationComplete(err) {
	    spliceConnection(pool._acquiringConnections, connection);

	    if (pool._closed) {
	      err = new Error('Pool is closed.');
	    }

	    if (err) {
	      pool._connectionQueue.unshift(cb);
	      pool._purgeConnection(connection);
	      return;
	    }

	    if (changeUser) {
	      pool.emit('connection', connection);
	    }

	    cb(null, connection);
	  }

	  if (changeUser) {
	    // restore user back to pool configuration
	    connection.config = this.config.newConnectionConfig();
	    connection.changeUser({ timeout: this.config.acquireTimeout }, onOperationComplete);
	  } else {
	    // ping connection
	    connection.ping({ timeout: this.config.acquireTimeout }, onOperationComplete);
	  }
	};

	Pool.prototype.releaseConnection = function releaseConnection(connection) {
	  var cb;
	  var pool = this;

	  if (this._acquiringConnections.indexOf(connection) !== -1) {
	    // connection is being acquired
	    return;
	  }

	  if (connection._pool) {
	    if (connection._pool !== this) {
	      throw new Error('Connection released to wrong pool');
	    }

	    if (this._freeConnections.indexOf(connection) !== -1) {
	      // connection already in free connection pool
	      // this won't catch all double-release cases
	      throw new Error('Connection already released');
	    } else {
	      // add connection to end of free queue
	      this._freeConnections.push(connection);
	    }
	  }

	  while (this._closed && this._connectionQueue.length) {
	    // empty the connection queue
	    cb = this._connectionQueue.shift();

	    process.nextTick(cb.bind(null, new Error('Pool is closed.')));
	  }

	  if (this._connectionQueue.length) {
	    cb = this._connectionQueue.shift();

	    this.getConnection(cb);
	  }
	};

	Pool.prototype.end = function (cb) {
	  this._closed = true;

	  if (typeof cb != "function") {
	    cb = function (err) {
	      if (err) throw err;
	    };
	  }

	  var calledBack = false;
	  var waitingClose = this._allConnections.length;

	  function onEnd(err) {
	    if (calledBack) {
	      return;
	    }

	    if (err || --waitingClose === 0) {
	      calledBack = true;
	      return cb(err);
	    }
	  }

	  if (waitingClose === 0) {
	    return process.nextTick(cb);
	  }

	  while (this._allConnections.length !== 0) {
	    this._purgeConnection(this._allConnections[0], onEnd);
	  }
	};

	Pool.prototype.query = function (sql, values, cb) {
	  var query = Connection.createQuery(sql, values, cb);

	  if (!(typeof sql === 'object' && 'typeCast' in sql)) {
	    query.typeCast = this.config.connectionConfig.typeCast;
	  }

	  if (this.config.connectionConfig.trace) {
	    // Long stack trace support
	    query._callSite = new Error();
	  }

	  this.getConnection(function (err, conn) {
	    if (err) {
	      query.on('error', function () {});
	      query.end(err);
	      return;
	    }

	    // Release connection based off event
	    query.once('end', function () {
	      conn.release();
	    });

	    conn.query(query);
	  });

	  return query;
	};

	Pool.prototype._enqueueCallback = function _enqueueCallback(callback) {

	  if (this.config.queueLimit && this._connectionQueue.length >= this.config.queueLimit) {
	    process.nextTick(function () {
	      var err = new Error('Queue limit reached.');
	      err.code = 'POOL_ENQUEUELIMIT';
	      callback(err);
	    });
	    return;
	  }

	  // Bind to domain, as dequeue will likely occur in a different domain
	  var cb = process.domain ? process.domain.bind(callback) : callback;

	  this._connectionQueue.push(cb);
	  this.emit('enqueue');
	};

	Pool.prototype._needsChangeUser = function _needsChangeUser(connection) {
	  var connConfig = connection.config;
	  var poolConfig = this.config.connectionConfig;

	  // check if changeUser values are different
	  return connConfig.user !== poolConfig.user || connConfig.database !== poolConfig.database || connConfig.password !== poolConfig.password || connConfig.charsetNumber !== poolConfig.charsetNumber;
	};

	Pool.prototype._purgeConnection = function _purgeConnection(connection, callback) {
	  var cb = callback || function () {};

	  if (connection.state === 'disconnected') {
	    connection.destroy();
	  }

	  this._removeConnection(connection);

	  if (connection.state !== 'disconnected' && !connection._protocol._quitSequence) {
	    connection._realEnd(cb);
	    return;
	  }

	  process.nextTick(cb);
	};

	Pool.prototype._removeConnection = function (connection) {
	  connection._pool = null;

	  // Remove connection from all connections
	  spliceConnection(this._allConnections, connection);

	  // Remove connection from free connections
	  spliceConnection(this._freeConnections, connection);

	  this.releaseConnection(connection);
	};

	Pool.prototype.escape = function (value) {
	  return mysql.escape(value, this.config.connectionConfig.stringifyObjects, this.config.connectionConfig.timezone);
	};

	Pool.prototype.escapeId = function escapeId(value) {
	  return mysql.escapeId(value, false);
	};

	function spliceConnection(array, connection) {
	  var index;
	  if ((index = array.indexOf(connection)) !== -1) {
	    // Remove connection from all connections
	    array.splice(index, 1);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(38).inherits;
	var Connection = __webpack_require__(59);

	module.exports = PoolConnection;
	inherits(PoolConnection, Connection);

	function PoolConnection(pool, options) {
	  Connection.call(this, options);
	  this._pool = pool;

	  // When a fatal error occurs the connection's protocol ends, which will cause
	  // the connection to end as well, thus we only need to watch for the end event
	  // and we will be notified of disconnects.
	  this.on('end', this._removeFromPool);
	  this.on('error', function (err) {
	    if (err.fatal) {
	      this._removeFromPool();
	    }
	  });
	}

	PoolConnection.prototype.release = function release() {
	  var pool = this._pool;
	  var connection = this;

	  if (!pool || pool._closed) {
	    return;
	  }

	  return pool.releaseConnection(this);
	};

	// TODO: Remove this when we are removing PoolConnection#end
	PoolConnection.prototype._realEnd = Connection.prototype.end;

	PoolConnection.prototype.end = function () {
	  console.warn('Calling conn.end() to release a pooled connection is ' + 'deprecated. In next version calling conn.end() will be ' + 'restored to default conn.end() behavior. Use ' + 'conn.release() instead.');
	  this.release();
	};

	PoolConnection.prototype.destroy = function () {
	  this._removeFromPool(this);
	  return Connection.prototype.destroy.apply(this, arguments);
	};

	PoolConnection.prototype._removeFromPool = function _removeFromPool() {
	  if (!this._pool || this._pool._closed) {
	    return;
	  }

	  var pool = this._pool;
	  this._pool = null;

	  pool._purgeConnection(this);
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Pool = __webpack_require__(131);
	var PoolConfig = __webpack_require__(134);
	var PoolNamespace = __webpack_require__(135);
	var PoolSelector = __webpack_require__(136);
	var Util = __webpack_require__(38);
	var EventEmitter = __webpack_require__(10).EventEmitter;

	module.exports = PoolCluster;

	/**
	 * PoolCluster
	 */
	function PoolCluster(config) {
	  EventEmitter.call(this);

	  config = config || {};
	  this._canRetry = typeof config.canRetry === 'undefined' ? true : config.canRetry;
	  this._defaultSelector = config.defaultSelector || 'RR';
	  this._removeNodeErrorCount = config.removeNodeErrorCount || 5;
	  this._restoreNodeTimeout = config.restoreNodeTimeout || 0;

	  this._closed = false;
	  this._findCaches = Object.create(null);
	  this._lastId = 0;
	  this._namespaces = Object.create(null);
	  this._nodes = Object.create(null);
	}

	Util.inherits(PoolCluster, EventEmitter);

	PoolCluster.prototype.add = function add(id, config) {
	  if (this._closed) {
	    throw new Error('PoolCluster is closed.');
	  }

	  var nodeId = typeof id === 'object' ? 'CLUSTER::' + ++this._lastId : String(id);

	  if (this._nodes[nodeId] !== undefined) {
	    throw new Error('Node ID "' + nodeId + '" is already defined in PoolCluster.');
	  }

	  var poolConfig = typeof id !== 'object' ? new PoolConfig(config) : new PoolConfig(id);

	  this._nodes[nodeId] = {
	    id: nodeId,
	    errorCount: 0,
	    pool: new Pool({ config: poolConfig }),
	    _offlineUntil: 0
	  };

	  this._clearFindCaches();
	};

	PoolCluster.prototype.end = function end(callback) {
	  var cb = callback !== undefined ? callback : _cb;

	  if (typeof cb !== 'function') {
	    throw TypeError('callback argument must be a function');
	  }

	  if (this._closed) {
	    return process.nextTick(cb);
	  }

	  this._closed = true;

	  var calledBack = false;
	  var nodeIds = Object.keys(this._nodes);
	  var waitingClose = nodeIds.length;

	  function onEnd(err) {
	    if (calledBack) {
	      return;
	    }

	    if (err || --waitingClose === 0) {
	      calledBack = true;
	      return cb(err);
	    }
	  }

	  if (waitingClose === 0) {
	    return process.nextTick(cb);
	  }

	  for (var i = 0; i < nodeIds.length; i++) {
	    var nodeId = nodeIds[i];
	    var node = this._nodes[nodeId];

	    node.pool.end(onEnd);
	  }
	};

	PoolCluster.prototype.of = function (pattern, selector) {
	  pattern = pattern || '*';

	  selector = selector || this._defaultSelector;
	  selector = selector.toUpperCase();
	  if (typeof PoolSelector[selector] === 'undefined') {
	    selector = this._defaultSelector;
	  }

	  var key = pattern + selector;

	  if (typeof this._namespaces[key] === 'undefined') {
	    this._namespaces[key] = new PoolNamespace(this, pattern, selector);
	  }

	  return this._namespaces[key];
	};

	PoolCluster.prototype.remove = function remove(pattern) {
	  var foundNodeIds = this._findNodeIds(pattern, true);

	  for (var i = 0; i < foundNodeIds.length; i++) {
	    var node = this._getNode(foundNodeIds[i]);

	    if (node) {
	      this._removeNode(node);
	    }
	  }
	};

	PoolCluster.prototype.getConnection = function (pattern, selector, cb) {
	  var namespace;
	  if (typeof pattern === 'function') {
	    cb = pattern;
	    namespace = this.of();
	  } else {
	    if (typeof selector === 'function') {
	      cb = selector;
	      selector = this._defaultSelector;
	    }

	    namespace = this.of(pattern, selector);
	  }

	  namespace.getConnection(cb);
	};

	PoolCluster.prototype._clearFindCaches = function _clearFindCaches() {
	  this._findCaches = Object.create(null);
	};

	PoolCluster.prototype._decreaseErrorCount = function _decreaseErrorCount(node) {
	  var errorCount = node.errorCount;

	  if (errorCount > this._removeNodeErrorCount) {
	    errorCount = this._removeNodeErrorCount;
	  }

	  if (errorCount < 1) {
	    errorCount = 1;
	  }

	  node.errorCount = errorCount - 1;

	  if (node._offlineUntil) {
	    node._offlineUntil = 0;
	    this.emit('online', node.id);
	  }
	};

	PoolCluster.prototype._findNodeIds = function _findNodeIds(pattern, includeOffline) {
	  var currentTime = 0;
	  var foundNodeIds = this._findCaches[pattern];

	  if (foundNodeIds === undefined) {
	    var nodeIds = Object.keys(this._nodes);
	    var wildcard = pattern.substr(-1) === '*';
	    var keyword = wildcard ? pattern.substr(0, pattern.length - 1) : pattern;

	    if (wildcard) {
	      foundNodeIds = keyword.length !== 0 ? nodeIds.filter(function (id) {
	        return id.substr(0, keyword.length) === keyword;
	      }) : nodeIds;
	    } else {
	      var index = nodeIds.indexOf(keyword);
	      foundNodeIds = nodeIds.slice(index, index + 1);
	    }

	    this._findCaches[pattern] = foundNodeIds;
	  }

	  if (includeOffline) {
	    return foundNodeIds;
	  }

	  return foundNodeIds.filter(function (nodeId) {
	    var node = this._getNode(nodeId);

	    if (!node._offlineUntil) {
	      return true;
	    }

	    if (!currentTime) {
	      currentTime = getMonotonicMilliseconds();
	    }

	    return node._offlineUntil <= currentTime;
	  }, this);
	};

	PoolCluster.prototype._getNode = function _getNode(id) {
	  return this._nodes[id] || null;
	};

	PoolCluster.prototype._increaseErrorCount = function _increaseErrorCount(node) {
	  var errorCount = ++node.errorCount;

	  if (this._removeNodeErrorCount > errorCount) {
	    return;
	  }

	  if (this._restoreNodeTimeout > 0) {
	    node._offlineUntil = getMonotonicMilliseconds() + this._restoreNodeTimeout;
	    this.emit('offline', node.id);
	    return;
	  }

	  this._removeNode(node);
	  this.emit('remove', node.id);
	};

	PoolCluster.prototype._getConnection = function (node, cb) {
	  var self = this;

	  node.pool.getConnection(function (err, connection) {
	    if (err) {
	      self._increaseErrorCount(node);
	      cb(err);
	      return;
	    } else {
	      self._decreaseErrorCount(node);
	    }

	    connection._clusterId = node.id;

	    cb(null, connection);
	  });
	};

	PoolCluster.prototype._removeNode = function _removeNode(node) {
	  delete this._nodes[node.id];

	  this._clearFindCaches();

	  node.pool.end(_noop);
	};

	function getMonotonicMilliseconds() {
	  var ms;

	  if (typeof process.hrtime === 'function') {
	    ms = process.hrtime();
	    ms = ms[0] * 1e3 + ms[1] * 1e-6;
	  } else {
	    ms = process.uptime() * 1000;
	  }

	  return Math.floor(ms);
	}

	function _cb(err) {
	  if (err) {
	    throw err;
	  }
	}

	function _noop() {}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	
	var ConnectionConfig = __webpack_require__(75);

	module.exports = PoolConfig;
	function PoolConfig(options) {
	  if (typeof options === 'string') {
	    options = ConnectionConfig.parseUrl(options);
	  }

	  this.acquireTimeout = options.acquireTimeout === undefined ? 10 * 1000 : Number(options.acquireTimeout);
	  this.connectionConfig = new ConnectionConfig(options);
	  this.waitForConnections = options.waitForConnections === undefined ? true : Boolean(options.waitForConnections);
	  this.connectionLimit = options.connectionLimit === undefined ? 10 : Number(options.connectionLimit);
	  this.queueLimit = options.queueLimit === undefined ? 0 : Number(options.queueLimit);
	}

	PoolConfig.prototype.newConnectionConfig = function newConnectionConfig() {
	  var connectionConfig = new ConnectionConfig(this.connectionConfig);

	  connectionConfig.clientFlags = this.connectionConfig.clientFlags;
	  connectionConfig.maxPacketSize = this.connectionConfig.maxPacketSize;

	  return connectionConfig;
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var PoolSelector = __webpack_require__(136);

	module.exports = PoolNamespace;

	/**
	 * PoolNamespace
	 */
	function PoolNamespace(cluster, pattern, selector) {
	  this._cluster = cluster;
	  this._pattern = pattern;
	  this._selector = new PoolSelector[selector]();
	}

	PoolNamespace.prototype.getConnection = function (cb) {
	  var clusterNode = this._getClusterNode();
	  var cluster = this._cluster;
	  var namespace = this;

	  if (clusterNode === null) {
	    var err = null;

	    if (this._cluster._findNodeIds(this._pattern, true).length !== 0) {
	      err = new Error('Pool does not have online node.');
	      err.code = 'POOL_NONEONLINE';
	    } else {
	      err = new Error('Pool does not exist.');
	      err.code = 'POOL_NOEXIST';
	    }

	    return cb(err);
	  }

	  cluster._getConnection(clusterNode, function (err, connection) {
	    var retry = err && cluster._canRetry && cluster._findNodeIds(namespace._pattern).length !== 0;

	    if (retry) {
	      return namespace.getConnection(cb);
	    }

	    if (err) {
	      return cb(err);
	    }

	    cb(null, connection);
	  });
	};

	PoolNamespace.prototype._getClusterNode = function _getClusterNode() {
	  var foundNodeIds = this._cluster._findNodeIds(this._pattern);
	  var nodeId;

	  switch (foundNodeIds.length) {
	    case 0:
	      nodeId = null;
	      break;
	    case 1:
	      nodeId = foundNodeIds[0];
	      break;
	    default:
	      nodeId = this._selector(foundNodeIds);
	      break;
	  }

	  return nodeId !== null ? this._cluster._getNode(nodeId) : null;
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	
	/**
	 * PoolSelector
	 */
	var PoolSelector = module.exports = {};

	PoolSelector.RR = function PoolSelectorRoundRobin() {
	  var index = 0;

	  return function (clusterIds) {
	    if (index >= clusterIds.length) {
	      index = 0;
	    }

	    var clusterId = clusterIds[index++];

	    return clusterId;
	  };
	};

	PoolSelector.RANDOM = function PoolSelectorRandom() {
	  return function (clusterIds) {
	    return clusterIds[Math.floor(Math.random() * clusterIds.length)];
	  };
	};

	PoolSelector.ORDER = function PoolSelectorOrder() {
	  return function (clusterIds) {
	    return clusterIds[0];
	  };
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var defer = __webpack_require__(2).defer,
	    Mediator = __webpack_require__(5);

	'use strict';

	function DbManager() {}

	DbManager.prototype = {
	    connection: void 0,

	    mediator: Mediator()
	};

	DbManager.rootClass();

	module.exports = DbManager;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(139);
	module.exports = {
	    entry: './app/app.js',
	    output: {
	        path: __dirname + '/dist',
	        filename: 'diary.js'
	    },
	    externals: {
	        'underscore': '_',
	        'bluebird': 'Promise',
	        'virtual-dom': 'virtualDom'
	    },
	    module: {
	        loaders: [{
	            test: /\.js/,
	            loader: 'babel-loader'
	        }, {
	            test: /\.tpl/,
	            loader: 'tpl-to-vdom-loader'
	        }, {
	            test: /\.json/,
	            loader: 'json-loader'
	        }]
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function (filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function () {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = i >= 0 ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function (path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function (p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function (path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function () {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function (p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};

	// path.relative(from, to)
	// posix version
	exports.relative = function (from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function (path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};

	exports.basename = function (path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};

	exports.extname = function (path) {
	  return splitPath(path)[3];
	};

	function filter(xs, f) {
	  if (xs.filter) return xs.filter(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    if (f(xs[i], i, xs)) res.push(xs[i]);
	  }
	  return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
	  return str.substr(start, len);
	} : function (str, start, len) {
	  if (start < 0) start = str.length + start;
	  return str.substr(start, len);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }
/******/ ]);