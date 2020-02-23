const express = require('express');
const app = express();

app.use(express.json({ extended: false }));

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1/option-flow', {
    useNewUrlParser: true
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/stripe', require('./routes/billing'));

app.listen(5000, () => console.log('Listening on port 5000'));
