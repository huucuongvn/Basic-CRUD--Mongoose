var express = require('express');
var bodyParse = require('body-parser');
var mongoose = require('mongoose');
var { swaggerUi, swaggerSpec } = require('./swagger');
var agenda = require('./agenda');
var app = express();
var port = 3000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import and use routes
var userRoutes = require('./routes/userRoutes');
var docRoutes = require('./routes/docRoutes');

app.use(userRoutes);
app.use(docRoutes);

mongoose.connect("mongodb://localhost:27017/Basic-CRUD")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});