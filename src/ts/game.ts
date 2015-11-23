/// <reference path="app.d.ts" />

module CitizenHack {
    class Game {
        public map: Map;
        public player: Entity;
        public renderer: Render;

        constructor () {
            Status.print('Welcome to CitizenHack!');
            this.map = (new Worldgen.GeneratorDungeon).generate();
            this.player = Class.create(10, 10, Class.PLAYER);
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
            } else {
                this.open();
            }
            console.log(event.keyCode);
        }

        open () : void {
            var p = Prompt.direction('In what direction do you want to open things?');
            p.then((d: Array<number>) => {
                var x = this.player.x + d[0];
                var y = this.player.y + d[1];
                var t = this.map.tile(x, y);
                if (t === Tile.CLOSED_DOOR) {
                    this.map.setTile(x, y, Tile.OPEN_DOOR);
                    this.render();
                } else if (t === Tile.OPEN_DOOR) {
                    Status.print('The door is already open.');
                } else {
                    Status.print('There is nothing to open here.');
                }
            }).error(() => {
                Status.print('Nevermind.');
            });
        }

        render () : void {
            this.renderer.renderMap(this.map, this.player);
        }
    }

    $(document).ready(function() {
        var game = new Game;
    })
}
