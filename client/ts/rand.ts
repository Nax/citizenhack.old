/// <reference path="app.d.ts" />

module CitizenHack {
    export module Rand {
        var _seed: number;

        export function seed (value: number) : void {
            _seed = value;
        }

        export function number () : number {
            var x = Math.sin(_seed++) * 10000;
            return x - Math.floor(x);
        }
    }
}
