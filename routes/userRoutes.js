var express = require('express');
var router = express.Router();
var User = require('../User.model');
var { userValidationSchema } = require('../helpers/validation_schema');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/addUser', (req, res) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  var userObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  
  var newUser = new User(userObj);
  newUser.save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res.status(400).send("Create new user failed!");
    });
});

module.exports = router;