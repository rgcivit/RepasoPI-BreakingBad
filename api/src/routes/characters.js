const { Router } = require('express');
const axios = require('axios')
const {Occupation, Character} = require('../db')
const router = Router();


const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img:el.img,
            nickname:el.nickname,
            status:el.status,
            id:el.char_id,
            occupation:el.occupation.map(el =>el),
            birthday:el.birthday,
            appearance:el.appearance.map(el=>el),

        }
    })
    return apiInfo;
}

const getDbInfo = async ()=>{
    return await Character.findAll({
        include:{
        model :Occupation,
        attributes:['name'],
        through:{
            attributes:[],
        },
        }
    })
}

const getAllCharacters = async ()=>{
   const apiInfo = await getApiInfo();
   const  dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/', async(req, res)=>{
    const name = req.query.name;
    let charactersTotal = await getAllCharacters();
    if(name){
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
       characterName.length ?
       res.status(200).send(characterName):
       res.status(404).send('No se encontró el personaje');
  
    }else{
        res.status(200).send(charactersTotal);
    }
  })

  router.post('/', async (req,res) =>{
    let{
        name,
        nickname,
        birthday,
        img,
        status, 
        createdInDb,
        occupation,
    
    } =req.body;
    
     let characterCreated = await Character.create({
         name,
         nickname,
         birthday,
         img,
         status,
         createdInDb
     })
    
     let occupationDb = await Occupation.findAll({
         where:{name:occupation}
         
     })
      characterCreated.addOccupation(occupationDb);
      res.send('Personaje creado con éxito')
    })
    
    router.get('/:id', async (req, res) =>{
        const id = req.params.id;
        const charactersTotal = await getAllCharacters();
        console.log(getAllCharacters())
        if(id){
            let characterId = await charactersTotal.filter(el => el.id ==id);
            characterId.length?
            res.status(200).json(characterId):
            res.status(404).send('No se encontró el personaje');
           
        }
    })

    module.exports = router;