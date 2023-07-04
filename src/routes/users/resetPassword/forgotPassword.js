const { User } = require('../../../db/sequelize');
const jwt = require('jsonwebtoken');
const privateKey = require('../../../auth/private_key');
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = (app) => {
  app.post('/api/forgot', async (req, res) => {
    const { email } = req.body;

    try {
      // Vérifier si l'utilisateur existe avec l'adresse e-mail donnée
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Générer un jeton de réinitialisation unique
      const resetToken = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '1h' });
      const encodedResetToken = encodeURIComponent(btoa(resetToken));

      // Enregistrer le jeton de réinitialisation dans la base de données pour cet utilisateur
      user.resetToken = encodedResetToken;
      await user.save();

      // Configuration NodeMailer
      const emailServer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      // Envoyer un e-mail contenant le lien de réinitialisation du mot de passe
      const emailData = {
        from: process.env.USER_MAIL,
        to: email,
        subject: 'Réinitialisation du mot de passe',
        text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${process.env.CLIENT_URL}/reset-password/${encodedResetToken}`
      };
      emailServer.sendMail(emailData, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail de réinitialisation' });
        }

        return res.json({ message: 'Un e-mail de réinitialisation du mot de passe a été envoyé' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
    }
  });

}

