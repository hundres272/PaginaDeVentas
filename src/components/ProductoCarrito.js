import React, { useState } from 'react';
import './styles/productoCarrito.css';

function ProductoCarrito({id,code,image,name,cant,description,price,candAdd,changeLis}){
    const [cantidad,setCantidad] = useState(candAdd);
    const carrito = JSON.parse(localStorage.getItem("lista"));
    var posicion = 0;
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].id===id){
            posicion = i;
        }
    }
    
    function cantidadMenos(){
        if(parseInt(cantidad,10)!==1){
            setCantidad(parseInt(cantidad,10)-1);
            carrito[posicion].candAdd = parseInt(cantidad)-1;
            localStorage.setItem("lista",JSON.stringify(carrito));
        }
        changeLis(3);
    }
    function cantidadMas(){
        if(parseInt(cantidad,10)<cant){
            setCantidad(parseInt(cantidad,10)+1);
            carrito[posicion].candAdd = parseInt(cantidad)+1;
            localStorage.setItem("lista",JSON.stringify(carrito));
        }
        changeLis(3);
    }
    function borrarProducto(){
        const carrito2 = [];
        for (let i = 0; i < carrito.length; i++) {
            if(i!==posicion){
                carrito2.push(carrito[i]);
            }
        }
        localStorage.setItem("lista",JSON.stringify(carrito2));
        changeLis(3);
    }
    return (
        <div id="marco-producto">
            <img src={`${process.env.PUBLIC_URL}${image}`} alt={name} />
            <div className="descripcion-producto-compra">
                <h2>{name}</h2>
                <p>{description}</p>
                <p id="mas-menos">Cantidad:<button id="menos" onClick={cantidadMenos}>-</button>
                            {cantidad}
                            <button id="mas" onClick={cantidadMas}>+</button></p>
            </div>
            <div className="descripcion-producto-precio">
                <p>Precio Unitario: $ {new Intl.NumberFormat("de-DE").format(price)} cop</p>
                <p>Precio Parcial:  $ {new Intl.NumberFormat("de-DE").format((price*cantidad))} cop</p>
            </div>
            <img src={process.env.PUBLIC_URL + "/images/basurero.png"} className="basurero" 
                onClick={borrarProducto} alt="eliminar"
            ></img>
        </div>
    )
}

export default ProductoCarrito;