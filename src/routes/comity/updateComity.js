const { Comity } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require("sequelize");
//const auth = require('../../auth/auth');

module.exports = (app) => {
    app.put('/api/comities/:id', (req, res) => {
        const id = req.params.id;
        Comity.update(req.body, {
            where: { id: id }
        })
            .then(_ => {
                return Comity.findByPk(id).then(comity => {
                    if (comity === null) {
                        const message = 'Le membre du comité demandé n\'existe pas. Réessayez avec un autre identifiant';
                        return res.status(404).json({ message });
                    }
                    const message = `Le membre du comité ${comity.fistname} ${comity.lastname} a bien été modifié`;
                    res.json({ message, data: comity });
                })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = 'Le membre du comité n\'a pas pu être modifié. Réessayez dans quelques instants.';
                res.status(500).json({ message, data: error });
            })
    })
}