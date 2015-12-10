(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.socketty = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Module dependencies.
 */

var global = (function() { return this; })();

/**
 * WebSocket constructor.
 */

var WebSocket = global.WebSocket || global.MozWebSocket;

/**
 * Module exports.
 */

module.exports = WebSocket ? ws : null;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object) opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket(uri, protocols);
  } else {
    instance = new WebSocket(uri);
  }
  return instance;
}

if (WebSocket) ws.prototype = WebSocket.prototype;

},{}],2:[function(require,module,exports){
'use strict';

var WebSocket       = require('ws');
var ClientSocket    = require('./common');

module.exports = {
    connect: function (url, callback) {
        var ws = new WebSocket(url);
        var socket = new ClientSocket(ws);
        ws.onopen = function () {
            callback(socket);
        };
        return socket;
    }
}

},{"./common":3,"ws":1}],3:[function(require,module,exports){
'use strict';

var CommonSocket = function (ws) {
    var that = this;
    this._socket = ws;
    this._handle = {};
    this._disconnect = null;

    this.send = function (action, msg) {
        var obj = {
            action: action,
            msg: msg
        };
        that._socket.send(JSON.stringify(obj));
    };

    this.on = function (action, callback) {
        that._handle[action] = callback;
    };

    this.disconnect = function (callback) {
        that._disconnect = callback;
    };

    ws.onmessage = function (msgEvent) {
        var rawMsg = msgEvent.data;

        if (rawMsg === 'ping') {
            that._socket.send('pong');
            return;
        }
        if (rawMsg === 'pong') {
            return;
        }
        try {
            var data = JSON.parse(rawMsg);
            var action = data.action;
            var msg = data.msg;

            var h = that._handle[action];
            if (h) {
                h(msg);
            }
        } catch (e) {
            
        }
    };

    ws.onclose = function () {
        if (that._disconnect) {
            that._disconnect();
        }
        clearInterval(that._interval);
    }

    this._interval = setInterval(function () {
        that._socket.send('ping');
    }, 10000);
};

module.exports = CommonSocket;

},{}]},{},[2])(2)
});