import React, { Component } from 'react';

export class Introduction extends Component {
    render() {
        return (
            <div>
                <p>To obtain reliable results, you must relax above 5 minutes before test.</p>
                <button type="button" onClick={e => this.props.queue.put()}>
                    Next
                </button>
            </div>
        )
    }
}