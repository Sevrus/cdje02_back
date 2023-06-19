const { Comity } = require('../../db/sequelize');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.get('/api/comities', (req, res) => {
        Champion.findAll({ order: ['title'] })
            .then(comities => {
                const message = 'La liste des membres du comité a bien été récupérée.';
                res.json({ message, data: comities });
            })
            .catch(error => {
                const message = 'La liste des membres du comité n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                res.status(500).json({ message, data: error });
            });
    })
};