'use strict';

var http        = require('http');
var express     = require('express');
var socketio    = require('socket.io');
var config      = require('../config');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

server.listen(config.port);

var watchers = {};
var players = {};
var games = [];

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.get('/players', function (req, res) {
    var p = [];
    games.forEach(function (id) {
        var player = {};
        player.id = id;
        player.name = 'Anonymous';
        p.push(player);
    });
    res.send(p);
});

io.on('connection', function (socket) {
    socket.on('play', function (msg) {
        var id = guid();
        while (games.indexOf(id) !== -1) {
            id = guid();
        }

        games.push(id);
        watchers[id] = [];
        socket.emit('id', { id: id });

        socket.on('disconnect', function () {
            delete players[id];
            delete watchers[id];
            delete games[games.indexOf(id)];
        });

        socket.on('init', function (msg) {
            players[id] = {};
            players[id].seed = msg.seed;
            players[id].events = [];
        });

        socket.on('event', function (msg) {
            players[id].events.push(msg);
            watchers[id].forEach(function (watcher) {
                watcher.emit('event', msg);
            });
        });
    });

    socket.on('watch', function (msg) {
        watchers[msg.id].push(socket);
        socket.emit('init', players[msg.id]);
    });
});
