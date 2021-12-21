import React from 'react'
import './Card.css'
export default function Card({name,background_image,id, genres, rating}) {

    //const genre= genres.map(el => el)
    
    return (
        <div className='card'>
        <div key={id}>
            <h3>{name} </h3>
            <div>
            <label style={{color:'blue'}}>Genres:</label>
            <h4>{genres}</h4>
            </div>
            <img src={background_image} alt="img not found" width="350px" height="250px"/>
            <h4>Rating</h4> <h3 style={{color:'red', textShadow:' 2px 2px 8px #FF0000'}}>{rating}</h3>
        </div>
        </div>
    )
}