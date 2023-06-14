const { News } = require('../../db/sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.delete('/api/news/:id', auth, (req, res) => {
        News.findByPk(req.params.id).then(news => {
            if (news === null) {
                const message = `L'article demandé n'existe pas.Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message });
            }
            const newsDeleted = news;
            return News.destroy({
                where: { id: news.id }
            })
                .then(_ => {
                    const message = `L'article avec l'identifiant ${newsDeleted.id} a bien été supprimé.`;
                    res.json({ message, data: newsDeleted });
                });
        })
            .catch(error => {
                const message = `L'article n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            });
    });
};