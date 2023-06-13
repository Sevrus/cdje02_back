const {Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('cdj02_db', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
});

const User = UserModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        bcrypt.hash('admin', 10)
            .then(hash => User.create({username: 'admin', password: hash}))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User
};