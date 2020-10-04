import React, { useState } from 'react';
import ProductoCarrito from './ProductoCarrito';
import './styles/carro.css';

function Carro () {
    const [priceSum,setPriceSum] = useState(0);
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

        function continuarPedido(){
            if(leerCookie("usuario")!==null){
                const carrito = JSON.parse(localStorage.getItem("lista"));
                const data = [];
                data.push({"user":leerCookie("usuario")});
                for (let i = 0; i < carrito.length; i++) {
                    data.push({"producto":carrito[i].id,"cantidad":carrito[i].candAdd});
                }
                fetch("http://localhost:8000/carro", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                // }).then(res => console.log("asdf"))
                .then(res2 => {
                    console.log(res2.status)
                })
                .catch(error => console.error('Error:', error))
                // console.log(data)
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