/// <reference path="class.ts"/>
/// <reference path="player.ts"/>
/// <reference path="monster.ts"/>

var PlayerClass = Player;

module Monsters {
    export var Player = new Class(
        PlayerClass,
        "you",
        new Symbol('@', 'yellow', 'black'),
        new Stats(18, 10, 10)
    );

    export var Newt = new Class(
        Monster,
        "newt",
        new Symbol('n', '#888888', 'black'),
        new Stats(12, 6, 8)
    );

    export var Shadok = new Class(
        Monster,
        "shadok",
        new Symbol('S', 'orange', 'black'),
        new Stats(20, 2, 20)
    );

    export var FloatingEye = new Class(
        Monster,
        "floating eye",
        new Symbol('o', '#00ffff', 'black'),
        new Stats(10, 0, 2)
    );
}