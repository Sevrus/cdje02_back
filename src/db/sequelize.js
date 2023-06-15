const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const ComityModel = require('../models/comity.js')
const comities = require('./data/dataComity')
const tournamentModel = require('../models/tournament.js');
const tournaments = require('./data/dataTournaments');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('cdje02_db', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+2',
    },
    logging: false
});


const User = UserModel(sequelize, DataTypes);
const Comity = ComityModel(sequelize, DataTypes);
const Tournament = tournamentModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        comities.map(comity => {
            Comity.create({
                title: comity.title,
                image: comity.image,
                alt: comity.alt,
                firstName: comity.firstName,
                lastName: comity.lastName,
                mail: comity.mail
            }).then(comity => console.log(comity.toJSON()));
        });
        tournaments.map(tournament => {
            Tournament.create({
                title: tournament.title,
                link: tournament.link
            }).then(champion => console.log(champion.toJSON()));
        });
        bcrypt.hash('admin', 10)
            .then(hash => User.create({ mail: 'admin@admin.fr', password: hash }))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User, Comity
};