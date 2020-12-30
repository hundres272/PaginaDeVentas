import React, { useState } from 'react';
import PedidosXFac from './PedidosXFac';
import CONFIG from '../config/config';

function Pedidos(){
    const [elementosVentana,setElementosVentana] = useState(null);
    var [contador,setContador] = useState(0);
    var [listaPedidos,setListaPedidos] = useState([]);
    var leerCookie = function (key) {
        const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }
    if(leerCookie("usuarioid")!==null && contador===0){
        const aux = [];
        const data = {
            id: `${leerCookie("usuarioid")}`
        };
        fetch(`${CONFIG[0].ip}/pedidos`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => {
            // listaPedidos=res2.pedidos;
            // console.log(res2.pedidos[0].codFact);
            for (let i = 0; i < res2.pedidos.length; i++) {
                var vector = []; 
                // console.log(res2.pedidos[0]);
                vector.push(res2.pedidos[i]);
                for (let j = i+1; j < res2.pedidos.length; j++) {
                    if(res2.pedidos[j]!==null && res2.pedidos[i]!==null){
                        if (res2.pedidos[i].codFact===res2.pedidos[j].codFact) {
                            vector.push(res2.pedidos[j]);
                            res2.pedidos[j] = null;
                        }
                    }
                }
                res2.pedidos[i] = null;
                if(vector[0]!==null){
                    // console.log(vector[0]);
                    aux.push(<PedidosXFac vector={vector} key={vector[0].codFact} />);
                }
            }
            setListaPedidos(aux);
        })
        setContador(1);
    }
    return (
        <div>
            {listaPedidos}
        </div>
    )
}

export default Pedidos;