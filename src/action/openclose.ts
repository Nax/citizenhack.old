import Action = require('./base');
import Status = require('../status');
import Tile = require('../tile');
import World = require('../world');
import Actor = require('../actor');

class OpenCloseAction extends Action {
    public dx: number;
    public dy: number;
    public open: boolean;

    constructor(dx: number, dy: number, open: boolean) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.open = open;
    }

    execute (world: World, actor: Actor): void {
        var map = actor.map;
        var x = actor.x + this.dx;
        var y = actor.y + this.dy;
        var tile = map.tile(x, y);

        if (tile === Tile.CLOSED_DOOR) {
            if (this.open) {
                map.setTile(x, y, Tile.OPEN_DOOR);
            } else if (actor.isPlayer) {
                Status.print('The door is already closed.');
            }
        } else if (tile === Tile.OPEN_DOOR) {
            if (!this.open) {
                map.setTile(x, y, Tile.CLOSED_DOOR);
            } else if (actor.isPlayer) {
                Status.print('The door is already open.');
            }
        } else if (actor.isPlayer()) {
            var openStr = this.open ? 'open' : 'close';
            Status.print('There is nothing to ' + openStr + ' here.');
        }
    }

    serialize() : Object {
        return {
            type: 'oc',
            x: this.dx,
            y: this.dy,
            o: this.open
        }
    }
}

export = OpenCloseAction;
