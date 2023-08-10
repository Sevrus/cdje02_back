const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:5173"
  };

// Middleware
app
.use(cors(corsOptions))
.use(morgan('dev'))
.use(bodyParser.json());

sequelize.initDb();

// Register the routes
routes.forEach(route => route(app));

//Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée! Vous pouvez essayer une autre url.';
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre app est lancée sur : http://localhost:${port}`));