var Exercises = require('../models/index').Exercises;

'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'exercises',
            {
                id: {
                    type: Sequelize.INTEGER(11),
                    primaryKey: true,
                    autoIncrement: true
                },
                title: {
                    type: Sequelize.STRING(255)
                }
            },
            {
                charset: 'utf8'
            }
        );
        Exercises.create({title: 'squats'});
        Exercises.create({title: 'push-ups'});
        Exercises.create({title: 'tightening'});
        Exercises.create({title: 'deadlift'});
        Exercises.create({title: 'bench press'});
        Exercises.create({title: 'seated cable row'});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('exercises');
    }
};
