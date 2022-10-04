const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

/* App Configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));
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
/**
 * Show all the users if there are any in the database. Otherwise, send an appropriate message.
 *
 * @endpoint /api/users
 * @method GET
 * @returns the list of users (if there are any)
 */
app.get('/api/users', (req, res) => {
   User.find({}, (error, data) => {
      if (error || !data) {
          res.send("No users");
      } else {
          res.json(data);
      }
   });
});

/**
 * Save a new user to the databases on success. Otherwise, send an appropriate message.
 *
 * @endpoint /api/users
 * @method POST
 * @returns JSON response with the user added.
 */
app.post('/api/users', (req, res) => {
   const user = new User({
       username: req.body.username
   });
   user.save((error, data) => {
      if (error || !data) {
          res.send("There was an error during saving the user.");
      } else {
          res.json(data);
      }
   });
});

/**
 * Add a new exercise record to the list of exercises of a particular user (by its ID).
 *
 * @endpoint /api/users/:_id/exercises
 * @method POST
 * @returns JSON response with the information about the user and an exercise.
 */
app.post('/api/users/:_id/exercises', (req, res) => {
   const id = req.params._id;
   const {description, duration} = req.body;
   let date = req.body.date;

   if (!date) date = new Date();

   User.findById(id, (error, userData) => {
      if (error || !userData) {
          res.send("Could not find the user.");
      } else {
          const exercise = new Exercise({
             userId: id,
             description,
             duration,
             date: new Date(date)
          });

          exercise.save((error, data) => {
             if (error || !data) {
                 res.send("There was an error during saving the exercise.");
             } else {
                 const { description, duration, date, _id } = data;
                 res.json({
                     username: userData.username,
                     description,
                     duration,
                     date: date.toDateString(),
                     _id: userData.id
                 });
             }
          });
      }
   });
});

/**
 * Show the list of logs of a particular user (by its ID) for the specified period of time (optionally). Also,
 * it's possible to limit the number of documents returned. Otherwise, return an appropriate message.
 *
 * @endpoint /api/users/:_id/logs
 * @method GET
 * @returns the number of records in the logs, info about the user, logs themselves and info about every log.
 */
app.get('/api/users/:_id/logs', (req, res) => {
   const {from, to, limit} = req.query;
   const id = req.params._id;

   User.findById(id, (error, userData) => {
      if (error || !userData) {
          res.send("Could not find the user.")
      } else {
          let dateObject = {};
          if (from) {
              dateObject["$gte"] = new Date(from);
          }
          if (to) {
              dateObject["$lte"] = new Date(to);
          }
          let filter = {
              userId: id
          }
          if (from || to) {
              filter.date = dateObject;
          }
          let nonNullLimit = limit ?? 500;
          Exercise.find(filter).limit(nonNullLimit).exec((error, data) => {
             if (error || !data) {
                 res.json([]);
             } else {
                 const count = data.length;
                 const rawLog = data;
                 const {username, _id} = userData;
                 const log = rawLog.map((log) => ({
                     description: log.description,
                     duration: log.duration,
                     date: log.date.toDateString()
                 }));
                 res.json({username, count, _id, log});
             }
          });
      }
   });
});

/* Listener Configuration */
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("The app is listening on port " + listener.address().port);
});