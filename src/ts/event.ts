/// <reference path="app.d.ts" />

module CitizenHack {
    export module Event {
        export function async (callback: Function) : void {
            var handler = document.onkeydown;
            document.onkeydown = function(e: KeyboardEvent) {
                callback(e);
                document.onkeydown = handler;
            }.bind(this);
        }
    }
}
