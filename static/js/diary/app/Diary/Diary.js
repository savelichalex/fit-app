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

    var self = this;
    this.form.on('get_exercises', this).then(function (val) {
        this.emit.getExercises(val)
            .then(function (data) {
                self.emit.autocomplite(JSON.parse(data));
            })
    });

    this.emit.newForm();
}

Diary.prototype = {

    signals: {
        global: {
            'command@io:get_exersices': 'getExercises'
        },
        local: {
            'trigger@form:new': 'newForm',
            'trigger@form:error': 'errorForm',
            'trigger@form:start': 'startForm',
            'trigger@form:beforeEnd': 'beforeEnd',
            'trigger@diary:record': 'newRecord',
            'trigger@form:autocomplete': 'autocomplite'
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
                    exercises: false,
                    state: 'new'
                } );
            },
            'on@form:error': function ( obj ) {
                this.form.render( {
                    exerciseEmpty: obj.exerciseEmpty,
                    weightEmpty: obj.weightEmpty,
                    repetitionsEmpty: false,
                    exercises: false,
                    state: 'new'
                } );
            },
            'on@form:start': function () {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    repetitionsEmpty: false,
                    exercises: false,
                    state: 'started'
                } );
            },
            'on@form:beforeEnd': function ( err ) {
                this.form.render( {
                    exerciseEmpty: false,
                    weightEmpty: false,
                    repetitionsEmpty: !!err,
                    exercises: false,
                    state: 'beforeEnd'
                });
            },
            'on@form:autocomplete': function (exercises) {
                this.form.render({
                    exerciseEmpty: false,
                    weightEmpty: false,
                    repetitionsEmpty: false,
                    exercises: exercises,
                    state: 'new'
                });
            },
            'on@diary:record': function ( data ) {
                console.log( data );
            }
        }
    }

};

Diary.extends( BaseComponent );

export default Diary;