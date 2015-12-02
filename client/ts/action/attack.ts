/// <reference path="action.ts"/>

module CitizenHack {
    export class AttackAction extends Action {
        public dx: number;
        public dy: number;

        constructor(dx: number, dy: number) {
            super();
            this.dx = dx;
            this.dy = dy;
        }

        execute(world: World, actor: Actor): void {
            var map = actor.map;
            var x = actor.x + this.dx;
            var y = actor.y + this.dy;

            map.actors.forEach((a: Actor) => {
                if (a.x === x && a.y === y) {
                    var you = actor.name();
                    if (!actor.properName()) {
                        you = 'the ' + you;
                    }
                    var it = a.name();
                    if (!a.properName()) {
                        it = 'the ' + it;
                    }
                    var s = actor.isPlayer() ? '' : 's';
                    var str = you + ' attack' + s + ' ' + it + '!';
                    str = str.charAt(0).toUpperCase() + str.slice(1);
                    Status.print(str);
                    a.hp -= (actor.str / 2) | 0;
                    if (a.hp <= 0) {
                        a.hp = 0;
                        a.dead = true;
                        world.deadFlag = true;
                        it = it.charAt(0).toUpperCase() + it.slice(1);
                        if (!a.isPlayer()) {
                            Status.print(it + ' is killed!');
                        } else {
                            Status.print('You die.');
                        }
                    }
                    return;
                }
            });
        }

        serialize(): Object {
            return {
                type: 'a',
                x: this.dx,
                y: this.dy
            }
        }
    }
}
