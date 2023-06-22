const jwt = require('jsonwebtoken');
const privateKey = require('../../auth/private_key');
const {User} = require("../../db/sequelize");

module.exports = (app) => {
    app.post('/api/reset-password', (req, res) => {
        const {token, newPassword} = req.body;

        try{
           // Verify and decode token
            const decoded = jwt.verify(token, privateKey);

            // Retrieve user id from token
            const userId = decoded.userId;

            // Update user password with new password
            User.findByPk(userId)
                .then((user) => {
                    if(!user) {
                        const message = `L'utilisateur demandé n'existe pas`;
                        return res.status(404).json({ message });
                    }
                    // Update password
                    user.password = newPassword;
                    user.save();

                    const message = `Le mot de passe a été réinitialisé avec succès.`;
                    res.json({ message });
                })
                .catch((error) => {
                    const message = `Erreur lors de la réinitialisation du mot de passe. Réessayez dans quelques instants.`;
                    res.status(500).json({ message, data: error });
                });
        } catch (error) {
            const message = `Le token fourni n'est pas valide. La réinitialisation du mot de passe a échoué.`;
            res.status(400).json({ message });
        }
    });
};