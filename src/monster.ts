/// <reference path="actor.ts"/>

class Monster extends Actor {
	play () : Action.Base {
		var moves = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1]	
		];
		
		var m = moves[Rand.integer(4)];
		return new Action.Move(m[0], m[1]);
	}
}
