import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {postCharacter, getOccupations} from '../actions/index';
import {useDispatch,  useSelector} from 'react-redux';





function validate(input){
    let errors ={};
    if(!input.name){
        errors.name = 'Se requiere un Nombre';
    } else if (!input.nickname){
        errors.nickname = 'Nickname debe ser completado';

    }
    return errors;
}

export default function CharacterCreate(){
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const occupations = useSelector((state) => state.occupations)
    const [errors, setErrors]= useState({});
    
    const [input, setInput] = useState({
        name:"",
        nickname:"",
        birthday:"",
        status:"",
        occupation:[]
    })



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

    }

    function handleCheck(e){
        if (e.target.cheched){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input, 
            occupation:[...input.occupation,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        setErrors(validate({
            ...input, 
            [e.target.name]:e.target.value
        }));
        dispatch(postCharacter(input))
        alert('Personaje Creado!!')
        setInput({
            name:'',
            nickname:'',
            birthday:'',
            status:'',
            image:'',
            occupation:[]
        })
       navigate.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            occupation: input.occupation.filter(occ => occ !== el)
        })
    }


    useEffect(() =>{
        dispatch(getOccupations());
    },[]);

    return(
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Creá tu Personaje!</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label>Nombre:</label>
                <input
                type= 'text'
                value={input.name}
                name='name'
                onChange={(e)=>handleChange(e)}
                />
                </div>
                {errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
            <div>
            <label>Nickname:</label>
            <input
            type='text'
            value= {input.nickname}
            name='nickname'
            onChange={(e)=>handleChange(e)}
            />
            {errors.nickname &&
                <p className='error'>{errors.nickname}</p>
            }
        </div>
        <div>
            <label>Cumpleaños:</label>
            <input
            type='text'
            value={input.birthday}
            name='birthday'
            onChange={(e)=>handleChange(e)}
            />
        </div>
        <div>
            <label>Imagen:</label>
            <input
            type='text'
            value={input.image}
            name='image'
            onChange={(e)=>handleChange(e)}
            />
        </div>
        <div>
            <label>Status</label>
            <label><input
            type='checkbox'
            name='Alive'
            value='Alive'
            onChange={(e)=> handleCheck(e)}
            />Alive</label>
            <label><input
            type='checkbox'
            name='Alive'
            value='Alive'
            onChange={(e)=>handleCheck(e)}
            />Deceased</label>
            <label><input
            type='checkbox'
            name='Unknown'
            value='Unknown'
             onChange={(e)=> handleSelect(e)}/>
            Unknown</label>
            
        </div>
        <select onChange={(e)=> handleSelect(e)}>
            {getOccupations.map((occ)=>(
                <option value={occ.name}>{occ.name}</option>
            ))}
            </select>

            <br/>
            <button type='submit'>Crear Personaje</button>
            
            </form>
            {input.occupation.map(el =>
                <div className='divOcc'>
                    <p>{el}</p>
                    <button className='botonX' onClick={()=> handleDelete(el)}>x</button>
                </div>
                )}
        </div>
    )

}