const { News } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/news', auth, (req, res) => {
        News.create(req.body)
            .then(news => {
                const message = `L'article ${req.body.title} a bien été ajouté.`
                res.json({ message, data: news })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.messsage, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.messsage, data: error });
                }
                const message = `L'article n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            })
    })
}