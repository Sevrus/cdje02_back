const {Regulation} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/regulations/:id', auth, (req, res) =>{
        const id = req.params.id;
        Regulation.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Regulation.findByPk(id).then(regulation => {
                    if(regulation === null) {
                        const message = 'Le règlement demandé n\'existe pas. Réessayez avec un autre identifiant';
                        return res.status(404).json({ message });
                    }
                    const message = `Le règlement ${regulation.name} a bien été modifié`;
                    res.json({message, data: regulation});
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le règlement n\'a pas pu être modifié. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            });
    });
};