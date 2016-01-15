import { BaseComponent } from 'base-components';
import React from 'react';
import ReactDom from 'react-dom';

import { Form } from './views/Form';

import { Queue } from '../helpers/Queue';

export class Diary extends BaseComponent {
	constructor() {
		super();

		ReactDom.render(
			<Form queue={ new Queue(this.onApproach, this)}/>,
			document.getElementById('exercise-form')
		);
	}

	onApproach(approach) {
		console.log(approach);
	}
}