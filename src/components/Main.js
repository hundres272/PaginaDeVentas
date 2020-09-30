import React, { useState, useEffect } from 'react';
import Producto from './Producto';
import './styles/memorias.css';

function Main ({url,title,list}) {
    const [datos,setDatos] = useState([]);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
    const datosListos = datos.map((clave) => 
        <Producto id={clave._id} key={clave.code} code={clave.code} image={clave.image} name={clave.name} cant={clave.cant} description={clave.description} price={clave.price} list={list}/>
    );
    return (
        <div className="row-products">
            <h1>{title}</h1>
            <section className="row-cards">
                {datosListos}
            </section>
        </div>
    );
}

export default Main;
