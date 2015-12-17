/// <reference path="../map.ts"/>
/// <reference path="dungeon.ts"/>

module WorldGen {
    export interface Generable {
        generate(): Map;
    }
}
