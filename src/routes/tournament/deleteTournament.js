const {Tournament} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/tournaments/:id', auth, (req, res) => {
        Tournament.findByPk(req.params.id).then(tournament => {
            if(tournament === null) {
                const message = 'Le tournoi demandé n\'existe pas.Réessayez avec un autre identifiant.';
                return res.status(404).json({message});
            }
            const tournamentDeleted = tournament;
            return Tournament.destroy({
                where: {id: tournament.id}
            })
                .then(_ => {
                    const message = `Le tournoi avec l'identifiant ${tournamentDeleted.id} a bien été supprimé.`;
                    res.json({message, data: tournamentDeleted});
                });
        })
            .catch(error => {
                const message = `Le tournoi n'a pas pu être supprimé. Réessayer dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
    });
};