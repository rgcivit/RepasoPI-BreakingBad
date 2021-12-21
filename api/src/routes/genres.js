const {Router}= require ('express');
const router = Router();
const {getGenres} = require ('../controllers/genres');

router.get('/',getGenres)

module.exports =router;

