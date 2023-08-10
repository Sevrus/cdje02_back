const { News } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/news', (req, res) => {

        if (req.query.limit) {
            const limit = parseInt(req.query.limit);
            return News.findAll({ limit: limit })
                .then(news => {
                    const message = `La liste des ${limit} articles a bien été récupérée.`;
                    res.json({ message, data: news });
                })
                .catch(error => {
                    const message = 'La liste des articles n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                    res.status(500).json({ message, data: error });
                });
        } else {
            News.findAll()
                .then(news => {
                    const message = 'La liste des articles a bien été récupérée.';
                    res.json({ message, data: news });
                })
                .catch(error => {
                    const message = 'La liste des articles n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                    res.status(500).json({ message, data: error });
                });
        }
    });
};