const { User } = require('../db/models');
const bcrypt = require('bcrypt');

async function insertAdmin() {
    const admin = User.findOne({ where: { email: 'admin' } });
    if (!admin) {
        const SALT_ROUNDS = 10;
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        await User.create({
            role: 'admin',
            name: 'admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('admin', salt),
        });
    }
}

module.exports = { insertAdmin };
