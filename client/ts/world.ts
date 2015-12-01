module CitizenHack {
    export class World {
        public maps: Array<Map> = [];
        public player: Player;

        constructor () {
            var generator = new Worldgen.GeneratorDungeon;
            var m = generator.generate();
            this.maps.push(m);
            var x;
            var y;
            do {
                x = (Rand.number() * m.width) | 0;
                y = (Rand.number() * m.height) | 0;
            } while (m.tile(x, y) !== Tile.FLOOR); // KLUDGE
            this.player = new Player(x, y, m);
        }
    }
}