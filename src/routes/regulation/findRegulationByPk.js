const {Regulation} = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/regulations/:id', auth, (req, res) => {
        Regulation.findByPk(req.params.id)
            .then(regulation => {
                if(regulation === null) {
                    const message = 'Le règlement demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message });
                }
                const message = 'Un règlement a bien été trouvé';
                res.json({message, data: regulation});
            })
            .catch(error => {
                const message = 'Le règlement n\'a pas pu être récupéré. Veuillez réessayer plus tard.';
                res.status(500).json({message, data: error});
            });
    });
};