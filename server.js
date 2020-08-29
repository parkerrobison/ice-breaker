const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes')
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ice-breaker', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
// mongoose.set('debug', true);

app.listen(PORT, function() { console.log(`Connected on localhost:${PORT}`)});