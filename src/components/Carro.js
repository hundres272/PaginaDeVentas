import React, { useState } from 'react';
import ProductoCarrito from './ProductoCarrito';
import './styles/carro.css';

function Carro () {
    const [priceSum,setPriceSum] = useState(0);
    if(localStorage.getItem("lista")!=="[]"){
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
                        <button id="boton-terminar-compra">Terminar compra</button>
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