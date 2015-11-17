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
                title: {
                    type: Sequelize.STRING(255)
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
