const {Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../models/user');
const ComityModel = require('../models/comity');
const comities = require('./data/dataComity');
const bcrypt = require('bcrypt');

let sequelize;

if(process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('cdje02_db', '', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT+2',
        },
        logging: true
    });
} else {
    sequelize = new Sequelize('cdje02_db', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT+2',
        },
        logging: false
    });
}

const User = UserModel(sequelize, DataTypes);
const Comity = ComityModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        bcrypt.hash('admin', 10)
            .then(hash => User.create({mail: 'admin@admin.fr', password: hash}))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User, Comity
};