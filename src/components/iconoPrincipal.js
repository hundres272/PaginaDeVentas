import React from 'react';
import './styles/iconoPrincipal.css';

function Icono({ image, name, text}){
    return (
        <div className="icon-target">
            <img className="img-icon" src={image} alt={name}/>
            <p>{text}</p>
        </div>
    )
}

export default Icono;