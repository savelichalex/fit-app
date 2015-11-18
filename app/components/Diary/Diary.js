var BaseComponent = require('base-frame-server/baseComponent'),
    DiaryService = require('./services/DiaryService'),
    defer = require('base-frame-server/util').defer;

function DiaryComponent() {
    this.init();
}

DiaryComponent.prototype = {

    'signals': {
        'global': {
            'command@mysql:query': 'mysqlQuery'
        }
    },

    slots: {
        'global': {
            'on@request:diary': defer( function( data ) {
                this.render( 'diary-index', {}, data.res );
            }),

            'on@request:diary_new-record': defer( function ( data ) {
                var self = this;
                this.diaryService.addRecord( data );
                //    .then( function () {
                //    self.render( 'diary-index' );
                //} );
            }),

            'on@request:diary_exercises_search': defer(function (data) {
                var self = this;
                this.diaryService.getExercises(data.params[0])
                    .then(function (d) {
                        console.log(self);
                        self.json(d.map(o => o.dataValues.title), data.res);
                    })
            } )
        }
    },

    diaryService: new DiaryService(),

    dirname: __dirname

};

DiaryComponent.extends(BaseComponent);

module.exports = DiaryComponent;