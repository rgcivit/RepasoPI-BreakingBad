const {API_KEY} = process.env
const{default: axios}= require ('axios')
const{Videogame, Genre,Platform}= require('../db')
const { Router } = require('express');
const router = Router();

router.get('/:id', async(req, res)=>{
    const {id} = req.params;
    try {
    if (id.includes('-')){
    const gameDB = await Videogame.findOne({
        where:{id},
        include:[Genre,Platform],
    });
    return res.json(gameDB);
    }
    const gameApi = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
        res.json(gameApi.data);
        //console.log(gameApi.data, 'hola id')
        
        } catch (err){    
        res.status(404).json({error:'id no encontrado'})
    }
});
module.exports = router;