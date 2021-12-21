const {Router}= require('express');
const router = Router();
const{Videogame, Genre,Platform}= require('../db')

router.post('/', async(req, res)=>{
    try {
        
    
    let{name,description,releaseDate,rating,background_image,createdInDb,platforms, genres} 
    =req.body;

    let vgamesCreated = await Videogame.create({
        name,
        description,
        background_image,
        releaseDate,
        rating,
        createdInDb

    });
    let genreDb = await Genre.findAll({
        where:{name:genres}
    });
    let platformDb = await Platform.findAll({
        where:{name:platforms}
    });
    vgamesCreated.addGenre(genreDb);
    vgamesCreated.addPlatform(platformDb)

    res.status(200).json(vgamesCreated)
        

} catch (error) {
        console.log(error)
}
})
module.exports = router;