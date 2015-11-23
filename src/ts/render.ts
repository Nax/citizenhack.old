/// <reference path="app.d.ts" />

module CitizenHack {
    export class Render {
        mapCanvas: HTMLCanvasElement;
        mapCtx: CanvasRenderingContext2D;

        constructor () {
            this.mapCanvas = <HTMLCanvasElement>document.getElementById('map');
            this.mapCtx = this.mapCanvas.getContext('2d');
        }

        renderMap(m: Map, player: Entity) : void {
            this.mapCanvas.width = m.width * 14;
            this.mapCanvas.height = m.height * 14;
            this.mapCtx.font = '10pt Monospace';
            this.mapCtx.textBaseline = 'top';
            this.mapCtx.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
            for (var j = 0; j < m.height; ++j) {
                for (var i = 0; i < m.width; ++i) {
                    var sym: Symbol;
                    var t = m.tileData(i, j);
                    if (player.x === i && player.y === j) {
                        sym = player.klass.sym;
                    } else {
                        sym = t.sym;
                    }
                    this.mapCtx.fillStyle = sym.bgcolor;
                    this.mapCtx.fillRect(14 * i, 14 * j, 14, 14);
                    this.mapCtx.fillStyle = sym.color;
                    this.mapCtx.fillText(sym.char, i * 14 + 3, j * 14);
                }
            }
        }
    }
}
