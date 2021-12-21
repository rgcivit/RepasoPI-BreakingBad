const { Router } = require('express');
const axios = require('axios')
const {Occupation, Character} = require('../db')
const router = Router();


router.get('/', async (req, res)=>{
    const occupationApi = await axios.get('https://breakingbadapi.com/api/characters')
    const occupations= occupationApi.data.map(el => el.occupation)
    const occEach = occupations.map(el => {
        for (let i =0; i <el.length; i++) return el[i]})
       
    occEach.forEach(el =>{
        Occupation.findOrCreate({
            where: {name:el}
        })
    })
    const allOccupations = await Occupation.findAll();
    res.send(allOccupations)
})

module.exports = router;