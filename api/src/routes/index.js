const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const characterRouter= require('./characters.js')
const occupationRouter= require('./occupations.js')


const router = Router();

router.use('/characters', characterRouter)
router.use('/occupations', occupationRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);//En este caso no está modularizado!!!




module.exports = router;
