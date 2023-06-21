const { Referee } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/referees/:id', auth, (req, res) => {
        const id = req.params.id;
        Referee.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Referee.findByPk(id).then(referee => {
                    if (referee === null) {
                        const message = `L'arbitre demandé n'existe pas. Réessayez avec un autre identifiant`;
                        return res.status(404).json({ message });
                    }
                    const message = `L'arbitre ${referee.name} a bien été modifié`;
                    res.json({ message, data: referee });
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `L'arbitre n'a pas pu être modifié. Réessayer dans quelques instants.`;
                res.status(500).json({ message, data: error });
            })
    })
}