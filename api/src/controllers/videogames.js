
const axios = require('axios')
const{Videogame, Genre,Platform}= require('../db')
const {API_KEY} = process.env


const  getApiInfo = async () => {

try {
  


  
    let gamesPageOne = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)

    let gamesPageTwo = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)

    let gamesPageThree = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)

    let gamesPageFour = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)

    let gamesPageFive = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)

    

    let prom= await Promise.all([gamesPageOne, gamesPageTwo, gamesPageThree, gamesPageFour, gamesPageFive])

    gamesPageOne = prom[0].data.results;
    gamesPageTwo = prom[1].data.results;
    gamesPageThree = prom[2].data.results;
    gamesPageFour = prom[3].data.results;
    gamesPageFive = prom[4].data.results;
  

    let apiInfo= gamesPageOne.concat(gamesPageTwo).concat(gamesPageThree).concat(gamesPageFour).concat(gamesPageFive)
    apiInfo = apiInfo.map((results) => {
            return {
                id: results.id,
                name: results.name,
                released: results.released,
                background_image: results.background_image,
                rating: results.rating,
                platforms: results.platforms.map(e => e.platform.name),
                Genres: results.genres.map(e => e.name),
                
            }      
        })
        
        //console.log(apiInfo, 'hola!!!!')
    return apiInfo;
  } catch (error) {
    console.log(error)
  }

};

const getDbInfo = async ()=>{
 try {
 
    return await Videogame.findAll({
        include:{
            model:Genre,Platform,
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    });
      
 } catch (error) {
   console.log(error)
}
   };

const getAllVgames = async ()=>{
  try {
    const apiInfo = await getApiInfo();
    const  dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    //console.log(infoTotal)
    return infoTotal;
  } catch (error) {
    console.log(error)
  }
  }


module.exports={
    getAllVgames,
    getApiInfo,
    getDbInfo,
   
};