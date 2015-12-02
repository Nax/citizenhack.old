/// <reference path="../map.ts" />
/// <reference path="../rand.ts" />

module CitizenHack {
    export abstract class Actor {
        public x: number;
        public y: number;
        public map: Map;
        public energy: number;
        public speed: number;
        public str: number;
        public hp: number;
        public hpMax: number;
        public dead: boolean = false;
        
        constructor (x: number, y: number, map: Map) {
            this.energy = Rand.integer(99);
            this.x = x;
            this.y = y;
            this.map = map;
            map.actors.push(this);
        }

        abstract isPlayer () : boolean;
        abstract symbol() : Symbol;
        abstract play() : Action | Promise;
        abstract name() : string;

        properName () : boolean {
            return false;
        }

        act () : boolean {
            this.energy += this.speed;
            if (this.energy >= 100) {
                this.energy -= 100;
                return true;
            }
            return false;
        }
    }
}