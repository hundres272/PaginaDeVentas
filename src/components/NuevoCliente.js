import React, { useState } from 'react';
import './styles/nuevoCliente.css';

function NuevoCliente(){
    const [status,setStatus] = useState(null);
    // const [status,setStatus] = useState('Cliente agregado');
    const [name,setName] = useState("");
    function handleSubmit(e){
        const data = {
            name: `${e.target.lname.value}`,
            email: `${e.target.email.value}`,
            password: `${e.target.password.value}`
        }
        setName(e.target.lname.value);
        fetch('http://localhost:8000/nuevoCliente', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            document.cookie = data.cookie;
            setStatus(data.status);
        })
        .catch(e => console.log(e))
        e.preventDefault();
    }
    function handleChange(e){
        // console.log(e.target.value);
    }

    if(status!=='Cliente agregado'){
        return (
            <div id="crear-cuenta">
                <div className="logoAcount">
                    <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} alt="icono" width="80vw"/>
                    <h2>Componentes</h2>
                </div>
                <div id="fondo-crear-cuenta">
                    <h1 className="centrar-texto">Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="infoText">Nombre</label>
                        <input className="text" type="text" name="lname" onChange={handleChange} />
                        <label className="infoText">Correo</label>
                        <input className="email" type="email" name="email" onChange={handleChange} />
                        <label className="infoText">Contraseña</label>
                        <input className="password" type="password" name="password" onChange={handleChange} />
                        <input className="register" type="submit" name="submit" />
                    </form>
                    <div className={status==='Cliente ya existe'?'usuario-existe':'usuario-no-existe'}>El usuario ya existe
                    <div id="cerrar" onClick={setStatus}>x</div>
                    </div>
                    <a href="/cuenta" id="a-crear-cuenta">Ya tengo cuenta. Ingresar.</a>
                </div>
            </div>
        )
    }else if(status==='Cliente agregado'){
    //    return  <Redirect to={{ pathname: '/'}} />
        return (
            <div id="mensaje-registro-exitoso">
                <h2>¡Bienvenido {name}!</h2>
                <p>
                    Ya eres parte de Componentes.
                </p>
                <a href="/" id="continuar-home">Continuar</a>
            </div>
        )
    }else{
        setStatus(null);
    }
}

export default NuevoCliente;