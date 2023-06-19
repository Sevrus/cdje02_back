const { Club } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/clubs', (req, res) => {
        Club.findAll()
            .then(club => {
                const message = 'La liste des clubs a bien été récupérée.';
                res.json({ message, data: club });
            })
            .catch(error => {
                const message = 'La liste des clubs n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                res.status(500).json({ message, data: error });
            });
    });
};