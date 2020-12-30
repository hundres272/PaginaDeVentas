import React, { useState } from 'react';
import './styles/producto.css';
import Verificacion from './Verificacion';
import CONFIG from '../config/config';

function Producto ({id,code,image,name,cant,description,price,list}) {
    const path = `productos${window.location.pathname}/${id}`;
    const [valid,setValid] = useState(Verificacion(id));
    const [edit,setEdit] = useState(0);
    const [codeI,setCodeI] = useState(code);
    const [imageI,setImageI] = useState(image);
    const [nameI,setNameI] = useState(name);
    const [cantI,setCantI] = useState(cant);
    const [descriptionI,setDescriptionI] = useState(description);
    const [priceI,setPriceI] = useState(price);
    const [ip,setIp] = useState("");
    const [ciudad,setCiudad] = useState("");
    const [departamento,setDepartamento] = useState("");
    function enviarAlCarrito(){
        const productoEnviar = {
            "id": `${id}`,
            "code": `${code}`,
            "image": `${image}`,
            "name": `${name}`,
            "cant": `${cant}`,
            "description": `${description}`,
            "price": `${price}`,
            "candAdd": `1`};
            list(productoEnviar);
            setValid(Verificacion(id));
    }
    var leerCookie = function (key) {
        const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            return keyValue[2];
        } else {
            return null;
        }
    }
    function editar(){
        setEdit(1);
    }
    function editarCampo(e){
        switch(e.target.name){
            case "code":
                setCodeI(e.target.value);
                break;
            case "name":
                setNameI(e.target.value);
                break;
            case "image":
                setImageI(e.target.value);
                break;
            case "cant":
                setCantI(e.target.value);
                break;
            case "description":
                setDescriptionI(e.target.value);
                break;
            case "price":
                setPriceI(e.target.value);
                break;
        }
    }
    function guardar(){
        // console.log(document.getElementById("code").value);
        // console.log(`http://${CONFIG[0].ip}:8000${window.location.pathname}/${id}`);
        const data = {
            idUser: leerCookie("usuarioid"),
            code: document.getElementById("code").value,
            image: document.getElementById("image").value,
            name: document.getElementById("name").value,
            cant: document.getElementById("cant").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value
        };
        // console.log(data);
        fetch(`http://${CONFIG[0].ip}:8000${window.location.pathname}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res2 => {
            if(res2.status === "Task Updated"){
                setEdit(2);
                setTimeout(function(){window.location=`${window.location.pathname}`;},3000);
            }else if(res2.status === "Intento fraudulento notificado"){
                obtenerDatos();
                setEdit(3);
                setTimeout(function(){window.location=`${window.location.pathname}`;},3000);
            }
        })
    }
    function obtenerDatos(){
        fetch('http://www.geoplugin.net/json.gp')
        .then(res => res.json())
        .then(res2 => {
            setIp(res2.geoplugin_request);
            setCiudad(res2.geoplugin_city);
            setDepartamento(res2.geoplugin_region);
        })
    }
    if(edit===0){
        return (
            <div className="producto-card">
                {
                    leerCookie("LKDF903Kj2U")!=="Kdke83Jjd8UED"?
                        <button className="editar-admin" onClick={editar}>Editar</button>
                    :
                        <div style={{display: "none"}}></div>
                }
                <h3 className="h3-producto">{name}</h3>
                <img src={process.env.PUBLIC_URL + image} alt={name} />
                <p className="price">$ {new Intl.NumberFormat("de-DE").format(price)} cop</p>
                <a href={path} className="btn detalle">Ver detalle</a>
                {
                    cant>0?
                        valid===1 ?
                            <a onClick={enviarAlCarrito} className="btn enviar-carrito">Añadir al carrito</a>
                        :
                            <a className="btn btn-producto-enviado">Añadido</a>
                    :
                        <a className="btn btn-producto-enviado">Agotado</a>
                }
            </div>
        )
    }else if(edit===1){
        return (
            <div className="producto-card">
                {
                    leerCookie("LKDF903Kj2U")!=="Kdke83Jjd8UED"?
                        <button className="editar-admin" onClick={guardar}>Guardar</button>
                    :
                        <div style={{display: "none"}}></div>
                }
                <label className="label-info-edit">Código:</label>
                <input className="item-edit" id="code" value={codeI} name="code" onChange={editarCampo} readOnly></input>
                <label className="label-info-edit">Nombre:</label>
                <input className="item-edit" id="name" value={nameI} name="name" onChange={editarCampo}></input>
                <label className="label-info-edit">Imagen:</label>
                <input className="item-edit" id="image" value={imageI} name="image" onChange={editarCampo}></input>
                <label className="label-info-edit">Cantidad:</label>
                <input className="item-edit" id="cant" value={cantI} name="cant" onChange={editarCampo}></input>
                <label className="label-info-edit">Descripción:</label>
                <input className="item-edit" id="description" value={descriptionI} name="description" onChange={editarCampo}></input>
                <label className="label-info-edit">Precio:</label>
                <input className="item-edit" id="price" value={priceI} name="price" onChange={editarCampo}></input>
            </div>
        )
    }else{
        return (
            <div className="producto-card label-true-false">
                <label> {edit===2?"Producto actualizado":
                edit===3?`Intento fraudulento notificado: IP: ${ip} ${departamento} - ${ciudad}`:""}</label>
            </div>
        )
    }
}

export default Producto;