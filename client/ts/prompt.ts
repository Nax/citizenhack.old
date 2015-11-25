/// <reference path="app.d.ts" />

module CitizenHack {
    export module Prompt {
        export function direction (str: string) : Promise {
            var promise = new Promise;
            Status.print(str);
            Event.async((e: any) => {
                switch (e) {
                    case 'left':
                        promise.resolve([-1, 0]);
                        break;
                    case 'up':
                        promise.resolve([0, -1]);
                        break;
                    case 'right':
                        promise.resolve([1, 0]);
                        break;
                    case 'down':
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