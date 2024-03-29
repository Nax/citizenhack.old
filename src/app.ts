/// <reference path="game.ts" />
/// <reference path="rand.ts" />
/// <reference path="action/action.ts" />
/// <reference path="../typings/tsd.d.ts"/>

declare var config: {
    api: string,
    port: number
};

function getJsonFromUrl () : Object {
    var query = location.search.substr(1);
    var result : { [key:string]: string } = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function setupChat (socket: SockettySocket) : void {
    socket.on('chat', (msg: { [key:string]: string }) => {
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
            socket.send('chat', input.val());
            input.val('');
        }
    });
}

function initGame () : void {
    var params = getJsonFromUrl();
    var socket = socketty.connect('ws://' + config.api + '/', function (socket) {
        var spectate = params['spectate'];
        if (!spectate) {
            socket.send('play');
            socket.on('id', () => {
                var seed = Math.random() * 2000000000 | 0;
                socket.send('init', { seed: seed });
                Rand.seed(seed);
                setupChat(socket);
                var game = new Game(socket, false);
                game.loop();
            });
        } else {
            socket.send('watch', { id: spectate });
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
