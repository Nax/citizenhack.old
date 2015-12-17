/// <reference path="../typings/tsd.d.ts"/>

module Status {
    export function print (str: string) : void {
        var p = $('<p>');
        p.text(str);
        $('#status').append(p);
        $('#status').scrollTop(10000);
    }
}
