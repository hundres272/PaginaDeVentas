import React, { useState } from 'react';
import CONFIG from '../config/config';
import './styles/pedidosxfacpro.css';

function PedidosXFacPro({idProd,cantComp,valor,fechaCompra}){
    const [cambio,setCambio] = useState(0);
    const [datosProducto,setDatosProducto] = useState(null);
    if(cambio === 0){
        const data = {
            id: idProd
        };
        fetch(`http://${CONFIG[0].ip}:8000/producto`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => setDatosProducto(res2))
        setCambio(1);
    }

    return (
        <div className="producto-individual">
            <div>Nombre: {datosProducto!==null?datosProducto.name:""}</div>
            <div>Cantidad: {cantComp}</div>
            <div>Valor: $ {new Intl.NumberFormat("de-DE").format(valor)} cop</div>
            <div>Fecha de la compra: {fechaCompra.substr(0,4)}/{parseInt(fechaCompra.substr(5,2))}/{parseInt(fechaCompra.substr(8,2))}</div>
        </div>
    )
}

export default PedidosXFacPro;