const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const Users = require('./auth-model');

// Generate Token
function generateToken(user) {
  return jwt.sign({
    userId: user.id,
  }, secrets.jwtSecret, {
    expiresIn: '1h',
  })
};

// POST - /api/auth/register
router.post('/register', (req, res) => {
  let user = req.body;
  let hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({
        message: `Welcome ${saved.username}!`,
        authToken: token,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// POST - /api/auth/login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          authToken: token,
        })
      } else {
        res.status(404).json({
          message: "You shall not pass!"
        })
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;
