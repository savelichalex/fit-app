import React from 'react';

export class StartedForm extends React.Component {
    render() {
        return (
            <button type="button" className="approach__before-end" onClick={e => this.props.endApproach()}>
                End approach
            </button>
        )
    }
}