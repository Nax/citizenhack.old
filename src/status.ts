import $ = require('jquery');

module Status {
    export function print (str: string) : void {
        var p = $('<p>');
        p.text(str);
        $('#status').append(p);
        $('#status').scrollTop(10000);
    }
}

export = Status;
