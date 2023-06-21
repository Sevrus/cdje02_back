const { Tournament } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/tournaments', (req, res) => {

        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            return Tournament.findAll({ limit: limit })
            .then(tournaments => {
                const message = `La liste des ${limit} tournois a bien été récupérée.`;
                res.json({ message, data: tournaments });
            })
                .catch(error => {
                    const message = 'La liste des tournois n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                    res.status(500).json({ message, data: error });
                });
        } else {
            Tournament.findAll()
                .then(tournaments => {
                    const message = 'La liste des tournois a bien été récupérée.';
                    res.json({ message, data: tournaments });
                })
                .catch(error => {
                    const message = 'La liste des tournois n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                    res.status(500).json({ message, data: error });
                });
        }
    });
};