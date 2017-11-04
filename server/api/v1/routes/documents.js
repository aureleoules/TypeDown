const router = require('express').Router();
const documents = require('../controllers/documents'); //DocumentsController

router.put('/', (req, res) => documents.save(req, res));
router.get('/:id', (req, res) => documents.get(req, res));
router.get('/search/:query', (req, res) => documents.search(req, res));

module.exports.router = router;