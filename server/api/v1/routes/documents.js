const router = require('express').Router();
const documents = require('../controllers/documents'); //DocumentsController

router.put('/', (req, res) => documents.save(req, res));

module.exports.router = router;