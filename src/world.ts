/// <reference path="map.ts"/>
/// <reference path="player.ts"/>
/// <reference path="monsters.ts"/>
/// <reference path="worldgen/worldgen.ts"/>

class World {
    public maps: Array<Map> = [];
    public player: Player;
    public deadFlag: boolean = false;

    constructor () {
        var generator = new WorldGen.Dungeon;
        var m = generator.generate();
        this.maps.push(m);
        var x;
        var y;
        do {
            x = (Rand.number() * m.width) | 0;
            y = (Rand.number() * m.height) | 0;
        } while (m.tile(x, y) !== Tile.FLOOR); // KLUDGE
        this.player = <Player>Monsters.Player.create(m, x, y);
    }
}
