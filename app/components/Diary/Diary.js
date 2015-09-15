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
            'on@request:diary': defer(function(data) {
                var self = this;

                this.render( 'diary-index' );
            }),

            'on@request:diary_new-record': defer( function ( data ) {
                var self = this;
                this.diaryService.addRecord( data ).then( function () {
                    self.render( 'diary-index' );
                } );
            } )
        }
    },

    diaryService: new DiaryService(),

    dirname: __dirname

};

DiaryComponent.extends(BaseComponent);

module.exports = DiaryComponent;