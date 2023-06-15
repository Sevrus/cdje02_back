const {AisneChampion} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/aisnechampions/:id', auth, (req, res) => {
        AisneChampion.findByPk(req.params.id)
            .then(aisneChampion => {
                if(aisneChampion === null) {
                    const message = 'Le champion demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message });
                }
                const message = `Le champion ${aisneChampion.name} a bien été trouvé`;
                res.json({message, data: aisneChampion});
            })
            .catch(error => {
                const message = 'Le champion n\'a pas pu être récupéré. Veuillez réessayer plus tard.';
                res.status(500).json({message, data: error});
            });
    });
};