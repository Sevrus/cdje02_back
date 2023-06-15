const { News } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.get('/api/news', auth, (req, res) => {
        News.findAll()
            .then(news => {
                const message = `La liste des articles a bien été récupérée.`;
                res.json({ message, data: news });
            })
            .catch(error => {
                const message = `La liste des articles n'a pas pu être récupérée. Veuillez réessayer plus tard.`;
                res.status(500).json({ message, data: error });
            });
    });
};