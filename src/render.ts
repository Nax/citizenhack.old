import World = require('./world');
import Symbol = require('./symbol');
import $ = require('jquery');

class Render {
    mapCanvas: HTMLCanvasElement;
    mapCtx: CanvasRenderingContext2D;
    enabled = true;

    constructor () {
        this.mapCanvas = <HTMLCanvasElement>document.getElementById('map');
        this.mapCtx = this.mapCanvas.getContext('2d');
    }

    enable () : void {
        this.enabled = true;
    }

    disable () : void {
        this.enabled = false;
    }

    render (world: World) : void {
        var player = world.player;
        var map = player.map;

        if (this.enabled) {
            this.mapCanvas.width = map.width * 14;
            this.mapCanvas.height = map.height * 14;
            this.mapCtx.font = '10pt Monospace';
            this.mapCtx.textBaseline = 'top';
            this.mapCtx.clearRect(0, 0, this.mapCanvas.width, this.mapCanvas.height);
            this.renderInfo(world);
        }

        for (var j = 0; j < map.height; ++j) {
            for (var i = 0; i < map.width; ++i) {
                var sym: Symbol;
                var t = map.tileData(i, j);
                if (player.x === i && player.y === j) {
                    sym = player.symbol();
                } else {
                    sym = t.sym;
                    map.actors.forEach((m) => {
                        if (m.x === i && m.y === j) {
                            sym = m.symbol();
                        }
                    });
                }
                if (map.lit(i, j)) {
                    map.image[i + j * map.width] = t.sym;
                } else {
                    sym = map.image[i + j * map.width];
                }
                if (this.enabled) {
                    this.mapCtx.fillStyle = sym.bgcolor;
                    this.mapCtx.fillRect(14 * i, 14 * j, 14, 14);
                    this.mapCtx.fillStyle = sym.color;
                    this.mapCtx.fillText(sym.char, i * 14 + 3, j * 14);
                }
            }
        }
    }

    renderInfo (world: World) : void {
        var player = world.player;
        var percent = Math.ceil(player.hp / player.hpMax * 100);

        $('#hp').text(player.hp + ' / ' + player.hpMax);
        $('#hpBar').css('width', percent + '%');
    }
}

export = Render;
