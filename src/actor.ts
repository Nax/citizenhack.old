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
    
    damage (n: number) : void {
        this.stats.hp -= n;
        if (this.stats.hp > this.stats.hpMax) {
            this.stats.hp = this.stats.hpMax;
        } else if (this.stats.hp <= 0) {
            this.stats.hp = 0;
            this.dead = true;
        }
    }
    
    afterPlay () : void {
        if (this.dead) {
            return;
        }
        
        if (this.klass.id != Monsters.NuclearEye.id) {
            this.map.actors.forEach((a: Actor) => {
                if (a.klass.id != Monsters.NuclearEye.id) {
                    return;
                }
                var dx = this.x - a.x;
                var dy = this.y - a.y;
                if (dx * dx + dy * dy <= 9) {
                    this.damage(1);
                }
            });
        }
    }
}
