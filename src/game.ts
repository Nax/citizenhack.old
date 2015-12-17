/// <reference path="render.ts"/>
/// <reference path="world.ts"/>
/// <reference path="action/action.ts"/>
/// <reference path="status.ts"/>
/// <reference path="promise.ts"/>
/// <reference path="actor.ts"/>
/// <reference path="light.ts"/>

class Game {
    public renderer: Render;
    public world: World;
    public socket: SockettySocket;
    public spectate: boolean;
    public actionReplay: Array<Action.Base> = [];

    constructor (socket: SockettySocket, spectate: boolean) {
        Status.print('Welcome to CitizenHack!');
        this.socket = socket;
        this.spectate = spectate;
        this.world = new World;
        this.renderer = new Render;
        this.world.player.network(socket, spectate);
        this.render();
    }

    loop () : void {
        while (true) {
            if (this.world.deadFlag) {
                this.filterDead();
                if (this.world.player.dead) {
                    document.onkeydown = undefined;
                    this.render();
                    return;
                }
            }
            var actors = this.world.player.map.actors;
            var actor = actors.shift();
            actors.push(actor);
            if (actor.act()) {
                var actionPromise = actor.play();
                if (actionPromise instanceof Action.Base) {
                    actionPromise.execute(this.world, actor);
                } else if (actionPromise instanceof Promise) {
                    actionPromise.then((action: Action.Base) => {
                        action.execute(this.world, actor);
                        this.socket.send('event', action.serialize());
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

    filterDead () : void {
        this.world.deadFlag = false;
        var newActors: Array<Actor> = [];
        var map = this.world.player.map;
        map.actors.forEach((a: Actor) => {
            if (!a.dead || a instanceof Player) {
                newActors.push(a);
            }
        });
        this.world.player.map.actors = newActors;
    }

    render () : void {
        Light.compute(this.world);
        this.renderer.render(this.world);
    }
}
