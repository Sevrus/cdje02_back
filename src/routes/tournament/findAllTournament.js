const {Tournament} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/tournaments', auth, (req, res) => {
        Tournament.findAll()
            .then(tournaments => {
                const message = 'La liste des tournois a bien été récupérée.';
                res.json({message, data: tournaments});
            })
            .catch(error => {
                const message = 'La liste des tournois n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                res.status(500).json({message, data: error});
            });
    });
};