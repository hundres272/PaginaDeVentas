import React, { useState } from 'react';
import './styles/perfil.css';
import dataDeptMun from './Departamentos/departamentos';

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
    const [valueFechaNac,setValueFechaNac] = useState("");
    const [valueDept,setValueDept] = useState("");
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
    document.addEventListener("load",llenarDepartamentos());
    const municipiosAux = [];
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
                setEmailCopia(res2.email);
                
                if(res2.fechaNac!==undefined){
                    document.getElementById("anio").value = res2.fechaNac.anio;
                    document.getElementById("mes").value = res2.fechaNac.mes;
                    document.getElementById("dia").value = res2.fechaNac.dia;
                    setValueFechaNac({
                        anio: res2.fechaNac.anio,
                        mes: res2.fechaNac.mes,
                        dia: res2.fechaNac.dia
                    });
                }
                if(res2.departamento!==undefined){
                    document.getElementById("mySelectDep").value = res2.departamento;
                    setValueDept(res2.departamento);
                }
                if(res2.municipio!==undefined){
                    document.getElementById("mySelectMun").value = res2.municipio;
                    setValueMuni(res2.municipio);
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
            var actualizacion = {
                id: leerCookie("usuarioid"),
                email: valueEmail,
                fechaNac: {
                    anio: document.getElementById("anio").value,
                    mes: document.getElementById("mes").value,
                    dia: document.getElementById("dia").value,
                },
                departamento: document.getElementById("mySelectDep").value,
                municipio: document.getElementById("mySelectMun").value,
                direccion: document.getElementById("direccion").value
            }
            setLoading(true);
            fetch("http://localhost:8000/updateUser", {
                method: 'POST',
                body: JSON.stringify(actualizacion),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res2 => {
                console.log(res2);
                setLoading(false);
            })
        }
        // }
        // cargarDatos;
        return (
            <>
            <div className={loading===true?'loading-user-update':'loading-none'}>Loading...</div>
            <section>
                <img src={process.env.PUBLIC_URL + '/images/simbolo.png'} id="img-back" />
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
                                <button>Cambiar</button>
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
                            <input type="text" id="direccion" name="direccion" value={valueDireccion} onChange={cambiar} />
                        </div>
                    </div>
                </div>
            </section>
            <section id="btn-guardar-cambios">
                <button id="guardar-cambios-perfil" onClick={enviarCambios}>Guardar cambios</button>
            </section>
            </>
        )
    }
}

export default Perfil;