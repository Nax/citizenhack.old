/// <reference path="app.d.ts" />

module CitizenHack {
    export class Game {
        public map: Map;
        public player: Entity;
        public renderer: Render;
        public socket: SocketIOClient.Socket;
        public spectate: boolean;
        public seed: number;

        constructor (opts = {}) {
            Status.print('Welcome to CitizenHack!');

            this.socket = io.connect('http://' + config.host + ':' + config.port);
            this.setupChat();
            this.socket.on('chat', (d: any) => { this.chatRecv(d); });

            if (opts['spectate']) {
                this.socket.emit('watch', { id: opts['spectate'] });
                this.socket.on('init', (data: Object) => {
                    this.seed = data['seed'];
                    Rand.seed(this.seed);
                    this.init();
                    Status.print('Loading game...');
                    setTimeout(() => {
                        this.renderer.disable();
                        data['events'].forEach((e: any) => {
                            Event.push(e);
                        });
                        this.renderer.enable();
                        this.render();
                        this.socket.on('event', (data: any) => {
                            Event.push(data);
                        });
                    }, 0);
                });
            } else {
                this.seed = (Math.random() * 2000000000 | 0);
                Rand.seed(this.seed);
                Event.after((data: any) => {
                    this.socket.emit('event', data);
                });
                this.socket.emit('play');
                this.socket.on('id', (msg) => {
                    this.socket.emit('init', {
                        seed: this.seed
                    });
                    this.init();
                    $(document).keydown((e: KeyboardEvent) => {
                        this.keypress(e);
                    });
                });
            }
        }

        init () : void {
            Event.handler((data) => {
                this.event(data)
            });
            this.map = (new Worldgen.GeneratorDungeon).generate();
            var x;
            var y;
            do {
                x = Rand.number() * this.map.width | 0;
                y = Rand.number() * this.map.height | 0;
            } while (this.map.tile(x, y) !== Tile.FLOOR);
            this.player = Class.create(x, y, Class.PLAYER);
            this.renderer = new Render;
            this.render();
        }

        move (dx: number, dy: number) : void {
            var x = this.player.x + dx;
            var y = this.player.y + dy;
            var t = this.map.tileData(x, y);
            if (!t.solid) {
                this.player.x = x;
                this.player.y = y;
            }
            this.render();
        }

        event (data: any) {
            if (data === 'i') {
                $('#inventory').toggleClass('hidden')
            } else if(data === 'up') {
                this.move(0, -1);
            } else if(data === 'down') {
                this.move(0, 1);
            } else if(data === 'left') {
                this.move(-1, 0);
            } else if(data === 'right') {
                this.move(1, 0);
            } else if(data === 'o') {
                Action.open(this);
            } else if(data === 'c') {
                Action.close(this);
            }
        }

        keypress (event: KeyboardEvent) : boolean {
            if ($('#chatInput').is(':focus')) {
                return;
            }
            if (event.keyCode === 73) {
                Event.push('i');
            } else if (event.keyCode === 38) {
                Event.push('up');
            } else if (event.keyCode === 40) {
                Event.push('down');
            } else if (event.keyCode === 37) {
                Event.push('left');
            } else if (event.keyCode === 39) {
                Event.push('right');
            } else if (event.keyCode === 79) {
                Event.push('o');
            } else if (event.keyCode === 67) {
                Event.push('c');
            }
            event.preventDefault();
            return false;
        }

        render () : void {
            Light.compute(this.map, this.player);
            this.renderer.renderMap(this.map, this.player);
        }

        chatRecv (data: any) : void {
            var chatBox = $('#chatMsg');
            var msg = $('<p>');
            if (data['type'] === 'msg') {
                var name = $('<b>');
                name.text(data['name'] + ': ');
                msg.text(data['msg']);
                msg.prepend(name);
            } else if (data['type'] === 'join') {
                msg.css('color', 'gray');
                msg.text(data['name'] + ' joined.');
            } else if (data['type'] === 'left') {
                msg.css('color', 'gray');
                msg.text(data['name'] + ' left.');
            }
            chatBox.append(msg);
            chatBox.scrollTop(1000000);
        }

        setupChat () : void {
            $('#chatInput').keypress((e: KeyboardEvent) => {
                if (e.charCode === 13) {
                    this.socket.emit('chat', '' + $('#chatInput').val());
                    $('#chatInput').val('');
                    return false;
                }
            });
        }
    }

    $(document).ready(() => {
        function getJsonFromUrl() : Object {
            var query = location.search.substr(1);
            var result = {};
            query.split("&").forEach(function(part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        }

        var params = getJsonFromUrl();
        new Game(params);
    });
}
