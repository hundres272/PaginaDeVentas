import React, { useState } from 'react';
import './styles/inicio.css';

function Inicio () {
    const [estado,setEstado] = useState(0);
    const [tiempo,setTiempo] = useState(5000);
    const lista = [
        {
            image: '/images/carrusel1.jpg',
            href: '/memorias'
        },{
            image: '/images/memorias2.webp',
            href: '/teclados'
        },{
            image: '/images/memorias3.jpg',
            href: '/audifonos'
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
    function atras(){
        if(parseInt(estado)>0){
            setEstado(parseInt(estado)-1);
        }else{
            setEstado(parseInt(lista.length)-1);
        }
        // setTimeout(cambiarGaleria,5000);
    }
    function adelante(){
        if(parseInt(estado)<lista.length-1){
            setEstado(parseInt(estado)+1);
        }else{
            setEstado(0);
        }
        // setTimeout(cambiarGaleria,5000);
    }
    // setTimeout(cambiarGaleria,tiempo);
    // setInterval(cambiarGaleria,5000 );

    return(
        <main className="main-inicio" 
        // onMouseOverCapture={e=>{setTiempo(100000)}} 
        // onMouseLeave={e=>{adelante();setTiempo(5000)}}
        >
            <button className="boton-flecha" onClick={atras}>{`<`}</button>
            <button className="boton-flecha boton-flecha-r" onClick={adelante}>{`>`}</button>
            <a href={lista[estado].href} className="contenedor">
                <img id="galeria" src={process.env.PUBLIC_URL +lista[estado].image} alt="promoción" />
            </a>
        </main>
    )
}

export default Inicio;