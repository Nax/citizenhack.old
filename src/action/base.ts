/// <reference path="../world.ts"/>

module Action {
	export abstract class Base {
		abstract execute(world: World, actor: Actor): void;
		abstract serialize(): Object;
	}
}
