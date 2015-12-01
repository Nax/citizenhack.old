/// <reference path="action.ts"/>

module CitizenHack {
    export class MoveAction extends Action {
        public dx: number;
        public dy: number;

        constructor (dx: number, dy: number) {
            super();
            this.dx = dx;
            this.dy = dy;
        }

        execute (actor: Actor) : void {
            var map = actor.map;
            var x = actor.x + this.dx;
            var y = actor.y + this.dy;
            var tileData = map.tileData(x, y);
            
            if (!tileData.solid) {
                actor.x = x;
                actor.y = y;
            }
        }

        serialize () : Object {
            return {
                type: 'm',
                x: this.dx,
                y: this.dy
            }
        }
    }
}
