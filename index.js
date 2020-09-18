const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

const connectDB = require('./config/db');
const keys = require('./config/keys');
require('./models/Appt');
require('./models/ApptNote');
require('./models/Client');
require('./models/User');
require('./models/ClientNote');
require('./services/passport');

const app = express();

// Connect Database
connectDB();

// Init Middleware (body-parser)
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/api/auth')(app);
require('./routes/api/clients')(app);
require('./routes/api/appts')(app);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // Express will serve up production assets like our main.js file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesnt recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
