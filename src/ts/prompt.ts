/// <reference path="app.d.ts" />

module CitizenHack {
    export module Prompt {
        export function direction (str: string) : Promise {
            var promise = new Promise;
            Status.print(str);
            Event.async((e: KeyboardEvent) => {
                switch (e.keyCode) {
                    case 37:
                        promise.resolve([-1, 0]);
                        break;
                    case 38:
                        promise.resolve([0, -1]);
                        break;
                    case 39:
                        promise.resolve([1, 0]);
                        break;
                    case 40:
                        promise.resolve([0, 1]);
                        break;
                    default:
                        promise.refuse();
                }
            });
            return promise;
        }
    }
}