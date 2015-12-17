/// <reference path="actor.ts"/>
/// <reference path="prompt.ts"/>

class Player extends Actor {
	private socket: SockettySocket = null;
	
    play () : Promise {
		var p = new Promise;
		if (this.socket) {
			this.socket.on('event', (msg: Object) => {
				p.resolve(Action.unserialize(msg));
			});
		} else {
			document.onkeydown = (e: KeyboardEvent) : boolean => {
				if ($('#chatInput').is(':focus')) {
					return true;
				}
				switch (e.keyCode) {
					case 37:
						this.move(p, -1, 0);
						break;
					case 38:
						this.move(p, 0, -1);
						break;
					case 39:
						this.move(p, 1, 0);
						break;
					case 40:
						this.move(p, 0, 1);
						break;
					case 79:
						this.open(p, true);
						break;
					case 67:
						this.open(p, false);
						break;
				}
				e.preventDefault();
				return false;
			}
		}
		return p;
	}
	
	network (socket: SockettySocket, spectate: boolean) : void {
		if (spectate) {
			this.socket = socket;
		}
	}
	
	move (p: Promise, dx: number, dy: number) : void {
		p.resolve(new Action.Move(dx, dy));
	}
	
	open (p: Promise, open: boolean) : void {
		Prompt.direction('In what direction do you want to ' + (open ? 'open' : 'close') + ' things?')
			.then((dir: Array<number>) => {
				p.resolve(new Action.OpenClose(dir[0], dir[1], open));
			})
			.error(() => {
				Status.print('Nevermind.');
			});
	}
}
