var express = require('express');
var app = express();
var port = 3000;
var bodyParse = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

var Doc = require('./Docs.model');
var User = require('./User.model');

mongoose.connect("mongodb://localhost:27017/Basic-CRUD")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

app.post('/addUser', (req, res) => {
  var userObj = {
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password
  }
  var newUser = new User(userObj)
  newUser.save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res.status(400).send("Create new user failed!");
    });
})

app.post('/addDoc', (req, res) => {
  var docObj = {
    "title": req.body.title,
    "description": req.body.description,
    "user": "66cda6a2e90ae8ca80c4ffab"
  }
  var newDoc = new Doc(docObj)
  newDoc.save()
    .then(savedDoc => {
      res.status(200).json(savedDoc);
    })
    .catch(err => {
      res.status(400).send("Create Doc failed!");
    });
})

app.get('/docs', (req, res) => {
  Doc.find({}).populate("user")
  .then((docs) => {
    res.status(200).json(docs)
  })
  .catch(err => {
    res.status(400).send("Create Docs failed!");
  })
})

app.put('/docs/:id', (req, res) => {
  var docObj = {
    "title": req.body.title,
    "description": req.body.description
  }
  Doc.findByIdAndUpdate(req.params.id, docObj, {new: true}).populate("user")
  .then((doc) => {
    res.status(200).json(doc)
  })
  .catch(err => {
    res.status(400).send("Create Docs failed!");
  })
})

app.delete('/docs/:id', (req, res) => {
  Doc.findByIdAndDelete(req.params.id)
  .then((doc) => {
    res.status(200).json(doc)
  })
  .catch(err => {
    res.status(400).send("Create Docs failed!");
  })
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})


