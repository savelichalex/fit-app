import React from 'react';

import { NewForm } from './NewForm';
import { StartedForm } from './StartedForm';
import { EndForm } from './EndForm';

const STATES = {
    NEW: 0,
    START: 1,
    END: 2
};

export class Form extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            state: STATES.NEW
        };
        this._approach = {
            exercise: void 0,
            weight: void 0,
            start: void 0,
            end: void 0,
            repetitions: void 0
        }
    }

    render() {
        var form;
        switch( this.state.state ) {
            case STATES.NEW: form = <NewForm startApproach={this.startApproach.bind(this)} />; break;
            case STATES.START: form = <StartedForm endApproach={this.endApproach.bind(this)} />; break;
            case STATES.END: form = <EndForm enterReps={this.enterReps.bind(this)} />; break;
        }
        return (
            <form autoComplete="off">
                {form}
            </form>
        )
    }

    startApproach( exercise, weight ) {
        this._approach.exercise = exercise;
        this._approach.weight = weight;
        this._approach.start = Date.now();
        this.setState({
            state: STATES.START
        });
    }

    endApproach() {
        this._approach.end = Date.now();
        this.setState({
            state: STATES.END
        });
    }

    enterReps( reps ) {
        this._approach.repetitions = reps;
        this.props.onApproach( this._approach );
        this.setState({
            state: STATES.NEW
        });
    }
}