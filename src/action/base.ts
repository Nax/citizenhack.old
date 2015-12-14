import World = require('../world');
import Actor = require('../actor');

abstract class Base {
    abstract execute(world: World, actor: Actor): void;
    abstract serialize(): Object;
}

export = Base;
