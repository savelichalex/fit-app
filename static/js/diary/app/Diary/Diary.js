import { BaseComponent } from 'base-frame';

import FormView from './views/FormView';

function Diary() {
    this.init();

    this.form = new FormView();

    this.form.on('error').then(this.emit.errorForm);
    this.form.on('started').then(this.emit.startForm);
    this.form.on('before-end').then(this.emit.beforeEnd);
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
            'trigger@form:beforeEnd': 'beforeEnd',
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
                    repetitionsEmpty: false,
                    state: 'new'
                } );
            },
            'on@form:error': function ( obj ) {
                this.form.render( {
                    exerciseEmpty: obj.exerciseEmpty,
                    weightEmpty: obj.weightEmpty,
                    repetitionsEmpty: false,
                    state: 'new'
                } );
            },
            'on@form:start': function () {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    repetitionsEmpty: false,
                    state: 'started'
                } );
            },
            'on@form:beforeEnd': function ( err ) {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    repetitionsEmpty: !!err,
                    state: 'beforeEnd'
                } )
            },
            'on@diary:record': function ( data ) {
                console.log( data );
            }
        }
    }

};

Diary.extends( BaseComponent );

export default Diary;