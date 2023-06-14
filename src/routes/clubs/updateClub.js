const {Club} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/clubs/:id', auth, (req, res) =>{
        const id = req.params.id;
        Club.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Club.findByPk(id).then(club => {
                    if(club === null) {
                        const message = 'Le club demandé n\'existe pas. Réessayez avec un autre identifiant';
                        return res.status(404).json({ message });
                    }
                    const message = `Le club ${club.name} a bien été modifié`;
                    res.json({message, data: club});
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le club n\'a pas pu être modifié. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            });
    });
};