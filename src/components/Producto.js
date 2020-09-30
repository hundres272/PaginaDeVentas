import React, { useState } from 'react';
import './styles/producto.css';
import Verificacion from './Verificacion';

function Producto ({id,code,image,name,cant,description,price,list}) {
    const path = `productos${window.location.pathname}/${id}`;
    const [valid,setValid] = useState(Verificacion(id));
    function enviarAlCarrito(){
        const productoEnviar = {
            "id": `${id}`,
            "code": `${code}`,
            "image": `${image}`,
            "name": `${name}`,
            "cant": `${cant}`,
            "description": `${description}`,
            "price": `${price}`,
            "candAdd": `1`};
            list(productoEnviar);
            setValid(Verificacion(id));
    }
    return (
        <div className="producto-card">
            <h3 className="h3-producto">{name}</h3>
            <img src={process.env.PUBLIC_URL + image} alt={name} />
            <p className="price">$ {new Intl.NumberFormat("de-DE").format(price)} cop</p>
            <a href={path} className="btn detalle">Ver detalle</a>
            {
                valid===1 ?
                    <a onClick={enviarAlCarrito} className="btn enviar-carrito">Añadir al carrito</a>
                :
                    <a className="btn btn-producto-enviado">Añadido</a>
            }
        </div>
    )
}

export default Producto;