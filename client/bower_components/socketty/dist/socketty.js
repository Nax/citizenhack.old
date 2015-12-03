var socketty;
(function (socketty) {
    var Socket = (function () {
        function Socket(socket) {
            var _this = this;
            this._handle = {};
            this._queue = {};
            this._socket = socket;
            socket.onmessage = function (e) {
                var data = JSON.parse(e.data);
                var action = data['action'];
                var msg = data['msg'];
                var h = _this._handle[action];
                if (h) {
                    h(data['msg']);
                }
                else {
                    if (!_this._queue[action]) {
                        _this._queue[action] = [];
                    }
                    _this._queue[action].push(msg);
                }
            };
        }
        Socket.prototype.on = function (action, callback) {
            this._handle[action] = callback;
            if (this._queue[action]) {
                this._queue[action].forEach(function (data) {
                    callback(data);
                });
                delete this._queue[action];
            }
        };
        Socket.prototype.disconnect = function (callback) {
            this._socket.onclose = function (e) {
                callback();
            };
        };
        Socket.prototype.error = function (callback) {
            this._socket.onerror = function (e) {
                callback(e);
            };
        };
        Socket.prototype.send = function (action, msg) {
            var obj = {
                action: action,
                msg: msg
            };
            this._socket.send(JSON.stringify(obj));
        };
        return Socket;
    })();
    socketty.Socket = Socket;
    var _socketType = WebSocket;
    function use(socketType) {
        _socketType = socketType;
    }
    socketty.use = use;
    function connect(url, callback) {
        var internalSocket = new _socketType(url);
        var socket = new Socket(internalSocket);
        internalSocket.onopen = function (e) {
            callback(socket);
        };
        return socket;
    }
    socketty.connect = connect;
})(socketty || (socketty = {}));
