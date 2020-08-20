const express = require('express');
const app = express();

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', verificaToken, function(req, res) {

  const { query = {} } = req;
  let { desde = 0, limite = 5 } = query;
  desde = Number(desde);
  limite = Number(limite);

  const find = {estado: true};

  Usuario.find(find, 'nombre img imagen estado role google')
    .skip(desde)
    .limit(limite)
    .exec( (error,usuario) => {
    if (error) {
        res.status(400)
        return res.json(
        {ok: false,
        error,}
        )
    }

    Usuario.count(find, (error, conteo) => {
        return res.json({
            ok: true, 
            usuario,
            conteo,
        });
    })



    
    })
  });
  
  app.post('/usuario', [verificaToken], function(req, res) {
    const { body } = req;
  
    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10) ,
      role: body.role,
    });

    usuario.save ( (error, usuarioDB) => {
      if (error){
        res.status(400);
        return res.json({
          ok: false,
          error, 
        })
      }

      return res.json({
        ok: true,
        usuario: usuarioDB,
      })
    })
  });
  
  app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    
    let { id } = req.params;
    // let { body } = req;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    const optionsUpdate = { new: true, runValidators: true};
    Usuario.findByIdAndUpdate(id, body, optionsUpdate,  (error, usuarioDB) => {
      if (error){
        res.status(400);
        return res.json({
          ok: false,
          error, 
        })
      }

      return res.json({
        ok: true,
        usuario: usuarioDB,
      })
    });  
  });

  app.delete('/usuario/:id', verificaToken, (req,res) => {

      const { id } = req.params;
      const bodyUpdate = { estado: false };
      const optionsUpdate = { new: true, runValidators: true};
      Usuario.findByIdAndUpdate(id, bodyUpdate, optionsUpdate, (error, usuarioDesactivado) => {
          if (error){
              res.status(400);
              return res.json({
                  ok: false,
                  error,
              })
          }

          return res.json({
              ok: true,
              usuario: usuarioDesactivado,
          })
      })
  })
  
  app.delete('/delete/usuario/:id', function(req, res) {
     const { id } = req.params;

     Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
         if  (error){
             res.status(400);
             return res.json({
                 ok: false,
                 error,
             })
         }

         if (!usuarioBorrado)
         {
            res.status(400);
            return res.json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado',
                },
            })
         }

         return res.json({
             ok: true,
             usuario: usuarioBorrado
            });
     });
  });

  module.exports = app;