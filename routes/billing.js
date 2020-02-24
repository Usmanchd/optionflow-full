const express = require('express');
const router = express.Router();
const auth = require('../middlewares/Auth');
const User = require('../models/User');
const stripe = require('stripe')('sk_test_eA0H4Ppoqvqa3sOyNbohPdYE00lHLQORfT');

router.post('/', auth, async (req, res) => {
  let user = await User.findById(req.user.id);


  let customer = {};

  if (user.stripeId === null) {
    customer = await stripe.customers.create({
      email: user.email,
      source: req.body.token.id
    });
  } else {
    customer.id = user.stripeId;
  }

  const sub = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: 'plan_GmqLBLDN9fhktx' }]
  });

  let user1 = await User.findOneAndUpdate(
    { email: user.email },
    { subscription: true, stripeId: customer.id, subscriptionId: sub.id },
    { new: true }
  );

  res.status(200).json(user1);
});

module.exports = router;
