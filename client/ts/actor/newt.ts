/// <reference path="../action/action.ts" />
/// <reference path="../action/move.ts" />

module CitizenHack {
    export class MonsterNewt extends Monster {
        static sym = new Symbol('n', '#888888', 'black');

        constructor(x: number, y: number, map: Map) {
            super(x, y, map);
            this.speed = 8;
        }

        symbol () : Symbol {
            return MonsterNewt.sym;
        }

        play () : Action {
            var x = 0;
            var y = 0;

            switch (Rand.integer(4)) {
                case 0:
                    x = -1;
                    break;
                case 1:
                    x = 1;
                    break;
                case 2:
                    y = -1;
                    break;
                case 3:
                    y = 1;
            }
            return new MoveAction(x, y);
        }
    }
}
