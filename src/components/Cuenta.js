import React, { useState } from 'react';
import './styles/cuenta.css';

function Cuenta () {
    const [userExist,setUserExist] = useState(1);
    const [emailCorrect,setEmailCorrect] = useState(null);
    const [passwordCorrect,setPasswordCorrect] = useState(null);
    function handleSubmit(event){
        if(emailCorrect!==null && passwordCorrect!==null){
            const email = event.target.elements.email.value;
            const pass = event.target.elements.password.value;
            const data = {
                email: `${email}`,
                password: `${pass}`
            };
            fetch("http://localhost:8000/ingresar", {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                if(res2.status!=='El usuario no existe'){
                    setUserExist(1);
                    document.cookie = res2.cookie;
                    window.location='/';
                }else{
                    setUserExist(0);
                }
            })
            .catch(error => console.error('Error:', error))
        }
        event.preventDefault();
    }

    function handleChange(event){
        if(event.target.name === 'email'){
            console.log("correo: "+event.target.value)
        }else{
            console.log(String(event.target.value).length);
        }
        // console.log(event.target.value);
    }

    var leerCookie = function (key) {
        const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }

    if(leerCookie("usuario")===null){
        // document.cookie = "usuario=hugo"
        // document.cookie = "usuario=Hugo; expires=Thu, 31 Dec 2020 12:00:00 UTC";
        return(
            <section className="bodyAcount">
                <a href="/">
                    <div className="logoAcount">
                        <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} alt="icono" width="80vw"/>
                        <h2>Componentes</h2>
                    </div>
                </a>
                <div id="fondo-form">
                    <h1 className="centrar-texto">Ingresar</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="infoText">Correo</label>
                        <input className="email" type="email" name="email" onChange={handleChange} />
                        <label className="infoText">Contraseña</label>
                        <input className="password" type="password" name="password" onChange={handleChange} />
                        {
                            userExist===0 ?
                                <p>Usuario o contraseña incorrectos</p>
                            :
                                ''
                        }
                        <input className="register" type="submit" name="submit" />
                    </form>
                    <a href="/nuevoCliente" id="a-crear-cuenta">¡Aún no tiene cuenta!. Crea una.</a>
                </div>
            </section>
        )
    }
    return (
        <>
            <p>
                Error
            </p>
        </>
    )
}

export default Cuenta;