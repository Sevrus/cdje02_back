const {Regulation} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/regulations', auth, (req, res) => {
        Regulation.findAll()
            .then(regulation => {
                const message = 'La liste des règlements a bien été récupérée.';
                res.json({message, data: regulation});
            })
            .catch(error => {
                const message = 'La liste des règlements n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                res.status(500).json({message, data: error});
            });
    });
};