/// <reference path="actor.ts" />

module CitizenHack {
    export abstract class Monster extends Actor {
        constructor (x: number, y: number, map: Map) {
            super(x, y, map);
            map.actors.push(this);
        }

        isPlayer () : boolean {
            return false;
        }
    }
}