const { User } = require('../../../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../../../auth/private_key');

module.exports = (app) => {

  app.post('/api/reset-password/:resetIdentifier', async (req, res) => {
    const { resetIdentifier, password } = req.body;
    const decodedResetToken = atob(decodeURIComponent(resetIdentifier));
    console.log(resetIdentifier);
    
    try {
      // Vérifier la validité du jeton de réinitialisation
      const decodedToken = jwt.verify(decodedResetToken, privateKey);
      const userId = decodedToken.userId;

      // Rechercher l'utilisateur avec l'ID donné
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Réinitialiser le mot de passe de l'utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetIdentifier = null;
      await user.save();

      return res.json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
    }
  });

}