interface ActorClass {
    new (klass: Class, map: Map, x: number, y: number) : Actor;
}

class Class {
    private static _id = 0;

    public id: number;
    public actorClass: ActorClass;
    public symbol: Symbol;
    public stats: Stats;
    public name: string;

    constructor (actorClass: ActorClass, name: string, symbol: Symbol, stats: Stats) {
        this.id = Class._id++;
        this.actorClass = actorClass;
        this.name = name;
        this.symbol = symbol;
        this.stats = stats;
    }
    
    create (map: Map, x: number, y: number) : Actor {
        var actor = new this.actorClass(this, map, x, y);
        map.actors.push(actor);
        return actor;
    }
}
