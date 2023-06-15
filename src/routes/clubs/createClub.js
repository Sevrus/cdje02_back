const {Club} = require('../../db/sequelize');
const {ValidationError, UniqueConstraintError} = require('sequelize');
const auth = require('../../auth/auth');

module.exports = (app) => {
    app.post('/api/clubs', auth, (req, res) => { 
        Club.create(req.body) 
            .then(club => {
                const message = `Le club ${req.body.name} a bien été ajouté.`
                res.json({ message, data: club })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ message: error.messsage, data: error });
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.messsage, data: error });
                }
                const message = `Le club n'a pas pu être ajouté. Réessayez dans quelques instants.`;
                res.status(500).json({ message, data: error });
            })
    })
}