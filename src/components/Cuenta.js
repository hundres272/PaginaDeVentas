import React, { useState } from 'react';
import './styles/cuenta.css';

function Cuenta () {
    const [userExist,setUserExist] = useState(1);
    const [emailCorrect,setEmailCorrect] = useState(null);
    const [passwordCorrect,setPasswordCorrect] = useState(null);
    const [passwordCorrectMin,setPasswordCorrectMin] = useState(null);
    const [passwordCorrectMay,setPasswordCorrectMay] = useState(null);
    const [passwordCorrectNum,setPasswordCorrectNum] = useState(null);
    const [passwordCorrectTam,setPasswordCorrectTam] = useState(null);
    function handleSubmit(event){
        if(emailCorrect===null && passwordCorrect!==null){
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
                    document.cookie = res2.cookieId;
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
        }else{
            const tam = String(event.target.value).length;
            var contadorMin = 0;
            var contadorMay = 0;
            var contadorNum = 0;
            if(tam>=2){
                for (let i = 0; i < tam; i++) {
                    if(String(event.target.value).charCodeAt(i)>=97 && String(event.target.value).charCodeAt(i)<=122){
                        contadorMin++;
                    }
                    if(contadorMin===0){
                        setPasswordCorrectMin('');
                    }else{
                        setPasswordCorrectMin(null);
                    }
                    if(String(event.target.value).charCodeAt(i)>=65 && String(event.target.value).charCodeAt(i)<=90){
                        contadorMay++;
                    }
                    if(contadorMay===0){
                        setPasswordCorrectMay('');
                    }else{
                        setPasswordCorrectMay(null);
                    }
                    if(String(event.target.value).charCodeAt(i)>=48 && String(event.target.value).charCodeAt(i)<=57){
                        contadorNum++;
                    }
                    if(contadorNum===0){
                        setPasswordCorrectNum('');
                    }else{
                        setPasswordCorrectNum(null);
                    }
                    if(tam<8){
                        setPasswordCorrectTam('');
                    }else{
                        setPasswordCorrectTam(null);
                    }
                }
            }
            if(contadorMin>0 && contadorMay>0 && contadorNum>0 && tam>8){
                setPasswordCorrect('');
            }
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
                        <label className={`derecha ${emailCorrect===null?'correct':'incorrect'}`}>Correo incorrecto</label>
                        <input className="email" type="email" name="email" onChange={handleChange} />
                        <label className="infoText">Contraseña</label>
                        <label className={`derecha ${passwordCorrectMin===null?'correct':'incorrect'}`}>La contraseña debe tener al menos una minúscula</label>
                        <label className={`derecha ${passwordCorrectMay===null?'correct':'incorrect'}`}>La contraseña debe tener al menos una mayúscula</label>
                        <label className={`derecha ${passwordCorrectNum===null?'correct':'incorrect'}`}>La contraseña debe tener al menos un número</label>
                        <label className={`derecha ${passwordCorrectTam===null?'correct':'incorrect'}`}>La contraseña debe tener mínimo 8 caracteres</label>
                        <input className="password" type="password" name="password" onChange={handleChange} />
                        {
                            userExist===0 ?
                                <p>Usuario o contraseña incorrectos</p>
                            :
                                ''
                        }
                        <input className="boton-ingresar" type="submit" name="submit" />
                    </form>
                    <a href="/nuevoCliente" id="a-crear-cuenta">Aún no tiene cuenta. ¡Crea una!</a>
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