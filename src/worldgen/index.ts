import Map = require('../map');
import _Dungeon = require('./dungeon');

module WorldGen {
    export interface Generable {
        generate(): Map;
    }

    export var Dungeon = _Dungeon;
}

export = WorldGen;
