import React, { useState } from 'react';
import './styles/inicio.css';

function Inicio () {
    const [estado,setEstado] = useState(0);
    const lista = [
        {
            image: '/images/carrusel1.jpg',
            href: '/memorias'
        },{
            image: '/images/memorias2.webp',
            href: 'teclados'
        },{
            image: '/images/memorias3.jpg',
            href: 'audifonos'
        }];
    function cambiarGaleria(){
        const cant = lista.length;
        if((cant-1)===estado){
            setEstado(0);
        }else{
            setEstado(estado + 1);
        }
        const element = document.getElementById("galeria");
        element.src = process.env.PUBLIC_URL +lista[estado].image;
    }
    setTimeout(cambiarGaleria,5000)
    return(
        <main className="main-inicio">
            <a href={lista[estado].href} className="contenedor">
                <img id="galeria" src={process.env.PUBLIC_URL +lista[estado].image} alt="promoción" />
            </a>
        </main>
    )
}

export default Inicio;