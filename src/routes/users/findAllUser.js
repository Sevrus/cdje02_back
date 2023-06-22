const { User } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/users', (req, res) => {
        User.findAll({ order: ['id'] })
            .then(users => {
                const message = 'La liste des utilisateurs a bien été récupérée.';
                res.json({ message, data: users });
            })
            .catch(error => {
                const message = 'La liste des utilisateurs n\'a pas pu être récupérée. Veuillez réessayer plus tard.';
                res.status(500).json({ message, data: error });
            });
    })
};