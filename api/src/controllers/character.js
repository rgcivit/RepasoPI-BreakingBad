const axios=require('axios');
const {Occupation, Character} = require ('../db');




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

module.exports = {
    getAllCharacters,
 
}




