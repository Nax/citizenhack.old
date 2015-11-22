/// <reference path="app.d.ts" />

module CitizenHack {
    export class Map {
        width: number;
        height: number;
        data: Int32Array;

        constructor (width: number, height: number, tile: number) {
            this.width = width;
            this.height = height;
            this.data = new Int32Array(width * height);
            for (var i = 0; i < width * height; ++i) {
                this.data[i] = tile;
            }
        }

        private inRange (x: number, y: number) : boolean {
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
    }
}
