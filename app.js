const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 3000;

app
.use(morgan('dev'))
.use(bodyParser.json());

sequelize.initDb();

//Points de terminaison
require('./src/routes/login')(app);
// Tournaments
require('./src/routes/tournament/createTournament')(app);
require('./src/routes/tournament/findTournamentByPk')(app);
require('./src/routes/tournament/findAllTournament')(app);
require('./src/routes/tournament/updateTournament')(app);
require('./src/routes/tournament/deleteTournament')(app);
// Comity
require('./src/routes/comity/createComity')(app);
require('./src/routes/comity/findComityByPk')(app);
require('./src/routes/comity/findAllComity')(app);
require('./src/routes/comity/updateComity')(app);
require('./src/routes/comity/deleteComity')(app);
// Clubs
require('./src/routes/clubs/createClub')(app);
require('./src/routes/clubs/deleteClub')(app);
require('./src/routes/clubs/findAllClub')(app);
require('./src/routes/clubs/findClubByPk')(app);
require('./src/routes/clubs/updateClub')(app);



//Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée! Vous pouvez essayer une autre url.';
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre app est lancée sur : http://localhost:${port}`));