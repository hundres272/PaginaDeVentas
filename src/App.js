import React,{ useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/menu';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
import {
  HashRouter as Router,
  Switch,
  Route
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
  // const urlMouse = `http://${CONFIG[0].ip}:8000/mouse`;
  // const urlTeclados = `http://${CONFIG[0].ip}:8000/teclados`;
  // const urlMemorias = `http://${CONFIG[0].ip}:8000/memorias`;
  // const urlAudifonos = `http://${CONFIG[0].ip}:8000/audifonos`;
  const urlMouse = `${CONFIG[0].ip}/mouse`;
  const urlTeclados = `${CONFIG[0].ip}/teclados`;
  const urlMemorias = `${CONFIG[0].ip}/memorias`;
  const urlAudifonos = `${CONFIG[0].ip}/audifonos`;
  const [state, setState] = useState(1)
  var carrito = [];
  
  function setProducto(producto){
    const getList = JSON.parse(localStorage.getItem("lista"));
    if(getList!==null){
      carrito = getList;
    }
    carrito.push(producto);
    localStorage.setItem("lista",JSON.stringify(carrito));
    // console.log(JSON.parse(localStorage.getItem("lista")));
  }

  if(window.location.pathname === "/cuenta" && state === 1){
    setState(2);
  }else if(window.location.pathname === "/carrito"){
    setState(3);
  }else if(window.location.pathname === "/nuevoCliente" && state !== 4){
    setState(4);
  }
  
  if(state === 1){
    return (
      <>
        <main> 
          <Router>
            <Menu />
              <Switch>
                <Route exact path="/">
                  <Inicio />
                </Route>
                <Route path="/mouse">
                  {/* <Redirect to="/mouse" /> */}
                  <Main title="Mouse" url={urlMouse} list={setProducto} />
                </Route>
                <Route path="/teclados">
                  {/* <Redirect to="/teclados" /> */}
                  <Main title="Teclados" url={urlTeclados} list={setProducto} />
                </Route>
                <Route path="/memorias">
                  {/* <Redirect to="/memorias" /> */}
                  <Main title='Memorias' url={urlMemorias} list={setProducto} />
                </Route>
                <Route path="/audifonos">
                  {/* <Redirect to="/audifonos" /> */}
                  <Main title="Audífonos" url={urlAudifonos} list={setProducto} />
                </Route>
                <Route path="/carro">
                  <Carro />
                </Route>
                <Route path="/productos/mouse/:Id">
                  <ProductoMoreInfo list={setProducto} />
                </Route>
                <Route path="/productos/teclados/:Id">
                  <ProductoMoreInfo list={setProducto} />
                </Route>
                <Route path="/productos/memorias/:Id">
                  <ProductoMoreInfo list={setProducto} />
                </Route>
                <Route path="/productos/audifonos/:Id">
                  <ProductoMoreInfo list={setProducto} />
                </Route>
                <Route path="/perfil">
                  <Perfil />
                </Route>
                <Route path="/pedidos">
                  <Pedidos />
                </Route>
            </Switch>
          </Router>
        </main>
        <Footer />
      </>
    )
  }else if(state === 2){
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/cuenta">
            <Cuenta />
          </Route>
        </Router>
      </>
    )
  }else if(state === 3){
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/carro">
            <Carro />
          </Route>
        </Router>
      </>
    )
  }else if(state === 4){
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/nuevoCliente">
            <NuevoCliente />
          </Route>
        </Router>
      </>
    )
  }

  return (<></>)
}

export default App;
