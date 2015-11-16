'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'exercises',
            {
                id: {
                    type: Sequelize.INTEGER(11),
                    primaryKey: true,
                    autoIncrement: true
                },
                exercise_title: {
                    type: Sequelize.STRING(255),
                    size: 255
                }
            },
            {
                charset: 'utf8'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('exercises');
    }
};
