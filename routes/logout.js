const express = require('express');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
      if (req.session.user) {
        await new Promise((resolve, reject) => {
          req.session.destroy((err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
  
        res.clearCookie('connect.sid');
        res.redirect("/login");
      } else {
        res.status(400).send('Aucune session active');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      res.status(500).send('Erreur lors de la déconnexion');
    }
  });


module.exports = router;