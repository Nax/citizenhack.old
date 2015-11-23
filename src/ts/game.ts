/// <reference path="app.d.ts" />

module CitizenHack {
    export class Game {
        public map: Map;
        public player: Entity;
        public renderer: Render;

        constructor () {
            Status.print('Welcome to CitizenHack!');
            this.map = (new Worldgen.GeneratorDungeon).generate();
            var x;
            var y;
            do {
                x = Math.random() * this.map.width | 0;
                y = Math.random() * this.map.height | 0;
            } while (this.map.tile(x, y) !== Tile.FLOOR);
            this.player = Class.create(x, y, Class.PLAYER);
            this.renderer = new Render;
            document.onkeydown = this.keypress.bind(this);
            this.render();
        }

        move (dx: number, dy: number) : void {
            var x = this.player.x + dx;
            var y = this.player.y + dy;
            var t = this.map.tileData(x, y);
            if (!t.solid) {
                this.player.x = x;
                this.player.y = y;
            }
            this.render();
        }

        keypress (event: KeyboardEvent) : void {
            if (event.keyCode === 73) {
                $('#inventory').toggleClass('hidden')
            } else if (event.keyCode === 38) {
                this.move(0, -1);
            } else if (event.keyCode === 40) {
                this.move(0, 1);
            } else if (event.keyCode === 37) {
                this.move(-1, 0);
            } else if (event.keyCode === 39) {
                this.move(1, 0);
            } else if (event.keyCode === 79) {
                Action.open(this);
            } else if (event.keyCode === 67) {
                Action.close(this);
            }
            console.log(event.keyCode);
        }

        render () : void {
            this.renderer.renderMap(this.map, this.player);
        }
    }

    $(document).ready(function() {
        var game = new Game;
    })
}
