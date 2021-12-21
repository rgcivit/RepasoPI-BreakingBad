import React from "react";
//importo los hooks que voy a usar de react
import{ useState, useEffect} from 'react';
//importo los hooks de react-redux (previamente los instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
//importo los componentes que voy a usar
import {getCharacters, filterCharactersByStatus,filterCreated, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
//comienza el componente
export default function Home (){
   const dispatch = useDispatch();

    const allCharacters = useSelector((state) => state.characters);
    const occupations = useSelector((state) =>state.occupations);
    const[orden, setOrden] = useState('')
    const [currentPage, setCurrentPage]=useState(1);//es uno porque arranca en la primer pag.
    const [charactersPerPage, _setCharactersPerPage]= useState(6);//son 6 porque son 6 por pag.
    const indexOfLastCharacter =currentPage * charactersPerPage//6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage//0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)
    
    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(() =>{
        dispatch(getCharacters())//mapDispatchToProps
    },[dispatch]);
    
    //volver a cargar todos los personajes
    function handleClick(e){
     e.preventDefault();
     dispatch(getCharacters());

    }
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    
    function handleFilterStatus(e){
    dispatch(filterCharactersByStatus(e.target.value))
    }

    const handleFilterCreated =(e) =>{
        dispatch(filterCreated(e.target.value))
    };

    return (
       <div>
       <Link to = '/character'>Crear personaje</Link>
       <h1> BREAKING BAD</h1>
       <button onClick ={e => {handleClick(e)}}>
           Volver a cargar todos los personajes
       </button>
       <div>
        <select onChange={e=> handleFilterStatus(e)}>
            <option value='All'>Todos</option>
            <option value='Alive'>Vivo</option>
            <option value='Deceased'>Muerto</option>
            <option value='Unknown'>Desconocido</option>
            <option value='Presumed dead'>Probablemente muerto</option>
        </select>
        <select onChange={e=> handleFilterCreated(e)} >
            <option value='All'>Todos</option>
            <option value= 'created'>Creados</option>
            <option value='api'>Existentes</option>
        </select>
        <br/>
        <select onChange={e=> handleSort(e)} >
           <option value='asc'>Ascendente</option>
           <option value='desc'>Descendente</option>
        </select>
        <Paginado
        charactersPerPage ={charactersPerPage}
        allCharacters = {allCharacters.length}
        paginado = {paginado}
        />
        <SearchBar/>
        {currentCharacters?.map((c)=>{
             return (  
                 <div>
                 <Link to= {"/home/" + c.id}>
                <Card name={c.name} image={c.img} nickname={c.nickname} key={c.id}/>
                </Link>
                </div>
                )  
            })}
       </div>
       </div>
    )

}