const { Comity } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/comity', auth, (req, res) => {
        Comity.create(req.body)
            .then(comity => {
                const message = `Le membre ${req.body.firstname} ${req.body.lastname} a bien été crée.`
                res.json({ message, data: comity })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                const message = 'Le membre du comité n\'a pas pu être ajouté. Réessayez dans quelques instants.';
                res.status(500).json({ message, data: error });
            });
    });
};