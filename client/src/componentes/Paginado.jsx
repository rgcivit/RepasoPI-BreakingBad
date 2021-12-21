import React from "react";
import "./Paginado.css"

export default function Paginado({vgamesPerPage, allVgames, paginado}){
    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(allVgames/vgamesPerPage);i++){
        pageNumbers.push(i)
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