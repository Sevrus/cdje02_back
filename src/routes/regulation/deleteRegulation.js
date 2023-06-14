const {Regulation} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/regulations/:id', auth, (req, res) => {
        Regulation.findByPk(req.params.id).then(regulation => {
            if(regulation === null) {
                const message = 'Le règlement demandé n\'existe pas.Réessayez avec un autre identifiant.';
                return res.status(404).json({message});
            }
            const regulationDeleted = regulation;
            return Regulation.destroy({
                where: {id: regulation.id}
            })
                .then(_ => {
                    const message = `Le règlement avec l'identifiant ${regulationDeleted.id} a bien été supprimé.`;
                    res.json({message, data: regulationDeleted});
                });
        })
            .catch(error => {
                const message = `Le règlement n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
    });
};