import React, { Component } from 'react';

export class BeforeTest extends Component {
    render() {
        return (
            <div>
                <p>Now, when you relaxed, measure your heart rate in a sitting position for 15 seconds</p>
                <button type="button" onClick={e => this.props.queue.put()}>
                    Start
                </button>
            </div>
        )
    }
}