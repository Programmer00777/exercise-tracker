const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

/* App Configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});

/* Creating Schemas */
const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    userId: {type: String, required: true},
    description: String,
    duration: Number,
    date: Date
});

const UserSchema = new Schema({
    username: String
});

/* Creating Models */
const User = mongoose.model('User', UserSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);

/* Endpoint Handlers */
app.get('/api/users', (req, res) => {
   User.find({}, (error, data) => {
      if (error || !data) {
          res.send("No users");
      } else {
          res.json(data);
      }
   });
});

/* Listener Configuration */
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("The app is listening on port " + listener.address().port);
});