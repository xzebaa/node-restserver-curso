const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', function(req, res) {

  const { query = {} } = req;
  let { desde = 0, limite = 5 } = query;
  desde = Number(desde);
  limite = Number(limite);

  Usuario.find()
    .skip(desde)
    .limit(limite)
    .exec( (err,usuario) => {
      if (err) {
        res.status(400)
        return res.json(
          {ok: false,
          err,}
        )
      }
      
     return res.json({usuario});
    })
  });
  
  app.post('/usuario', function(req, res) {
    const { body } = req;
  
    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10) ,
      role: body.role,
    });

    usuario.save ( (err, usuarioDB) => {
      if (err){
        res.status(400);
        return res.json({
          ok: false,
          err, 
        })
      }

      return res.json({
        ok: true,
        usuario: usuarioDB,
      })
    })
  });
  
  app.put('/usuario/:id', function(req, res) {
    
    let { id } = req.params;
    // let { body } = req;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body,{ new: true, runValidators: true },  (err, usuarioDB) => {
      if (err){
        res.status(400);
        return res.json({
          ok: false,
          err, 
        })
      }

      return res.json({
        ok: true,
        usuario: usuarioDB,
      })
    });  
  });
  
  app.delete('/usario', function(req, res) {
    // este metodo solo cambiara el estado al registro a desactivado.
    res.json('DELETE ELEMENT');
  });

  module.exports = app;