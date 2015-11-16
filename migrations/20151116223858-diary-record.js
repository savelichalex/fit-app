'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable(
            'diary_record',
            {
                id: {
                    type: Sequelize.INTEGER(11),
                    primaryKey: true,
                    autoIncrement: true
                },
                weight: Sequelize.INTEGER(11),
                start_approach_time: Sequelize.DATE,
                end_approach_time: Sequelize.DATE,
                repetitions: Sequelize.INTEGER(11),
                exercises_id: {
                    type: Sequelize.STRING(255),
                    primaryKey: true
                }
            },
            {
                charset: 'utf8'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('diary_record');
    }
};
