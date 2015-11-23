/// <reference path="app.d.ts" />

module CitizenHack {
    export class Tile {
        public static NONE            = -1;
        public static WALL            = 0;
        public static HARD_WALL       = 1;
        public static FLOOR           = 2;
        public static CLOSED_DOOR     = 3;
        public static OPEN_DOOR       = 4;

        static tiles: Tile[] = [];
        static none: Tile;

        public sym: Symbol;
        public solid: boolean;

        constructor (sym: Symbol, options = {}) {
            this.sym = sym;
            var solid = options['solid'];
            this.solid = solid === undefined ? true : solid;
        }

        static register(index: number, tile: Tile) {
            if (index === Tile.NONE) {
                this.none = tile;
            } else {
                this.tiles[index] = tile;
            }
        }

        static getTile(index: number) : Tile {
            if (index === Tile.NONE) {
                return this.none;
            } else {
                return this.tiles[index];
            }
        }
    }

    Tile.register(Tile.NONE, new Tile(new Symbol(' ', 'black', 'black')));
    Tile.register(Tile.WALL, new Tile(new Symbol(' ', 'white', 'white')));
    Tile.register(Tile.HARD_WALL, new Tile(new Symbol(' ', 'black', 'black')));
    Tile.register(Tile.FLOOR, new Tile(new Symbol('.', 'white', 'black'), { solid: false }));
    Tile.register(Tile.CLOSED_DOOR, new Tile(new Symbol('+', 'brown', 'black')));
    Tile.register(Tile.OPEN_DOOR, new Tile(new Symbol('O', 'brown', 'black'), { solid: false }));
}
