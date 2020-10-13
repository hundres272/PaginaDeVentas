import React, { useState } from 'react';
import './styles/nuevoCliente.css';

function NuevoCliente(){
    const [status,setStatus] = useState(null);
    // const [status,setStatus] = useState('Cliente agregado');
    const [name,setName] = useState("");
    const [email,setEmail] = useState("asdf");
    const [emailCorrect,setEmailCorrect] = useState(null);
    const [passwordCorrect,setPasswordCorrect] = useState(null);
    const [passwordCorrectMin,setPasswordCorrectMin] = useState(null);
    const [passwordCorrectMay,setPasswordCorrectMay] = useState(null);
    const [passwordCorrectNum,setPasswordCorrectNum] = useState(null);
    const [passwordCorrectTam,setPasswordCorrectTam] = useState(null);
    const [loading, setLoading] = useState(false);
    function handleSubmit(e){
        const data = {
            name: `${e.target.lname.value}`,
            email: `${e.target.email.value}`,
            password: `${e.target.password.value}`
        }
        setName(e.target.lname.value);
        setEmail(e.target.email.value);
        if(emailCorrect===null && passwordCorrect!==null){
            setLoading(true);
            fetch('http://localhost:8000/nuevoCliente', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                // document.cookie = data.cookie;
                setLoading(false);
                setStatus(data.status);
                // console.log("asdf "+status)
            })
            .catch(e => console.log(e))
        }
        e.preventDefault();
    }

    function verificar(){
        const codigo = document.getElementById('input-code-ver');
        const data = {
            email: email,
            code: codigo.value,
        };
        fetch('http://localhost:8000/verificacion', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status==='Cliente agregado'){
                document.cookie = data.cookie;
                document.cookie = data.cookieId;
            }
            setStatus(data.status);
        })
        .catch(e => console.log(e))
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
    }

    if(status===null || status==='Cliente ya existe'){
        return (
            <div id="crear-cuenta">
                <a href="/">
                    <div className="logoAcount">
                        <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} alt="icono" width="80vw"/>
                        <h2>Componentes</h2>
                    </div>
                </a>
                <div id="fondo-crear-cuenta">
                    <h1 className="centrar-texto">Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="infoText">Nombre</label>
                        <input className="text" type="text" name="lname" />
                        <label className="infoText">Correo</label>
                        <label className={`derecha ${emailCorrect===null?'correct':'incorrect'}`}>Correo incorrecto</label>
                        <input className="email" type="email" name="email" onChange={handleChange} />
                        <label className="infoText">Contraseña</label>
                        <label className={`derecha ${passwordCorrectMin===null?'correct':'incorrect'}`}>La contraseña debe tener al menos una minúscula</label>
                        <label className={`derecha ${passwordCorrectMay===null?'correct':'incorrect'}`}>La contraseña debe tener al menos una mayúscula</label>
                        <label className={`derecha ${passwordCorrectNum===null?'correct':'incorrect'}`}>La contraseña debe tener al menos un número</label>
                        <label className={`derecha ${passwordCorrectTam===null?'correct':'incorrect'}`}>La contraseña debe tener mínimo 8 caracteres</label>
                        <input className="password" type="password" name="password" onChange={handleChange} />
                        <input className="register" type="submit" name="submit" />
                    </form>
                    <div className={status==='Cliente ya existe'?'usuario-existe':'usuario-no-existe'}>El usuario ya existe
                    <div id="cerrar" onClick={setStatus}>x</div>
                    </div>
                    <a href="/cuenta" id="a-crear-cuenta">Ya tengo cuenta. Ingresar.</a>
                </div>
                <div className={loading===true?'loading-user':'loading-none'}>Loading...</div>
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
    }else if(status==='verificacion' || status==='verificacioni'){
        return (
            <div id="input-verificacion">
                <div id="interno-verificacion">
                    <h2>Verifique su correo</h2>
                    <p>El código se ha enviado a su correo</p>
                    <p>{email}</p>
                    <input id="input-code-ver" type="text" name="verificacion" />
                    <div className={status==='verificacioni'?'usuario-existe':'usuario-no-existe'}>Código incorrecto
                    <div id="cerrar" onClick={()=>setStatus('verificacion')}>x</div>
                    </div>
                    <button id="verificar-boton" onClick={verificar}>
                        Verificar
                    </button>
                </div>
            </div>
        )
    }else{
        setStatus(null);
    }
}

export default NuevoCliente;