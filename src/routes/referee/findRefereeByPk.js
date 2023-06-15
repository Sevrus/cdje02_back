const { Referee } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/referees/:id', auth, (req, res) => {
        Referee.findByPk(req.params.id)
            .then(referee => {
                if (referee === null) {
                    const message = `L'arbitre demandé n'existe pas. Réessayez avec un autre identifiant`;
                    return res.status(404).json({ message });
                }
                const message = `L'arbitre a bien été trouvé`;
                res.json({ message, data: referee });
            })
            .catch(error => {
                const message = `L'arbitre n'a pas pu être récupéré. Veuillez réessayer plus tard.`;
                res.status(500).json({ message, data: error });
            });
    });
};