const {Router} = require('express');
const router= Router();
const {getPlatforms} = require('../controllers/platforms')

router.get('/', getPlatforms)

module.exports =router;