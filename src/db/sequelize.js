const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { associateModels } = require('../models/association');
const UserModel = require('../models/userModel.js');
const ClubModel = require('../models/clubModel.js');
const RefereeModel = require('../models/refereeModel.js')
const ComityModel = require('../models/comityModel.js');
const tournamentModel = require('../models/tournamentModel.js');
const aisneChampionModel = require('../models/aisneChampionModel.js');
const RegulationModel = require('../models/regulationModel.js');
const NewsModel = require('../models/newsModel.js');

const clubsData = require('./data/dataClubs');
const refereesData = require('./data/dataReferees')
const comitiesData = require('./data/dataComities');
const tournamentsData = require('./data/dataTournaments');
const aisneChampionsData = require('./data/dataAisneChampions');
const regulationsData = require('./data/dataRegulations');
const newsData = require('./data/dataNews');

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

associateModels({ Referee, Club });

const initComities = async () => {
    for (const comityData of comitiesData) {
        const comity = await Comity.create(comityData);
        console.log(comity.toJSON());
    }
};

const initReferees = async () => {
    for (const refereeData of refereesData) {
        const referee = await Referee.create(refereeData);
        console.log(referee.toJSON());
    }
};

const initNews = async () => {
    for (const newData of newsData) {
        const news = await News.create(newData);
        console.log(news.toJSON());
    }
};

const initTournaments = async () => {
    for (const tournamentData of tournamentsData) {
        const tournament = await Tournament.create(tournamentData);
        console.log(tournament.toJSON());
    }
};

const initRegulations = async () => {
    for (const regulationData of regulationsData) {
        const regulation = await Regulation.create(regulationData);
        console.log(regulation.toJSON());
    }
};

const initAisneChampions = async () => {
    for (const aisneChampionData of aisneChampionsData) {
        const aisneChampion = await AisneChampion.create(aisneChampionData);
        console.log(aisneChampion.toJSON());
    }
};

const initClubs = async () => {
    for (const clubData of clubsData) {
        const club = await Club.create(clubData);
        console.log(club.toJSON());
    }
};

const initDb = async () => {
    await sequelize.sync({ force: true });

    Club.associate(sequelize.models);
    Referee.associate(sequelize.models);

    await initTournaments();
    await initClubs();
    await initComities();
    await initAisneChampions();
    await initRegulations();
    await initNews();
    await initReferees();

    const hashedPassword = await bcrypt.hash('Admin!001', 10);
    const user = await User.create({ email: 'admin@admin.fr', password: hashedPassword });
    console.log(user.toJSON());

    console.log('La base de donnée a bien été initialisée !');
};

module.exports = {
    initDb, User, Comity, Tournament, Club, Regulation, AisneChampion, News, Referee
};