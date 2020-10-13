import React, { useState } from 'react';
import './styles/cuenta.css';

function Cuenta () {
    const [userExist,setUserExist] = useState(1);
    const [emailCorrect,setEmailCorrect] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleSubmit(event){
        if(emailCorrect===null){
            const email = event.target.elements.email.value;
            const pass = event.target.elements.password.value;
            const data = {
                email: `${email}`,
                password: `${pass}`
            };
            setLoading(true);
            fetch("http://localhost:8000/ingresar", {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                if(res2.status!=='El usuario no existe'){
                    console.log("el usuario no existe")
                    setUserExist(1);
                    document.cookie = res2.cookie;
                    document.cookie = res2.cookieId;
                    window.location='/';
                }else{
                    console.log("el usuario existe")
                    setUserExist(0);
                }
                setLoading(false);
            })
            .catch(error => console.error('Error:', error))
        }
        event.preventDefault();
    }

    function handleChange(event){
        if(event.target.name === 'email'){
            setUserExist(1);
            const tam = String(event.target.value).length;
            var contador = 0;
            if(tam>10){
                for (let i = 0; i < tam; i++) {
                    if(String(event.target.value).charAt(i)==='@' || (String(event.target.value).charAt(i)==='.')){
                        contador++;
                    }
                }
                if(contador>=2){
                    // setEmailCorrect(null);
                    setEmailCorrect(null);
                }
            }else{
                setEmailCorrect('');
            }
        }
        if(event.target.name === 'password'){
            setUserExist(1);
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

    if(leerCookie("usuario")===null){
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
                        <label className={`derecha ${emailCorrect===null?'correct':'incorrect'}`}>Correo incorrecto</label>
                        <input className="email" type="email" name="email" onChange={handleChange} />
                        <label className="infoText">Contraseña</label>
                        <input className="password" type="password" name="password" onChange={handleChange} />
                        {
                            userExist===0 ?
                                <p id="no-existe">Usuario o contraseña incorrectos</p>
                            :
                                ''
                        }
                        <input className="boton-ingresar" type="submit" name="submit" />
                    </form>
                    <a href="/nuevoCliente" id="a-crear-cuenta">Aún no tiene cuenta. ¡Crea una!</a>
                </div>
                <div className={loading===true?'loading-user':'loading-none'}>Loading...</div>
            </section>
        )
    }
    // return (
    //     <>
    //         <p>
    //             Error
    //         </p>
    //     </>
    // )
}

export default Cuenta;