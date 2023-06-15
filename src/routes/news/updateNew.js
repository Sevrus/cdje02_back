const {News} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/news/:id', auth, (req, res) =>{
        const id = req.params.id;
        News.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return News.findByPk(id).then(news => {
                    if(news === null) {
                        const message = `L'article demandé n'existe pas. Réessayez avec un autre identifiant`;
                        return res.status(404).json({ message });
                    }
                    const message = `L'article ${news.title} a bien été modifié`;
                    res.json({message, data: news});
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = `L'article n'a pas pu être modifié. Réessayez dans quelques instants.`;
                res.status(500).json({message, data: error});
            });
    });
};