const { Comity } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/comities/:id', (req, res) => {
        Comity.findByPk(req.params.id)
            .then(comity => {
                if (comity === null) {
                    const message = 'Le membre du comité demandé n\'existe pas. Réessayez avec un autre identifiant';
                    return res.status(404).json({ message });
                }
                const message = 'Un membre du comité a bien été trouvé';
                res.json({ message, data: comity });
            })
            .catch(error => {
                const message = 'Le membre du comité n\'a pas pu être récupéré. Veuillez réessayer plus tard.';
                res.status(500).json({ message, data: error });
            });
    });
};