import Status = require('./status');
import Promise = require('./promise');

module Prompt {
    export function direction (str: string) : Promise {
        var promise = new Promise;
        Status.print(str);
        var handler = document.onkeydown;
        document.onkeydown = ((e: KeyboardEvent) : boolean => {
            var solved = false;
            var value = null;

            if ($('#chatInput').is(':focus')) {
                return true;
            }

            e.preventDefault();
            switch (e.keyCode) {
                case 37:
                    solved = true;
                    value = [-1, 0];
                    break;
                case 38:
                    solved = true;
                    value = [0, -1];
                    break;
                case 39:
                    solved = true;
                    value = [1, 0];
                    break;
                case 40:
                    solved = true;
                    value = [0, 1];
                    break;
                default:
                    solved = true;
            }
            if (solved) {
                document.onkeydown = handler;
                if (value) {
                    promise.resolve(value);
                } else {
                    promise.refuse();
                }
            }
            return false;
        });
        return promise;
    }
}

export = Prompt;
