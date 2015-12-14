import WorldGen = require('../worldgen');
import Map = require('../map');
import Rand = require('../rand');
import Tile = require('../tile');
import MonsterNewt = require('../actor/newt');
import MonsterShadok = require('../actor/shadok');

class Dungeon implements WorldGen.Generable {
    private map: Map;

    constructor () {
        console.log('LOL');
    }

    tryGenRoom (x: number, y: number, dx: number, dy: number) : boolean {
        var w = (Rand.number() * 12) | 0 + 7;
        var h = (Rand.number() * 12) | 0 + 7;
        var ox = x;
        var oy = y;
        if (dx === -1) {
            x -= (w - 1);
        } else if (dy === -1) {
            y -= (h - 1);
        }
        if (dx) {
            y -= Rand.number() * (h - 1) | 0 + 1;
        } else {
            x -= Rand.number() * (w - 1) | 0 + 1;
        }
        for (var j = 0; j < h; ++j) {
            for (var i = 0; i < w; ++i) {
                if (this.map.tile(x + i, y + j) !== Tile.HARD_WALL) {
                    return false;
                }
            }
        }
        this.genRoom(x, y, w, h);
        this.map.setTile(ox, oy, Tile.CLOSED_DOOR);
        return true;
    }

    genRoom (x: number, y: number, w: number, h: number) {
        for (var j = 0; j < h; ++j) {
            for (var i = 0; i < w; ++i) {
                if (i === 0 || j === 0 || i === w - 1 || j === h - 1) {
                    this.map.setTile(x + i, y + j, Tile.WALL);
                } else {
                    this.map.setTile(x + i, y + j, Tile.FLOOR);
                }
            }
        }
    }

    tryGenCorridor (x: number, y: number, dx: number, dy: number) : boolean {
        var len = (Rand.number() * 20) | 0 + 7;
        this.genCorridor(len, x, y, dx, dy);
        return true;
    }

    genCorridor (len: number, x: number, y: number, dx: number, dy: number) : void {
        for (var i = 0; i < len; ++i) {
            if (this.map.tile(x, y) === Tile.WALL) {
                if (this.map.tile(x + dx, y + dy) === Tile.WALL) {
                    return;
                }
                this.map.setTile(x, y, Tile.CLOSED_DOOR);
            } else {
                this.map.setTile(x, y, Tile.FLOOR);
            }
            x += dx;
            y += dy;
        }
        if (Rand.number() < 10) {
            this.tryGenRoom(x, y, dx, dy);
        }
    }

    accept () : boolean {
        var c = 0;
        for (var j = 0; j < this.map.height; ++j) {
            for (var i = 0; i < this.map.width; ++i) {
                if (this.map.tile(i, j) === Tile.FLOOR) {
                    c++;
                }
            }
        }
        if (c / (this.map.width * this.map.height) > 0.2) {
            return true;
        }
        return false;
    }

    generate () : Map {
        do {
            this.map = new Map(80, 35, Tile.HARD_WALL);

            var x = (Rand.number() * 40) | 0;
            var y = (Rand.number() * 16) | 0;
            var w = (Rand.number() * 20) | 0 + 6;
            var h = (Rand.number() * 10) | 0 + 6;
            this.genRoom(x, y, w, h);
            var features = 0;
            var i = 0;
            while (features < 300 && i < 5000) {
                ++i;
                var x = (Rand.number() * this.map.width) | 0;
                var y = (Rand.number() * this.map.height) | 0;
                var t = this.map.tile(x, y);
                if (t !== Tile.HARD_WALL && t !== Tile.WALL) {
                    continue;
                }
                var dir = (Rand.number() * 1000 | 0) % 4;
                var dx = 0;
                var dy = 0;
                if (dir === 0) {
                    dx = 1;
                } else if (dir === 1) {
                    dx = -1;
                } else if (dir === 2) {
                    dy = 1;
                } else {
                    dy = -1;
                }
                if (this.map.tile(x - dx, y - dy) !== Tile.FLOOR) {
                    continue;
                }
                var b;
                if (Rand.number() < 0.2) {
                    b = this.tryGenCorridor(x, y, dx, dy);
                } else {
                    b = this.tryGenRoom(x, y, dx, dy);
                }
                if (b) {
                    features++;
                }
            }
            if (this.accept()) {
                for (var i = 0; i < 12; ++i) {
                    var xx;
                    var yy;
                    do {
                        xx = (Rand.number() * this.map.width) | 0;
                        yy = (Rand.number() * this.map.height) | 0;
                    } while (this.map.tile(xx, yy) !== Tile.FLOOR);
                    new MonsterNewt(xx, yy, this.map);
                }
                for (var i = 0; i < 5; ++i) {
                    var xx;
                    var yy;
                    do {
                        xx = (Rand.number() * this.map.width) | 0;
                        yy = (Rand.number() * this.map.height) | 0;
                    } while (this.map.tile(xx, yy) !== Tile.FLOOR);
                    new MonsterShadok(xx, yy, this.map);
                }
                return this.map;
            }
        } while (true);
    }
}

export = Dungeon;
