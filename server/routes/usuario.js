const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    getClientForDni
} = require('../data/db');



//////////////////////
// OBTENER PRODUCTO POR ID
//////////////////////
app.get('/client/:dni', async (req, res) => {

  const { dni } = req.params;

  try {
      const userDB = await getClientForDni(dni);

      console.log(userDB.length);

      if(userDB.length == 0){
        return res.status(400).json({
            ok:false, 
            error: {
                message:'Cliente not found'
            }
        });

      }
      
      return res.json({
          ok: true,
          user: userDB,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

module.exports = app;