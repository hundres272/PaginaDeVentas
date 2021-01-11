import React, { useState } from 'react'
import Icono from './iconoPrincipal';
import './styles/menu.css';
import { Link } from "react-router-dom";


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
                        <Link to="/cuenta">
                            <Icono image={process.env.PUBLIC_URL + '/images/usuario.png'} name='usuario' text='Cuenta' />
                        </Link>:<section className="ingresoAutorizado" onClick={menuVisible}>
                            <Icono image={process.env.PUBLIC_URL + '/images/usuario.png'} name='usuario' text={leerCookie("usuario").split(" ")[0]} />
                            <div className={`${step1===0 ? 'menu-cuenta-invisible' : 'menu-cuenta-visible'}`}>
                                <ul>
                                    <li onClick={perfil}>Perfil</li>
                                    <li onClick={pedidos}>Pedidos</li>
                                    <li onClick={(e)=>{document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        document.cookie = "usuarioid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        document.cookie = "LKDF903Kj2U=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        window.location=process.env.PUBLIC_URL;}}>Cerrar sesión</li>
                                </ul>
                            </div>
                            </section>
                    }
                    <Link to="/carro">
                        <Icono image={process.env.PUBLIC_URL + '/images/carro.png'} name='carro' text='Carro' />
                    </Link>
                </div>
            </div>
            <div className={`barra-productos ${activar===1?'activo':''}`}>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/mouse"><li>Mouse</li></Link>
                    <Link to="/teclados"><li>Teclados</li></Link>
                    <Link to="/memorias"><li>Memorias</li></Link>
                    <Link to="/audifonos"><li>Audífonos</li></Link>
                    {
                        activar===1?
                            leerCookie("usuario")===null?
                                <>
                                    <Link to="/cuenta"><li>Cuenta</li></Link>
                                    <Link to="/carro"><li>Carrito</li></Link>
                                </>
                            :
                                <>
                                    <Link to="/carro"><li>Carrito</li></Link>
                                    <Link to="/perfil"><li onClick={perfil}>Perfil</li></Link>
                                    <Link to="/pedidos"><li onClick={pedidos}>Pedidos</li></Link>
                                    <Link to="/"><li onClick={(e)=>{document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        document.cookie = "usuarioid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        document.cookie = "LKDF903Kj2U=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/PaginaDeVentas;";
                                        window.location=process.env.PUBLIC_URL;}}>Cerrar sesión</li></Link>
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