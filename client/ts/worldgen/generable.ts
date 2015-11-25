/// <reference path="../app.d.ts" />

module CitizenHack.Worldgen {
    export interface Generable {
        generate(): Map;
    }
}