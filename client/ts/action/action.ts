/// <reference path="../actor/actor.ts" />

module CitizenHack {
    export abstract class Action {
        abstract execute (actor: Actor) : void;
        abstract serialize () : Object;

        static unserialize (object: Object) : Action {
            switch (object['type']) {
                case 'oc':
                    return new OpenCloseAction(object['x'], object['y'], object['o']);
                case 'm':
                    return new MoveAction(object['x'], object['y']);
                default:
                    return null;
            }
        }
    }
}
