const router = require('express').Router();
const users = require('../controllers/users'); //UsersController

router.post('/', (req, res) => users.create(req, res));

module.exports.router = router;router.post('/authenticate', (req, res) => users.authenticate(req, res));
