import React, {useState, useEffect}from "react";
import {Link, useHistory} from 'react-router-dom';
import {postVgame, getGenres,  getPlatforms} from '../actions/index';
import {  useDispatch, useSelector } from "react-redux";
import './VgamesCreate.css'

 function validate(input){
     let errors={};
     if (!input.name){
         errors.name= 'Se requiere un Nombre!';

     }else if(!input.description){
         errors.description ='Description debe ser completado!'
     }else if(!input.released){
         errors.released ='Released no pude estar vacío!'
     }else if(input.rating === 0 || input.rating ==='' || input.rating<1 || input.rating >5  ){
         errors.rating ='Rating tiene que ser completado y su valor debe ser entre 1 y 5!'
     }
     return errors;
 }
 export default function VgameCreate() {
   const dispatch = useDispatch();
   const genres = useSelector((state) => state.genres);
   //console.log(genres, 'soy genres')
   const platforms = useSelector((state) => state.platforms);
   //console.log(platforms, 'soy platforms')
   const history = useHistory();
   const [errors, setErrors] = useState({});

   const [input, setInput] = useState({
     name: "",
     description: "",
     releaseDate: "",
     rating: "",
     genres: [],
     platforms: [],
     background_image: "",
   });

   function handleChange(e) {
     setInput({
       ...input,
       [e.target.name]: e.target.value,
     });
     console.log(input);

     setErrors(
       validate({
         ...input,
         [e.target.name]: e.target.value,
       })
     );
   }
   function handlePlatSelect(e) {
     setInput({
       ...input,
       platforms: [...input.platforms, e.target.value],
     });
   }
   function handleGenSelect(e) {
     setInput({
       ...input,
       genres: [...input.genres, e.target.value],
     });
   }
   function handleSubmit(e) {
     e.preventDefault();
     setErrors(
       validate({
         ...input,
         [e.target.name]: e.target.valude,
       })
     );
     dispatch(postVgame(input));
     alert("Videojuego Creado!!");
     setInput({
       name: "",
       description: "",
       releaseDate: "",
       rating: "",
       genres: [],
       platforms: [],
       background_image: "",
     });
     history.push("./home");
   }

   function handleDelete(el) {
     setInput({
       ...input,
       genres: input.genres.filter((gen) => gen !== el),
       platforms: input.platforms.filter((plat) => plat !== el),
     });
   }

   useEffect(() => {
     dispatch(getGenres());
     dispatch(getPlatforms());
   }, [dispatch]);

   return (
     <div>
       
       <Link to="/home">
        <br />
        <button className="bot-vgame" >Volver</button>
       </Link>
       <h1 className="title-create" >Creá tu Propio Videojuego!</h1>
       <form onSubmit={(e) => handleSubmit(e)}>
         <div>
           <label>Nombre:</label>
           <input
             type="text"
             value={input.name}
             name="name"
             onChange={(e) => handleChange(e)}
           />
           {errors.name && <p className="error">{errors.name}</p>}
         </div>
         <div>
           <label>Description:</label>
           <input
             type="text"
             value={input.description}
             name="description"
             onChange={(e) => handleChange(e)}
           />
           {errors.description && <p className="error">{errors.description}</p>}
         </div>
         <div>
           <label>Released:</label>
           <input
             type="date"
             value={input.releaseDate}
             name="releaseDate"
             onChange={(e) => handleChange(e)}
           />
           {errors.releaseDate && (
             <p className="error" color="red">
               {errors.releaseDate}
             </p>
           )}
         </div>
         <div>
           <label>Imagen:</label>
           <input
             type="text"
             value={input.background_image}
             name="background_image"
             onChange={(e) => handleChange(e)}
           />
         </div>
         <div>
           <label>Rating:</label>
           <input
             type="number"
             value={input.rating}
             name="rating"
             onChange={(e) => handleChange(e)}
           />
           {errors.rating && (
             <p className="error" color="red">
               {errors.rating}
             </p>
           )}
         </div>
         <label>Género:</label>
         <select onChange={(e) => handleGenSelect(e)}>
           {genres.map((gen) => (
             <option value={gen.name}>{gen.name}</option>
           ))}
         </select>
         <li>{input.genres.map((el) => el).join(' - ')}</li>
         <label > Plataforma:</label>
         <select onChange={(e) => handlePlatSelect(e)}>
           {platforms.map((plat) => (
             <option value={plat.name}>{plat.name}</option>
           ))}
         </select>
         <li>{input.platforms.map((el) => el).join(' - ')}</li>
         <br />
         <br />
         <button type="submit">Crear Videojuego</button>
       </form>
          {input.platforms.map((el) => (
         <div className="divPlat">
           <p>{el}</p>
           <button className="botonX" onClick={() => handleDelete(el)}>
             x
           </button>
         </div>
       ))}
        {input.genres.map((el) => (
         <div className="divGen">
           <p>{el}</p>
           <button className="botonX" onClick={() => handleDelete(el)}>
             x
           </button>
         </div>
       ))}
       
     </div>
   );
 }