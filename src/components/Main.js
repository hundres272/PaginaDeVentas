import React, { useState, useEffect } from 'react';
import Producto from './Producto';
import './styles/memorias.css';
import CONFIG from '../config/config';

function Main ({url,title,list}) {
    const [datos,setDatos] = useState([]);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [estado, setEstado] = useState(0);
    const [guardado,setGuardado] = useState(0);
    const [codigoNuevo,setCodigoNuevo] = useState(0);
    const [errorNuevo,setErrorNuevo] = useState(0);
    const [ip,setIp] = useState("");
    const [ciudad,setCiudad] = useState("");
    const [departamento,setDepartamento] = useState("");

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setDatos(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div className="loading">Estamos teniendo algunos inconvenientes por favor intentelo más tarde{console.log(error.message)}</div>;
    } else if (!isLoaded) {
        return <div className="loading">Loading...</div>;
    }
    var leerCookie = function (key) {
        const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }
    const datosListos = datos.map((clave) => 
        leerCookie("LKDF903Kj2U")!=="Kdke83Jjd8UED"?<Producto id={clave._id} key={clave.code} code={clave.code} image={clave.image} name={clave.name} cant={clave.cant} description={clave.description} price={clave.price} list={list}/>:
        clave.cant>0?<Producto id={clave._id} key={clave.code} code={clave.code} image={clave.image} name={clave.name} cant={clave.cant} description={clave.description} price={clave.price} list={list}/>
        :""
    );
    function aniadir(){
        setEstado(1);
        codeNew();
    }
    function cancelar(){
        setEstado(0);
    }
    function enviarNuevo(){
        const data = {
            userId: `${leerCookie("usuarioid")}`,
            code: `${document.getElementById("codigo").value}`, 
            image: `${document.getElementById("imagen").value}`, 
            name: `${document.getElementById("nombre").value}`, 
            cant: `${document.getElementById("cantidad").value}`, 
            description: `${document.getElementById("descripcion").value}`, 
            price: `${document.getElementById("precio").value}`
        };
        console.log(data);
        fetch(`http://${CONFIG[0].ip}:8000${window.location.pathname}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => {
            // console.log(res2.status)
            if(res2.status==="Producto guardado"){
                setGuardado(2);
                setTimeout(function(){setEstado(0);window.location=`${window.location.pathname}`;},3000);
            }else{
                obtenerDatos();
                setErrorNuevo(1);
                setTimeout(function(){setEstado(0);window.location=`${window.location.pathname}`;},3000);
            }
        })
    }
    function codeNew(){
        fetch(`http://${CONFIG[0].ip}:8000/cantProductos`)
        .then(res => res.json())
        .then(res2 => {
            setCodigoNuevo(parseInt(res2.value)+1);
        })
    }
    function obtenerDatos(){
        fetch('http://www.geoplugin.net/json.gp')
        .then(res => res.json())
        .then(res2 => {
            setIp(res2.geoplugin_request);
            setCiudad(res2.geoplugin_city);
            setDepartamento(res2.geoplugin_region);
        })
    }
    return (
        <div className="row-products">
            <h1>{title}</h1>
            <section className="row-cards">
                {datosListos}
                {
                    leerCookie("LKDF903Kj2U")!=="Kdke83Jjd8UED"?
                        <div className="producto-card p-c-s" onClick={aniadir}>+</div>
                    :
                        <div style={{display: "none"}}></div>
                }
                <div className={estado === 0 ? "fijo-invisible" : "fijo"}>
                    <div className="content-new">
                        <div id={guardado===0?"product-save-inv":"product-save"}>Producto guardado</div>
                        <div id={errorNuevo===0?"product-error-inv":"product-error"}>
                            {`Intento fraudulento notificado: IP: ${ip} ${departamento} - ${ciudad}`}
                        </div>
                        <label className="label-new">Código: </label>
                        <input type="text" className="input-new-element" value={codigoNuevo} id="codigo" readOnly></input>
                        <label className="label-new">Nombre: </label>
                        <input type="text" className="input-new-element" id="nombre"></input>
                        <label className="label-new">Imagen: </label>
                        <input type="text" className="input-new-element" id="imagen"></input>
                        <label className="label-new">Cantidad: </label>
                        <input type="text" className="input-new-element" id="cantidad"></input>
                        <label className="label-new">Descripción: </label>
                        <input type="text" className="input-new-element" id="descripcion"></input>
                        <label className="label-new">Precio: </label>
                        <input type="text" className="input-new-element" id="precio"></input>
                        <div className="acept-cancel">
                            <button id="btn-cancel" onClick={cancelar}>Cancelar</button>
                            <button id="btn-acept" onClick={enviarNuevo}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;
