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

        execute (world: World, actor: Actor) : void {
            var map = actor.map;
            var x = actor.x + this.dx;
            var y = actor.y + this.dy;
            var attack = false;

            map.actors.forEach((a: Actor) => {
                if (a.x === x && a.y === y) {
                    var action = new AttackAction(this.dx, this.dy);
                    action.execute(world, actor);
                    attack = true;
                    return;
                }
            });

            if (attack) {
                return;
            }

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
