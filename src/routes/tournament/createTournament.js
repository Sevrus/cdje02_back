const {Tournament} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/tournaments', auth, (req, res) => {
        Tournament.create(req.body)
            .then(tournament => {
                const message = `Le tournoi ${req.body.title} a bien été crée.`
                res.json({message, data: tournament})
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = 'Le tournoi n\'a pas pu être ajouté. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            });
    });
};