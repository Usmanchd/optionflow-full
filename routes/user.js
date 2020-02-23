const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const confiq = require('confiq');
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/Auth');

const User = require('../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(404).json({
          errors: [{ msg: 'User already Exists at this Email' }]
        });
      }

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hash
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, 'jwtSecret', (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      res.status(404).json({ errors: [{ msg: 'server error' }] });
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    if (!users)
      return res.status(400).json({ errors: [{ msg: 'zero users found' }] });
    res.json(users);
  } catch (error) {
    res.status(404).json({ errors: [{ msg: 'server error' }] });
  }
});

module.exports = router;
