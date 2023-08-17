const { Referee, Club } = require('../../db/sequelize');

module.exports = (app) => {
    app.get('/api/referees', (req, res) => {
        Referee.findAll({
            order: ['validity'],
            include: {
                model: Club,
                as: 'Club',
                attributes: ['name'],
                required: true
            }
        })
            .then(referees => {
                const message = 'La liste des arbitres a bien été récupérée.';
                res.json({ message, data: referees });
            })
            .catch(error => {
                console.log("Error:", error);
                const message = `La liste des arbitres n'a pas pu être récupérée. Veuillez réessayer plus tard.`;
                res.status(500).json({ message, data: error });
            });
    })
};