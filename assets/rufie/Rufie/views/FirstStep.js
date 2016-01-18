import React, { Component } from 'react';

import { Timer } from './Timer';

import { Queue } from '../../../diary/helpers/Queue';

export class FirstStep extends Component {
    render() {
        return (
            <div>
                <Timer queue={ new Queue(this.timerEnd, this) } time='15' width='300' strokeWidth='10'/>
                <label htmlFor="rufie__heart-rate">
                    Number of heart rate:
                </label>
                <input type="text" id="rufie__heart-rate" className="rufie__heart-rate" ref="reps"/>
                <button type="button" onClick={e => this.props.queue.put()}>
                    Next
                </button>
            </div>
        )
    }

    timerEnd() {
        console.log('timer end!');
    }
}