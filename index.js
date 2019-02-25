const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var passport = require('passport');
require('./config/passport')(passport);
let db = require('./config/db');



const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(db.url, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());

require('./routes')(app, db);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
