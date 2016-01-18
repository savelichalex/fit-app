import React, { Component } from 'react';

import { NewForm } from './NewForm';
import { StartedForm } from './StartedForm';
import { EndForm } from './EndForm';

import { Introduction } from './Introduction';
import { BeforeTest } from './BeforeTest';
import { FirstStep } from './FirstStep.js';

import { Queue } from '../../helpers/Queue';

const STATES = {
    INTRODUCTION: 0,
    BEFORE_TEST: 1,
    FIRST_STEP: 2,
    SECOND_STEP: 3
};

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: STATES.INTRODUCTION
        };
        this.data = {
            firstStepHeartRate: void 0,
            weight: void 0,
            start: void 0,
            end: void 0,
            repetitions: void 0
        }
    }

    render() {
        var form;
        switch (this.state.state) {
            case STATES.INTRODUCTION:
                form = <Introduction queue={ new Queue( this.onIntroductionFirst, this ) }/>;
                break;
            case STATES.BEFORE_TEST:
                form = <BeforeTest queue={ new Queue( this.onBeforeTest, this ) }/>;
                break;
            case STATES.FIRST_STEP:
                form = <FirstStep queue={ new Queue( this.onFirstStep, this ) }/>;
                break;
        }
        return (
            <form autoComplete="off">
                {form}
            </form>
        )
    }

    onIntroductionFirst() {
        this.setState({
            state: STATES.BEFORE_TEST
        });
    }

    onBeforeTest() {
        this.setState({
            state: STATES.FIRST_STEP
        });
    }

    onFirstStep(heartRate) {
        this.data.firstStepHeartRate = heartRate;
        this.setState({
            state: STATES.SECOND_STEP
        })
    }

    startApproach(exercise, weight) {
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

    enterReps(reps) {
        this._approach.repetitions = reps;
        this.props.queue.put(this._approach);
        this.setState({
            state: STATES.NEW
        });
    }
}