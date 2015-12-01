/// <reference path="../../typings/tsd.d.ts"/>

declare var config: {
    host: string,
    port: number
};

module CitizenHack {
    function getJsonFromUrl() : Object {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    function setupChat (socket: SocketIOClient.Socket) : void {
        socket.on('chat', (msg: Object) => {
            var message = $('<p>');
            if (msg['type'] === 'msg') {
                var name = $('<b>');
                name.text(msg['name'] + ': ');
                message.text(msg['msg']);
                message.prepend(name);
            } else if (msg['type'] === 'join') {
                message.text(msg['name'] + ' joined.');
                message.css('color', 'gray');
            } else if (msg['type'] === 'left') {
                message.text(msg['name'] + ' left.');
                message.css('color', 'gray');
            }
            $('#chatMsg').append(message);
            $('#chatMsg').scrollTop(90000);
        });

        var input = $('#chatInput');
        input.keydown((e: KeyboardEvent) => {
            if (e.keyCode === 13 && input.val() !== '') {
                socket.emit('chat', input.val());
                input.val('');
            }
        });
    }

    function initGame () : void {
        var params = getJsonFromUrl();
        var socket = io.connect('http://' + config.host + ':' + config.port);

        socket.on('connect', () => {
            var spectate = params['spectate'];
            if (!spectate) {
                socket.emit('play');
                socket.on('id', () => {
                    var seed = Math.random() * 2000000000 | 0;
                    socket.emit('init', { seed: seed });
                    Rand.seed(seed);
                    setupChat(socket);
                    var game = new Game(socket, false);
                    game.loop();
                });
            } else {
                socket.emit('watch', { id: spectate });
                socket.on('init', (msg: any) => {
                    Rand.seed(msg['seed']);
                    setupChat(socket);
                    var game = new Game(socket, true);
                    if (msg['events'].length > 0) {
                        msg['events'].forEach((a: Object) => {
                            var action = Action.unserialize(a);
                            game.actionReplay.push(action);
                        });
                        game.renderer.disable();
                    }
                    game.loop();
                });
            }
        });
    }

    $(document).ready(initGame);
}
