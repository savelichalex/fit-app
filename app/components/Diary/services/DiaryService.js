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

    getExercises: function (exercise) {
        exercise = decodeURIComponent(exercise);
        exercise = exercise.toLowerCase();

        if (exercise === 'any') {
            return this.query('SELECT `exercize_title` FROM `exercises` LIMIT 3');
        } else {
            return this.query('SELECT `exercize_title` FROM `exercises` WHERE `exercize_title` LIKE \"' + exercise + '%\" LIMIT 3');
        }
    },

    query: function (query) {
        return this.emit.mysqlQuery(query);
    }

};

DiaryService.extends(BaseComponent);

module.exports = DiaryService;