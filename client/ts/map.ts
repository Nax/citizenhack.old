/// <reference path="app.d.ts" />

module CitizenHack {
    export class Map {
        public width: number;
        public height: number;
        public data: Int32Array;
        public litMap: Int8Array;
        public image: Array<Symbol>;
        public monsters: Array<Entity> = [];

        constructor (width: number, height: number, tile: number) {
            this.width = width;
            this.height = height;
            this.data = new Int32Array(width * height);
            this.litMap = new Int8Array(width * height);
            this.image = new Array<Symbol>(width * height);
            for (var i = 0; i < width * height; ++i) {
                this.data[i] = tile;
                this.litMap[i] = 0;
                this.image[i] = Tile.getTile(Tile.NONE).sym;
            }
        }

        inRange (x: number, y: number) : boolean {
            return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
        }

        tile (x: number, y: number) : number {
            if (!this.inRange(x, y)) {
                return -1;
            }
            return this.data[x + y * this.width];
        }

        tileData (x: number, y: number) : Tile {
            return Tile.getTile(this.tile(x, y));
        }

        setTile (x: number, y: number, tile: number) : void {
            if (this.inRange(x, y)) {
                this.data[x + y * this.width] = tile;
            }
        }

        lit (x: number, y: number) : boolean {
            if (!this.inRange(x, y)) {
                return false;
            }
            return !!(this.litMap[x + y * this.width]);
        }
    }
}
