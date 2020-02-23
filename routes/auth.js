const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/Auth');
const User = require('../models/User');
const stripe = require('stripe')('sk_test_eA0H4Ppoqvqa3sOyNbohPdYE00lHLQORfT');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return res.status(400).json({ errors: [{ msg: 'user not found' }] });

    const sub = await stripe.subscriptions.retrieve(user.subscriptionId);

    if (sub.cancel_at_period_end === false) return res.status(200).json(user);

    let user1 = await User.findOneAndUpdate(
      { email: user.email },
      { subscription: false, stripeId: customer.id, subscriptionId: null },
      { new: true }
    );

    res.status(200).json(user1);
  } catch (error) {
    res.json({ errors: [{ msg: 'Server error' }] });
  }
});

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials, check your email' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentials, check your password' }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, 'jwtSecret', { expiresIn: 2000 }, (err, token) => {
        if (err) throw new error();
        res.json({ token });
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
