const {Tournament} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/tournaments/:id', auth, (req, res) => {
        Tournament.findByPk(req.params.id)
            .then(tournament => {
                if(tournament === null) {
                    const message = 'Le tournoi demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message });
                }
                const message = `Le tournoi ${tournament.title} a bien été trouvé`;
                res.json({message, data: tournament});
            })
            .catch(error => {
                const message = 'Le tournoi n\'a pas pu être récupéré. Veuillez réessayer plus tard.';
                res.status(500).json({message, data: error});
            });
    });
};