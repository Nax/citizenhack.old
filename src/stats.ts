class Stats {
    public hp: number;
    public hpMax: number;
    public str: number;
    public speed: number;

    constructor (hp: number, str: number, speed: number) {
        this.hp = this.hpMax = hp;
        this.str = str;
        this.speed = speed;
    }
    
    clone () : Stats {
        var s = new Stats(this.hp, this.str, this.speed);
        s.hpMax = this.hpMax;
        return s;
    }
}
