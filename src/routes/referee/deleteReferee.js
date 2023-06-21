const { Referee } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/referees/:id', auth, (req, res) => {
        Referee.findByPk(req.params.id).then(referee => {
            if (referee === null) {
                const message = `L'arbitre demandé n'existe pas.Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            const refereeDeleted = referee;
            return Referee.destroy({
                where: { id: referee.id }
            })
                .then(_ => {
                    const message = `L'arbitre' avec l'identifiant ${refereeDeleted.id} a bien été supprimé.`;
                    res.json({ message, data: refereeDeleted });
                });
        })
            .catch(error => {
                const message = `L'arbitre n'a pas pu être supprimé. Réessayer dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};