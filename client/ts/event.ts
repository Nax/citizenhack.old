/// <reference path="app.d.ts" />

module CitizenHack {
    export module Event {
        var handleFn: Function;
        var afterFn: Function;

        export function handler (fn: Function) : void {
            handleFn = fn;
        }

        export function after (fn: Function) : void {
            afterFn = fn;
        }

        export function push (data: any) : void {
            if (handleFn) {
                handleFn(data);
            }
            if (afterFn) {
                afterFn(data);
            }
        }

        export function async (callback: Function) : void {
            var handler = handleFn;
            handleFn = (data) => {
                handleFn = handler;
                callback(data);
            }
        }
    }
}
