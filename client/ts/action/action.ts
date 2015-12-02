/// <reference path="../actor/actor.ts" />
/// <reference path="../world.ts" />

module CitizenHack {
    export abstract class Action {
        abstract execute (world: World, actor: Actor) : void;
        abstract serialize () : Object;

        static unserialize (object: Object) : Action {
            switch (object['type']) {
                case 'oc':
                    return new OpenCloseAction(object['x'], object['y'], object['o']);
                case 'm':
                    return new MoveAction(object['x'], object['y']);
                case 'a':
                    return new AttackAction(object['x'], object['y']);
                default:
                    return null;
            }
        }
    }
}
