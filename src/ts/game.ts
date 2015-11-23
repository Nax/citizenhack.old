/// <reference path="app.d.ts" />

module CitizenHack {
    class Game {
        public map: Map;
        public player: Entity;
        public renderer: Render;

        constructor () {
            this.map = (new Worldgen.GeneratorDungeon).generate();
            this.player = Class.create(10, 10, Class.PLAYER);
            this.renderer = new Render;
            this.render();
        }

        move (dx: number, dy: number) : void {
            this.player.x += dx;
            this.player.y += dy;
            this.render();
        }

        keypress (event: KeyboardEvent) : void {
            if (event.keyCode === 0x69) {
                $('#inventory').toggleClass('hidden')
            } else if (event.keyCode === 38) {
                this.move(0, -1);
            } else if (event.keyCode === 40) {
                this.move(0, 1);
            } else if (event.keyCode === 37) {
                this.move(-1, 0);
            } else if (event.keyCode === 39) {
                this.move(1, 0);
            }
            console.log(event.keyCode);
        }

        render () : void {
            this.renderer.renderMap(this.map, this.player);
        }
    }

    $(document).ready(function() {
        var game = new Game;

        $(document).keydown(function (event: KeyboardEvent) {
            game.keypress(event)
        })
    })
}
