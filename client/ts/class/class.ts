/// <reference path="../app.d.ts" />

module CitizenHack {
    export class Class {

        public static     PLAYER = 0;
        public static     NEWT = 1;

        static classes: Class[] = [];

        public sym: Symbol;
        
        constructor (sym: Symbol) {
            this.sym = sym;
        }

        instanciate (x: number, y: number) : Entity {
            return new Entity(this, x, y);
        }

        static create (x: number, y: number, type: number) : Entity {
            return Class.classes[type].instanciate(x, y);
        }

        static register (type: number, klass: Class) : void {
            Class.classes[type] = klass;
        }
    }

    Class.register(Class.PLAYER, new Class(new Symbol('@', 'yellow', 'black')));
    Class.register(Class.NEWT, new Class(new Symbol('n', '#888888', 'black')));
}