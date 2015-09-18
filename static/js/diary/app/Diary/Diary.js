import { BaseComponent } from 'base-frame';

import FormView from './views/FormView';

function Diary() {
    this.init();

    this.form = new FormView();

    this.form.on('error').then(this.emit.errorForm);
    this.form.on('started').then(this.emit.startForm);
    this.form.on('end', this).then(function ( data ) {
        this.emit.newRecord( data );
        this.emit.newForm();
    });

    this.emit.newForm();
}

Diary.prototype = {

    signals: {
        global: {

        },
        local: {
            'trigger@form:new': 'newForm',
            'trigger@form:error': 'errorForm',
            'trigger@form:start': 'startForm',
            'trigger@diary:record': 'newRecord'
        }
    },

    slots: {
        global: {

        },
        local: {
            'on@form:new': function () {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    started: false
                } );
            },
            'on@form:error': function ( obj ) {
                this.form.render( {
                    exerciseEmpty: obj.exerciseEmpty,
                    weightEmpty: obj.weightEmpty,
                    started: false
                } );
            },
            'on@form:start': function () {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    started: true
                } );
            },
            'on@diary:record': function ( data ) {
                console.log( data );
            }
        }
    }

};

Diary.extends( BaseComponent );

export default Diary;