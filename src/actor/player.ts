import Actor = require('../actor');
import Symbol = require('../symbol');
import Map = require('../map');
import Promise = require('../promise');
import Action = require('../action');
import Prompt = require('../prompt');
import Status = require('../status');
import Move = require('../action/move');
import OpenClose = require('../action/openclose');

class Player extends Actor {
    static sym = new Symbol('@', 'yellow', 'black');

    private socket: SockettySocket;
    private spectate: boolean;

    constructor (x: number, y: number, map: Map) {
        super(x, y, map);
        this.speed = 10;
        this.hp = 18;
        this.hpMax = 18;
        this.str = 12;
    }

    isPlayer () : boolean {
        return true;
    }

    symbol () : Symbol {
        return Player.sym;
    }

    name () : string {
        return 'you';
    }

    properName () : boolean {
        return true;
    }

    network (socket: SockettySocket, spectate: boolean) : void {
        this.socket = socket;
        this.spectate = spectate;
    }

    play () : Promise {
        var promise = new Promise;
        if (!this.spectate) {
            document.onkeydown = (e: KeyboardEvent): boolean => {
                if ($('#chatInput').is(':focus')) {
                    return true;
                }
                switch (e.keyCode) {
                    case 37:
                        this.move(promise, -1, 0);
                        e.preventDefault();
                        return false;
                    case 38:
                        this.move(promise, 0, -1);
                        e.preventDefault();
                        return false;
                    case 39:
                        this.move(promise, 1, 0);
                        e.preventDefault();
                        return false;
                    case 40:
                        this.move(promise, 0, 1);
                        e.preventDefault();
                        return false;
                    case 67:
                        this.openClose(promise, false);
                        break;
                    case 79:
                        this.openClose(promise, true);
                        break;
                }
                return true;
            };
        } else {
            this.socket.on('event', (event: Object) => {
                promise.resolve(Action.unserialize(event));
            });
        }
        return promise;
    }

    move (promise: Promise, x: number, y: number) : void {
        promise.resolve(new Move(x, y));
    }

    openClose (promise: Promise, open: boolean) {
        var openStr = open ? 'open' : 'close';
        var handler = document.onkeydown;

        var dirPromise = Prompt.direction('In what direction do you want to ' + openStr + ' things?');
        dirPromise.then((dir: Array<number>) => {
            promise.resolve(new OpenClose(dir[0], dir[1], open));
        }).error(() => {
            Status.print('Nevermind.');
        });
    }
}

export = Player;
