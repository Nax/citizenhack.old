import _Base = require('./base');
import _OpenClose = require('./openclose');
import _Move = require('./move');
import _Attack = require('./attack');

module Action {
    export var Base = _Base;
    export var OpenClose = _OpenClose;
    export var Move = _Move;
    export var Attack = _Attack;

    export function  unserialize (object: Object) : _Base {
        switch (object['type']) {
            case 'oc':
                return new _OpenClose(object['x'], object['y'], object['o']);
            case 'm':
                return new _Move(object['x'], object['y']);
            case 'a':
                return new _Attack(object['x'], object['y']);
            default:
                return null;
        }
    }
}

export = Action;
