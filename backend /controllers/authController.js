// const bcrypt = require('bcrypt'); // Pour hacher et vérifier les mots de passe
// const jwt = require('jsonwebtoken'); // Pour générer des jetons JWT

// // Charger le modèle de base de données d'utilisateurs
// const conn = require('../services/db'); // Assurez-vous que le chemin du service de base de données est correct

// exports.login = (req, res, next) => {
//   //const { email, password } = req.body;
//   const email = req.body.email;
//   const password = req.body.mdp;

//   console.log(req.body.email)
//   console.log(req.body.password)
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Veuillez fournir un e-mail et un mot de passe.' });
//   }

//   // Recherchez l'utilisateur dans la base de données par e-mail
//   conn.query('SELECT * FROM clients WHERE email = ?', [email], (err, results) => {
//     if (err) {
//       return next(err);
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
//     }

//     const user = results[0];

//     console.log(user)

//     // Vérifiez le mot de passe
//     bcrypt.compare(password, user.password, (err, passwordMatch) => {
//       if (err || !passwordMatch) {
//         return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
//       }

//       // Générez un jeton JWT pour l'authentification
//       const token = jwt.sign({ userId: user.client_id, email: user.email }, 'votre_clé_secrète', {
//         expiresIn: '1h', // Vous pouvez ajuster la durée de validité du jeton
//       });

//       // Répondez avec le jeton
//       res.status(200).json({ token });
//     });
//   });
// };


const jwt = require('jsonwebtoken');
const conn = require('../services/db');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.mdp;
  //const { email, password } = req.body;

  console.log(req.body)
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir un e-mail et un mot de passe.' });
  }

  // Recherchez l'utilisateur dans la base de données par e-mail
  conn.query('SELECT * FROM clients WHERE email = ?', [email], (err, results) => {
    if (err) {
      return next(err);
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
    }

    const user = results[0];
    // Vérifiez le mot de passe
    if (password != user.mdp) {
      return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
    }

    // Générez un jeton JWT pour l'authentification
    const token = jwt.sign({ user: user }, 'votre_clé_secrète', {
      expiresIn: '1h', // Vous pouvez ajuster la durée de validité du jeton
    });

    // Répondez avec le jeton
    res.status(200).json({ token });
  });
};
