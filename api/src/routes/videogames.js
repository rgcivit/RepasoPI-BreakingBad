const { Router } = require('express');
const router = Router();
const {getAllVgames}= require('../controllers/videogames');


router.get('/', async(req, res)=>{ //Busqueda por videogames y por  nombre.
    
    const name = req.query.name;
    let vgamesTotal = await getAllVgames();
    if(name){
        let vgamesName = await vgamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
       vgamesName.length ?
       res.status(200).send(vgamesName):
       res.status(404).send('No se encontró el Juego');
  
    }else{
        res.status(200).send(vgamesTotal);
    }

  });

      module.exports = router;