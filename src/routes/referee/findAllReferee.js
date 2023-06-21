const { Referee } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/referees', (req, res) => {
        Referee.findAll({ order: ['validity'] })
            .then(referee => {
                const message = 'La liste des arbitres a bien été récupérée.';
                res.json({ message, data: referee });
            })
            .catch(error => {
                const message = `La liste des arbitres n'a pas pu être récupérée. Veuillez réessayer plus tard.`;
                res.status(500).json({ message, data: error });
            });
    })
};