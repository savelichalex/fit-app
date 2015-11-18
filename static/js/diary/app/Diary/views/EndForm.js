import React from 'react';

export class EndForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            repsEmpty: false
        }
    }

    validate() {
        var reps = +this.refs.reps.value;
        if( isNaN( reps ) ) {
            this.setState( {
                repsEmpty: true
            } );
        } else {
            this.props.enterReps( reps )
        }
    }

    render() {
        var repsClass = 'exercise__repetitions' + ( this.state.repsEmpty ? 'exercise__repetitions-error' : '' );
        return (
            <div>
                <label htmlFor="exercise__repetitions">
                    Number of repetitions:
                </label>
                <input type="text" id="exercise__repetitions" className={repsClass} ref="reps" />
                <button type="button" className="approach__end" onClick={e => this.validate()}>
                    Submit approach
                </button>
            </div>
        );
    }
}
