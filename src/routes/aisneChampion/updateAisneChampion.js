const {AisneChampion} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/aisnechampions/:id', auth, (req, res) =>{
        const id = req.params.id;
        AisneChampion.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return AisneChampion.findByPk(id).then(aisneChampion => {
                    if(aisneChampion === null) {
                        const message = 'Le champion demandé n\'existe pas. Réessayez avec un autre identifiant';
                        return res.status(404).json({ message });
                    }
                    const message = `Le champion ${aisneChampion.name} a bien été modifié`;
                    res.json({message, data: aisneChampion});
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le champion n\'a pas pu être modifié. Réessayez dans quelques instants.';
                res.status(500).json({message, data: error});
            })
    })
}