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

var listTemporal = [];

// GET all Productos
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
  const autifonos = await Audifonos.findById(req.params.id);
  res.json(audifonos);
});
// router.get('/cuenta', passport.authenticate()
// },(req, res) => {
//   res.json({state: "Welcome"});
// });

// router.post('/registro', passport.authenticate('local-signup'))

// ADD a new task
router.post('/mouse', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const mouse = new Mouse({code, image, name, cant, description, price});
  await mouse.save();
  res.json({status: 'Producto guardado'});
});
router.post('/teclados', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const teclados = new Teclados({code, image, name, cant, description, price});
  // await teclados.save();
  await teclados.save();
  res.json({status: 'Producto guardado'});
});
router.post('/memorias', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const memorias = new Memorias({code, image, name, cant, description, price});
  await memorias.save();
  res.json({status: 'Producto guardado'});
});
router.post('/audifonos', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const audifonos = new Audifonos({code, image, name, cant, description, price});
  await audifonos.save();
  res.json({status: 'Producto guardado'});
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
            user: 'atencionalcliente@satsoporte.com.co',
            pass: 'asdfASDF1234'
        },
        tls: {
          rejectUnauthorized: false
        }
    });
    const codigo = parseInt(getRandomArbitrary(1000,2000));
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
        console.log(listTemporal);
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
          cookieId: `usuarioid=${user._id}; expires=Thu, 31 Dec 2020 12:00:00 UTC`
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
  res.json({
    name: userExiste.name,
    email: userExiste.email,
    departamento: userExiste._doc.departamento,
    municipio: userExiste._doc.municipio,
  });
});
router.post('/ingresar', async (req, res) => {
  const { email, password } = req.body;
  const userExiste = await User.findOne({email: email});
  if(userExiste!==null){
    if(password===userExiste.password){
      res.json({
        status: 'Usuario encontrado',
        cookie: `usuario=${userExiste.name}; expires=Thu, 31 Dec 2020 12:00:00 UTC`,
        cookieId: `usuarioid=${userExiste._id}; expires=Thu, 31 Dec 2020 12:00:00 UTC`
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
  console.log(listaPedido[0]);
  var i = 1;
  while(listaPedido[i]!==undefined){
    console.log(listaPedido[0].user+"-"+listaPedido[i].producto+"-"+parseInt(listaPedido[i].cantidad));
    const mouse = await Mouse.findById(listaPedido[i].producto);
    const teclado = await Teclados.findById(listaPedido[i].producto);
    const audifono = await Audifonos.findById(listaPedido[i].producto);
    const memoria = await Memorias.findById(listaPedido[i].producto);
    console.log(mouse);
    console.log(teclado);
    console.log(audifono);
    console.log(memoria);
    i++;
  }
  res.json({"status": "Ok"});
});
router.post('/updateUser', async (req, res) => {
  console.log(req.body);
  res.json({status: "breve"});
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
  const { code, image, name, cant, description, price } = req.body;
  const newMouse = { code, image, name, cant, description, price };
  await Mouse.findByIdAndUpdate(req.params.id, newMouse);
  res.json({status: 'Task Updated'});
});
router.put('/teclados/:id', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const newTeclado = { code, image, name, cant, description, price };
  await Teclados.findByIdAndUpdate(req.params.id, newTeclado);
  res.json({status: 'Task Updated'});
});
router.put('/memorias/:id', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const newMemorias = { code, image, name, cant, description, price };
  await Memorias.findByIdAndUpdate(req.params.id, newMemorias);
  res.json({status: 'Task Updated'});
});
router.put('/audifonos/:id', async (req, res) => {
  const { code, image, name, cant, description, price } = req.body;
  const newAudifonos = { code, image, name, cant, description, price };
  await Audifonos.findByIdAndUpdate(req.params.id, newAudifonos);
  res.json({status: 'Task Updated'});
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({status: 'Task Deleted'});
});

module.exports = router;
