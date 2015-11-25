/// <reference path="app.d.ts" />

module CitizenHack {
    export module Light {
        
        export function compute (map: Map, player: Entity) : void {
            for (var i = 0; i < map.width * map.height; ++i) {
                map.litMap[i] = 0;
            }
            computeCast(map, player.x, player.y);
        }

        function computeCast (map: Map, px: number, py: number) : void {
            var count = 300;
            var delta = 1.0 / count;

            for (var i = 0; i < count; ++i) {
                var angle = Math.PI * 2 * delta * i;
                var dx = Math.cos(angle);
                var dy = Math.sin(angle);

                var x = px;
                var y = py;

                while (map.inRange(x | 0, y | 0)) {
                    var xi = Math.round(x);
                    var yi = Math.round(y);

                    map.litMap[xi + yi * map.width] = 1;

                    if (map.tileData(xi, yi).solid) {
                        break;
                    }
                    x += dx;
                    y += dy;
                }
            }
        }
    }
}