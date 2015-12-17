/// <reference path="base.ts"/>

module Action {
    export class Attack extends Action.Base {
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
                    var you = actor.klass.name;
                    if (!(actor instanceof Player)) {
                        you = 'the ' + you;
                    }
                    var it = a.klass.name;
                    if (!(a instanceof Player)) {
                        it = 'the ' + it;
                    }
                    var s = actor instanceof Player ? '' : 's';
                    var str = you + ' attack' + s + ' ' + it + '!';
                    str = str.charAt(0).toUpperCase() + str.slice(1);
                    Status.print(str);
                    a.stats.hp -= (actor.stats.str / 2) | 0;
                    if (a.stats.hp <= 0) {
                        a.stats.hp = 0;
                        a.dead = true;
                        world.deadFlag = true;
                        it = it.charAt(0).toUpperCase() + it.slice(1);
                        if (!(a instanceof Player)) {
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
