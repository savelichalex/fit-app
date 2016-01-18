import React from 'react';

export class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var list = this.props.list.map((item, key) => <li key={key}>{item}</li>);
        return (
            <ul className={this.props.className}>
                { list }
            </ul>
        )
    }
}