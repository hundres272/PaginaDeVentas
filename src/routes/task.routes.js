const express = require('express');
const router = express.Router();
// const passport = require('passport');
const nodemailer = require('nodemailer');

// Task Model
const Mouse = require('../models/mouse');
const Teclados = require('../models/teclados');
const Memorias = require('../models/memorias');
const Audifonos = require('../models/audifonos');
const User = require('../models/user');
const Venta = require('../models/ventas');
// const CONFIG = require('../config/config');
const CONFIG = require('../config/configServer.json');
// import {confCorreo,confPass} from '../config/configServer';

var listTemporal = [];
var contadorProductos = -1;

async function contador(){
  var uno = await Mouse.estimatedDocumentCount();
  var dos = await Teclados.estimatedDocumentCount();
  var tres = await Memorias.estimatedDocumentCount();
  var cuatro = await Audifonos.estimatedDocumentCount();
  // console.log("holis: "+tres);
  contadorProductos = parseInt(uno)+parseInt(dos)+parseInt(tres)+parseInt(cuatro);
  return  contadorProductos;
}

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// GET all Productos
router.get('/cantProductos', (req, res) => {
  contador().then(val => {
    res.json({value: val});
  });  
});
router.get('/mouse', async (req, res) => {
  const mouse = await Mouse.find().populate('mouse');
  res.json(mouse);
});

router.get('/teclados', async (req, res) => {
  const teclados = await Teclados.find().populate('teclados');
  res.json(teclados);
});

router.get('/memorias', async (req, res) => {
  const memorias = await Memorias.find().populate('memorias');
  res.json(memorias);
});

router.get('/audifonos', async (req, res) => {
  const audifonos = await Audifonos.find().populate('audifonos');
  res.json(audifonos);
});

// GET por producto
router.get('/productos/mouse/:id', async (req, res) => {
  const mouse = await Mouse.findById(req.params.id);
  res.json(mouse);
});
router.get('/productos/teclados/:id', async (req, res) => {
  const teclado = await Teclados.findById(req.params.id);
  res.json(teclado);
});
router.get('/productos/memorias/:id', async (req, res) => {
  const memorias = await Memorias.findById(req.params.id);
  res.json(memorias);
});
router.get('/productos/audifonos/:id', async (req, res) => {
  const audifonos = await Audifonos.findById(req.params.id);
  res.json(audifonos);
});
// router.get('/cuenta', passport.authenticate()
// },(req, res) => {
  //   res.json({state: "Welcome"});
  // });
  
  // router.post('/registro', passport.authenticate('local-signup'))
  
  // ADD a new task
  router.post('/producto', async (req, res) => {
  const mouse = await Mouse.findById(req.body.id);
  const teclado = await Teclados.findById(req.body.id);
  const memorias = await Memorias.findById(req.body.id);
  const audifonos = await Audifonos.findById(req.body.id);
  // console.log("hola: "+req.body.id);
  if(mouse===null){
    if(teclado===null){
      if(memorias===null){
        if(audifonos===null){
          res.json({'mensaje':'null'});
        }else{
          // console.log(audifonos);
          res.json(audifonos);
        }
      }else{
        // console.log(memorias);
        res.json(memorias);
      }
    }else{
      // console.log(teclado);
      res.json(teclado);
    }
  }else{
    // console.log(mouse);
    res.json(mouse);
  }
});
router.post('/pedidos', async (req, res) => {
  const { id } = req.body;
  const pedidos = await Venta.find({'idCli':`${id}`});
  // console.log(pedidos);
  res.json({pedidos: pedidos});
});
router.post('/mouse', async (req, res) => {
  const { userId, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: userId});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const mouse = new Mouse({code, image, name, cant, description, price});
      await mouse.save();
      res.json({status: 'Producto guardado'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.post('/teclados', async (req, res) => {
  const { userId, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: userId});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const teclados = new Teclados({code, image, name, cant, description, price});
      await teclados.save();
      res.json({status: 'Producto guardado'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.post('/memorias', async (req, res) => {
  const { userId, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: userId});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const memorias = new Memorias({code, image, name, cant, description, price});
      await memorias.save();
      res.json({status: 'Producto guardado'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.post('/audifonos', async (req, res) => {
  const { userId, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: userId});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const audifonos = new Audifonos({code, image, name, cant, description, price});
      await audifonos.save();
      res.json({status: 'Producto guardado'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.post('/nuevoCliente', async (req, res) => {
  const { name, email, password } = req.body;
  const userExiste = await User.findOne({email: email});
  if(userExiste===null){
    const transporter = nodemailer.createTransport({
        host: 'cp.amigo7host.net',
        port: 465,
        secure: true,
        auth: {
            user: "atencionalcliente@satsoporte.com.co",
            pass: "tvoHp+hOY?Eb"
        },
        tls: {
          rejectUnauthorized: false
        }
    });
    const codigo = parseInt(getRandomArbitrary(100000,999999));
    const htmlsend = 
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verificación</title>
          <style type="text/css">
            body {
                margin: 0;
                padding: 0;
                display: flex;
                height: 100vh;
                justify-content: center;
                align-items: center;
                background-color: cadetblue;
            }
            .principal {
                background-color: rgba(43, 154, 158, .4);
                border-radius: 20px;
                box-shadow: 1px 1px 20px 10px rgba(0,0,0,.5);
                display: flex;
                flex-direction: column;
                padding: 30px;
                text-align: center;
            }
            a {
                display: flex;
                text-decoration: none;
                color: black;
            }
            .logoAcount {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .logoAcount > h2 {
                margin-left: 20px;
            }
            #codigo {
                padding: 10px;
                font-size: 1rem;
                text-align: center;
                border-radius: 20px;
                border: none;
            }
            #codigo:focus {
                outline: none;
            }
          </style>
      </head>
      <body>
          <div class="principal">
              <h2>Código de Verificación</h2>
              <input id="codigo" type="text" value=${codigo} readonly>
          </div>
      </body>
      </html>`;
    const mailOptions = {
      from: "atencionalcliente@satsoporte.com.co",
      to: email,
      subject: "Enviado desde Componentes.com",
      // text: `Código de verificación: ${parseInt(getRandomArbitrary(1000,2000))}`,
      html: htmlsend
    };
    transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        console.log(error);
        res.json({status: 'error'});
      }else{
        listTemporal.push({
          code: codigo,
          usuario: {
            name: name,
            email: email,
            password: password
          }
        })
        // console.log(listTemporal);
        res.json({status: 'verificacion'});
      }
    });
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  }else{
    res.json({status: 'Cliente ya existe'});
  }
});
router.post('/verificacion',async (req, res) => {
  const { email,code } = req.body;
  var usuarioAgregado = 0;
  if(listTemporal.length>0){
    for (let i = 0; i < listTemporal.length; i++) {
      if(listTemporal[i].usuario.email===email && parseInt(listTemporal[i].code)===parseInt(code)){
        const name = listTemporal[i].usuario.name; 
        const email = listTemporal[i].usuario.email; 
        const password = listTemporal[i].usuario.password; 
        const user = new User({name, email, password});
        await user.save();
        usuarioAgregado = 1;
        eliminarUsuarioTemporal(i);
        res.json({
          status: 'Cliente agregado',
          cookie: `usuario=${user.name}; expires=Thu, 31 Dec 2020 12:00:00 UTC`,
          cookieId: `usuarioid=${user._id}; expires=Thu, 31 Dec 2020 12:00:00 UTC`,
          cookieRole: `LKDF903Kj2U=${user.role}; expires=Thu, 31 Dec 2020 12:00:00 UTC`
        });
      }    
    }
  }
  if(usuarioAgregado===0){
    res.json({status: 'verificacioni'});
  }
  function eliminarUsuarioTemporal(posicion){
    var listAux = []
    if(listTemporal.length!==0){
      for (let i = 0; i < listTemporal.length; i++) {
        if(i!==posicion){
          listAux.push(listTemporal[i])
        }
      }
      listTemporal=listAux;
    }else{
      listTemporal=[];
    }
  }
});
router.post('/obtenerDatosUsuario', async (req, res) => {
  const {id} = req.body;
  const userExiste = await User.findOne({_id: id});
  if(userExiste!==null){
    res.json({
      name: userExiste.name,
      email: userExiste.email,
      fechaNac: userExiste._doc.fechaNac,
      departamento: userExiste._doc.departamento,
      municipio: userExiste._doc.municipio,
      direccion: userExiste._doc.direccion,
    });
  }else{
    res.json({status: "Usuario no encontrado"})
  }
});
router.post('/ingresar', async (req, res) => {
  const { email, password } = req.body;
  const userExiste = await User.findOne({email: email});
  if(userExiste!==null){
    if(password===userExiste.password){
      res.json({
        status: 'Usuario encontrado',
        cookie: `usuario=${userExiste.name}; expires=Thu, 31 Dec 2020 12:00:00 UTC`,
        cookieId: `usuarioid=${userExiste._id}; expires=Thu, 31 Dec 2020 12:00:00 UTC`,
        cookieRole: `LKDF903Kj2U=${userExiste.role}; expires=Thu, 31 Dec 2020 12:00:00 UTC`
      });
    }else{
      res.json({status: 'El usuario no existe'});
    }
  }else{
    res.json({status: 'El usuario no existe'});
  }
});
router.post('/carro', async (req,res) => {
  const listaPedido = req.body;
  // console.log(listaPedido[0].user);
  var i = 1;
  const user = await User.findById(listaPedido[0].user);
  if(user!==null){
    var codFact = await generarCodFactura();
    // var codFact = generarCodFactura();
    // console.log("numero "+await generarCodFactura());
    const idCli = listaPedido[0].user;
    while(listaPedido[i]!==undefined){
      // console.log(listaPedido[0].user+"-"+listaPedido[i].producto+"-"+parseInt(listaPedido[i].cantidad));
      const mouse = await Mouse.findById(listaPedido[i].producto);
      const teclado = await Teclados.findById(listaPedido[i].producto);
      const audifono = await Audifonos.findById(listaPedido[i].producto);
      const memoria = await Memorias.findById(listaPedido[i].producto);
      const idProd = listaPedido[i].producto;
      const cantComp = listaPedido[i].cantidad;
      const estado = "Preparando";
      const departamento = user.departamento;
      const municipio = user.municipio;
      const direccion = user.direccion;
      if(mouse!==null){
        const valor = parseInt(mouse.price)*parseInt(cantComp);
        const cantExist = parseInt(mouse.cant);
        const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado,departamento,municipio,direccion});
        await nuevaVenta.save();
        await Mouse.findOneAndUpdate({"_id":idProd},{"$set": {
          "cant": (cantExist-parseInt(cantComp)) 
        }});
      }else if(teclado!==null){
        const valor = parseInt(teclado.price)*parseInt(cantComp);
        const cantExist = parseInt(teclado.cant);
        const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado,departamento,municipio,direccion});
        // const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado});
        await nuevaVenta.save();
        await Teclados.findOneAndUpdate({"_id":idProd},{"$set": {
          "cant": (cantExist-parseInt(cantComp)) 
        }});
      }else if(audifono!==null){
        const valor = parseInt(audifono.price)*parseInt(cantComp);
        const cantExist = parseInt(audifono.cant);
        const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado,departamento,municipio,direccion});
        // const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado});
        await nuevaVenta.save();
        await Audifonos.findOneAndUpdate({"_id":idProd},{"$set": {
          "cant": (cantExist-parseInt(cantComp)) 
        }});
      }else if(memoria!==null){
        const valor = parseInt(memoria.price)*parseInt(cantComp);
        const cantExist = parseInt(memoria.cant);
        const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado,departamento,municipio,direccion});
        // const nuevaVenta = new Venta({codFact,idCli,idProd,cantComp,valor,estado});
        await nuevaVenta.save();
        await Memorias.findOneAndUpdate({"_id":idProd},{"$set": {
          "cant": (cantExist-parseInt(cantComp)) 
        }});
      }
      i++;
    }
    res.json({"status": "Compra completada"});
  }else{
    res.json({"status": "Usuario incorrecto"});
  }
  async function generarCodFactura(){
    var nume = 1;
    var venta = await Venta.findOne({codFact: nume});
    while(venta!==null){
      nume = parseInt(nume) + 1;
      venta = await Venta.findOne({codFact: nume});
      // console.log("venta: "+nume)
    }
    return nume;
  }
});
router.post('/updateUser', async (req, res) => {
  const {id,email,fechaNac,departamento,municipio,direccion} = req.body;
  console.log(req.body);
  // const user = await User.findById(id);
  await User.findOneAndUpdate({"_id":id},{"$set": {
    "departamento": departamento,
    "municipio": municipio,
    "fechaNac": fechaNac,
    "direccion": direccion
  }}).then((respuestaBase) => {
    // respuestaBase.save();
    console.log(respuestaBase);
    res.json({status: "Correcta"});
  })
  .catch((err) => {
    console.log("error "+err);
    res.json({status: "breve"});
  });;
});
// router.post('/ingresar', passport.authenticate('local',{
//   successRedirect: "/",
//   failureRedirect: "/"
// }),(req,res) => {
//   console.log("aqui llegó /ingresar");
//   //Recibir credenciales e iniciar sesión
//   console.log(req.body.email);
//   console.log(req.body.password);
//   res.json({
//     respuesta: "todo bien"
//   });
// })

// UPDATE a new task
router.put('/mouse/:id', async (req, res) => {
  const { idUser, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: idUser});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const newMouse = { code, image, name, cant, description, price };
      await Mouse.findByIdAndUpdate(req.params.id, newMouse);
      res.json({status: 'Task Updated'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.put('/teclados/:id', async (req, res) => {
  const { idUser, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: idUser});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const newTeclado = { code, image, name, cant, description, price };
      await Teclados.findByIdAndUpdate(req.params.id, newTeclado);
      res.json({status: 'Task Updated'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.put('/memorias/:id', async (req, res) => {
  const { idUser, code, image, name, cant, description, price } = req.body;
  // console.log(idUser);
  const userExiste = await User.findOne({_id: idUser});
  // console.log("user: "+userExiste);
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const newMemorias = { code, image, name, cant, description, price };
      await Memorias.findByIdAndUpdate(req.params.id, newMemorias);
      res.json({status: 'Task Updated'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.put('/audifonos/:id', async (req, res) => {
  const { idUser, code, image, name, cant, description, price } = req.body;
  const userExiste = await User.findOne({_id: idUser});
  if(userExiste!==null){
    if (userExiste.role==="Pdk83Hes823Kjs") {
      const newAudifonos = { code, image, name, cant, description, price };
      await Audifonos.findByIdAndUpdate(req.params.id, newAudifonos);
      res.json({status: 'Task Updated'});
    }else{
      res.json({status: 'Intento fraudulento notificado'});
    }
  }else{
    res.json({status: 'Intento fraudulento notificado'});
  }
});
router.post('/changepass', async (req, res) => {
  const { id, email, pass1, pass2 } = req.body;
  const user = await User.findById(id);
  console.log(user);
  console.log(user.email);
  if(user.password===pass1){
    await User.findOneAndUpdate({"_id":id},{"$set": {
      "password": pass2
    }}).then((respuestaBase) => {
      // respuestaBase.save();
      console.log(respuestaBase);
    })
    .catch((err) => {
      console.log("error "+err);
    });;
    res.json({status: "Correcta"});
  }else{
    res.json({status: "Incorrecta"})
  }
  // res.json({status: "Incorrecta"})
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({status: 'Task Deleted'});
});

module.exports = router;
