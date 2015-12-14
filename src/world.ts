import Map = require('./map');
import Tile = require('./tile');
import Player = require('./actor/player');
import Rand = require('./rand');
import WorldGen = require('./worldgen');

class World {
    public maps: Array<Map> = [];
    public player: Player;
    public deadFlag: boolean = false;

    constructor () {
        console.log('w1');
        console.log(WorldGen.Dungeon);
        var generator = new WorldGen.Dungeon;
        console.log('w2');
        var m = generator.generate();
        console.log('w3');
        this.maps.push(m);
        var x;
        var y;
        do {
            x = (Rand.number() * m.width) | 0;
            y = (Rand.number() * m.height) | 0;
        } while (m.tile(x, y) !== Tile.FLOOR); // KLUDGE
        this.player = new Player(x, y, m);
    }
}

export = World;
