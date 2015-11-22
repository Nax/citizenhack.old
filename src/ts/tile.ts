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

        public char: string;
        public color: string;
        public bgcolor: string;

        constructor (char = ' ', color = 'white', bgcolor = 'black') {
            this.char = char;
            this.color = color;
            this.bgcolor = bgcolor;
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

    Tile.register(Tile.NONE, new Tile);
    Tile.register(Tile.WALL, new Tile(' ', 'white', 'white'));
    Tile.register(Tile.HARD_WALL, new Tile());
    Tile.register(Tile.FLOOR, new Tile('.', 'white'));
    Tile.register(Tile.CLOSED_DOOR, new Tile('+', 'brown'));
    Tile.register(Tile.OPEN_DOOR, new Tile('O', 'brown'));
}
