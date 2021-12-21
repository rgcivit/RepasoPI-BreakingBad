import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVgames } from '../actions';

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setname]= useState('')
    
    function handleImputChange(e){
    e.preventDefault()
    setname(e.target.value)
    
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameVgames(name))
    }
    return (
        <div>
            <input 
            type="text"
            placeholder= 'Buscar...' required
            onChange = {(e) => handleImputChange(e)}
            />
            <button type='submit' onClick={ (e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}