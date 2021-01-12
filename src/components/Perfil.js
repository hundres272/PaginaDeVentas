import React, { useState } from 'react';
import './styles/perfil.css';
import dataDeptMun from './Departamentos/departamentos';
import CONFIG from '../config/config';

var leerCookie = function (key) {
    const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    if (keyValue) {
        return keyValue[2];
    } else {
        return null;
    }
}

function Perfil(){
    const [valueName,setValueName] = useState("");
    const [valueEmail,setValueEmail] = useState("");
    const [valueDireccion,setValueDireccion] = useState("");
    const [cambiarPass,setCambiarPass] = useState(false);
    const [passCoinciden,setPassCoinciden] = useState(null);
    const [passReal,setPassReal] = useState(null);
    const [cambiosRealizados,setCambiosRealizados] = useState(false);
    const [valueMuni,setValueMuni] = useState("");
    const [anio,setAnio] = useState("");
    const [mesS,setMes] = useState("");
    const [diaS,setDia] = useState("");
    const [contador,setContador] = useState(true);
    const [emailCopia,setEmailCopia] = useState();
    const [loading, setLoading] = useState(false);

    function cambiar(e){
        if(e.target.name==='name'){
            setValueName(e.target.value);
        }
        if(e.target.name==='email'){
            setValueEmail(e.target.value);
        }
    }
    function cambiarDireccion(e){
        if(e.target.name==='direccion'){
            setValueDireccion(e.target.value);
        }
    }
    function anios() {
        var string = [];
        var today = new Date();
        var year = today.getFullYear();
        for (let i = 0; i < 90; i++) {
            string.push(<option key={`anio${i}`}>{(year-90+i+1)}</option>);
        }
        return string;
    }
    function mes(){
        var string = [];
        for (let i = 0; i < 12; i++) {
            string.push(<option key={`mes${i}`}>{(i+1)}</option>);           
        }
        return string
    }
    function dia(){
        var string = [];
        const diasMes = daysInMonth(mesS, anio);
        for (let i = 0; i < diasMes; i++) {
            string.push(<option key={`dia${i}`}>{(i+1)}</option>);           
        }
        return string
    }
    function daysInMonth(humanMonth, year) {
        return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
    }
    const departamentos = [];
    var unique = 0;
    function llenarDepartamentos(){
        if(unique===0){
            departamentos[0]=<option key="seleccionDept">Seleccionar</option>
            for (let i = 0; i < dataDeptMun.length; i++) {
                departamentos[i+1]=<option key={dataDeptMun[i].departamento+i}>{dataDeptMun[i].departamento}</option>
            }
            unique=1;
        }
    }
    const municipiosAux = [];
    document.addEventListener("load",llenarDepartamentos());
    function llenarMunicipios(e){
        const deptElegido = document.getElementById("mySelectDep").value;
        for (let i = 0; i < dataDeptMun.length; i++) {
            if(dataDeptMun[i].departamento===deptElegido){
                for (let j = 0; j < dataDeptMun[i].ciudades.length; j++) {
                    municipiosAux[j] = <option key={dataDeptMun[i].ciudades[j]+j}>{dataDeptMun[i].ciudades[j]}</option>
                }
                setValueMuni(municipiosAux);
                break;
            }else{
                setValueMuni("");
            }
        }
    }
    if(leerCookie("usuarioid")===null){
        window.location='/';
    }else{
        if(contador===true){
            const data = {
                id: leerCookie("usuarioid")
            };
            fetch(`${CONFIG[0].ip}/obtenerDatosUsuario`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                setValueName(res2.name);
                setValueEmail(res2.email);
                setEmailCopia(res2.email);
                if(res2.fechaNac!==undefined){
                    document.getElementById("anio").value = res2.fechaNac.substr(0,4);
                    document.getElementById("mes").value = parseInt(res2.fechaNac.substr(5,2));
                    document.getElementById("dia").value = parseInt(res2.fechaNac.substr(8,2));
                }
                if(res2.departamento!==undefined){
                    document.getElementById("mySelectDep").value = res2.departamento;
                    llenarMunicipios();
                }
                if(res2.municipio!==undefined){
                    document.getElementById("mySelectMun").value = res2.municipio;
                }
                if(res2.direccion!==undefined){
                    document.getElementById("direccion").value = res2.direccion;
                    setValueDireccion(res2.direccion);
                }
            })
            .catch(error => console.error('Error:', error))
            setContador(false);
        }
        function enviarCambios(){ 
            const anio = document.getElementById("anio").value;
            const mes = document.getElementById("mes").value;
            const dia = document.getElementById("dia").value;
            const fechaNacExt = new Date(`${anio}-${parseInt(mes)>9?mes:`0${mes}`}-${parseInt(dia)>9?dia:`0${dia}`}T12:00:00Z`);
            var actualizacion = {
                id: leerCookie("usuarioid"),
                email: valueEmail,
                fechaNac: fechaNacExt,
                departamento: document.getElementById("mySelectDep").value,
                municipio: document.getElementById("mySelectMun").value,
                direccion: document.getElementById("direccion").value
            }
            setLoading(true);
            fetch(`${CONFIG[0].ip}/updateUser`, {
                method: 'POST',
                body: JSON.stringify(actualizacion),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                console.log(res2);
                setLoading(false);
                setCambiosRealizados(true);
                setTimeout(function(){
                    setCambiosRealizados(false);
                },3000);
            })
        }
        function cambiarPassF(){
            setCambiarPass(true)
        }
        function cambiarPassF2(){
            setCambiarPass(false)
        }
        function verificarPasswords(){
            const pass1 = document.getElementById("pass1").value;
            const pass2 = document.getElementById("pass2").value;
            const pass3 = document.getElementById("pass3").value;
            if(pass2===pass3){
                const actualizacion = {
                    id: leerCookie("usuarioid"),
                    email: valueEmail,
                    pass1: pass1,
                    pass2: pass2
                };
                setPassCoinciden(true);
                setLoading(true);
                fetch(`${CONFIG[0].ip}/changepass`, {
                    method: 'POST',
                    body: JSON.stringify(actualizacion),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(res2 => {
                    console.log(res2);
                    if(res2.status==="Incorrecta"){
                        setPassReal(false);
                    }else if(res2.status==="Correcta") {
                        setCambiarPass(false);
                        setCambiosRealizados(true);
                        setTimeout(function(){
                            setCambiosRealizados(false);
                        },3000);
                    }
                    setLoading(false);
                })
            }else{
                setPassCoinciden(false);
            }
        }
        return (
            <>
            <div className={loading===true?'loading-user-update':'loading-none'}>Loading...</div>
            <section>
                <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} id="img-back" alt="simbolo" />
                <div id="perfil-centrar-contenido">
                    <div className="contenedor-interno-perfil">
                        <h3>Datos personales</h3>
                        <div>
                            <label>Nombre</label>
                            <input type="text" name="name" value={valueName} onChange={cambiar} />
                        </div>
                        <div>
                            <label>Correo</label>
                            <input type="text" name="email" value={valueEmail} onChange={cambiar} />
                        </div>
                        <div>
                            <label>Fecha de nacimiento</label>
                        </div>
                        <div id="fecha-nac">
                            <div>
                                <select id="anio" className="select-nac" onChange={e => setAnio(e.target.value)}>
                                    <option>Año</option>
                                    {anios()}
                                </select>
                                <select id="mes" className="select-nac" onChange={e => setMes(e.target.value)}>
                                    <option>Mes</option>
                                    {mes()}
                                </select>
                                <select id="dia" className="select-nac" onChange={e => setDia(e.target.value)}>
                                    <option>Día</option>
                                    {dia()}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <div id="cambiar-contrasenia">
                                <input type="password" name="password" value="************" readOnly />
                                <button onClick={cambiarPassF}>Cambiar</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="contenedor-interno-perfil">
                        <h3>Información de ubicación</h3>
                        <div>
                            <label>Departamento</label>
                            <select id="mySelectDep" className="text-content" onClick={llenarMunicipios}>
                                {departamentos}
                            </select>
                        </div>
                        <div>
                            <label>Municipio</label>
                            <select id="mySelectMun" className="text-content">
                                <option key="seleccionaMuni">Seleccionar</option>
                                {valueMuni}
                            </select>
                        </div>
                        <div>
                            <label>Dirección</label>
                            <input type="text" id="direccion" name="direccion" value={valueDireccion} onChange={cambiarDireccion} />
                        </div>
                    </div>
                </div>
            </section>
            <section id="btn-guardar-cambios">
                <button id="guardar-cambios-perfil" onClick={enviarCambios}>Guardar cambios</button>
            </section>
            <section id={cambiarPass===false?'cambio-pass-inv':'cambio-pass'}>
                <div className={cambiarPass===false?'changePassInv':'changePassVis'}>
                    <label type="text" className="x-change-pass" onClick={cambiarPassF2}>X</label>
                    <label>Contraseña actual</label>
                    <input id="pass1" className="cambio-width" type="password" name="pass-act" />
                    <label>Nueva contraseña</label>
                    <input id="pass2" className="cambio-width" type="password" name="pass-nue-1" />
                    <label>Repita nueva contraseña</label>
                    <input id="pass3" className="cambio-width" type="password" name="pass-nue-2" />
                    <label className={passCoinciden===null|passCoinciden===true?'alert-message-inv':'alert-message-vis'}>Las contraseñas no coinciden</label>
                    <label className={passReal===null|passReal===true?'alert-message-inv':'alert-message-vis'}>La contraseña actual es incorrecta</label>
                    <button id="cambiarPass" onClick={verificarPasswords}>Enviar</button>
                </div>
            </section>
            <section id={cambiosRealizados===false?'text-change-inv':'text-change'}> 
                Cambios realizados
            </section>
            </>
        )
    }
}

export default Perfil;