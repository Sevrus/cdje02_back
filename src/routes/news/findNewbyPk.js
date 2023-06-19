const { News } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/news /:id', (req, res) => {
        News.findByPk(req.params.id)
            .then(news => {
                if (news === null) {
                    const message = `L'article demandé n'existe pas. Réessayez avec un autre identifiant`;
                    return res.status(404).json({ message });
                }
                const message = `L'article' ${news.title} a bien été trouvé`;
                res.json({ message, data: news });
            })
            .catch(error => {
                const message = `L'article n'a pas pu être récupéré. Veuillez réessayer plus tard.`;
                res.status(500).json({ message, data: error });
            });
    });
};