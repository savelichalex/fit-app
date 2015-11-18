import { BaseComponent } from 'base-components';
import React from 'react';
import ReactDom from 'react-dom';

import { Form } from './views/Form';

export class Diary extends BaseComponent {
    constructor() {
        super();

        ReactDom.render(
            <Form onApproach={this.onApproach.bind(this)} />,
            document.getElementById( 'exercise-form' )
        );
    }

    onApproach( approach ) {
        console.log( approach );
    }
}