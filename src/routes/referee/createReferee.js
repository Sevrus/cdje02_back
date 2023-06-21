const { Referee } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/referees', auth, (req, res) => {
        Referee.create(req.body)
            .then(referee => {
                const message = `L'arbitre' ${req.body.name} a bien été crée.`
                res.json({ message, data: referee })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message = `L'arbitre n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};