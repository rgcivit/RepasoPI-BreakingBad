import React from "react";
import "./Paginado.css"

export default function Paginado({charactersPerPage, allCharacters, paginado}){
    const pageNumbers=[]
    for(let i=0; i<=Math.ceil(allCharacters/charactersPerPage);i++){
        pageNumbers.push(i+1)
    }
    return (
        <div>
          <div className= "div-paginado">
            {pageNumbers && pageNumbers.map(number => (
              <div>
                <button className= "boton-paginado" onClick={() => paginado(number)}>
                  {number}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
}