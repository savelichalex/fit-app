import React from 'react';
import $ from 'jquery';

import { Autocomplete } from './Autocomplete';

export class NewForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            exerciseValue: '',
            titleEmpty: false,
            weightEmpty: false,
            exercises: []
        }
    }

    validate() {
        var exercise = this.refs.title.value;
        var weight = +this.refs.weight.value;

        if( !exercise || !weight || isNaN( weight ) ) {
            this.setState( {
                titleEmpty: !exercise,
                weightEmpty: !weight
            } );
        } else {
            this.props.startApproach( exercise, weight )
        }
    }

    onTitleChange( event ) {
        var val = event.target.value;
        this.setState( {
            exerciseValue: val
        } );
        if( val.length ) {
            this.loadExercises( val )
        }
    }

    loadExercises( exercise ) {
        $.get( 'api/diary/exercises/' + exercise, data => this.setState( { exercises: data } ) );
    }

    render() {
        var exerciseValue = this.state.exerciseValue;
        var exerciseClass = 'exercise__title' + ( this.state.titleEmpty ? ' exercise__title-error' : '' );
        var weightClass = 'exercise__weight' + ( this.state.weightEmpty ? ' exercise__weight-error' : '' );
        return (
            <div>
                <label htmlFor="exercise__title">
                    Exercise title:
                </label>
                <input type="text" id="exercise__title" className={ exerciseClass } value={ exerciseValue } ref="title"
                       onChange={ e => this.onTitleChange(e) } />
                <Autocomplete className="exercise__autocomplete" list={this.state.exercises}/>
                <label htmlFor="exercise__weight">
                    Weight:
                </label>
                <input type="text" id="exercise__weight" className={ weightClass } ref="weight" />
                <button type="button" className="approach__start" onClick={e => this.validate()}>
                    Start approach
                </button>
            </div>
        )
    }
}