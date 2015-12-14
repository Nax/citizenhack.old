import Actor = require('../actor');
import Map = require('../map');

abstract class Monster extends Actor {
    constructor (x: number, y: number, map: Map) {
        super(x, y, map);
    }

    isPlayer () : boolean {
        return false;
    }
}

export = Monster;
