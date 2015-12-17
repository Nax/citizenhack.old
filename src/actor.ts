/// <reference path="class.ts"/>
/// <reference path="map.ts"/>
/// <reference path="stats.ts"/>
/// <reference path="action/action.ts"/>

abstract class Actor {
    public klass: Class;
    public map: Map;
    public x: number;
    public y: number;
    public dead: boolean;
    public stats: Stats;
    public energy: number;

    constructor (klass: Class, map: Map, x: number, y: number) {
        this.klass = klass;
        this.map = map;
        this.x = x;
        this.y = y;
        this.dead = false;
        this.stats = klass.stats.clone();
        this.energy = 0;
    }
    
    act () : boolean {
        this.energy += this.stats.speed;
        if (this.energy >= 100) {
            this.energy -= 100;
            return true;
        }
        return false;
    }
    
    abstract play () : Action.Base | Promise;
}
