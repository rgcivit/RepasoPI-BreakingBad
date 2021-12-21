const { APIKEY } = process.env;
const axios = require("axios");
const { Genre } = require("../db");


const getGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=2f33d4ffc9cd40b8a45a606346f23956`
    );
    //console.log(response, 'responseeeee')
    const genres = response.data.results;
    //console.log(genres, 'genresssss')
    genres.forEach(async (g) => {
      await Genre.findOrCreate({
        where: {
          name: g.name,
        },
      });
    });

    const allGenres = await Genre.findAll();

    res.status(200).json(allGenres);
  } catch (err) {
    return console.log(err);
  }
};
module.exports = {
  getGenres,
};
