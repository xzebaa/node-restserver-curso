const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
    getClientForDni
} = require('../data/db');


app.get('/news/mobile', async (req, res) => {

  const { dni } = req.params;

  try {
    //   const userDB = await getClientForDni(dni);

    //   console.log(userDB.length);

    const news = [
        {
            title: 'Primera noticia desde el baquend',
            notice: 'esto es amaziiiing',
            image: '',
            date: new Date(),
        },
        {
            title: 'segundaa noticia desde el baquend',
            notice: 'esto es amaziiiing wowowowowoowowowowowow',
            image: '',
            date: new Date(),
        }
    ];

      if(news.length == 0){
        return res.status(400).json({
            ok:false, 
            error: {
                message:'sin noticias'
            }
        });

      }
      
      return res.json({
          ok: true,
          news: news,
      });

  } catch (error) {
      return res.status(500).json({
          ok: false,
          error,
      });
  }
});

module.exports = app;