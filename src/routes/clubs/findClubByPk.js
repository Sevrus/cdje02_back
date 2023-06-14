const { Club } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/clubs/:id', auth, (req, res) => {
        Club.findByPk(req.params.id)
            .then(club => {
                if (club === null) {
                    const message = 'Le club demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message });
                }
                const message = 'Un club a bien été trouvé';
                res.json({ message, data: club });
            })
            .catch(error => {
                const message = 'Le club n\'a pas pu être récupéré. Veuillez réessayer plus tard.';
                res.status(500).json({ message, data: error });
            });
    });
};