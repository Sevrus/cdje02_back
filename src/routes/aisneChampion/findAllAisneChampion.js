const {AisneChampion} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/aisnechampions', auth, (req, res) => {
            AisneChampion.findAll()
                .then(aisneChampions => {
                    const message = 'La liste des champions a bien été récupérée.';
                    res.json({message, data: aisneChampions});
                })
                .catch(error => {
                    const message = 'La liste des champions n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                    res.status(500).json({message, data: error});
                });
    });
};