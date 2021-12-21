import React from "react";
import{Link} from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage(){
    return( 
        <div>
        <div className='fondo'>   
        <h1 className='titulo'>Videogame website project | made by Rodrigo Guevara Civit</h1>
        <Link to='/Home'><button className='boton'>Wellcome to my  Videogames Page!</button></Link>
        </div>    
        </div>
    )
    
}


