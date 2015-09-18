var BaseComponent = require('base-frame-server/baseComponent'),
    defer = require('base-frame-server/util').defer;

function DiaryService() {
    this.init();
}

DiaryService.prototype = {

    addRecord: function ( d ) {
        var req = d.req,
            post_data = '';
        req.on('data', function ( chunk ) {
            post_data += chunk.toString( 'utf-8' );
        } );
        req.on('end', function () {
            console.log(post_data.split('&').map(function(i) { var r = i.split('='); var res = {}; res[r[0]] = r[1]; return res; } ));
        } );
        //return this.query('SELECT name FROM test WHERE id=' + id);
    },

    query: function (query) {
        return this.emit.mysqlQuery(query);
    }

};

DiaryService.extends(BaseComponent);

module.exports = DiaryService;