const { Comity } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/comities/:id', auth, (req, res) => {
        Comity.findByPk(req.params.id).then(comity => {
            if (comity === null) {
                const message = 'Le membre du comité demandé n\'existe pas.Réessayez avec un autre identifiant.';
                return res.status(404).json({ message });
            }
            const comityDeleted = comity;
            return Comity.destroy({
                where: { id: comity.id }
            })
                .then(_ => {
                    const message = `Le membre du comité avec l'identifiant ${comityDeleted.id} a bien été supprimé.`;
                    res.json({ message, data: comityDeleted });
                });
        })
            .catch(error => {
                const message = `Le membre du comité n'a pas pu être supprimé. Réessayer dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};