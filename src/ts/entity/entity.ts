/// <reference path="../app.d.ts" />

module CitizenHack {
    export class Entity {
        public klass: Class;
        public x: number;
        public y: number;

        constructor (klass: Class, x: number, y: number) {
            this.klass = klass;
            this.x = x;
            this.y = y;
        }
    }
}
