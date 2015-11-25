/// <reference path="../app.d.ts" />

module CitizenHack {
    export module Action {
        function openclose (game: Game, open: boolean) : void {
            var p = Prompt.direction('In what direction do you want to ' + (open ? 'open' : 'close') + ' things?');
            p.then((d: Array<number>) => {
                var x = game.player.x + d[0];
                var y = game.player.y + d[1];
                var t = game.map.tile(x, y);
                if (t === (open ? Tile.CLOSED_DOOR : Tile.OPEN_DOOR)) {
                    game.map.setTile(x, y, (open ? Tile.OPEN_DOOR : Tile.CLOSED_DOOR));
                    game.render();
                } else if (t === (open ? Tile.OPEN_DOOR : Tile.CLOSED_DOOR)) {
                    Status.print('The door is already ' + (open ? 'open' : 'closed') + '.');
                } else {
                    Status.print('There is nothing to ' + (open ? 'open' : 'close') + ' here.');
                }
            }).error(() => {
                Status.print('Nevermind.');
            });
        }

        export function open (game: Game) : void {
            openclose(game, true);
        }

        export function close(game: Game): void {
            openclose(game, false);
        }
    }
}