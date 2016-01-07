'use strict';

const BaseComponent = require('base-components');
const DiaryService = require('./services/DiaryService');
const Renderer = require('base-frame-server/Renderer');

class Diary extends BaseComponent {
	constructor() {
		super();
	}

	slots() {
		return {
			global: {
			    'on@request:diary': this.onIndex,
			    'on@request:diary_new-record': this.onNewRecord,
			    'on@request:diary_exercises_search': this.onSearchExercises
			}
		}
	}

	onIndex(data) {
		Renderer.render(__dirname + 'diary-index.html', {}, data.res);
	}

	onNewRecord(data) {
		DiaryService.addRecord(data);
		//    .then( function () {
		//    self.render( 'diary-index' );
		//} );
	}

	onSearchExercises(data) {
		DiaryService.getExercises(data.params[0]).then(d => this.json(d.map(o => dataValues.title), data.res));
	}
}

module.exports = DiaryComponent;
