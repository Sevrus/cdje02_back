const express = require('express');

module.exports = (app) => {

    app.get('/api/content', async (req, res) => {
        try {
            const emailContent = "Cliquez sur le lien suivant pour réinitialiser votre mot de passe : {{resetLink}}";
            return res.json({ emailContent })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Une erreur est survenue lors la récupération de l'email" })
        }
    })

}