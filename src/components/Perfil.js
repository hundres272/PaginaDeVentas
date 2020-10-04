import React, { useState } from 'react';
import './styles/perfil.css';

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
    const [anio,setAnio] = useState("");
    const [mesS,setMes] = useState("");
    const [diaS,setDia] = useState("");
    function cambiar(e){
        if(e.target.name==='name'){
            setValueName(e.target.value);
        }
        if(e.target.name==='email'){
            setValueEmail(e.target.value)
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
    if(leerCookie("usuarioid")===null){
        window.location='/';
    }else{
        // function cargarDatos(){
            const data = {
                id: leerCookie("usuarioid")
            };
            fetch("http://localhost:8000/obtenerDatosUsuario", {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                setValueName(res2.name);
                setValueEmail(res2.email);
            })
            .catch(error => console.error('Error:', error))
        // }
        // cargarDatos;
        return (
            <div id="perfil-centrar-contenido">
                <div id="contenedor-interno-perfil">
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
                            <select className="select-nac" onChange={e => setAnio(e.target.value)}>
                                <option>Año</option>
                                {anios()}
                            </select>
                            <select className="select-nac" onChange={e => setMes(e.target.value)}>
                                <option>Mes</option>
                                {mes()}
                            </select>
                            <select className="select-nac" onChange={e => setDia(e.target.value)}>
                                <option>Día</option>
                                {dia()}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <div id="cambiar-contrasenia">
                            <input type="password" name="password" value="************" readOnly />
                            <button>Cambiar</button>
                        </div>
                    </div>
                    <button id="guardar-cambios-perfil">Guardar cambios</button>
                </div>
            </div>
        )
    }
}

export default Perfil;