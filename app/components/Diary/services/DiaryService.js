'use strict';

const db = require('../../../../models/index');
const Exercises = db.Exercises;

class DiaryService {
	static addRecord({req}) {
		let postData = '';
		req.on('data', chunk => postData += chunk.toString('utf-8'));
		req.on('end', () => {
			console.log(postData.split('&').reduce((prev, item) => {
				const [key, val] = item.split('=');
				prev[key] = val;
				return prev;
			}, {}));
		});
	}

	static getExercises(exercise) {
		exercise = decodeURIComponent(exercise);
		exercise = exercise.toLowerCase();

		if (exercise === 'any') {
		    //return this.query('SELECT `exercize_title` FROM `exercises` LIMIT 3');
		    return Exercises.findAll({
			    attributes: ['title'],
			    limit: 3
			});
		} else {
		    //return this.query('SELECT `exercize_title` FROM `exercises` WHERE `exercize_title` LIKE \"' + exercise + '%\" LIMIT 3');
		    return Exercises.findAll({
			    attributes: ['title'],
			    where: {
				title: {
				    $like: exercise + '%'
				}
			    },
			    limit: 3
			});
		}
	}
};

module.exports = DiaryService;
