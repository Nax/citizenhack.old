/// <reference path="app.d.ts" />

module CitizenHack {
    class Game {

        constructor () {
        
        }

        hello () : void {
            console.log('hi')
        }

        keypress (event: KeyboardEvent) : void {
            if (event.charCode === 0x69) {
                $('#inventory').toggleClass('hidden')
            }
        }
    }

    $(document).ready(function() {
        var game = new Game
        var wg = new Worldgen.GeneratorDungeon;
        var map = wg.generate();
        Render.map(map)

        $(document).keypress(function (event: KeyboardEvent) {
            game.keypress(event)
        })
    })
}
