import React, { useState, useEffect } from 'react';
import './styles/ProductoMoreInfo.css';
import Verificacion from './Verificacion';
import CONFIG from '../config/config';
import { useLocation } from 'react-router-dom';

function ProductoMoreInfo ({list}) {
    const keyProducto = useLocation().pathname;
    const [datos,setDatos] = useState({});
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [valorX,setvalorX] = useState();
    const [id,setId] = useState(null);
    
    const url = `${CONFIG[0].ip}${keyProducto}`;


    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setDatos(result);
                setvalorX(result.price);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div className="loading">Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loading">Loading...</div>;
    }

    var producto = datos;
    const num = [];
    for (let index = 1; index < `${producto.cant+1}`; index++) {
        num[index] = <option key={index}>{index}</option>
    }
    function events() {
        var num = document.getElementById("mySelect").selectedIndex + 1;
        setvalorX(producto.price*num);
    }
    function sendProd(){
        var num = document.getElementById("mySelect").selectedIndex + 1;
        const productoEnviar = {
            "id": `${id}`,
            "code": `${producto.code}`,
            "image": `${producto.image}`,
            "name": `${producto.name}`,
            "cant": `${producto.cant}`,
            "description": `${producto.description}`,
            "price": `${producto.price}`,
            "candAdd": `${num}`};
        list(productoEnviar);
        setId(null);
    }
    if(id===null){
        const stringAux = keyProducto;
        var posicion = 0;
        function tamanio(){
            for(var i=0; i <= stringAux.length; i++){
                if(stringAux.charAt(i)==='/'){
                    posicion = i;
                }
            }
            return posicion;
        }
        return setId(stringAux.substr(tamanio()+1));
    }
    return (
        <main className="producto-principal">
            <h2 className="title-product-more-info">{producto.name}</h2>
            <section className="column-prod">
                <img id="image-more-info" src={producto.image} alt={producto.name} />
                <div className="description-prod">
                    <p className="text-info">Precio:</p>
                    <p id="price-color" className="text-content">$ {new Intl.NumberFormat("de-DE").format(valorX)} cop</p>
                    <p className="text-info">Descripción:</p>
                    <p className="text-content-prod">{producto.description}</p>
                    <p className="text-info">Cantidad:</p>
                    <select id="mySelect" className="text-content" onChange={events}>
                        {num}
                    </select>
                    {
                        producto.cant>0?
                            Verificacion(id)===1?
                            <button onClick={sendProd} className="btn enviar-carrito btn-more">Añadir al carrito</button>
                            :
                            <button className="btn btn-enviado">Añadido</button>
                        :
                            <button className="btn btn-enviado">Agotado</button>
                    }
                </div>
            </section>
        </main>
    )
}

export default ProductoMoreInfo;