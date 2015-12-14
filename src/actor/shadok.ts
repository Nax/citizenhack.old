import Monster = require('./monster');
import Symbol = require('../symbol');
import Action = require('../action');
import Rand = require('../rand');
import Move = require('../action/move');
import Map = require('../map');

class Shadok extends Monster {
    static sym = new Symbol('S', 'orange', 'black');

    constructor(x: number, y: number, map: Map) {
        super(x, y, map);
        this.speed = 20;
        this.hp = this.hpMax = 12;
        this.str = 2;
    }

    symbol () : Symbol {
        return Shadok.sym;
    }

    name () :string {
        return 'shadok';
    }

    play () : Action.Base {
        var x = 0;
        var y = 0;

        switch (Rand.integer(4)) {
            case 0:
                x = -1;
                break;
            case 1:
                x = 1;
                break;
            case 2:
                y = -1;
                break;
            case 3:
                y = 1;
        }
        return new Move(x, y);
    }
}

export = Shadok;
