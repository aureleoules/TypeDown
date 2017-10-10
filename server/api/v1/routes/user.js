const router = require('express').Router();
const user = require('../controllers/user'); //UserController

router.post('/authenticate', (req, res) => user.authenticate(req, res));
router.get('/:username', (req, res) => user.get(req, res));
module.exports.router = router;