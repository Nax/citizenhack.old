/// <reference path="action/action.ts"/>
/// <reference path="world.ts"/>
/// <reference path="render.ts"/>
/// <reference path="light.ts"/>

module CitizenHack {
    export class Game {
        public renderer: Render;
        public world: World;
        public actors: Array<Actor> = [];
        public socket: SocketIOClient.Socket;
        public spectate: boolean;
        public actionReplay: Array<Action> = [];

        constructor (socket: SocketIOClient.Socket, spectate: boolean) {
            Status.print('Welcome to CitizenHack!');
            this.socket = socket;
            this.spectate = spectate;
            this.world = new World;
            this.renderer = new Render;
            this.world.player.network(socket, spectate);
            this.actors.push(this.world.player);
            this.actors = this.actors.concat(this.world.player.map.actors);
            this.render();
        }

        loop () : void {
            while (true) {
                var actor = this.actors.shift();
                this.actors.push(actor);
                if (actor.act()) {
                    var actionPromise = actor.play();
                    if (actionPromise instanceof Action) {
                        actionPromise.execute(actor);
                    } else if (actionPromise instanceof Promise) {
                        actionPromise.then((action: Action) => {
                            action.execute(actor);
                            this.socket.emit('event', action.serialize());
                            this.loop();
                        });
                        this.render();
                        if (this.actionReplay.length > 0) {
                            var action = this.actionReplay.shift();
                            actionPromise.resolve(action);
                            if (this.actionReplay.length === 0) {
                                this.renderer.enable();
                                this.render();
                            }
                        }
                        return;
                    }
                }
            }
        }

        render () : void {
            Light.compute(this.world);
            this.renderer.render(this.world);
        }
    }
}
