const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const RefereeModel = require('../models/referee.js')
const referees = require('./data/dataReferee')
const ComityModel = require('../models/comity.js');
const comities = require('./data/dataComity');
const tournamentModel = require('../models/tournamentModel.js');
const tournaments = require('./data/dataTournaments');
const aisneChampionModel = require('../models/aisneChampionModel.js');
const aisneChampions = require('./data/dataAisneChampions');
const ClubModel = require('../models/club');
const clubs = require('./data/dataClubs');
const RegulationModel = require('../models/regulation');
const regulations = require('./data/dataRegulation');
const NewsModel = require('../models/news');
const news = require('./data/dataNews');
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
const Regulation = RegulationModel(sequelize, DataTypes);
const AisneChampion = aisneChampionModel(sequelize, DataTypes);
const News = NewsModel(sequelize, DataTypes);
const Referee = RefereeModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {

        referees.map(referee => {
            Referee.create({
                name: referee.name,
                title: referee.title,
                validity: referee.validity,
                club: referee.club,
                }).then(referee => console.log(referee.toJSON()));
        });

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

        news.map(news => {
            News.create({
                title: news.title,
                author: news.author,
                description: news.description,
                image: news.image
            }).then(news => console.log(news.toJSON()));
        });

        tournaments.map(tournament => {
            Tournament.create({
                title: tournament.title,
                link: tournament.link
            }).then(tournament => console.log(tournament.toJSON()));
        });

        regulations.map(regulation => {
            Regulation.create({
                title: regulation.title,
                link: regulation.link
            }).then(regulation => console.log(regulation.toJSON()));
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
                members: club.members,
                coordx: club.coordx,
                coordy: club.coordy
            }).then(club => console.log(club.toJSON()));
        });
        bcrypt.hash('admin', 10)
            .then(hash => User.create({ mail: 'admin@admin.fr', password: hash }))
            .then(user => console.log(user.toJSON()));

        console.log('La base de donnée a bien été initialisée !');
    });
};

module.exports = {
    initDb, User, Comity, Tournament, Club, Regulation, AisneChampion, News, Referee
};