const {Club} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/clubs/:id', auth, (req, res) => {
        Club.findByPk(req.params.id).then(club => {
            if(club === null) {
                const message = 'Le club demandé n\'existe pas.Réessayez avec un autre identifiant.';
                return res.status(404).json({message});
            }
            const clubDeleted = club;
            return Club.destroy({
                where: {id: club.id}
            })
                .then(_ => {
                    const message = `Le club avec l'identifiant ${clubDeleted.id} a bien été supprimé.`;
                    res.json({message, data: clubDeleted});
                });
        })
            .catch(error => {
                const message = `Le club n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
    });
};