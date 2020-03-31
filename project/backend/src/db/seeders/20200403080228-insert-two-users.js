'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const SALT_ROUNDS = 10;
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        return queryInterface.bulkInsert(
            'User',
            [
                {
                    name: 'John Doe',
                    email: 'john@gmail.com',
                    password: bcrypt.hashSync('123456789', salt),
                    role: 'user',
                },
                {
                    name: 'Ann Doe',
                    email: 'ann@gmail.com',
                    password: bcrypt.hashSync('987654321', salt),
                    role: 'user',
                },
            ],
            {},
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('User', null, {});
    },
};
