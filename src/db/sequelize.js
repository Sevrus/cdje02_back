const {Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../models/user');
const tournamentModel = require('../models/tournament.js');
const aisneChampionModel = require('../models/aisneChampion.js');
const tournaments = require('./data/dataTournaments');
const aisneChampions = require('./data/dataAisneChampions');
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
const Tournament = tournamentModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        tournaments.map(tournament => {
            Tournament.create({
                title: tournament.title,
                link: tournament.link
            }).then(tournament => console.log(tournament.toJSON()));
        });
        aisneChampions.map(aisneChampion => {
            Tournament.create({
                name: aisneChampion.name,
                years: aisneChampion.years
            }).then(aisneChampion => console.log(aisneChampion.toJSON()));
        });
        bcrypt.hash('admin', 10)
            .then(hash => User.create({mail: 'admin@admin.fr', password: hash}))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User
};