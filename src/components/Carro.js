import React, { useState } from 'react';
import ProductoCarrito from './ProductoCarrito';
import './styles/carro.css';
import CONFIG from '../config/config';

function Carro () {
    const [priceSum,setPriceSum] = useState(0);
    const [letra,setLetra] = useState('I');
    const [compraCompletada,setCompraCompletada] = useState(false);
    const [una,setUna] = useState(false);
    if(localStorage.getItem("lista")!=="[]" && localStorage.getItem("lista")!==null){
        const carrito = JSON.parse(localStorage.getItem("lista"));
    
        var sum = 0;
        const envio = 10000;
        
        const datosListos = carrito.map(clave => 
            <ProductoCarrito id={clave.id} 
            key={clave.code} code={clave.code} 
            image={clave.image} name={clave.name} 
            cant={clave.cant} description={clave.description} 
            price={clave.price} candAdd={clave.candAdd} changeLis={changePrice} />
        );
    
        function changePrice(valor){
            setPriceSum(0);
        }
    
        if(priceSum === 0){
            for (let i = 0; i < carrito.length; i++) {
                sum = sum + (parseInt(carrito[i].price)*parseInt(carrito[i].candAdd));
            }
            setPriceSum(sum);
        }

        async function continuarPedido(){
            if(leerCookie("usuario")!==null){
                const carrito = JSON.parse(localStorage.getItem("lista"));
                const data = [];
                data.push({"user":leerCookie("usuarioid")});
                for (let i = 0; i < carrito.length; i++) {
                    data.push({"producto":carrito[i].id,"cantidad":carrito[i].candAdd});
                }
                if(letra==='C'){
                    fetch(`http://${CONFIG[0].ip}:8000/carro`, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .then(res2 => {
                        if(res2.status==='Compra completada'){
                            setCompraCompletada(true);
                            setTimeout(function(){setCompraCompletada(false)},5000);
                            localStorage.setItem("lista",JSON.stringify([]));
                        }
                        // console.log(res2.headers.status);
                        // console.log("deberia borrarlo");
                    })
                    .catch(error => console.error('Error:', error))
                }else{
                    window.location = '/perfil'
                }
            }else{
                window.location='/cuenta';
            }
        }

        var leerCookie = function (key) {
            const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
            if (keyValue) {
                return keyValue[2];
            } else {
                return null;
            }
        }

        document.addEventListener("load",datosUsuario(leerCookie("usuarioid")));

        function datosUsuario(id){
            const data = {
                id: id
            };
            if(una===false){
                fetch(`http://${CONFIG[0].ip}:8000/obtenerDatosUsuario`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(res2 => {
                    if(res2.departamento!==undefined && res2.municipio!==undefined && res2.direccion!==undefined){
                        setLetra('C');
                        console.log("entro")
                    }
                })
                .catch(error => console.error('Error:', error))
                setUna(true);
            }
        }
        return(
            <>
                <h1 className="title-carro">Carro</h1>
                <main className="productos-detalles-carrito">
                    <section className="producto-unidades">
                        {datosListos}
                    </section>
                    <aside className="detalles-carrito">
                        <h2>Resumen del pedido</h2>
                        <div className="detalles-carrito-internos">
                            <h3>Subtotal </h3>
                            <p>$ {new Intl.NumberFormat("de-DE").format(priceSum)} cop</p>
                        </div>
                        <div className="detalles-carrito-internos">
                            <h3>Envio </h3>
                            <p>$ {new Intl.NumberFormat("de-DE").format(envio)} cop</p>
                        </div>
                        <div className="detalles-carrito-internos">
                            <h3>Total </h3>
                            <p>$ {new Intl.NumberFormat("de-DE").format(priceSum+envio)} cop</p>
                        </div>
                        <button id="boton-terminar-compra" onClick={continuarPedido}>Terminar compra</button>
                    </aside>
                </main>
                <section id="medio-de-pago">

                </section>
                <section id={compraCompletada===true?"compra-completada":"compra-completada-inv"}>
                    <label>Compra completa.</label>
                </section>
            </>
        )
    }
    return (
        <div className="vacio">
            Vacio
        </div>
    )
}

export default Carro;