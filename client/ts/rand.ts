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

        export function integer (n: number) : number {
            return (Rand.number() * n) | 0;
        }
    }
}
