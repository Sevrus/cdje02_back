module.exports = [
    //Users
    require('./routes/users/login'),
    require('./routes/users/createUser'),
    require('./routes/users/findAllUser'),
    require('./routes/users/updateUser'),
    require('./routes/users/deleteUser'),

    // Tournaments
    require('./routes/tournament/createTournament'),
    require('./routes/tournament/findTournamentByPk'),
    require('./routes/tournament/findAllTournament'),
    require('./routes/tournament/updateTournament'),
    require('./routes/tournament/deleteTournament'),

    // AisneChampions
    require('./routes/aisneChampion/createAisneChampion'),
    require('./routes/aisneChampion/findAisneChampionByPk'),
    require('./routes/aisneChampion/findAllAisneChampion'),
    require('./routes/aisneChampion/updateAisneChampion'),
    require('./routes/aisneChampion/deleteAisneChampion'),

    // Comity
    require('./routes/comity/createComity'),
    require('./routes/comity/findComityByPk'),
    require('./routes/comity/findAllComity'),
    require('./routes/comity/updateComity'),
    require('./routes/comity/deleteComity'),

    // Clubs
    require('./routes/clubs/createClub'),
    require('./routes/clubs/deleteClub'),
    require('./routes/clubs/findAllClub'),
    require('./routes/clubs/findClubByPk'),
    require('./routes/clubs/updateClub'),

    // Regulations
    require('./routes/regulation/createRegulation'),
    require('./routes/regulation/deleteRegulation'),
    require('./routes/regulation/findAllRegulation'),
    require('./routes/regulation/findRegulationByPk'),
    require('./routes/regulation/updateRegulation'),

    // News
    require('./routes/news/createNew'),
    require('./routes/news/deleteNew'),
    require('./routes/news/findAllNew'),
    require('./routes/news/findNewbyPk'),
    require('./routes/news/updateNew'),

    // Referees
    require('./routes/referee/createReferee'),
    require('./routes/referee/findRefereeByPk'),
    require('./routes/referee/findAllReferee'),
    require('./routes/referee/updateReferee'),
    require('./routes/referee/deleteReferee'),

    // ResetPassword
    require('./routes/users/resetPassword/forgotPassword'),
    require('./routes/users/resetPassword/resetPassword'),
];