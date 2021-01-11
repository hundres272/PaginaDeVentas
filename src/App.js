import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Inicio from './components/Inicio';
import Main from './components/Main';
import Cuenta from './components/Cuenta';
import Carro from './components/Carro';
import Footer from './components/Footer';
import ProductoMoreInfo from './components/ProductoMoreInfo';
import NuevoCliente from './components/NuevoCliente';
import Perfil from './components/Perfil';
import Pedidos from './components/Pedidos';
import CONFIG from '../src/config/config';

function App() {
  const urlMouse = `${CONFIG[0].ip}/mouse`;
  const urlTeclados = `${CONFIG[0].ip}/teclados`;
  const urlMemorias = `${CONFIG[0].ip}/memorias`;
  const urlAudifonos = `${CONFIG[0].ip}/audifonos`;
  var carrito = [];

  function setProducto(producto) {
    const getList = JSON.parse(localStorage.getItem("lista"));
    if (getList !== null) {
      carrito = getList;
    }
    carrito.push(producto);
    localStorage.setItem("lista", JSON.stringify(carrito));
  }

  return (
    <>
      <main>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Menu />
              <Inicio />
              <Footer />
            </Route>
            <Route path="/mouse">
              <Menu />
              <Main title="Mouse" url={urlMouse} list={setProducto} />
              <Footer />
            </Route>
            <Route path="/teclados">
              <Menu />
              <Main title="Teclados" url={urlTeclados} list={setProducto} />
              <Footer />
            </Route>
            <Route path="/memorias">
              <Menu />
              <Main title='Memorias' url={urlMemorias} list={setProducto} />
              <Footer />
            </Route>
            <Route path="/audifonos">
              <Menu />
              <Main title="Audífonos" url={urlAudifonos} list={setProducto} />
              <Footer />
            </Route>
            <Route path="/carro">
              <Menu />
              <Carro />
              <Footer />
            </Route>
            <Route path="/productos/mouse/:Id">
              <Menu />
              <ProductoMoreInfo list={setProducto} />
              <Footer />
            </Route>
            <Route path="/productos/teclados/:Id">
              <Menu />
              <ProductoMoreInfo list={setProducto} />
              <Footer />
            </Route>
            <Route path="/productos/memorias/:Id">
              <Menu />
              <ProductoMoreInfo list={setProducto} />
              <Footer />
            </Route>
            <Route path="/productos/audifonos/:Id">
              <Menu />
              <ProductoMoreInfo list={setProducto} />
              <Footer />
            </Route>
            <Route path="/perfil">
              <Menu />
              <Perfil />
              <Footer />
            </Route>
            <Route path="/pedidos">
              <Menu />
              <Pedidos />
              <Footer />
            </Route>
            <Route path="/cuenta">
              <Cuenta />
            </Route>
            <Route path="/carro">
              <Carro />
            </Route>
            <Route path="/nuevoCliente">
              <NuevoCliente />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  )
}

export default App;
