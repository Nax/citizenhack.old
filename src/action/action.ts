/// <reference path="attack.ts" />
/// <reference path="move.ts" />
/// <reference path="openclose.ts" />
/// <reference path="../world.ts"/>
/// <reference path="../actor.ts"/>

module Action {
    export function unserialize (object: Object) : Action.Base {
        switch (object['type']) {
            case 'oc':
                return new OpenClose(object['x'], object['y'], object['o']);
            case 'm':
                return new Move(object['x'], object['y']);
            case 'a':
                return new Attack(object['x'], object['y']);
            default:
                return null;
        }
    }
}
