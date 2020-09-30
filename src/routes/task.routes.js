const express = require('express');
const router = express.Router();
const passport = require('passport');

// Task Model
const Mouse = require('../models/mouse');
const Teclados = require('../models/teclados');
const Memorias = require('../models/memorias');
const Audifonos = require('../models/audifonos');
const User = require('../models/user');
const user = require('../models/user');

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

router.post('/registro', passport.authenticate('local-signup'))

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
  const user = new User({name, email, password});
  const userExiste = await User.findOne({email: email});
  if(userExiste===null){
    await user.save();
    const userExiste = await User.findOne({email: email});
    res.json({status: 'Cliente agregado',cookie: `usuario=${name}; expires=Thu, 31 Dec 2020 12:00:00 UTC`});
  }
  res.json({status: 'Cliente ya existe'})
});
router.post('/ingresar', async (req, res) => {
  const { email, password } = req.body;
  const userExiste = await User.findOne({email: email});
  if(userExiste!==null){
    if(password===userExiste.password){
      res.json({status: 'Usuario encontrado', cookie: `usuario=${userExiste.name}; expires=Thu, 31 Dec 2020 12:00:00 UTC`});
    }
  }else{
    res.json({status: 'El usuario no existe'});
  }
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
