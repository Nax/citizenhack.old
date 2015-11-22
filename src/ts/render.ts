/// <reference path="app.d.ts" />

module CitizenHack.Render {
    export function map (m: Map) : void {
        var table = $('<table>')
        for (var j = 0; j < m.height; ++j) {
            var tr = $('<tr>')
            for (var i = 0; i < m.width; ++i) {
                var t = m.tileData(i, j);
                var td = $('<td>')
                td.text(t.char)
                td.css('color', t.color);
                td.css('background-color', t.bgcolor);
                tr.append(td)
            }
            table.append(tr)
        }
        var mapDom = $('#map')
        mapDom.empty()
        mapDom.append(table)
    }
}
