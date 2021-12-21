import React from "react";
import {Link, useParams} from 'react-router-dom';
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Detail.css'


export default function Detail(){
 
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() =>{
        dispatch(getDetail(id))
    },[id,dispatch])
    const myVgame = useSelector((state) => state.detail)
    
    console.log(myVgame, 'hola')

    //function handleReset(e){
  //(getDetail(e))
   // }
      return (
              <div >
                <body className="detail-body"  >
                  
                
                <div className="detail">
                  <h1 className="title-detail" >{myVgame.name}</h1> 
                  <img src={ myVgame.background_image} alt= 'Img Not Found' width='400px' height='500px'/>
                  <ul> <h3>Rating:</h3>{myVgame.rating}</ul>
                  <ul> <h3>Generos:</h3>{ myVgame.genres?.map(el => el.name).join('-')}</ul>
                  <h3>Fecha de Lanzamiento:</h3>{myVgame.released || myVgame.releaseDate}
                  <ul> <h3>Plataformas:</h3>{myVgame.id?.length  > 7 ? myVgame.platforms?.map(el => el.name)
                  :myVgame.platforms?.map(el=> el.platform.name).join(' || ')}</ul>
                  <h3 id="texto"> Descripción:</h3><p id="texto"><strong> {myVgame.description_raw || myVgame.description }</strong> </p> 
                   <Link to= '/home' >
                      <button><h2 >Back to Home</h2> </button>
                   </Link>
                </div >
                </body>
              </div>
    )
}