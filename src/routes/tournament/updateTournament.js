const {Tournament} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/tournaments/:id', auth, (req, res) =>{
        const id = req.params.id;
        Tournament.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Tournament.findByPk(id).then(tournament => {
                    if(tournament === null) {
                        const message = 'Le tournoi demandé n\'existe pas. Réessayez avec un autre identifiant';
                        return res.status(404).json({ message });
                    }
                    const message = `Le tournoi ${tournament.name} a bien été modifié`;
                    res.json({message, data: tournament});
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le tournoi n\'a pas pu être modifié. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            });
    });
};