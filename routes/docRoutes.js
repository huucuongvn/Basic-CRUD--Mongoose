var express = require('express');
var router = express.Router();
var Doc = require('../Docs.model');

/**
 * @swagger
 * tags:
 *   name: Docs
 *   description: The Docs managing API
 */

/**
 * @swagger
 * /docs:
 *   get:
 *     summary: Lists all the docs
 *     tags: [Docs]
 *     responses:
 *       200:
 *         description: The list of the Docs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Docs'
 */
router.get('/docs', (req, res) => {
  Doc.find({}).populate("user")
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(400).send("Fetching Docs failed!");
    });
});

/**
 * @swagger
 * /addDoc:
 *   post:
 *     summary: Create a new doc
 *     tags: [Docs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Docs'
 *     responses:
 *       200:
 *         description: The created doc.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Docs'
 *       500:
 *         description: Some server error
 */
router.post('/addDoc', (req, res) => {
  var docObj = {
    title: req.body.title,
    description: req.body.description,
    user: "66cda6a2e90ae8ca80c4ffab" // Hardcoded user for the example
  };

  var newDoc = new Doc(docObj);
  newDoc.save()
    .then(savedDoc => {
      res.status(200).json(savedDoc);
    })
    .catch(err => {
      res.status(400).send("Create Doc failed!");
    });
});

/**
 * @swagger
 * /docs/{id}:
 *   put:
 *    summary: Update the doc by the id
 *    tags: [Docs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The doc id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Docs'
 *    responses:
 *      200:
 *        description: The docs was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Docs'
 *      404:
 *        description: The doc was not found
 *      500:
 *        description: Some error happened
 * 
 */

router.put('/docs/:id', (req, res) => {
  var docObj = {
    title: req.body.title,
    description: req.body.description
  };
  
  Doc.findByIdAndUpdate(req.params.id, docObj, {new: true}).populate("user")
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(400).send("Update Doc failed!");
    });
});

/**
 * @swagger
 * /docs/{id}:
 *   delete:
 *     summary: Remove the doc by id
 *     tags: [Docs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doc id
 *     responses:
 *       200:
 *         description: The doc was deleted
 *       404:
 *         description: The doc was not found
 */

router.delete('/docs/:id', (req, res) => {
  Doc.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(400).send("Delete Doc failed!");
    });
});

module.exports = router;