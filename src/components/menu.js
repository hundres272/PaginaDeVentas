import React, { useState } from 'react'
import Icono from './iconoPrincipal';
import './styles/menu.css';
// import {
//     BrowserRouter as Link
//   } from "react-router-dom";
import CONFIG from '../config/config';


var leerCookie = function (key) {
    const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    if (keyValue) {
        return keyValue[2];
    } else {
        return null;
    }
}

function Menu() {
    const [step1,setStep] = useState(0);
    const [activar,setActivar] = useState(0);
    function menuVisible(){
        if(step1===1){
            setStep(0);
        }else{
            setStep(1);
        }
    }
  
    // console.log(document.getElementsByClassName("barra-productos"));
    function perfil(){
        window.location='/perfil';
    }
    function pedidos(){
        window.location='/pedidos';
    }
    function activarMenu(){
        if(activar===0){
            setActivar(1);
        }else{
            setActivar(0);
        }
    }
    return(
        <header>
            <div className="barra-cuenta">
                <div className="icono-nombre">
                    <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} alt="icono" width="70px" />
                    <h2 id="title-componentes">Componentes</h2>
                </div>
                <div id="contenedor-seniales" onClick={activarMenu}>
                    <img id="seniales" src="/images/senales.png" />
                </div>
                <div className="cuenta-carrito">
                    {
                        leerCookie("usuario")===null?
                        <a href="/cuenta">
                            <Icono image={process.env.PUBLIC_URL + '/images/usuario.png'} name='usuario' text='Cuenta' />
                        </a>:<section className="ingresoAutorizado" onClick={menuVisible}>
                            <Icono image={process.env.PUBLIC_URL + '/images/usuario.png'} name='usuario' text={leerCookie("usuario").split(" ")[0]} />
                            <div className={`${step1===0 ? 'menu-cuenta-invisible' : 'menu-cuenta-visible'}`}>
                                <ul>
                                    <li onClick={perfil}>Perfil</li>
                                    <li onClick={pedidos}>Pedidos</li>
                                    <li onClick={(e)=>{document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        document.cookie = "usuarioid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        document.cookie = "LKDF903Kj2U=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        window.location='/';}}>Cerrar sesión</li>
                                </ul>
                            </div>
                            </section>
                    }
                    <a href="/carro">
                        <Icono image={process.env.PUBLIC_URL + '/images/carro.png'} name='carro' text='Carro' />
                    </a>
                </div>
            </div>
            <div className={`barra-productos ${activar===1?'activo':''}`}>
                <ul>
                    <a href={`${process.env.PUBLIC_URL}/`}><li>Home</li></a>
                    <a href={`${process.env.PUBLIC_URL}/mouse`}><li>Mouse</li></a>
                    <a href={`${process.env.PUBLIC_URL}/teclados`}><li>Teclados</li></a>
                    <a href={`${process.env.PUBLIC_URL}/memorias`}><li>Memorias</li></a>
                    <a href={`${process.env.PUBLIC_URL}/audifonos`}><li>Audífonos</li></a>
                    {
                        activar===1?
                            leerCookie("usuario")===null?
                                <>
                                    <a href="/cuenta"><li>Cuenta</li></a>
                                    <a href="/carro"><li>Carrito</li></a>
                                </>
                            :
                                <>
                                    <a href="/carro"><li>Carrito</li></a>
                                    <a href="/perfil"><li onClick={perfil}>Perfil</li></a>
                                    <a href="/pedidos"><li onClick={pedidos}>Pedidos</li></a>
                                    <a href="/"><li onClick={(e)=>{document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        document.cookie = "usuarioid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        document.cookie = "LKDF903Kj2U=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                        window.location='/';}}>Cerrar sesión</li></a>
                                </>
                        :
                            ''
                    }
                </ul>
            </div>
        </header>
    )
}

export default Menu