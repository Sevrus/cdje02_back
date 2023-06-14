const {AisneChampion} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/aisnechampions', auth, (req, res) => {
        AisneChampion.create(req.body)
            .then(aisneChampion => {
                const message = `Le champion ${req.body.name} a bien été crée.`
                res.json({message, data: aisneChampion})
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = 'Le champion n\'a pas pu être ajouté. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            });
    });
};