import { BaseItemView } from 'base-frame';

function FormView() {
    this.init();

    this._approach = void 0;
}

FormView.prototype = {

    template: require('../templates/form.tpl'),

    rootNode: document.querySelector('#exercise-form'),

    events: {

        'click .approach__start': function ( event ) {
            if( !this._approach ) {
                var exercise = this.rootNode.querySelector('.exercise__title').value,
                    weight = this.rootNode.querySelector('.exercise__weight').value,
                    exerciseEmpty = false, weightEmpty = false;

                if( !exercise ) {
                    exerciseEmpty = true;
                }
                if( !weight ) {
                    weightEmpty = true;
                }

                if( exerciseEmpty || weightEmpty ) {
                    this.trigger('error', {
                        exerciseEmpty: exerciseEmpty,
                        weightEmpty: weightEmpty
                    });
                    return false;
                }

                this._approach = {
                    exercise: exercise,
                    weight: weight,
                    start: Date.now(),
                    end: void 0,
                    repetitions: void 0,
                };

                this.trigger('started');
            }
        },

        'click .approach__before-end': function ( event ) {
            if( this._approach ) {
                this._approach.end = Date.now();
                this.trigger('before-end');
            }
        },

        'click .approach__end': function ( event ) {
            if ( this._approach ) {
                let repetitions = this.rootNode.querySelector('.exercise__repetitions').value;

                if( !repetitions ) {
                    return this.trigger('beforeEnd', true);
                }

                this._approach.repetitions = +repetitions;

                this.trigger('end', this._approach);
            }
        },

        'submit form preventDefault': function() {}
    }

};

FormView.extends( BaseItemView );

export default FormView;