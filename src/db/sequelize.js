const {Sequelize, DataTypes} = require('sequelize');
const UserModel = require('../models/user');
const ComityModel = require('../models/comity.js');
const tournamentModel = require('../models/tournamentModel.js');
const aisneChampionModel = require('../models/aisneChampionModel.js');
const ClubModel = require('../models/club');
const comities = require('./data/dataComity');
const tournaments = require('./data/dataTournaments');
const aisneChampions = require('./data/dataAisneChampions');
const clubs = require('./data/dataClubs');
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
const Club = ClubModel(sequelize, DataTypes);
const AisneChampion = aisneChampionModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
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
            }).then(tournament => console.log(tournament.toJSON()));
        });

        aisneChampions.map(aisneChampion => {
            AisneChampion.create({
                name: aisneChampion.name,
                years: aisneChampion.years
            }).then(aisneChampion => console.log(aisneChampion.toJSON()));
        });

        clubs.map(club => {
            Club.create({
                name: club.name,
                city: club.city,
                president: club.president,
                tel: club.tel,
                site: club.site,
                members: club.members
            }, 
            {
                include: [Club.Referees]
            }
            ).then(club => console.log(club.toJSON()));
        });
        bcrypt.hash('admin', 10)
            .then(hash => User.create({mail: 'admin@admin.fr', password: hash}))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User, Comity, Tournament, Club
};